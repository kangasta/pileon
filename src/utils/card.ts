import { settings as settingsStore, type ISettings } from "../stores";
import { getContext, setContext } from "svelte";
import { readable, type Readable } from "svelte/store";

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

const createReadableAppearance = (
  appearanceFn: IAppearanceFn
): Readable<ICardAppearance> =>
  readable<ICardAppearance>(defaultCardAppearance, (set) => {
    settingsStore.subscribe((settings) => set(appearanceFn(settings)));
    return () => undefined;
  });

export const setCardAppearance = (appearanceFn: IAppearanceFn): void => {
  const appearance = createReadableAppearance(appearanceFn);
  setContext<Readable<ICardAppearance>>(cardAppearanceKey, appearance);
};

export const getCardAppearance = (): Readable<ICardAppearance> => {
  const data = getContext<Readable<ICardAppearance>>(cardAppearanceKey);
  return data ?? createReadableAppearance(defaultAppearanceFn);
};
