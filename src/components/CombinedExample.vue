<template>
  <div class="relative w-32 h-32" @mouseleave="onMouseLeave">
    <div class="absolute w-full h-full bg-gray-200 rounded-xl"></div>
    <div
      ref="el"
      v-bind="{ ...bind() }"
      class="absolute w-full h-full rounded-xl bg-gradient-to-br from-red-400 to-fuchsia-700 cursor-grab touch-action-none"
    ></div>
  </div>
  <div class="mt-64">{{ variant }}</div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMotion } from "@vueuse/motion";
import { useGesture } from "../use-gesture";

export default defineComponent({
  setup: () => {
    const el = ref<HTMLElement>();
    const { set, apply, variant, state, variants } = useMotion(el, {
      initial: {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
      },
    });

    const calcX = (y: number, ly: number) =>
      -(y - ly - window.innerHeight / 2) / 20;
    const calcY = (x: number, lx: number) =>
      (x - lx - window.innerWidth / 2) / 20;

    const drag = ref(false);

    const bind = useGesture(
      {
        onDragStart: () => (drag.value = true),
        onDrag: ({ offset: [x, y] }) => apply({ x, y, rotateX: 0, rotateY: 0 }),
        onDragEnd: () => (drag.value = false),
        onPinch: ({ offset: [d, a] }) =>
          apply({ scale: Math.max(1, d / 100), rotateZ: a }),
        onMove: ({ xy: [px, py], dragging }) => {
          if (dragging) {
            return;
          }
          console.log(variant.value, state.value, variants.value);
          //   set({
          //   state.value?..rotateX = calcX(py, y as number);
          //   state.rotateY = calcY(px, x as number);
          //   }),
        },
        onHover: ({ hovering }) =>
          !hovering && apply({ rotateX: 0, rotateY: 0 }),
        // onWheel: ({ offset: [, y] }) => setWheel({ wheelY: y }),
      },
      { domTarget: el.value, eventOptions: { passive: false } }
    );

    return { el, bind, variant };
  },
});
</script>