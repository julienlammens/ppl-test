import HospitalService from "@/services/HospitalService";
import { ApiResponse } from "@/models/ApiResponse";
import { PatientsRegister, Quarantine } from "hospital-lib";

describe("getPatientsAndDrugs", () => {
  it("should return the patients and drugs in the right format", async () => {
    const expectedResponse: ApiResponse = {
      patients: {
        F: 2,
        H: 1,
        D: 0,
        T: 1,
        X: 0,
      },
      drugs: ["An", "As"],
    };

    jest
      .spyOn(HospitalService.ax, "get")
      .mockResolvedValueOnce({ data: "F,F,H,T,NotExisting" });

    jest
      .spyOn(HospitalService.ax, "get")
      .mockResolvedValueOnce({ data: "An,As" });

    const response = await HospitalService.getPatientsAndDrugs();
    expect(response).toStrictEqual(expectedResponse);
  });
});

describe("administerDrugs", () => {
  it("should return the quarantine report", async () => {
    const expectedResponse = {
      F: 2,
      H: 1,
      D: 0,
      T: 1,
      X: 0,
    };
    jest
      .spyOn(Quarantine.prototype, "report")
      .mockReturnValue(expectedResponse);

    const response = await HospitalService.administerDrugs({}, []);
    expect(response).toStrictEqual(expectedResponse);
  });
});
