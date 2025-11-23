class Enum extends Array {
    constructor(keys) {
        super();
        for (const [index, key] of keys.entries()) {
            this[key] = index;
            this[index] = key;
            this.#prop[key] = index;
        }
        Object.freeze(this);
        return this;
    }

    #prop = {};

    entries () { return Object.entries ( this.#prop ); }
    keys    () { return Object.keys    ( this.#prop ); }
    values  () { return Object.values  ( this.#prop ); }
}

export default function (...keys) {
    return new Enum(keys);
}