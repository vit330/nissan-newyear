<script>
  import './designer.scss'
  import Controls from '../Controls/Controls.svelte'
  import { zoom, panel, view } from '@/js/stores/common'
  import { model, carImage } from '@/js/stores/design'
  import { scrollTo } from 'svelte-scrollto'
  import { fade, fly } from 'svelte/transition'

  let currentView = $view
  const updateView = () => currentView = $view
</script>

<section class="designer" in:fade={{ duration: 600 }}>
  <div class="designer__container">
    <button class="designer__logo" type="button" on:click={() => view.set('welcome')}>
      <svg width="96" height="96">
        <use xlink:href="/static/img/sprite.svg#logo"></use>
      </svg>
    </button>

    <figure class="designer__car" in:fly={{ y: -120, duration: 600, delay: 0 }}>
      <img src={$carImage} alt="">
    </figure>

    {#if currentView === $view}
      <div class="designer__bottom">
        {#if currentView === 'designer'}
          <div class="designer__creation" class:active={!$panel} in:fly={{ y: 100, duration: 600 }} out:fade={{ duration: 100 }} on:outroend={updateView}>
            <div class="designer__creation-range range">
              <input type="range" bind:value={$zoom}>
            </div>
            <h2 class="designer__creation-title">
              <span>Создай новогоднее настроение с&nbsp;Nissan</span>
            </h2>
          </div>
        {:else if currentView === 'creator'}
          <div class="designer__heading" in:fly={{ y: 150, duration: 600, delay: 0 }} out:fade={{ duration: 100 }} on:outroend={updateView}>
            <h2 class="designer__heading-title">
              <span>{@html $model.text[0]}</span>
              <span>{$model.text[1]}</span>
            </h2>
            <button class="designer__heading-btn btn" type="button" on:click={() => scrollTo({ element: '.creator' })}>
              <span>Новогодний набор</span>
            </button>
          </div>
        {/if}
      </div>
    {/if}
  </div>

  {#if $view === 'designer'}
    <div class="designer__controls" in:fly={{ y: 200, duration: 600, delay: 600 }} out:fade={{ duration: 100 }}>
      <Controls />
    </div>
  {/if}

  {#if $view === 'creator'}
    <button class="change-btn" type="button" on:click={() => view.set('designer')} transition:fade={{ duration: 100 }}>
      <svg width="9" height="16">
        <use xlink:href="/static/img/sprite.svg#arrow"></use>
      </svg>
      <span>изменить</span>
    </button>
  {/if}
</section>
