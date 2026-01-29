enum State { Zero, One }

interface Value<T extends State = State> {
    purpose: string
    value: T
}

declare class Bin extends Array<Value> {
    getAllOfState<T extends State>(state: T): Value<T>[]
}

// test
const off = (new Bin()).getAllOfState(State.Zero)[0].value
    // should display '0' or 'State.Zero' on hover
off === 1;
    // should give 'unintentional comparison' linting error