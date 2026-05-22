<script lang="ts">
  import { onMount } from 'svelte';
  import type { VisitorStats } from '$lib/visitor-count';
  import { getVisitorStats } from '../../visitor.remote';

  const stats = getVisitorStats();
  const liveStatsQuery = stats as unknown as {
    connected: boolean;
    loading: boolean;
    reconnect: () => Promise<void>;
    run: () => AsyncGenerator<VisitorStats> | Promise<AsyncGenerator<VisitorStats>>;
  };
  let liveStats = $state<VisitorStats>();
  const displayedStats = $derived(liveStats ?? stats.current);

  onMount(() => {
    let iterator: AsyncGenerator<VisitorStats> | undefined;

    void (async () => {
      iterator = await liveStatsQuery.run();

      for await (const value of iterator) {
        liveStats = value;
      }
    })();

    return () => {
      void iterator?.return(undefined);
    };
  });
</script>

<svelte:head>
  <title>Organizer Overview · Connected Clicker</title>
</svelte:head>

<main>
  <a class="back" href="/">← Home</a>

  <section class="panel">
    <p class="eyebrow">Organizer overview</p>
    <h1>Visitors currently on site</h1>

    {#if displayedStats}
      <div class="count">{displayedStats.totalVisitors}</div>
      <p class="caption">
        Based on {displayedStats.totalEvents} clicker events · {liveStatsQuery.connected ? 'Live' : 'Reconnecting…'}
      </p>
    {:else}
      <div class="loading">Loading live count…</div>
    {/if}

    <button type="button" onclick={() => liveStatsQuery.reconnect()} disabled={liveStatsQuery.loading}>
      {liveStatsQuery.loading ? 'Reconnecting…' : 'Reconnect live count'}
    </button>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background:
      radial-gradient(circle at top right, rgb(34 197 94 / 0.24), transparent 28rem),
      linear-gradient(135deg, #020617 0%, #0f172a 100%);
    color: #e2e8f0;
  }

  main {
    display: grid;
    gap: 24px;
    min-height: 100svh;
    place-content: center;
    padding: 24px;
  }

  .back {
    color: #94a3b8;
    text-decoration: none;
  }

  .panel {
    background: rgb(15 23 42 / 0.78);
    border: 1px solid rgb(148 163 184 / 0.18);
    border-radius: 32px;
    box-shadow: 0 24px 80px rgb(0 0 0 / 0.35);
    display: grid;
    gap: 22px;
    min-width: min(680px, calc(100vw - 48px));
    padding: clamp(28px, 6vw, 56px);
    text-align: center;
  }

  .eyebrow {
    color: #4ade80;
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.16em;
    margin: 0;
    text-transform: uppercase;
  }

  h1 {
    font-size: clamp(2rem, 6vw, 4.4rem);
    line-height: 1;
    margin: 0;
  }

  .count {
    color: #f8fafc;
    font-size: clamp(6rem, 22vw, 13rem);
    font-weight: 950;
    letter-spacing: -0.08em;
    line-height: 0.88;
    text-shadow: 0 0 60px rgb(74 222 128 / 0.24);
  }

  .caption,
  .loading {
    color: #94a3b8;
    font-size: 1.1rem;
    margin: 0;
  }

  button {
    justify-self: center;
    background: rgb(15 23 42 / 0.9);
    border: 1px solid rgb(148 163 184 / 0.32);
    border-radius: 999px;
    color: #e2e8f0;
    cursor: pointer;
    font: inherit;
    font-weight: 800;
    padding: 14px 24px;
  }

  button:disabled {
    cursor: wait;
    opacity: 0.65;
  }
</style>
