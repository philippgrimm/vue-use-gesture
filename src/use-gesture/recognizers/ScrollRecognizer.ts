import CoordinatesRecognizer from './CoordinatesRecognizer'
import { getGenericEventData, getScrollEventValues } from '../utils/event'
import { calculateAllGeometry } from '../utils/math'
import { getStartGestureState, getGenericPayload } from './Recognizer'
import { addBindings } from '../Controller'

export class ScrollRecognizer extends CoordinatesRecognizer<'scroll'> {
  readonly ingKey = 'scrolling'
  readonly stateKey = 'scroll'
  debounced = true

  handleEvent = (event: UIEvent): void => {
    if (!this.enabled) return

    this.clearTimeout()
    this.setTimeout(this.onEnd)

    const values = getScrollEventValues(event, this.transform)
    this.updateSharedState(getGenericEventData(event))

    if (!this.state._active) {
      this.updateGestureState({
        ...getStartGestureState(this, values, event),
        ...getGenericPayload(this, event, true),
        initial: this.state.values,
      })

      const movementDetection = this.getMovement(values)
      const geometry = calculateAllGeometry(movementDetection.delta!)

      this.updateGestureState(movementDetection)
      this.updateGestureState(geometry)
    } else {
      this.updateGestureState({
        ...getGenericPayload(this, event),
        ...this.getKinematics(values, event),
      })
    }

    this.fireGestureHandler()
  }

  onEnd = (): void => {
    this.clean()
    if (!this.state._active) return
    this.updateGestureState({ ...this.getMovement(this.state.values), _active: false, velocities: [0, 0], velocity: 0 })
    this.fireGestureHandler()
  }

  addBindings(bindings: any): void {
    addBindings(bindings, 'onScroll', this.handleEvent)
  }
}
