const localStorageGet = (key) => JSON.parse(window.localStorage.getItem(key));

const localStorageSet = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

const localStorageRemove = (key) => window.localStorage.removeItem(key);

const localStorageClear = () => window.localStorage.clear();