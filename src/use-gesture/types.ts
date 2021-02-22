type NativeAnimationEvent = AnimationEvent;
type NativeClipboardEvent = ClipboardEvent;
type NativeCompositionEvent = CompositionEvent;
type NativeDragEvent = DragEvent;
type NativeFocusEvent = FocusEvent;
type NativeKeyboardEvent = KeyboardEvent;
type NativeMouseEvent = MouseEvent;
type NativeTouchEvent = TouchEvent;
type NativePointerEvent = PointerEvent;
type NativeTransitionEvent = TransitionEvent;
type NativeUIEvent = UIEvent;
type NativeWheelEvent = WheelEvent;
type Booleanish = boolean | 'true' | 'false';

interface AbstractView {
    styleMedia: StyleMedia;
    document: Document;
}


declare namespace Event {

    interface DOMAttributes<T> {
        children?: any;
        dangerouslySetInnerHTML?: {
            __html: string;
        };

        // Clipboard Events
        onCopy?: ClipboardEventHandler<T>;
        onCopyCapture?: ClipboardEventHandler<T>;
        onCut?: ClipboardEventHandler<T>;
        onCutCapture?: ClipboardEventHandler<T>;
        onPaste?: ClipboardEventHandler<T>;
        onPasteCapture?: ClipboardEventHandler<T>;

        // Composition Events
        onCompositionEnd?: CompositionEventHandler<T>;
        onCompositionEndCapture?: CompositionEventHandler<T>;
        onCompositionStart?: CompositionEventHandler<T>;
        onCompositionStartCapture?: CompositionEventHandler<T>;
        onCompositionUpdate?: CompositionEventHandler<T>;
        onCompositionUpdateCapture?: CompositionEventHandler<T>;

        // Focus Events
        onFocus?: FocusEventHandler<T>;
        onFocusCapture?: FocusEventHandler<T>;
        onBlur?: FocusEventHandler<T>;
        onBlurCapture?: FocusEventHandler<T>;

        // Form Events
        onChange?: FormEventHandler<T>;
        onChangeCapture?: FormEventHandler<T>;
        onBeforeInput?: FormEventHandler<T>;
        onBeforeInputCapture?: FormEventHandler<T>;
        onInput?: FormEventHandler<T>;
        onInputCapture?: FormEventHandler<T>;
        onReset?: FormEventHandler<T>;
        onResetCapture?: FormEventHandler<T>;
        onSubmit?: FormEventHandler<T>;
        onSubmitCapture?: FormEventHandler<T>;
        onInvalid?: FormEventHandler<T>;
        onInvalidCapture?: FormEventHandler<T>;

        // Image Events
        onLoad?: ReactEventHandler<T>;
        onLoadCapture?: ReactEventHandler<T>;
        onError?: ReactEventHandler<T>; // also a Media Event
        onErrorCapture?: ReactEventHandler<T>; // also a Media Event

        // Keyboard Events
        onKeyDown?: KeyboardEventHandler<T>;
        onKeyDownCapture?: KeyboardEventHandler<T>;
        onKeyPress?: KeyboardEventHandler<T>;
        onKeyPressCapture?: KeyboardEventHandler<T>;
        onKeyUp?: KeyboardEventHandler<T>;
        onKeyUpCapture?: KeyboardEventHandler<T>;

