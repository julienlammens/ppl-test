import { Simulation } from "@/models/Simulation";
import { actions, mutations } from "@/store";
import { State } from "@/models/State";
import { ActionContext } from "vuex";
import HospitalService from "@/services/HospitalService";

describe("updateSimulations", () => {
  it("Should remove last simulation if more than 10 simulations", () => {
    const state = {
      simulations: [],
    };
    const simulation: Simulation = {
      initialPatients: {},
      finalPatients: undefined,
      drugs: [],
      id: 1,
    };
    const allSimulations = [];
    for (let i = 0; i < 13; i++) {
      allSimulations.push(simulation);
    }

    mutations.updateSimulations(state, allSimulations);

    expect(state.simulations.length).toEqual(10);
  });
});

describe("createNewSimulation", () => {
  it("should create a new simulation", async () => {
    const state = {
      simulations: [],
    };
    const commit = jest.fn();

    const expectedSimulation: Simulation = {
      id: 1,
      initialPatients: {},
      drugs: [],
    };

    jest
      .spyOn(HospitalService, "getPatientsAndDrugs")
      .mockResolvedValue({ patients: {}, drugs: [] });

    await actions.createNewSimulation({
      commit,
      state,
    } as never as ActionContext<State, State>);

    expect(commit).toHaveBeenCalledWith("updateSimulations", [
      expectedSimulation,
    ]);
  });

  it("should create a new simulation and add it first", async () => {
    const state = {
      simulations: [
        {
          id: 1,
          initialPatients: {},
          drugs: [],
        },
      ],
    };
    const commit = jest.fn();

    const expectedSimulation: Simulation = {
      id: 2,
      initialPatients: {},
      drugs: [],
    };

    jest
      .spyOn(HospitalService, "getPatientsAndDrugs")
      .mockResolvedValue({ patients: {}, drugs: [] });

    await actions.createNewSimulation({
      commit,
      state,
    } as never as ActionContext<State, State>);

    expect(commit).toHaveBeenCalledWith("updateSimulations", [
      expectedSimulation,
      ...state.simulations,
    ]);
  });
});

describe("administerDrugs", () => {
  it("should update one simulation with final patient state", async () => {
    const state = {
      simulations: [
        {
          id: 1,
          initialPatients: { D: 12, X: 0 },
          drugs: [],
        },
        {
          id: 2,
          initialPatients: { T: 3, X: 0 },
          drugs: [],
        },
      ],
    };
    const commit = jest.fn();

    const expectedSimulation: Simulation = {
      id: 1,
      initialPatients: { D: 12, X: 0 },
      finalPatients: { D: 0, X: 12 },
      drugs: [],
    };

    jest
      .spyOn(HospitalService, "administerDrugs")
      .mockReturnValue({ D: 0, X: 12 });

    await actions.administerDrugs(
      {
        commit,
        state,
      } as never as ActionContext<State, State>,
      1
    );

    expect(commit).toHaveBeenCalledWith("updateSimulations", [
      expectedSimulation,
      state.simulations[1],
    ]);
  });
});
