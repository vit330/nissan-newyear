<script>
  import { Router, Route } from 'svelte-routing'
  import Pattern from './Pattern/Pattern.svelte'
  import Welcome from './Welcome/Welcome.svelte'
  import Designer from './Designer/Designer.svelte'
  import Creator from './Creator/Creator.svelte'
  import Card from './Card/Card.svelte'
  // import Wallpaper from './Wallpaper/Wallpaper.svelte'
  import Screenshot from './Screenshot/Screenshot.svelte'
  import { view } from '@/js/stores/common'
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'

  const viewMap = {
    welcome: Welcome,
    designer: Designer,
    creator: Designer,
    card: Card
  }

  let currentView = viewMap[$view]
  const updateView = () => currentView = viewMap[$view]

  onMount(() => {
    let time = 0
    const interval = setInterval(() => {
      time += 1
      if (time === 15) {
        clearInterval(interval)
        window.gtag('event', 'qv_15')
      }
    }, 1000)
  })
</script>

<Pattern />

<Router>
  <Route path="/screenshot" component={Screenshot} />
  <Route path="/share/*" component={Card} />

  <Route>
    {#if currentView === viewMap[$view]}
      <div out:fade={{ duration: 200 }} on:outroend={updateView}>
        <svelte:component this={currentView}></svelte:component>
      </div>
    {/if}
  </Route>

  {#if $view === 'creator'}
    <Creator />
  {/if}
</Router>

<!-- {#if $wallpaper}
  <div transition:fade={{ duration: 100 }}>
    <Wallpaper />
  </div>
{/if} -->
