import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getGenericEventData, getPointerEventValues } from '../utils/event'
import { getStartGestureState, getGenericPayload } from './Recognizer'
import { addBindings } from '../Controller'

export class MoveRecognizer extends CoordinatesRecognizer<'move'> {
  readonly ingKey = 'moving'
  readonly stateKey = 'move'

  debounced = true

  onMove = (event: PointerEvent): void => {
    if (!this.enabled) return
    this.setTimeout(this.onMoveEnd)

    if (!this.state._active) this.onMoveStart(event)
    else this.onMoveChange(event)
  }

  onMoveStart = (event: PointerEvent): void => {
    this.updateSharedState(getGenericEventData(event))
    const values = getPointerEventValues(event, this.transform)

    this.updateGestureState({
      ...getStartGestureState(this, values, event),
      ...getGenericPayload(this, event, true),
    })

    this.updateGestureState(this.getMovement(values))
    this.fireGestureHandler()
  }

  onMoveChange = (event: PointerEvent): void => {
    this.updateSharedState(getGenericEventData(event))
    const values = getPointerEventValues(event, this.transform)

    this.updateGestureState({
      ...getGenericPayload(this, event),
      ...this.getKinematics(values, event),
    })

    this.fireGestureHandler()
  }

  onMoveEnd = (): void => {
    this.clean()
    if (!this.state._active) return
    const values = this.state.values
    this.updateGestureState(this.getMovement(values))
    this.updateGestureState({ velocities: [0, 0], velocity: 0, _active: false })
    this.fireGestureHandler()
  }

  hoverTransform = () => {
    return this.controller.config.hover!.transform || this.controller.config.transform
  }

  onPointerEnter = (event: PointerEvent): void => {
    this.controller.state.shared.hovering = true
    if (!this.controller.config.enabled) return

    if (this.controller.config.hover!.enabled) {
      const values = getPointerEventValues(event, this.hoverTransform())

      const state = {
        ...this.controller.state.shared,
        ...this.state,
        ...getGenericPayload(this, event, true),
        args: this.args,
        values,
        active: true,
        hovering: true,
      }

      this.controller.handlers.hover!({ ...state, ...this.mapStateValues(state) })
    }

    if ('move' in this.controller.handlers) this.onMoveStart(event)
  }

  onPointerLeave = (event: PointerEvent): void => {
    this.controller.state.shared.hovering = false
    if ('move' in this.controller.handlers) this.onMoveEnd()
    if (!this.controller.config.hover!.enabled) return

    const values = getPointerEventValues(event, this.hoverTransform())

    const state = {
      ...this.controller.state.shared,
      ...this.state,
      ...getGenericPayload(this, event),
      args: this.args,
      values,
      active: false,
    }

    this.controller.handlers.hover!({ ...state, ...this.mapStateValues(state) })
  }

  addBindings(bindings: any): void {
    if ('move' in this.controller.handlers) {
      addBindings(bindings, 'onPointerMove', this.onMove)
    }
    if ('hover' in this.controller.handlers) {
      addBindings(bindings, 'onPointerEnter', this.onPointerEnter)
      addBindings(bindings, 'onPointerLeave', this.onPointerLeave)
    }
  }
}
