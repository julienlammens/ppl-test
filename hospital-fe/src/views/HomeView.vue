<template>
  <div class="container">
    <h3>Let's drug our patients...</h3>

    <button class="btn btn-primary mt-5 mb-5" @click="createSimulation">
      Create new simulation
    </button>

    <p v-if="simulations.length" class="text-start">Last 10 simulations</p>
    <SimulationAccordion
      class="mb-1"
      v-for="(simulation, index) in simulations"
      :key="`simulation-${simulation.id}`"
      :ref="
        (el) => {
          simulationsRef[index] = el;
        }
      "
      :simulation="simulation"
    />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { Simulation } from "@/models/Simulation";
import SimulationAccordion from "@/components/SimulationAccordion.vue";

const { dispatch, getters } = useStore();

const simulations = computed<Simulation[]>(() => getters["getSimulations"]);

const simulationsRef = ref<InstanceType<typeof SimulationAccordion>[]>([]);

const createSimulation = () => {
  dispatch("createNewSimulation");
  closeLastSimulation();
};

const closeLastSimulation = () => {
  if (simulationsRef.value.length) {
    const lastSimulationRef = simulationsRef.value[0];
    lastSimulationRef.closeAccordion();
  }
};
</script>
