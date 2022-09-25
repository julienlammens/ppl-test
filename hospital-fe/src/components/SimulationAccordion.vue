<template>
  <div class="accordion">
    <div class="accordion-item">
      <h2 class="accordion-header" :id="`simulation-heading-${simulation.id}`">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#simulation-collapse-${simulation.id}`"
          :aria-controls="`simulation-collapse-${simulation.id}`"
        >
          Simulation #{{ simulation.id }}
          <span v-if="isDrugged" class="mx-5 text-success">✓ Done</span>
        </button>
      </h2>
      <div
        ref="accordionDom"
        :id="`simulation-collapse-${simulation.id}`"
        class="accordion-collapse collapse"
        :aria-labelledby="`simulation-heading-${simulation.id}`"
      >
        <div class="accordion-body">
          <DrugsList :simulation="simulation" />
          <PatientsTable :simulation="simulation" />
          <button
            v-if="!isDrugged"
            class="btn btn-warning"
            @click="drugPatients"
          >
            Drug them
          </button>
          <div v-else class="text-success">✓ Drugged!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineExpose, onMounted, PropType, ref } from "vue";
import { Simulation } from "@/models/Simulation";
import PatientsTable from "@/components/PatientsTable.vue";
import DrugsList from "@/components/DrugsList.vue";
import { useStore } from "vuex";
import { Collapse } from "bootstrap";

const props = defineProps({
  simulation: {
    type: Object as PropType<Simulation>,
    required: true,
  },
});

const { dispatch } = useStore();

const isDrugged = ref(false);

const accordionDom = ref();
const accordionObj = ref();
const closeAccordion = () => {
  accordionObj.value.hide();
};

const drugPatients = async () => {
  await dispatch("administerDrugs", props.simulation.id);
  isDrugged.value = true;
};

defineExpose({ closeAccordion });

onMounted(() => {
  accordionObj.value = new Collapse(accordionDom.value, { toggle: true });
  accordionObj.value.show();
});
</script>
