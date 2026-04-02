export const readJson = <T>(key: string, fallback: T): T => {
  if (typeof localStorage === 'undefined') {
    return fallback;
  }
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const writeJson = (key: string, value: unknown): void => {
  if (typeof localStorage === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
};