        // Media Events
        onAbort?: ReactEventHandler<T>;
        onAbortCapture?: ReactEventHandler<T>;
        onCanPlay?: ReactEventHandler<T>;
        onCanPlayCapture?: ReactEventHandler<T>;
        onCanPlayThrough?: ReactEventHandler<T>;
        onCanPlayThroughCapture?: ReactEventHandler<T>;
        onDurationChange?: ReactEventHandler<T>;
        onDurationChangeCapture?: ReactEventHandler<T>;
        onEmptied?: ReactEventHandler<T>;
        onEmptiedCapture?: ReactEventHandler<T>;
        onEncrypted?: ReactEventHandler<T>;
        onEncryptedCapture?: ReactEventHandler<T>;
        onEnded?: ReactEventHandler<T>;
        onEndedCapture?: ReactEventHandler<T>;
        onLoadedData?: ReactEventHandler<T>;
        onLoadedDataCapture?: ReactEventHandler<T>;
        onLoadedMetadata?: ReactEventHandler<T>;
        onLoadedMetadataCapture?: ReactEventHandler<T>;
        onLoadStart?: ReactEventHandler<T>;
        onLoadStartCapture?: ReactEventHandler<T>;
        onPause?: ReactEventHandler<T>;
        onPauseCapture?: ReactEventHandler<T>;
        onPlay?: ReactEventHandler<T>;
        onPlayCapture?: ReactEventHandler<T>;
        onPlaying?: ReactEventHandler<T>;
        onPlayingCapture?: ReactEventHandler<T>;
        onProgress?: ReactEventHandler<T>;
        onProgressCapture?: ReactEventHandler<T>;
        onRateChange?: ReactEventHandler<T>;
        onRateChangeCapture?: ReactEventHandler<T>;
        onSeeked?: ReactEventHandler<T>;
        onSeekedCapture?: ReactEventHandler<T>;
        onSeeking?: ReactEventHandler<T>;
        onSeekingCapture?: ReactEventHandler<T>;
        onStalled?: ReactEventHandler<T>;
        onStalledCapture?: ReactEventHandler<T>;
        onSuspend?: ReactEventHandler<T>;
        onSuspendCapture?: ReactEventHandler<T>;
        onTimeUpdate?: ReactEventHandler<T>;
        onTimeUpdateCapture?: ReactEventHandler<T>;
        onVolumeChange?: ReactEventHandler<T>;
        onVolumeChangeCapture?: ReactEventHandler<T>;
        onWaiting?: ReactEventHandler<T>;
        onWaitingCapture?: ReactEventHandler<T>;

        // MouseEvents
        onAuxClick?: MouseEventHandler<T>;
        onAuxClickCapture?: MouseEventHandler<T>;
        onClick?: MouseEventHandler<T>;
        onClickCapture?: MouseEventHandler<T>;
        onContextMenu?: MouseEventHandler<T>;
        onContextMenuCapture?: MouseEventHandler<T>;
        onDoubleClick?: MouseEventHandler<T>;
        onDoubleClickCapture?: MouseEventHandler<T>;
        onDrag?: DragEventHandler<T>;
        onDragCapture?: DragEventHandler<T>;
        onDragEnd?: DragEventHandler<T>;
        onDragEndCapture?: DragEventHandler<T>;
        onDragEnter?: DragEventHandler<T>;
        onDragEnterCapture?: DragEventHandler<T>;
        onDragExit?: DragEventHandler<T>;
        onDragExitCapture?: DragEventHandler<T>;
        onDragLeave?: DragEventHandler<T>;
        onDragLeaveCapture?: DragEventHandler<T>;
        onDragOver?: DragEventHandler<T>;
        onDragOverCapture?: DragEventHandler<T>;
        onDragStart?: DragEventHandler<T>;
        onDragStartCapture?: DragEventHandler<T>;
        onDrop?: DragEventHandler<T>;
        onDropCapture?: DragEventHandler<T>;
        onMouseDown?: MouseEventHandler<T>;
        onMouseDownCapture?: MouseEventHandler<T>;
        onMouseEnter?: MouseEventHandler<T>;
        onMouseLeave?: MouseEventHandler<T>;
        onMouseMove?: MouseEventHandler<T>;
        onMouseMoveCapture?: MouseEventHandler<T>;
        onMouseOut?: MouseEventHandler<T>;
        onMouseOutCapture?: MouseEventHandler<T>;
        onMouseOver?: MouseEventHandler<T>;
        onMouseOverCapture?: MouseEventHandler<T>;
        onMouseUp?: MouseEventHandler<T>;
        onMouseUpCapture?: MouseEventHandler<T>;

        // Selection Events
        onSelect?: ReactEventHandler<T>;
        onSelectCapture?: ReactEventHandler<T>;

