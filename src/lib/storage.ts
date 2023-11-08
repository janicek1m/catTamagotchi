let allItems = new Set<string>(); // for resetting only catTamagotchi local storage data

export const save = (name: string, value: number) => {
  localStorage.setItem(`catTamagotchi-${name}`, String(value));
  if (name === "darkmode") return; // don't reset darkmode setting
  allItems.add(`catTamagotchi-${name}`);
};

export const load = (name: string): number | undefined => {
  let data = localStorage.getItem(`catTamagotchi-${name}`);
  if (data !== null || undefined) return Number(data);
};

export const reset = () => {
  allItems.forEach((item) => {
    localStorage.removeItem(item);
  });
};
