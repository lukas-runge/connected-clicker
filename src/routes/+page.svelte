<script lang="ts">
  const stack = ['SvelteKit', 'Prisma Next', 'Postgres', 'Docker Compose', 'pnpm'];
</script>

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
    <h1>Connected visitor tracking for entrance and exit monitoring.</h1>
    <p>
      This project is initialized with the application stack for building a connected clicker system
      backed by a local Postgres development database.
    </p>
  </section>

  <section>
    <h2>Stack</h2>
    <ul>
      {#each stack as item}
        <li>{item}</li>
      {/each}
    </ul>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
  }

  main {
    width: min(960px, calc(100vw - 48px));
    margin: 0 auto;
    padding: 72px 0;
  }

  .hero {
    display: grid;
    gap: 16px;
    margin-bottom: 48px;
  }

  .eyebrow {
    color: #38bdf8;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    margin: 0;
    text-transform: uppercase;
  }

  h1 {
    font-size: clamp(2.5rem, 8vw, 5.5rem);
    line-height: 0.95;
    margin: 0;
    max-width: 11ch;
  }

  h2 {
    margin: 0 0 16px;
  }

  p {
    color: #94a3b8;
    font-size: 1.125rem;
    line-height: 1.7;
    margin: 0;
    max-width: 64ch;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    border: 1px solid rgb(148 163 184 / 0.25);
    border-radius: 999px;
    color: #cbd5e1;
    padding: 8px 14px;
  }
</style>
