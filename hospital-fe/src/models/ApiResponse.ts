import { PatientsRegister } from "../../../hospital-lib";

export interface ApiResponse {
  patients: PatientsRegister;
  drugs: string[];
}
