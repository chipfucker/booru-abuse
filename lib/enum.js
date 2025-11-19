class Enum extends Array {
    constructor(keys) {
        super();
        return this.setProperties(keys);
    }

    #prop = {};

    setProperties(keys) {
        for (const [index, key] of keys.entries()) {
            this[key] = index;
            this[index] = key;
            this.#prop[key] = index;
        }
        return this;
    }

    freeze() {
        delete this.setProperties;
        delete this.freeze;
        Object.freeze(this);

        return this;
    }

    entries() {
        return Object.entries(this.#prop);
    }
    keys() {
        return Object.keys(this.#prop);
    }
    values() {
        return Object.values(this.#prop);
    }
}

export default function (keys) {
    return new Enum(keys);
}