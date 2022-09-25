<template>
  <table class="table">
    <thead class="table-light">
      <tr>
        <th scope="col">State</th>
        <th scope="col">Initial Patients' number</th>
        <th scope="col">Final Patients' number</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="symptom in Object.keys(symptomToCode)" :key="symptom">
        <th>{{ symptom }}</th>
        <td>{{ simulation.initialPatients[symptomToCode[symptom]] }}</td>
        <td>
          {{
            simulation.finalPatients
              ? simulation.finalPatients[symptomToCode[symptom]]
              : "/"
          }}
        </td>
      </tr>
    </tbody>
  </table>
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

const symptomToCode = {
  Healthy: "H",
  Fever: "F",
  Diabetics: "D",
  Tuberculosis: "T",
  Dead: "X",
};
</script>

<style scoped></style>
