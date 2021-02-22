import Controller from '../Controller'
import {
  StateKey,
  SharedGestureState,
  IngKey,
  InternalConfig,
  GestureKey,
  GestureState,
  EventTypes,
  PartialGestureState,
  Vector2,
  FullGestureState,
  RecognizerClass,
} from '../types'
import { getInitialState } from '../utils/state'
import { rubberbandIfOutOfBounds } from '../utils/rubberband'
import { subV, addV, sign } from '../utils/math'
import { valueFn } from '../utils/utils'

export const RecognizersMap = new Map<GestureKey, RecognizerClass>()

const identity = (xy: Vector2) => xy

/**
 * @private
 * Recognizer abstract class.
 */
export default abstract class Recognizer<T extends StateKey = StateKey> {
  abstract readonly ingKey: IngKey // dragging, scrolling, etc.
  protected debounced: Boolean = true
  abstract readonly stateKey: T

  /**
   * Creates an instance of a gesture recognizer.
   * @param stateKey drag, move, pinch, etc.
   * @param controller the controller attached to the gesture
   * @param [args] the args that should be passed to the gesture handler
   */
  constructor(readonly controller: Controller, readonly args: any[] = []) {
    this.controller = controller
    this.args = args
  }

  // Returns the gesture config
  get config(): NonNullable<InternalConfig[T]> {
    return this.controller.config[this.stateKey]!
  }

  // Is the gesture enabled
  get enabled(): boolean {
    return this.controller.config.enabled && this.config.enabled
  }

  // Returns the controller state for a given gesture
  get state(): GestureState<T> {
    return this.controller.state[this.stateKey]
  }

  // Returns the gesture handler
  get handler() {
    return this.controller.handlers[this.stateKey]!
  }

  get transform() {
    return this.config.transform || this.controller.config.transform || identity
  }

  // Convenience method to update the shared state
  protected updateSharedState(sharedState: Partial<SharedGestureState> | null) {
    Object.assign(this.controller.state.shared, sharedState)
  }

  // Convenience method to update the gesture state
  protected updateGestureState(gestureState: PartialGestureState<T> | null) {
    Object.assign(this.state, gestureState)
  }

  // Convenience method to set a timeout for a given gesture
  protected setTimeout = (callback: (...args: any[]) => void, ms: number = 140, ...args: any[]): void => {
    clearTimeout(this.controller.timeouts[this.stateKey])
    this.controller.timeouts[this.stateKey] = window.setTimeout(callback, ms, ...args)
  }

  // Convenience method to clear a timeout for a given gesture
  protected clearTimeout = () => {
    clearTimeout(this.controller.timeouts[this.stateKey])
  }

  protected abstract getKinematics(values: Vector2, event: UIEvent): PartialGestureState<T>

  protected abstract getInternalMovement(values: Vector2, state: GestureState<T>): Vector2

  protected abstract mapStateValues(state: GestureState<T>): Omit<PartialGestureState<T>, 'event'>

  public abstract addBindings(bindings: any): void

  /**
   * Returns state properties depending on the movement and state.
   *
   * Should be overriden for custom behavior, doesn't do anything in the implementation
   * below.
   */
  protected checkIntentionality(
    _intentional: [false | number, false | number],
    _movement: Vector2
  ): PartialGestureState<T> {
    return { _intentional, _blocked: false } as PartialGestureState<T>
  }

  /**
   * Returns basic movement properties for the gesture based on the next values and current state.
   */
  protected getMovement(values: Vector2): PartialGestureState<T> {
    const { rubberband, threshold: T } = this.config

    const { _bounds, _initial, _active, _intentional: wasIntentional, lastOffset, movement: prevMovement } = this.state
    const M = this.getInternalMovement(values, this.state)

    const _T = this.transform(T).map(Math.abs)

    const i0 = wasIntentional[0] === false ? getIntentionalDisplacement(M[0], _T[0]) : wasIntentional[0]
    const i1 = wasIntentional[1] === false ? getIntentionalDisplacement(M[1], _T[1]) : wasIntentional[1]

    // Get gesture specific state properties based on intentionality and movement.
    const intentionalityCheck = this.checkIntentionality([i0, i1], M)
    if (intentionalityCheck._blocked) {
      return { ...intentionalityCheck, _movement: M, delta: [0, 0] }
    }

    const _intentional = intentionalityCheck._intentional!
    const _movement = M

    /**
     * The movement sent to the handler has 0 in its dimensions when intentionality is false.
     * It is calculated from the actual movement minus the threshold.
     */
    let movement: Vector2 = [
      _intentional[0] !== false ? M[0] - _intentional[0] : 0,
      _intentional[1] !== false ? M[1] - _intentional[1] : 0,
    ]

    const offset = addV(movement, lastOffset)

    /**
     * Rubberband should be 0 when the gesture is no longer active, so that movement
     * and offset can return within their bounds.
     */
    const _rubberband: Vector2 = _active ? rubberband : [0, 0]
    movement = computeRubberband(_bounds, addV(movement, _initial), _rubberband)

    return {
      ...intentionalityCheck,
      intentional: _intentional[0] !== false || _intentional[1] !== false,
      _initial,
      _movement,
      movement,
      values,
      offset: computeRubberband(_bounds, offset, _rubberband),
      delta: subV(movement, prevMovement),
    } as PartialGestureState<T>
  }

