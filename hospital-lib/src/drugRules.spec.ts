import { Expect, Test, TestFixture } from 'alsatian';
import { applyAntibioticRule, applyAspirinRule, applyInsulinRule, applyParacetamolRule, killEveryone } from "./drugRules";

@TestFixture()
export class DrugRulesTest {

    @Test()
    public insulinRuleWithInsulin(): void {
        const drugs = ["I"];
        let newPatientsState = {
            F: 1, H: 2, D: 3, T: 1, X: 0
        }

        // diabetics stay diabetics with insulin
        applyInsulinRule(drugs, newPatientsState, newPatientsState)
        Expect(newPatientsState).toEqual({
            F: 1, H: 2, D: 3, T: 1, X: 0
        });
    }

    @Test()
    public insulinRuleWithoutInsulin(): void {
        let newPatientsState = {
            F: 1, H: 2, D: 3, T: 1, X: 0
        }
        applyInsulinRule([], newPatientsState, newPatientsState)
        // diabetics should die without insulin
        Expect(newPatientsState).toEqual({
            F: 1, H: 2, D: 0, T: 1, X: 3
        });
    }

    @Test()
    public insulinRuleWithInsulinAndAntibiotic(): void {
        const drugs = ["I", "An"];
        let newPatientsState = {
            F: 1, H: 2, D: 3, T: 1, X: 0
        }
        applyInsulinRule(drugs, newPatientsState, newPatientsState)
        // insulin + antibiotic = healthy people get fever
        Expect(newPatientsState).toEqual({
            F: 3, H: 0, D: 3, T: 1, X: 0
        });
    }

    @Test()
    public aspirinRuleWithoutParacetamol(): void {
        const drugs = ["As"];
        let newPatientsState = {
            F: 1, H: 2, D: 3, T: 1, X: 0
        }
        applyAspirinRule(drugs, newPatientsState, newPatientsState)
        // aspirin heals fever
        Expect(newPatientsState).toEqual({
            F: 0, H: 3, D: 3, T: 1, X: 0
        });
    }

    @Test()
    public aspirinRuleWithParacetamol(): void {
        const drugs = ["As", "P"];
        let newPatientsState = {
            F: 1, H: 2, D: 3, T: 1, X: 0
        }
        applyAspirinRule(drugs, newPatientsState, newPatientsState)
        // aspirin + paracetamol kill everyone
        Expect(newPatientsState).toEqual({
            F: 0, H: 0, D: 0, T: 0, X: 7
        });
    }

    @Test()
    public paracetamolRuleWithoutAspirin(): void {
        const drugs = ["P"];
        let newPatientsState = {
            F: 1, H: 2, D: 3, T: 1, X: 0
        }
        applyParacetamolRule(drugs, newPatientsState, newPatientsState)
        // aspirin heals fever
        Expect(newPatientsState).toEqual({
            F: 0, H: 3, D: 3, T: 1, X: 0
        });
    }

    @Test()
    public paracetamolRuleWithAspirin(): void {
        const drugs = ["P", "As"];
        let newPatientsState = {
            F: 1, H: 2, D: 3, T: 1, X: 0
        }
        applyParacetamolRule(drugs, newPatientsState, newPatientsState)
        // aspirin + paracetamol kill everyone
        Expect(newPatientsState).toEqual({
            F: 0, H: 0, D: 0, T: 0, X: 7
        });
    }

    @Test()
    public antibioticRule(): void {
        const drugs = ["An"];
        let newPatientsState = {
            F: 1, H: 2, D: 3, T: 1, X: 0
        }
        applyAntibioticRule(drugs, newPatientsState, newPatientsState)
        // antibiotic heals tuberculosis
        Expect(newPatientsState).toEqual({
            F: 1, H: 3, D: 3, T: 0, X: 0
        });
    }

    @Test()
    public killEveryone(): void {
        let newPatientsState = {
            F: 1, H: 2, D: 3, T: 1, X: 0
        }
        killEveryone(newPatientsState)
        // should kill every patien
        Expect(newPatientsState).toEqual({
            F: 0, H: 0, D: 0, T: 0, X: 7
        });
    }
}