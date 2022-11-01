import { writable } from "svelte/store";

const settingsKey = "settings";

interface ISettings {
  colors: "default" | "standard" | "four-color";
  size: "default" | "bridge" | "poker";
}

const defaultSettings: ISettings = {
  colors: "default",
  size: "default",
};

const userSettings = JSON.parse(
  localStorage.getItem(settingsKey)
) as ISettings | null;

export const settings = writable(userSettings ?? defaultSettings);

settings.subscribe((value) =>
  localStorage.setItem(settingsKey, JSON.stringify(value))
);
