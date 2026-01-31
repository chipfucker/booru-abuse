const credentials: Credentials = {};

export function setCredentials(credentials: Credentials) {
    Object.entries(credentials).forEach(([key, value]) => credentials[key] = value);
}

export function getCredential(key: string) {
    return credentials[key];
}

type Credentials = Record<string, any>;
