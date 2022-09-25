import { PatientsRegister } from "../../../hospital-lib";

export interface Simulation {
  id: number;
  initialPatients: PatientsRegister;
  finalPatients?: PatientsRegister;
  drugs: string[];
}
