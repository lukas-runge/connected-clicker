export type VisitorEventDelta = {
  count: number | null;
};

export type VisitorStats = {
  totalVisitors: number;
  totalEvents: number;
};

export function applyVisitorDelta(currentTotal: number, delta: number): number {
  return Math.max(0, currentTotal + delta);
}

export function calculateVisitorTotal(events: readonly VisitorEventDelta[]): number {
  const total = events.reduce((sum, event) => sum + (event.count ?? 0), 0);
  return Math.max(0, total);
}

export function createVisitorStats(totalDelta: number | null, totalEvents: number): VisitorStats {
  return {
    totalVisitors: Math.max(0, totalDelta ?? 0),
    totalEvents
  };
}
