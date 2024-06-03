export interface IEvent {
  type: string;
  timestamp: number;
}

export const newEvent = (type: string): IEvent => ({
  type,
  timestamp: Date.now(),
});

export const countEvents = (events: IEvent[]): Record<string, number> => {
  const r = {};
  events.forEach(({ type }) => (r[type] = (r[type] ?? 0) + 1));
  return r;
};

const sum = (a: number[]): number => a.reduce((sum, i) => sum + i, 0);
export const countElapsed = (events: IEvent[]): [number, number] => {
  const starts = events
    .filter((i) => i.type === "start")
    .map((i) => i.timestamp);
  const stops = events.filter((i) => i.type === "stop").map((i) => i.timestamp);

  if (starts.length === 0) {
    return [null, null];
  }

  const total = (stops[stops.length - 1] ?? Date.now()) - starts[0];

  if (starts.length !== stops.length) {
    return [null, total];
  }

  return [sum(stops) - sum(starts), total];
};

const withUnit = (value: number, unit: string): string =>
  value > 0 ? `${value}\u202f${unit}` : "";

export const prettyElapsed = (ms: number): string => {
  if (ms < 1000) {
    return withUnit(ms, "ms");
  }
  const h = Math.floor(ms / 3600000);
  const min = Math.floor(ms / 60000 - h * 60);
  const s = Math.floor(ms / 1000 - min * 60 - h * 3600);

  return [withUnit(h, "h"), withUnit(min, "min"), withUnit(s, "s")]
    .join(" ")
    .trim();
};