        // Touch Events
        onTouchCancel?: TouchEventHandler<T>;
        onTouchCancelCapture?: TouchEventHandler<T>;
        onTouchEnd?: TouchEventHandler<T>;
        onTouchEndCapture?: TouchEventHandler<T>;
        onTouchMove?: TouchEventHandler<T>;
        onTouchMoveCapture?: TouchEventHandler<T>;
        onTouchStart?: TouchEventHandler<T>;
        onTouchStartCapture?: TouchEventHandler<T>;

        // Pointer Events
        onPointerDown?: PointerEventHandler<T>;
        onPointerDownCapture?: PointerEventHandler<T>;
        onPointerMove?: PointerEventHandler<T>;
        onPointerMoveCapture?: PointerEventHandler<T>;
        onPointerUp?: PointerEventHandler<T>;
        onPointerUpCapture?: PointerEventHandler<T>;
        onPointerCancel?: PointerEventHandler<T>;
        onPointerCancelCapture?: PointerEventHandler<T>;
        onPointerEnter?: PointerEventHandler<T>;
        onPointerEnterCapture?: PointerEventHandler<T>;
        onPointerLeave?: PointerEventHandler<T>;
        onPointerLeaveCapture?: PointerEventHandler<T>;
        onPointerOver?: PointerEventHandler<T>;
        onPointerOverCapture?: PointerEventHandler<T>;
        onPointerOut?: PointerEventHandler<T>;
        onPointerOutCapture?: PointerEventHandler<T>;
        onGotPointerCapture?: PointerEventHandler<T>;
        onGotPointerCaptureCapture?: PointerEventHandler<T>;
        onLostPointerCapture?: PointerEventHandler<T>;
        onLostPointerCaptureCapture?: PointerEventHandler<T>;

        // UI Events
        onScroll?: UIEventHandler<T>;
        onScrollCapture?: UIEventHandler<T>;

        // Wheel Events
        onWheel?: WheelEventHandler<T>;
        onWheelCapture?: WheelEventHandler<T>;

        // Animation Events
        onAnimationStart?: AnimationEventHandler<T>;
        onAnimationStartCapture?: AnimationEventHandler<T>;
        onAnimationEnd?: AnimationEventHandler<T>;
        onAnimationEndCapture?: AnimationEventHandler<T>;
        onAnimationIteration?: AnimationEventHandler<T>;
        onAnimationIterationCapture?: AnimationEventHandler<T>;

        // Transition Events
        onTransitionEnd?: TransitionEventHandler<T>;
        onTransitionEndCapture?: TransitionEventHandler<T>;
    }


    interface RefObject<T> {
        readonly current: T | null;
    }
    // TODO: change any to unknown when moving to TS v3
    interface BaseSyntheticEvent<E = object, C = any, T = any> {
        nativeEvent: E;
        currentTarget: C;
        target: T;
        bubbles: boolean;
        cancelable: boolean;
        defaultPrevented: boolean;
        eventPhase: number;
        isTrusted: boolean;
        preventDefault(): void;
        isDefaultPrevented(): boolean;
        stopPropagation(): void;
        isPropagationStopped(): boolean;
        persist(): void;
        timeStamp: number;
        type: string;
    }


interface SyntheticEvent<T = Element, E = Event> extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}

interface ClipboardEvent<T = Element> extends SyntheticEvent<T, NativeClipboardEvent> {
    clipboardData: DataTransfer;
}

interface CompositionEvent<T = Element> extends SyntheticEvent<T, NativeCompositionEvent> {
    data: string;
}

interface DragEvent<T = Element> extends MouseEvent<T, NativeDragEvent> {
    dataTransfer: DataTransfer;
}

interface PointerEvent<T = Element> extends MouseEvent<T, NativePointerEvent> {
    pointerId: number;
    pressure: number;
    tangentialPressure: number;
    tiltX: number;
    tiltY: number;
    twist: number;
    width: number;
    height: number;
    pointerType: 'mouse' | 'pen' | 'touch';
    isPrimary: boolean;
}

