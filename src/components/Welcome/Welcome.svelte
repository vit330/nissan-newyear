<script>
  import './welcome.scss'
  import { onMount, onDestroy } from 'svelte'
  import { view } from '@/js/stores/common'
  import { bgId } from '@/js/stores/design'
  import bgStub from '@/js/stubs/bg'
  import { scale } from 'svelte/transition'

  let bgInterval

  onMount(() => {
    const bgKeys = Object.keys(bgStub)

    bgInterval = setInterval(() => {
      const currentBgIndex = bgKeys.indexOf($bgId)
      const nextBg = bgKeys[currentBgIndex + 1] || bgKeys[0]
      bgId.set(nextBg)
    }, 5000)
  })

  onDestroy(() => {
    clearInterval(bgInterval)
  })
</script>

<section class="welcome" in:scale={{ start: 0.8, duration: 600 }}>
  <div class="welcome__container">
    <div class="welcome__logo">
      <svg width="96" height="96">
        <use xlink:href="/static/img/sprite.svg#logo"></use>
      </svg>
    </div>

    <h1 class="welcome__title">Новый год<br>с&nbsp;твоим характером</h1>
    <p class="welcome__caption">Создай бесконечно красивый новогодний набор с&nbsp;Nissan!</p>

    <div class="welcome__items">
      <div class="welcome__item">
        <svg width="64" height="64">
          <use xlink:href="/static/img/sprite.svg#card"></use>
        </svg>
        <p>Виртуальная открытка</p>
      </div>

      <div class="welcome__item">
        <svg width="64" height="64">
          <use xlink:href="/static/img/sprite.svg#ball"></use>
        </svg>
        <p>Ёлочная игрушка</p>
      </div>

      <div class="welcome__item">
        <svg width="64" height="64">
          <use xlink:href="/static/img/sprite.svg#wallpaper"></use>
        </svg>
        <p>Заставка на&nbsp;экран</p>
      </div>
    </div>

    <button class="welcome__btn btn" type="button" on:click={() => {
      view.set('designer')
      window.gtag('event', 'create')
    }}>
      <span>Создать</span>
    </button>
  </div>
</section>
