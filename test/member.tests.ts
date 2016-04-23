import { expect } from "chai";

import { Member, State } from "../src/member";

describe("member tests", () => {
    const IDENTIFIER = "http://10.0.0.1";
    it("should set identifier from constructor", () => {
        const member = new Member(IDENTIFIER);
        expect(member.identifier).to.equal(IDENTIFIER);
    });

    it("should set member state to unhealthy by default", () => {
        const member = new Member(IDENTIFIER);
        expect(member.state).to.equal(State.Unhealthy);
    });

    it("should set member status to healthy after successful ping", () => {
        const member = new Member(IDENTIFIER);
        member.onSuccessfulPing();
        expect(member.state).to.equal(State.Healthy);
    });

    it("should set member state to flagged on failed ping if previous state was healthy", () => {
        const member = new Member(IDENTIFIER);
        member.onSuccessfulPing();
        expect(member.state).to.equal(State.Healthy);
        member.onFailedPing();
        expect(member.state).to.equal(State.Flagged);
    });

    it("should set member state to unhealthy on failed ping if previous state was flagged", () => {
        const member = new Member(IDENTIFIER);
        member.onSuccessfulPing();
        expect(member.state).to.equal(State.Healthy);
        member.onFailedPing();
        expect(member.state).to.equal(State.Flagged);
        member.onFailedPing();
        expect(member.state).to.equal(State.Unhealthy);
    });

    it("should set member state to unhealthy on failed ping if previous state was unhealthy", () => {
        const member = new Member(IDENTIFIER);
        expect(member.state).to.equal(State.Unhealthy);
        member.onFailedPing();
        expect(member.state).to.equal(State.Unhealthy);
    });
});