interface FocusEvent<T = Element> extends SyntheticEvent<T, NativeFocusEvent> {
    relatedTarget: EventTarget | null;
    target: EventTarget & T;
}

interface FormEvent<T = Element> extends SyntheticEvent<T> {
}

interface InvalidEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
}

interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
}

interface KeyboardEvent<T = Element> extends SyntheticEvent<T, NativeKeyboardEvent> {
    altKey: boolean;
    /** @deprecated */
    charCode: number;
    ctrlKey: boolean;
    code: string;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
    /**
     * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible values
     */
    key: string;
    /** @deprecated */
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
    /** @deprecated */
    which: number;
}

interface MouseEvent<T = Element, E = NativeMouseEvent> extends UIEvent<T, E> {
    altKey: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
    metaKey: boolean;
    movementX: number;
    movementY: number;
    pageX: number;
    pageY: number;
    relatedTarget: EventTarget | null;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
}

interface TouchEvent<T = Element> extends UIEvent<T, NativeTouchEvent> {
    altKey: boolean;
    changedTouches: TouchList;
    ctrlKey: boolean;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
    metaKey: boolean;
    shiftKey: boolean;
    targetTouches: TouchList;
    touches: TouchList;
}

interface UIEvent<T = Element, E = NativeUIEvent> extends SyntheticEvent<T, E> {
    detail: number;
    view: AbstractView;
}

interface WheelEvent<T = Element> extends MouseEvent<T, NativeWheelEvent> {
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
}

interface AnimationEvent<T = Element> extends SyntheticEvent<T, NativeAnimationEvent> {
    animationName: string;
    elapsedTime: number;
    pseudoElement: string;
}

interface TransitionEvent<T = Element> extends SyntheticEvent<T, NativeTransitionEvent> {
    elapsedTime: number;
    propertyName: string;
    pseudoElement: string;
}


type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"];

type ReactEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;

type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>;
type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
type MouseEventHandler<T = Element> = EventHandler<Event.MouseEvent<T>>;
type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;
}


