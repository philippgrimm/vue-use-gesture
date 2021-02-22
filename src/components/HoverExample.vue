<template>
  <div class="relative w-32 h-32">
    <div class="absolute w-full h-full bg-gray-200 rounded-xl"></div>
    <div
      ref="hoverEl"
      v-bind="{ ...bind() }"
      class="absolute w-full h-full rounded-xl bg-gradient-to-br from-orange-200 to-fuchsia-600 cursor-grab touch-action-none"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useMotion } from "@vueuse/motion";
import { useHover } from "../use-gesture";

export default defineComponent({
  setup: () => {
    const hoverEl = ref<HTMLElement>();
    const motion = useMotion(hoverEl);

    onMounted(() => {});

    const bind = useHover(async ({ hovering }) => {
      if (!hovering) {
        motion.stopTransitions();
        motion.apply({
          y: 0,
          x: 0,
        });
        return;
      }
      await motion.apply({
        y: -25,
        x: 25,
        transition: {
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0,
        },
      });
    });

    return { bind, hoverEl };
  },
});
</script>