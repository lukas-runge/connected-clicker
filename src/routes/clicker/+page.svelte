<script lang="ts">
  import { getVisitorStats, recordVisitorChange } from '../../visitor.remote';

  const stats = getVisitorStats();

  async function click(delta: 1 | -1) {
    await recordVisitorChange(delta).updates(stats);
  }
</script>

<svelte:head>
  <title>Clicker · Connected Clicker</title>
</svelte:head>

<main>
  <a class="back" href="/">← Home</a>

  <section class="clicker">
    <p class="eyebrow">Entrance / Exit clicker</p>
    <h1>Tap visitors in and out</h1>

    <svelte:boundary>
      {#snippet pending()}
        <div class="loading">Loading current visitor count…</div>
      {/snippet}

      <div class="display">
        <span class="label">On site now</span>
        <strong>{(await stats).totalVisitors}</strong>
      </div>

      <div class="buttons" aria-label="Visitor counter controls">
        <button
          class="minus"
          type="button"
          aria-label="Decrease visitor count"
          disabled={recordVisitorChange.pending > 0 || (stats.current?.totalVisitors ?? 0) === 0}
          onclick={() => click(-1)}
        >
          <span>−</span>
          <small>Exit</small>
        </button>

        <button
          class="plus"
          type="button"
          aria-label="Increase visitor count"
          disabled={recordVisitorChange.pending > 0}
          onclick={() => click(1)}
        >
          <span>+</span>
          <small>Entry</small>
        </button>
      </div>

      <p class="hint">
        {recordVisitorChange.pending > 0 ? 'Saving click…' : 'Each tap is saved as a visitor event.'}
      </p>
    </svelte:boundary>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background:
      radial-gradient(circle at 20% 15%, rgb(56 189 248 / 0.28), transparent 24rem),
      radial-gradient(circle at 85% 80%, rgb(244 63 94 / 0.24), transparent 26rem),
      linear-gradient(135deg, #020617 0%, #111827 100%);
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

  .clicker {
    backdrop-filter: blur(20px);
    background: rgb(15 23 42 / 0.72);
    border: 1px solid rgb(148 163 184 / 0.18);
    border-radius: 36px;
    box-shadow: 0 24px 80px rgb(0 0 0 / 0.4);
    display: grid;
    gap: 24px;
    padding: clamp(26px, 5vw, 52px);
    text-align: center;
    width: min(780px, calc(100vw - 48px));
  }

  .eyebrow {
    color: #38bdf8;
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.16em;
    margin: 0;
    text-transform: uppercase;
  }

  h1 {
    font-size: clamp(2rem, 6vw, 4.6rem);
    line-height: 1;
    margin: 0;
  }

  .display {
    align-items: center;
    border: 1px solid rgb(148 163 184 / 0.16);
    border-radius: 28px;
    display: grid;
    gap: 8px;
    justify-content: center;
    padding: 28px;
  }

  .label,
  .hint,
  .loading {
    color: #94a3b8;
    margin: 0;
  }

  .display strong {
    color: #f8fafc;
    font-size: clamp(4.5rem, 18vw, 10rem);
    letter-spacing: -0.08em;
    line-height: 0.9;
  }

  .buttons {
    display: grid;
    gap: 18px;
    grid-template-columns: 1fr 1fr;
  }

  button {
    border: 0;
    border-radius: 32px;
    box-shadow: inset 0 -10px 24px rgb(0 0 0 / 0.18), 0 20px 44px rgb(0 0 0 / 0.28);
    color: white;
    cursor: pointer;
    display: grid;
    gap: 4px;
    min-height: 190px;
    place-items: center;
    transition:
      transform 120ms ease,
      filter 120ms ease;
  }

  button:hover:not(:disabled) {
    filter: brightness(1.08);
    transform: translateY(-2px);
  }

  button:active:not(:disabled) {
    transform: translateY(2px) scale(0.99);
  }

  button:disabled {
    cursor: not-allowed;
    filter: grayscale(0.4);
    opacity: 0.55;
  }

  button span {
    font-size: clamp(5rem, 18vw, 9rem);
    font-weight: 950;
    line-height: 0.8;
  }

  button small {
    font-size: 1.1rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .minus {
    background: linear-gradient(135deg, #f43f5e, #be123c);
  }

  .plus {
    background: linear-gradient(135deg, #22c55e, #15803d);
  }

  @media (max-width: 640px) {
    .buttons {
      grid-template-columns: 1fr;
    }
  }
</style>
