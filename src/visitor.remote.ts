import { command, query } from '$app/server';
import { connectDb, db } from '../prisma/db';
import { applyVisitorDelta, createVisitorStats } from '$lib/visitor-count';

async function getOrCreateDefaultDevice() {
  const existing = await db.orm.ClickerDevice.orderBy((device) => device.createdAt.asc()).first();

  if (existing) {
    return existing;
  }

  return db.orm.ClickerDevice.create({
    name: 'Main entrance',
    location: 'Default event'
  });
}

async function readVisitorStats() {
  await connectDb();

  const result = await db.orm.VisitorEvent.aggregate((event) => ({
    totalDelta: event.sum('count'),
    totalEvents: event.count()
  }));

  return createVisitorStats(result.totalDelta, result.totalEvents);
}

export const getVisitorStats = query(async () => {
  return readVisitorStats();
});

export const recordVisitorChange = command('unchecked', async (delta: number) => {
  if (delta !== 1 && delta !== -1) {
    throw new Error('Visitor change must be +1 or -1.');
  }

  const stats = await readVisitorStats();
  const nextTotal = applyVisitorDelta(stats.totalVisitors, delta);

  if (nextTotal === stats.totalVisitors) {
    return stats;
  }

  const device = await getOrCreateDefaultDevice();

  await db.orm.VisitorEvent.create({
    deviceId: device.id,
    direction: delta > 0 ? 'entry' : 'exit',
    count: delta
  });

  return readVisitorStats();
});
