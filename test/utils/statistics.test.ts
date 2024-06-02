import {
  newEvent,
  countEvents,
  countElapsed,
  type IEvent,
} from "../../src/utils/statistics";

it("counts event types", () => {
  const events = ["move", "move", "undo", "move", "move", "undo"].map((i) =>
    newEvent(i),
  );
  const stats = countEvents(events);

  expect(stats.move).toEqual(4);
  expect(stats.undo).toEqual(2);
});

it("counts elapsed time", async () => {
  const now = Date.now();
  const events: IEvent[] = [
    { type: "start", timestamp: now },
    { type: "stop", timestamp: now + 11 },
    { type: "start", timestamp: now + 40 },
    { type: "stop", timestamp: now + 62 },
    { type: "start", timestamp: now + 80 },
    { type: "stop", timestamp: now + 113 },
  ];

  const [paused, total] = countElapsed(events);
  expect(paused).toEqual(66);
  expect(total).toEqual(113);
});

it("counts elapsed time until now if no stop events", async () => {
  const events: IEvent[] = [{ type: "start", timestamp: Date.now() - 50 }];

  const [paused, total] = countElapsed(events);
  expect(paused).toBeNull();
  expect(total / 1000).toBeCloseTo(0.05);
});
