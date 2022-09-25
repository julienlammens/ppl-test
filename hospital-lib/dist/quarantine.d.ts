import { PatientsRegister } from './patientsRegister';
export declare class Quarantine {
    private patients;
    private drugsToAdminister;
    constructor(patients: PatientsRegister);
    setDrugs(drugs: string[]): void;
    wait40Days(): void;
    report(): PatientsRegister;
}
