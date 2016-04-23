export class Member {
    private _state: State;
    constructor(public identifier: string) {
        this._state = State.Unhealthy;
    }

    onFailedPing() {
        switch (this._state) {
            case State.Healthy:
                this._state = State.Flagged;
                return;
            case State.Flagged:
            case State.Unhealthy:
                this._state = State.Unhealthy;
                return;
        }
    }

    onSuccessfulPing() {
        this._state = State.Healthy;
    }

    get state() {
        return this._state;
    }
}

export enum State {
    Healthy,
    Flagged,
    Unhealthy
}