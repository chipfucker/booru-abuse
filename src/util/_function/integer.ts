export let parseInt = (int: string | number): ReturnType<typeof globalThis.parseInt> => globalThis.parseInt(int as string);
