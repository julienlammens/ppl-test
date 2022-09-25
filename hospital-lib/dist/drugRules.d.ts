import { PatientsRegister } from "./patientsRegister";
/**
 * Define which rule(s) to apply for each drug
 */
export declare const rules: {
    AlwaysApply: (drugs: string[], oldPatientsState: PatientsRegister, newPatientsState: PatientsRegister) => void;
    As: typeof applyAspirinRule;
    An: typeof applyAntibioticRule;
    P: typeof applyParacetamolRule;
};
/**
 * When no insulin is given to diabetic patients, they should die
 * When insulin is mixed with antibiotic, healthy people catch Fever
 * @param drugs that will be administered
 * @param oldPatientsState initial patients state
 * @param newPatientsState new patients state
 */
export declare function applyInsulinRule(drugs: string[], oldPatientsState: PatientsRegister, newPatientsState: PatientsRegister): void;
/**
 * When giving aspiring WITHOUT paracetamol to patients having fever, they should get healthy
 * When giving aspiring WITH paracetamol, all patients should die
 * @param drugs that will be administered
 * @param oldPatientsState initial patients state
 * @param newPatientsState new patients state
 */
export declare function applyAspirinRule(drugs: string[], oldPatientsState: PatientsRegister, newPatientsState: PatientsRegister): void;
/**
 * When giving paracetamol WITHOUT aspirin to patients having fever, they should get healthy
 * When giving paracetamol WITH aspirin to patients having fever, they should die
 * @param drugs that will be administered
 * @param oldPatientsState initial patients state
 * @param newPatientsState new patients state
 */
export declare function applyParacetamolRule(drugs: string[], oldPatientsState: PatientsRegister, newPatientsState: PatientsRegister): void;
/**
 * When giving antibiotic to patients having tuberculosis, they should get healthy
 * @param drugs that will be administered
 * @param oldPatientsState initial patients state
 * @param newPatientsState new patients state
 */
export declare function applyAntibioticRule(drugs: string[], oldPatientsState: PatientsRegister, newPatientsState: PatientsRegister): void;
/**
 * Count the number of patients, and move them all to X (dead)
 * @param newPatientsState new patients state
 */
export declare function killEveryone(newPatientsState: PatientsRegister): void;
