import { PatientsRegister } from "./patientsRegister";

/**
 * Define which rule(s) to apply for each drug
 */
export const rules = {
    AlwaysApply: (drugs: string[], oldPatientsState: PatientsRegister, newPatientsState: PatientsRegister) => {
        applyInsulinRule(drugs, oldPatientsState, newPatientsState)
    },
    As: applyAspirinRule,
    An: applyAntibioticRule,
    P: applyParacetamolRule
}

/**
 * When no insulin is given to diabetic patients, they should die
 * When insulin is mixed with antibiotic, healthy people catch Fever
 * @param drugs that will be administered
 * @param oldPatientsState initial patients state
 * @param newPatientsState new patients state
 */
export function applyInsulinRule(drugs: string[], oldPatientsState: PatientsRegister, newPatientsState: PatientsRegister): void {
    if (oldPatientsState.D > 0 && !drugs.includes("I")){
        newPatientsState.X += oldPatientsState.D;
        newPatientsState.D -= oldPatientsState.D;
    }
    if (drugs.includes("I") && drugs.includes("An")) {
        newPatientsState.F += oldPatientsState.H
        newPatientsState.H -= oldPatientsState.H;
    }
}

/**
 * When giving aspiring WITHOUT paracetamol to patients having fever, they should get healthy
 * When giving aspiring WITH paracetamol, all patients should die
 * @param drugs that will be administered
 * @param oldPatientsState initial patients state
 * @param newPatientsState new patients state
 */
export function applyAspirinRule(drugs: string[], oldPatientsState: PatientsRegister, newPatientsState: PatientsRegister): void{
    if (!drugs.includes("P")) {
        newPatientsState.H += oldPatientsState.F;
        newPatientsState.F -= oldPatientsState.F;
    } else {
        killEveryone(newPatientsState);
    }
}

/**
 * When giving paracetamol WITHOUT aspirin to patients having fever, they should get healthy
 * When giving paracetamol WITH aspirin to patients having fever, they should die
 * @param drugs that will be administered
 * @param oldPatientsState initial patients state
 * @param newPatientsState new patients state
 */
export function applyParacetamolRule(drugs: string[], oldPatientsState: PatientsRegister, newPatientsState: PatientsRegister): void{
    if (!drugs.includes("As")) {
        newPatientsState.H += oldPatientsState.F;
        newPatientsState.F -= oldPatientsState.F;
    } else {
        killEveryone(newPatientsState)
    }
}

/**
 * When giving antibiotic to patients having tuberculosis, they should get healthy
 * @param drugs that will be administered
 * @param oldPatientsState initial patients state
 * @param newPatientsState new patients state
 */
export function applyAntibioticRule(drugs: string[], oldPatientsState: PatientsRegister, newPatientsState: PatientsRegister): void{
    newPatientsState.H += oldPatientsState.T;
    newPatientsState.T -= oldPatientsState.T;
}

/**
 * Count the number of patients, and move them all to X (dead)
 * @param newPatientsState new patients state
 */
export function killEveryone(newPatientsState: PatientsRegister): void {
    newPatientsState.X = Object.values(newPatientsState).reduce((a, b) => {
        return a + b;
    }, 0);
    Object.keys(newPatientsState).forEach((key: string) => {
        if (key !== "X") {
            newPatientsState[key] = 0
        }
    });
}