export let fetchJSON = (url: string) => fetch(url).then(r => r.json());
