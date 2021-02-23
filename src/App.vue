<template>
  <!-- <h2 class="mt-5 text-5xl font-semibold tracking-wide ml-60">Drag</h2> -->
  <div class="flex items-center justify-center py-24">
    <DragExample />
  </div>
  <!-- <h2 class="text-5xl font-semibold">Move</h2> -->
  <div class="flex items-center justify-center py-24">
    <!-- todo: fix scroll glitch -->
    <MoveExample />
  </div>
  <!-- <h2 class="text-5xl font-semibold">Hover</h2> -->
  <div class="flex items-center justify-center py-24">
    <HoverExample />
  </div>
  <!-- <h2 class="text-5xl font-semibold">Hover</h2> -->
  <div class="flex items-center justify-center py-24">
    <PinchExample />
  </div>

  <div class="flex items-center justify-center py-24">
    <CombinedExample />
  </div>
  <!-- scroll, swipe, -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CombinedExample from "./components/CombinedExample.vue";
import DragExample from "./components/DragExample.vue";
import HoverExample from "./components/HoverExample.vue";
import MoveExample from "./components/MoveExample.vue";
import PinchExample from "./components/PinchExample.vue";

export default defineComponent({
  name: "App",
  components: {
    DragExample,
    MoveExample,
    HoverExample,
    PinchExample,
    CombinedExample,
  },
});
</script>
