import { settings as settingsStore, type ISettings } from "../stores";
import { getContext, setContext } from "svelte";
import { get, writable, type Writable } from "svelte/store";

const bridgeCardWidthEm = 4.5;
const pokerCardWidthEm = 5;
const smallCardWidthEm = 3;

const cardHeightEm = 7;
const smallCardHeightEm = 5;

export type ICardSize = "bridge" | "poker" | "small";

export const getCardDimensionsEm = (size: ICardSize) => {
  switch (size) {
    case "bridge":
      return { height: cardHeightEm, width: bridgeCardWidthEm };
    case "poker":
      return { height: cardHeightEm, width: pokerCardWidthEm };
    case "small":
      return { height: smallCardHeightEm, width: smallCardWidthEm };
  }
};

const cardAppearanceKey = "card-appearance";

export interface ICardAppearance {
  size: ICardSize;
  fourColor: boolean;
}

const defaultCardAppearance: ICardAppearance = {
  size: "bridge",
  fourColor: false,
};

type IAppearanceFn = (settings: ISettings) => ICardAppearance;
export const defaultAppearanceFn: IAppearanceFn = ({ size, colors }) => ({
  size: size === "default" ? "poker" : size,
  fourColor: colors === "four-color",
});

export const createCardAppearance = (
  appearanceFn: IAppearanceFn,
): Writable<ICardAppearance> => {
  const appearance = writable<ICardAppearance>(defaultCardAppearance, (set) => {
    settingsStore.subscribe((settings) => set(appearanceFn(settings)));
    return () => undefined;
  });
  setContext<Writable<ICardAppearance>>(cardAppearanceKey, appearance);

  return appearance;
};

export const getCardAppearance = (): Writable<ICardAppearance> => {
  const appearance = getContext<Writable<ICardAppearance>>(cardAppearanceKey);
  return appearance;
};

export const setCardAppearance = (appearanceFn: IAppearanceFn): void => {
  const appearance = getContext<Writable<ICardAppearance>>(cardAppearanceKey);
  if (appearance) {
    const settings = get(settingsStore);
    appearance.set(appearanceFn(settings));
  }
};
