import { PatientsRegister } from './patientsRegister';
import { rules } from "./drugRules";

export class Quarantine {
    private patients: PatientsRegister;
    private drugsToAdminister: string[] = [];

    constructor(patients: PatientsRegister) {
        this.patients = patients;
    }

    public setDrugs(drugs: string[]): void {
        this.drugsToAdminister = drugs;
    }

    public wait40Days(): void {
        const newPatientsState = {...this.patients};
        rules.AlwaysApply(this.drugsToAdminister, this.patients, newPatientsState);
        for (let drug of this.drugsToAdminister) {
            const rulesKey = drug as keyof typeof rules
            if (rules[rulesKey]){
                rules[rulesKey](this.drugsToAdminister, this.patients, newPatientsState)
            }
        }
        this.patients = newPatientsState;
    }

    public report(): PatientsRegister {
        return this.patients;
    }
}
