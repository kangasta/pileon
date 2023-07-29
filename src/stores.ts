import { writable } from "svelte/store";

const settingsKey = "settings";

export interface ISettings {
  game: "deck" | "pileon";
  colors: "default" | "standard" | "four-color";
  size: "default" | "bridge" | "poker" | "small";
}

const defaultSettings: ISettings = {
  game: "pileon",
  colors: "default",
  size: "default",
};

const userSettings = JSON.parse(
  localStorage.getItem(settingsKey),
) as ISettings | null;

export const settings = writable(userSettings ?? defaultSettings);

settings.subscribe((value) =>
  localStorage.setItem(settingsKey, JSON.stringify(value)),
);

export interface IActions {
  shuffle?: (e: KeyboardEvent | MouseEvent) => void;
  undo?: (e: KeyboardEvent | MouseEvent) => void;
}

const defaultActions: IActions = {};

export const actions = writable(defaultActions);
