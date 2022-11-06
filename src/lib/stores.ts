import { writable } from "svelte/store";

const settingsKey = "settings";

type IGame = "deck" | "pileon";
export interface ISettings {
  game: IGame;
  colors: "default" | "standard" | "four-color";
  size: "default" | "bridge" | "poker";
}

const defaultSettings: ISettings = {
  game: "deck",
  colors: "default",
  size: "default",
};

const userSettings = JSON.parse(
  localStorage.getItem(settingsKey) ?? "null"
) as ISettings | null;

export const settings = writable(userSettings ?? defaultSettings);

settings.subscribe((value) =>
  localStorage.setItem(settingsKey, JSON.stringify(value))
);

/** Returns function that sets latest game to given value. Helper to be used in `onMount()` call. */
export const setLatestGame = (game: IGame) => () => {
  settings.update((prev) => ({ ...prev, game }));
};
