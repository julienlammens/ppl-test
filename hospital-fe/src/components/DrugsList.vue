<template>
  <div class="drugs">
    Used drugs:
    <div class="drugs-list" v-if="simulation.drugs.length">
      <span
        class="badge text-bg-info m-1"
        v-for="drug in simulation.drugs"
        :key="drug"
        >{{ drugLetterToWord[drug] }}</span
      >
    </div>
    <div v-else class="fst-italic">None</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Simulation } from "@/models/Simulation";

defineProps({
  simulation: {
    type: Object as PropType<Simulation>,
    required: true,
  },
});

const drugLetterToWord = {
  As: "Aspirin",
  An: "Antibiotic",
  I: "Insulin",
  P: "Paracetamol",
};
</script>
<style scoped></style>
