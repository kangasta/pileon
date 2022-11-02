import { settings as settingsStore, type ISettings } from "../stores";
import { getContext, setContext } from "svelte";
import { readable, type Readable } from "svelte/store";

export const bridgeCardWidthEm = 4.5;
export const pokerCardWidthEm = 5;

const cardAppearanceKey = "card-appearance";

export interface ICardAppearance {
  bridge: boolean;
  fourColor: boolean;
}

const defaultCardAppearance: ICardAppearance = {
  bridge: false,
  fourColor: false,
};

type IAppearanceFn = (settings: ISettings) => ICardAppearance;
export const defaultAppearanceFn: IAppearanceFn = ({ size, colors }) => ({
  bridge: size === "bridge",
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