import type Controller from './Controller';
import type Recognizer from './recognizers/Recognizer';
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type AtLeastOneOf<T, U = {
    [K in keyof T]: Pick<T, K>;
}> = Partial<T> & U[keyof U];
export declare type Vector2 = [number, number];
export declare type Fn = any;
declare type DomTarget = EventTarget | Event.RefObject<EventTarget>;
export interface GenericOptions {
    domTarget?: DomTarget;
    window?: EventTarget;
    eventOptions?: {
        capture?: boolean;
        passive?: boolean;
    };
    enabled?: boolean;
    transform?: (v: Vector2) => Vector2;
}
export interface GestureOptions<T extends StateKey> {
    enabled?: boolean;
    initial?: Vector2 | ((state: State[T]) => Vector2);
    threshold?: number | Vector2;
    triggerAllEvents?: boolean;
    rubberband?: boolean | number | Vector2;
    transform?: (v: Vector2) => Vector2;
}
export declare type Bounds = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
};
export declare type CoordinatesConfig<T extends CoordinatesKey> = GestureOptions<T> & {
    axis?: 'x' | 'y';
    lockDirection?: boolean;
    bounds?: Bounds | ((state: State[T]) => Bounds);
};
export declare type DistanceAngleBounds = {
    min?: number;
    max?: number;
};
export declare type DistanceAngleConfig<T extends DistanceAngleKey> = GestureOptions<T> & {
    distanceBounds?: DistanceAngleBounds | ((state: State[T]) => DistanceAngleBounds);
    angleBounds?: DistanceAngleBounds | ((state: State[T]) => DistanceAngleBounds);
};
export declare type DragConfig = CoordinatesConfig<'drag'> & {
    filterTaps?: boolean;
    useTouch?: boolean;
    swipeVelocity?: number | Vector2;
    swipeDistance?: number | Vector2;
    swipeDuration?: number;
    experimental_preventWindowScrollY?: boolean;
    delay?: boolean | number;
};
export declare type UseDragConfig = GenericOptions & DragConfig;
export declare type UsePinchConfig = GenericOptions & DistanceAngleConfig<'pinch'>;
export declare type UseWheelConfig = GenericOptions & CoordinatesConfig<'wheel'>;
export declare type UseScrollConfig = GenericOptions & CoordinatesConfig<'scroll'>;
export declare type UseMoveConfig = GenericOptions & CoordinatesConfig<'move'>;
export declare type UseHoverConfig = GenericOptions;
export declare type UseGestureConfig = GenericOptions & {
    drag?: DragConfig;
    wheel?: CoordinatesConfig<'wheel'>;
    scroll?: CoordinatesConfig<'scroll'>;
    move?: CoordinatesConfig<'move'>;
    pinch?: DistanceAngleConfig<'pinch'>;
    hover?: {
        enabled?: boolean;
    };
};
export interface InternalGenericOptions {
    domTarget?: DomTarget;
    eventOptions: {
        capture?: boolean;
        passive?: boolean;
    };
    window?: EventTarget;
    enabled: boolean;
    transform?: (v: Vector2) => Vector2;
}
export interface InternalGestureOptions<T extends StateKey> {
    enabled: boolean;
    initial: Vector2 | ((state: State[T]) => Vector2);
    threshold: Vector2;
    triggerAllEvents: boolean;
    rubberband: Vector2;
    bounds: [Vector2, Vector2] | ((state: State[T]) => [Vector2, Vector2]);
    transform?: (v: Vector2) => Vector2;
}
export interface InternalCoordinatesOptions<T extends CoordinatesKey> extends InternalGestureOptions<T> {
    axis?: 'x' | 'y';
    lockDirection: boolean;
}
export interface InternalDistanceAngleOptions<T extends DistanceAngleKey> extends InternalGestureOptions<T> {
}
export interface InternalDragOptions extends InternalCoordinatesOptions<'drag'> {
    filterTaps: boolean;
    useTouch: boolean;
    experimental_preventWindowScrollY: boolean;
    swipeVelocity: Vector2;
    swipeDistance: Vector2;
    swipeDuration: number;
    delay: number;
}
export declare type InternalConfig = InternalGenericOptions & {
    drag?: InternalDragOptions;
    wheel?: InternalCoordinatesOptions<'wheel'>;
    scroll?: InternalCoordinatesOptions<'scroll'>;
    move?: InternalCoordinatesOptions<'move'>;
    pinch?: InternalDistanceAngleOptions<'pinch'>;
    hover?: {
        enabled: boolean;
        transform?: (v: Vector2) => Vector2;
    };
};
export declare type WebKitGestureEvent = PointerEvent & {
    scale: number;
    rotation: number;
};
export declare type DomEvents = TouchEvent | PointerEvent | WheelEvent | UIEvent | WebKitGestureEvent | Event.TouchEvent | Event.PointerEvent | Event.WheelEvent | Event.UIEvent;
export interface ReactEventHandlers {
    onMouseDown?: Event.MouseEventHandler;
    onMouseDownCapture?: Event.MouseEventHandler;
    onMouseEnter?: Event.MouseEventHandler;
    onMouseLeave?: Event.MouseEventHandler;
    onMouseMove?: Event.MouseEventHandler;
    onMouseMoveCapture?: Event.MouseEventHandler;
    onMouseOut?: Event.MouseEventHandler;
    onMouseOutCapture?: Event.MouseEventHandler;
    onMouseOver?: Event.MouseEventHandler;
    onMouseOverCapture?: Event.MouseEventHandler;
    onMouseUp?: Event.MouseEventHandler;
    onMouseUpCapture?: Event.MouseEventHandler;
    onTouchCancel?: Event.TouchEventHandler;
    onTouchCancelCapture?: Event.TouchEventHandler;
    onTouchEnd?: Event.TouchEventHandler;
    onTouchEndCapture?: Event.TouchEventHandler;
    onTouchMove?: Event.TouchEventHandler;
    onTouchMoveCapture?: Event.TouchEventHandler;
    onTouchStart?: Event.TouchEventHandler;
    onTouchStartCapture?: Event.TouchEventHandler;
    onPointerDown?: Event.PointerEventHandler;
    onPointerDownCapture?: Event.PointerEventHandler;
    onPointerMove?: Event.PointerEventHandler;
    onPointerMoveCapture?: Event.PointerEventHandler;
    onPointerUp?: Event.PointerEventHandler;
    onPointerUpCapture?: Event.PointerEventHandler;
    onPointerCancel?: Event.PointerEventHandler;
    onPointerCancelCapture?: Event.PointerEventHandler;
    onPointerEnter?: Event.PointerEventHandler;
    onPointerEnterCapture?: Event.PointerEventHandler;
    onPointerLeave?: Event.PointerEventHandler;
    onPointerLeaveCapture?: Event.PointerEventHandler;
    onPointerOver?: Event.PointerEventHandler;
    onPointerOverCapture?: Event.PointerEventHandler;
    onPointerOut?: Event.PointerEventHandler;
    onPointerOutCapture?: Event.PointerEventHandler;
    onGotPointerCapture?: Event.PointerEventHandler;
    onGotPointerCaptureCapture?: Event.PointerEventHandler;
    onLostPointerCapture?: Event.PointerEventHandler;
    onLostPointerCaptureCapture?: Event.PointerEventHandler;
    onScroll?: Event.UIEventHandler;
    onScrollCapture?: Event.UIEventHandler;
    onWheel?: Event.WheelEventHandler;
    onWheelCapture?: Event.WheelEventHandler;
    onGestureStart?: Fn;
    onGestureChange?: Fn;
    onGestureEnd?: Fn;
    onClick?: Event.MouseEventHandler;
    onClickCapture?: Event.MouseEventHandler;
}
export declare type ReactEventHandlerKey = keyof ReactEventHandlers;
export declare type IngKey = 'hovering' | 'scrolling' | 'wheeling' | 'dragging' | 'moving' | 'pinching';
export declare type CoordinatesKey = 'drag' | 'wheel' | 'move' | 'scroll';
export declare type DistanceAngleKey = 'pinch';
export declare type GestureKey = CoordinatesKey | DistanceAngleKey | 'hover';
export declare type StateKey<T extends GestureKey = GestureKey> = T extends 'hover' ? 'move' : T;
export declare type SharedGestureState = {
    [ingKey in IngKey]: boolean;
} & {
    touches: number;
    down: boolean;
    buttons: number;
    shiftKey: boolean;
    altKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
    locked: boolean;
};
export declare type EventTypes = {
    drag: Event.PointerEvent | PointerEvent;
    wheel: Event.WheelEvent | WheelEvent;
    scroll: Event.UIEvent | UIEvent;
    move: Event.PointerEvent | PointerEvent;
    pinch: Event.TouchEvent | TouchEvent | Event.WheelEvent | WheelEvent | WebKitGestureEvent;
    hover: Event.PointerEvent | PointerEvent;
};
export interface CommonGestureState {
    _active: boolean;
    _blocked: boolean;
    _intentional: [false | number, false | number];
    _movement: Vector2;
    _initial: Vector2;
    _bounds: [Vector2, Vector2];
    _lastEventType?: string;
    _dragTarget?: EventTarget | (EventTarget & Element) | null;
    _dragPointerId?: number | null;
    _dragStarted: boolean;
    _dragPreventScroll: boolean;
    _dragIsTap: boolean;
    _dragDelayed: boolean;
    event?: Event.UIEvent | UIEvent;
    intentional: boolean;
    values: Vector2;
    velocities: Vector2;
    delta: Vector2;
    movement: Vector2;
    offset: Vector2;
    lastOffset: Vector2;
    initial: Vector2;
    previous: Vector2;
    direction: Vector2;
    first: boolean;
    last: boolean;
    active: boolean;
    startTime: number;
    timeStamp: number;
    elapsedTime: number;
    cancel(): void;
    canceled: boolean;
    memo?: any;
    args?: any;
}
export interface Coordinates {
    axis?: 'x' | 'y';
    xy: Vector2;
    velocity: number;
    vxvy: Vector2;
    distance: number;
}
export interface DragState {
    _pointerId?: number;
    tap: boolean;
    swipe: Vector2;
}
export interface PinchState {
    _pointerIds: [number, number];
}
export interface DistanceAngle {
    da: Vector2;
    vdva: Vector2;
    origin: Vector2;
    turns: number;
}
export declare type State = {
    shared: SharedGestureState;
    drag: CommonGestureState & Coordinates & DragState;
    wheel: CommonGestureState & Coordinates;
    scroll: CommonGestureState & Coordinates;
    move: CommonGestureState & Coordinates;
    pinch: CommonGestureState & DistanceAngle & PinchState;
};
export declare type GestureState<T extends StateKey> = State[T];
export declare type PartialGestureState<T extends StateKey> = Partial<GestureState<T>>;
export declare type FullGestureState<T extends StateKey> = SharedGestureState & State[T];
export declare type Handler<T extends GestureKey, K = EventTypes[T]> = (state: Omit<FullGestureState<StateKey<T>>, 'event'> & {
    event: K;
}) => any | void;
export declare type InternalHandlers = {
    [Key in GestureKey]?: Handler<Key, any>;
};
declare type ReactDomAttributes = Event.DOMAttributes<Element>;
declare type NativeHandlersKeys = keyof Omit<ReactDomAttributes, (keyof UserHandlers & keyof ReactDomAttributes) | 'children' | 'dangerouslySetInnerHTML'>;
export declare type AnyGestureEventTypes = Partial<{
    drag: any;
    wheel: any;
    scroll: any;
    move: any;
    pinch: any;
    hover: any;
} & {
    [key in NativeHandlersKeys]: any;
}>;
declare type check<T extends AnyGestureEventTypes, Key extends GestureKey> = undefined extends T[Key] ? EventTypes[Key] : T[Key];
export declare type UserHandlers<T extends AnyGestureEventTypes = EventTypes> = {
    onDrag: Handler<'drag', check<T, 'drag'>>;
    onDragStart: Handler<'drag', check<T, 'drag'>>;
    onDragEnd: Handler<'drag', check<T, 'drag'>>;
    onPinch: Handler<'pinch', check<T, 'pinch'>>;
    onPinchStart: Handler<'pinch', check<T, 'pinch'>>;
    onPinchEnd: Handler<'pinch', check<T, 'pinch'>>;
    onWheel: Handler<'wheel', check<T, 'wheel'>>;
    onWheelStart: Handler<'wheel', check<T, 'wheel'>>;
    onWheelEnd: Handler<'wheel', check<T, 'wheel'>>;
    onMove: Handler<'move', check<T, 'move'>>;
    onMoveStart: Handler<'move', check<T, 'move'>>;
    onMoveEnd: Handler<'move', check<T, 'move'>>;
    onScroll: Handler<'scroll', check<T, 'scroll'>>;
    onScrollStart: Handler<'scroll', check<T, 'scroll'>>;
    onScrollEnd: Handler<'scroll', check<T, 'scroll'>>;
    onHover: Handler<'hover', check<T, 'hover'>>;
};
export declare type RecognizerClass = {
    new (controller: Controller, args: any): Recognizer;
};
export declare type NativeHandlers<T extends AnyGestureEventTypes = {}> = {
    [key in NativeHandlersKeys]: (state: SharedGestureState & {
        event: undefined extends T[key] ? Event : T[key];
        args: any;
    }, ...args: any) => void;
};
export declare type Handlers<T extends AnyGestureEventTypes = EventTypes> = Partial<UserHandlers<T> & NativeHandlers<T>>;
export declare type HookReturnType<T extends {
    domTarget?: DomTarget;
}> = T['domTarget'] extends object ? void | undefined : ReactEventHandlers;
export {};
