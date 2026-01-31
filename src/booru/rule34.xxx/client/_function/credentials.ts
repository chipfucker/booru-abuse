var credentials: Credentials = {};

export function setCredentials(keys: Credentials) {
    Object.entries(keys).forEach(([key, value]) => credentials[key] = value);
}

export function getCredential(key: string) {
    return credentials[key];
}

type Credentials = Record<string, any>;
