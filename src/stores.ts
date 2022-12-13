import { writable } from "svelte/store";

const settingsKey = "settings";

export interface ISettings {
  game: "deck" | "pileon";
  colors: "default" | "standard" | "four-color";
  size: "default" | "bridge" | "poker";
}

const defaultSettings: ISettings = {
  game: "deck",
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

export interface IActions {
  undo?: (e: MouseEvent) => void;
}

const defaultActions: IActions = {};

export const actions = writable(defaultActions);