  // Cleans the gesture. Can be overriden by gestures.
  protected clean() {
    this.clearTimeout()
  }

  /**
   * Fires the gesture handler
   */
  protected fireGestureHandler = (forceFlag: boolean = false): FullGestureState<T> | null => {
    /**
     * If the gesture has been blocked (this can happen when the gesture has started in an unwanted direction),
     * clean everything and don't do anything.
     */
    if (this.state._blocked) {
      // we need debounced gestures to end by themselves
      if (!this.debounced) {
        this.state._active = false
        this.clean()
      }
      return null
    }

    // If the gesture has no intentional dimension, don't fire the handler.
    if (!forceFlag && !this.state.intentional && !this.config.triggerAllEvents) return null

    if (this.state.intentional) {
      const prev_active = this.state.active
      const next_active = this.state._active

      this.state.active = next_active
      this.state.first = next_active && !prev_active
      this.state.last = prev_active && !next_active

      this.controller.state.shared[this.ingKey] = next_active // Sets dragging, pinching, etc. to the gesture active state
    }
    const touches = this.controller.pointerIds.size || this.controller.touchIds.size
    const down = this.controller.state.shared.buttons > 0 || touches > 0

    const state = {
      ...this.controller.state.shared,
      ...this.state,
      ...this.mapStateValues(this.state), // Sets xy or da to the gesture state values
      locked: !!document.pointerLockElement,
      touches,
      down,
    } as FullGestureState<T>

    // @ts-expect-error
    const newMemo = this.handler(state)

    // Sets memo to the returned value of the handler (unless it's not undefined)
    this.state.memo = newMemo !== void 0 ? newMemo : this.state.memo

    return state
  }
}

//--------------------------------------------

function getIntentionalDisplacement(movement: number, threshold: number): number | false {
  if (Math.abs(movement) >= threshold) {
    return sign(movement) * threshold
  } else {
    return false
  }
}

function computeRubberband(bounds: [Vector2, Vector2], [Vx, Vy]: Vector2, [Rx, Ry]: Vector2): Vector2 {
  const [[X1, X2], [Y1, Y2]] = bounds

  return [rubberbandIfOutOfBounds(Vx, X1, X2, Rx), rubberbandIfOutOfBounds(Vy, Y1, Y2, Ry)]
}

/**
 * Returns a generic, common payload for all gestures from an event.
 */
export function getGenericPayload<T extends StateKey>(
  { state }: Recognizer<T>,
  event: EventTypes[T],
  isStartEvent?: boolean
) {
  const { timeStamp, type: _lastEventType } = event
  const previous = state.values
  const elapsedTime = isStartEvent ? 0 : timeStamp - state.startTime!
  return { _lastEventType, event, timeStamp, elapsedTime, previous }
}

/**
 * Returns the reinitialized start state for the gesture.
 * Should be common to all gestures.
 */
export function getStartGestureState<T extends StateKey>(
  { state, config, stateKey, args }: Recognizer<T>,
  values: Vector2,
  event: EventTypes[T]
) {
  const offset = state.offset
  const startTime = event.timeStamp

  const { initial, bounds } = config

  const _state = {
    ...getInitialState()[stateKey],
    _active: true,
    args,
    values,
    initial: values,
    offset,
    lastOffset: offset,
    startTime,
  }

  return { ..._state, _initial: valueFn(initial, _state), _bounds: valueFn(bounds, _state) }
}
