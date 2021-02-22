import { Vector2, WebKitGestureEvent, DomEvents } from '../types'

/**
 * Whether the browser supports GestureEvent (ie Safari)
 * @returns true if the browser supports gesture event
 */
export function supportsGestureEvents(): boolean {
  try {
    // TODO [TS] possibly find GestureEvent definitions?
    // @ts-ignore: no type definitions for webkit GestureEvents
    return 'constructor' in GestureEvent
  } catch (e) {
    return false
  }
}

export function supportsTouchEvents(): boolean {
  return typeof window !== 'undefined' && 'ontouchstart' in window
}

function getEventTouches(event: PointerEvent | TouchEvent ) {
  if ('pointerId' in event) return null
  return event.type === 'touchend' ? event.changedTouches : event.targetTouches
}

export function getTouchIds(event: TouchEvent): number[] {
  return Array.from(getEventTouches(event)!).map(t => t.identifier)
}

export function getGenericEventData(event: DomEvents) {
  const buttons = 'buttons' in event ? event.buttons : 0
  const { shiftKey, altKey, metaKey, ctrlKey } = event as any // TODO check if this might create some overrides?
  return { buttons, shiftKey, altKey, metaKey, ctrlKey }
}

const identity = (xy: Vector2) => xy

/**
 * Gets pointer event values.
 * @param event
 * @returns pointer event values
 */
export function getPointerEventValues(
  event: TouchEvent | PointerEvent,
  transform = identity
): Vector2 {
  const touchEvents = getEventTouches(event)
  const { clientX, clientY } = touchEvents ? touchEvents[0] : (event as PointerEvent)
  return transform([clientX, clientY])
}

/**
 * Gets two touches event data
 * @param event
 * @returns two touches event data
 */
export function getTwoTouchesEventValues(
  event: TouchEvent,
  pointerIds: [number, number],
  transform = identity
) {
  const [A, B] = Array.from(event.touches).filter(t => pointerIds.includes(t.identifier))

  if (!A || !B) throw Error(`The event doesn't have two pointers matching the pointerIds`)

  const dx = B.clientX - A.clientX
  const dy = B.clientY - A.clientY
  const cx = (B.clientX + A.clientX) / 2
  const cy = (B.clientY + A.clientY) / 2

  // const e: any = 'nativeEvent' in event ? event.nativeEvent : event

  const distance = Math.hypot(dx, dy)
  // FIXME rotation has inconsistant values so we're not using it atm
  // const angle = (e.rotation as number) ?? -(Math.atan2(dx, dy) * 180) / Math.PI
  const angle = -(Math.atan2(dx, dy) * 180) / Math.PI
  const values: Vector2 = transform([distance, angle])
  const origin: Vector2 = transform([cx, cy])

  return { values, origin }
}

/**
 * Gets scroll event values
 * @param event
 * @returns scroll event values
 */
export function getScrollEventValues(event: UIEvent, transform = identity): Vector2 {
  // If the currentTarget is the window then we return the scrollX/Y position.
  // If not (ie the currentTarget is a DOM element), then we return scrollLeft/Top
  const { scrollX, scrollY, scrollLeft, scrollTop } = event.currentTarget as Element & Window
  return transform([scrollX || scrollLeft || 0, scrollY || scrollTop || 0])
}

// wheel delta defaults from https://github.com/facebookarchive/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js
const LINE_HEIGHT = 40
const PAGE_HEIGHT = 800

/**
 * Gets wheel event values.
 * @param event
 * @returns wheel event values
 */
export function getWheelEventValues(event: WheelEvent, transform = identity): Vector2 {
  let { deltaX, deltaY, deltaMode } = event
  // normalize wheel values, especially for Firefox
  if (deltaMode === 1) {
    deltaX *= LINE_HEIGHT
    deltaY *= LINE_HEIGHT
  } else if (deltaMode === 2) {
    deltaX *= PAGE_HEIGHT
    deltaY *= PAGE_HEIGHT
  }
  return transform([deltaX, deltaY])
}

/**
 * Gets webkit gesture event values.
 * @param event
 * @returns webkit gesture event values
 */
export function getWebkitGestureEventValues(event: WebKitGestureEvent, transform = identity): Vector2 {
  return transform([event.scale, event.rotation])
}
