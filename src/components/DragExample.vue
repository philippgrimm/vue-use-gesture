<template>
  <div class="relative w-32 h-32">
    <div class="absolute w-full h-full bg-gray-200 rounded-xl"></div>
    <div
      ref="draggable"
      v-bind="{ ...bind() }"
      class="absolute w-full h-full rounded-xl bg-gradient-to-br from-light-blue-400 to-indigo-500 cursor-grab touch-action-none"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMotion } from "@vueuse/motion";
import { useDrag } from "../use-gesture";

export default defineComponent({
  setup: () => {
    const draggable = ref<HTMLElement>();
    const draggableMotion = useMotion(draggable);

    const bind = useDrag(
      ({ down, movement: [mx, my] }) => {
        if (down) {
          draggable.value?.classList.add("cursor-grabbing");
          draggableMotion.set({
            x: mx,
            y: my,
          });
        } else {
          draggable.value?.classList.remove("cursor-grabbing");
          draggableMotion.apply({
            x: 0,
            y: 0,
          });
        }
      },
      {
        bounds: { top: -150, bottom: 150, left: -150, right: 150 },
        rubberband: true,
      }
    );

    return { bind, draggable };
  },
});
</script>