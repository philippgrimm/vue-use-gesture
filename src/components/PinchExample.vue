<template>
  <div class="relative w-32 h-32" @mouseleave="onMouseLeave">
    <div class="absolute w-full h-full bg-gray-200 rounded-xl"></div>
    <div
      ref="el"
      v-bind="{ ...bind() }"
      class="absolute w-full h-full rounded-xl bg-gradient-to-br from-green-400 to-blue-700 cursor-grab touch-action-none"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMotion } from "@vueuse/motion";
import { addV, usePinch } from "../use-gesture";

export default defineComponent({
  setup: () => {
    const el = ref<HTMLElement>();
    const { set, apply } = useMotion(el);

    let resetTimer: number;
    let [fd, fa] = [0, 0];
    const bind = usePinch(({ movement, last }) => {
      const [d, a] = addV([fd, fa], movement);
      // todo: kleiner machen und Anfang (evt max scale + rubberband ?)
      set({ scale: Math.max(1, d / 100), rotateZ: a });

      if (last) {
        [fd, fa] = [d, a];
        resetTimer = setTimeout(() => {
          apply({ scale: 1, rotateZ: 0 });
          [fd, fa] = [0, 0];
        }, 1000);
        return;
      }
      clearTimeout(resetTimer);
    });

    return { el, bind };
  },
});
</script>