enum State { Zero, One }

interface Digit<T extends State = State> {
    purpose: string
    value: T
}

class Bin extends Array<Digit> {
    getAllOfState<T extends State>(state: T): Digit<T>[]
}

// test
const off = (bin as Bin).getAllOfState(State.Zero)[0].value