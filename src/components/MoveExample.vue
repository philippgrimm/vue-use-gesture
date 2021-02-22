<template>
  <div class="relative w-32 h-32" @mouseleave="onMouseLeave">
    <div class="absolute w-full h-full bg-gray-200 rounded-xl"></div>
    <div
      ref="el"
      v-bind="{ ...bind() }"
      class="absolute w-full h-full rounded-xl bg-gradient-to-br from-yellow-200 to-green-400 cursor-grab touch-action-none"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMotion } from "@vueuse/motion";
import { useMove } from "../use-gesture";

export default defineComponent({
  setup: () => {
    const el = ref<HTMLElement>();
    const motion = useMotion(el);

    let elX: number;
    let elY: number;
    let elW: number;
    let elH: number;
    const bind = useMove(({ xy: [mx, my], first }) => {
      if (first) {
        elX = el.value?.getBoundingClientRect().x || 0;
        elY = el.value?.getBoundingClientRect().y || 0;
        elW = el.value?.getBoundingClientRect().width || 0;
        elH = el.value?.getBoundingClientRect().height || 0;
      }
      const dx = mx - elX - elW / 2;
      const dy = my - elY - elH / 2;

      motion.set({ translateX: -0.5 * dx, translateY: -0.5 * dy });
    });

    const onMouseLeave = () => {
      motion.apply({ translateX: 0, translateY: 0 });
    };

    return { bind, el, onMouseLeave };
  },
});
</script>