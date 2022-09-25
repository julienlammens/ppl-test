import { RequestsService } from "@/services/RequestsService";
import { PatientsRegister, Quarantine } from "hospital-lib";
import { ApiResponse } from "@/models/ApiResponse";

class HospitalService extends RequestsService {
  /**
   * Fetch patients and drugs from server
   * Convert them to the right format
   * @return the initial patients state and drugs to be used
   */
  async getPatientsAndDrugs(): Promise<ApiResponse> {
    const patientsResponse = await this.ax.get("/patients");
    const drugsResponse = await this.ax.get("/drugs");

    // Transform string to patient object
    const initialPatients = {
      F: 0,
      H: 0,
      D: 0,
      T: 0,
      X: 0,
    };
    const patients = patientsResponse.data.split(",");
    for (const patient of patients) {
      const key = patient as keyof typeof initialPatients;
      if (initialPatients[key] !== undefined) {
        initialPatients[key] += 1;
      }
    }

    // Transform string to drug array
    const drugs = drugsResponse.data ? drugsResponse.data.split(",") : [];

    return { patients: initialPatients, drugs };
  }

  /**
   * Run the simulation to the patients, using drugs
   * @param patients initial patients state
   * @param drugs drugs to simulate
   * @return the final patients state
   */
  administerDrugs(
    patients: PatientsRegister,
    drugs: string[]
  ): PatientsRegister {
    const quarantine = new Quarantine(patients);
    quarantine.setDrugs(drugs);
    quarantine.wait40Days();
    return quarantine.report();
  }
}

export default new HospitalService(process.env.VUE_APP_API_HOSPITAL);
