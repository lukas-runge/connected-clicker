<svelte:head>
  <title>Connected Clicker</title>
  <meta
    name="description"
    content="Connected Clicker: a connected visitor tracker for entrance and exit monitoring"
  />
</svelte:head>

<main>
  <section class="hero">
    <p class="eyebrow">Connected Clicker</p>
    <h1>Live visitor tracking for entrances and exits.</h1>
    <p>
      A small MVP for tracking how many visitors are currently on site. Use the clicker page
      at the entrance/exit and the organizer page to watch the live total.
    </p>
    <div class="actions">
      <a class="primary" href="/clicker">Open clicker</a>
      <a href="/organizer">Organizer overview</a>
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background:
      radial-gradient(circle at top left, rgb(56 189 248 / 0.22), transparent 32rem),
      linear-gradient(135deg, #020617 0%, #0f172a 50%, #111827 100%);
    color: #e2e8f0;
  }

  :global(a) {
    color: inherit;
  }

  main {
    display: grid;
    min-height: 100svh;
    place-items: center;
    width: min(1040px, calc(100vw - 48px));
    margin: 0 auto;
  }

  .hero {
    display: grid;
    gap: 24px;
  }

  .eyebrow {
    color: #38bdf8;
    font-size: 0.875rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    margin: 0;
    text-transform: uppercase;
  }

  h1 {
    font-size: clamp(3rem, 9vw, 6.5rem);
    line-height: 0.9;
    margin: 0;
    max-width: 10ch;
  }

  p {
    color: #94a3b8;
    font-size: clamp(1.05rem, 2vw, 1.35rem);
    line-height: 1.7;
    margin: 0;
    max-width: 62ch;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }

  .actions a {
    border: 1px solid rgb(148 163 184 / 0.25);
    border-radius: 999px;
    font-weight: 800;
    padding: 14px 20px;
    text-decoration: none;
  }

  .actions .primary {
    background: #38bdf8;
    border-color: #38bdf8;
    color: #020617;
  }
</style>
