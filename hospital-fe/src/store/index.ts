import { ActionContext, createStore } from "vuex";
import { State } from "@/models/State";
import HospitalService from "@/services/HospitalService";
import { Simulation } from "@/models/Simulation";

const initalState: State = {
  simulations: [],
};

export const mutations = {
  updateSimulations: (state: State, simulations: Simulation[]) => {
    while (simulations.length > 10) {
      simulations.pop();
    }
    state.simulations = simulations;
  },
};

export const actions = {
  /**
   * Fetch patients and drugs to prepare a new simulation
   * @param commit
   * @param state
   */
  createNewSimulation: async ({
    commit,
    state,
  }: ActionContext<State, State>) => {
    const { patients, drugs } = await HospitalService.getPatientsAndDrugs();
    const id = state.simulations[0] ? state.simulations[0].id + 1 : 1;
    const newSimulation: Simulation = {
      initialPatients: patients,
      drugs,
      id,
    };
    commit("updateSimulations", [newSimulation, ...state.simulations]);
  },

  /**
   * Administer drugs to the newest simulation and fill in the final patients state
   * @param commit
   * @param state
   * @param id simulation id
   */
  administerDrugs: async (
    { commit, state }: ActionContext<State, State>,
    id: number
  ) => {
    const simulations = [...state.simulations];
    const simulationIndex = simulations.findIndex((s) => s.id === id);
    if (simulationIndex === -1) {
      return;
    }
    const { initialPatients, drugs } = simulations[simulationIndex];
    const finalPatients = HospitalService.administerDrugs(
      initialPatients,
      drugs
    );
    simulations[simulationIndex] = {
      ...simulations[simulationIndex],
      finalPatients,
    };
    commit("updateSimulations", simulations);
  },
};

export default createStore<State>({
  state: initalState,
  getters: {
    getSimulations: (state) => state.simulations,
  },
  mutations,
  actions,
});
