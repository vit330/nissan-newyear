<script>
  import './controls.scss'
  import { panel, view } from '@/js/stores/common'
  import { model, color, bg } from '@/js/stores/design'
  // import { currentUserBg } from '@/js/stores/userBg'
  import Models from '../Models/Models.svelte'
  import Colors from '../Colors/Colors.svelte'
  import Bgs from '../Bgs/Bgs.svelte'
  import { fade } from 'svelte/transition'
  import { onDestroy } from 'svelte'

  const controlMap = {
    models: Models,
    colors: Colors,
    bgs: Bgs
  }

  let currentControl = controlMap[$panel]
  const updateControl = () => currentControl = controlMap[$panel]

  panel.subscribe(() => {
    !currentControl && updateControl()
  })

  // $: bgTitle = $currentUserBg ? $currentUserBg.title : $bg.title

  onDestroy(() => panel.set(null))
</script>

<section class="controls">
  {#if $panel}
    <div class="controls__panel" transition:fade={{ duration: 100 }}>
      {#if currentControl === controlMap[$panel]}
        <div transition:fade={{ duration: 100 }} on:outroend={updateControl}>
          <svelte:component this={currentControl}></svelte:component>
        </div>
      {/if}

      <button class="controls__close-btn close-btn" type="button" on:click={() => panel.set(null)}>
        <svg width="20" height="20">
          <use xlink:href="/static/img/sprite.svg#close"></use>
        </svg>
      </button>
    </div>
  {/if}

  <div class="controls__common">
    <button class="controls__item" class:active={$panel === 'models'} type="button" on:click={() => panel.set('models')}>
      <svg width="48" height="48">
        <use xlink:href="/static/img/sprite.svg#car"></use>
      </svg>
      <span><b>Модель</b> {$model.title}</span>
    </button>

    <button class="controls__item" class:active={$panel === 'colors'} type="button" on:click={() => panel.set('colors')}>
      <svg width="48" height="48">
        <use xlink:href="/static/img/sprite.svg#color"></use>
      </svg>
      <span><b>Цвет</b> {$color.title}</span>
    </button>

    <button class="controls__item controls__item--bg" class:active={$panel === 'bgs'} type="button" on:click={() => panel.set('bgs')}>
      <svg width="48" height="48">
        <use xlink:href="/static/img/sprite.svg#bg"></use>
      </svg>
      <span><b>Фон</b> {$bg.title}</span>
    </button>

    <button class="controls__done-btn btn" type="button" on:click={() => {
      view.set('creator')
      panel.set(null)
      window.gtag('event', `model-${$model.title}`)
      window.gtag('event', `color-${$color.title}`)
      window.gtag('event', `background-${$bg.title}`)
    }}>
      <svg width="21" height="20">
        <use xlink:href="/static/img/sprite.svg#check"></use>
      </svg>
      <span>Готово</span>
    </button>
  </div>
</section>
