<script>
  import './card.scss'
  import { view, zoom } from '@/js/stores/common'
  import { model, modelId, colorId, bgId } from '@/js/stores/design'
  import { fade, scale } from 'svelte/transition'
  import http from '@/js/http'
  import { navigate } from 'svelte-routing'

  let text = ''
  let sent = false

  const linkMap = {
    fb: 'https://www.facebook.com/sharer.php?u=',
    vk: 'https://vk.com/share.php?url=',
    ok: 'https://connect.ok.ru/offer?url='
  }

  const createShare = (soc) => {
    http.post('/createShare', {
      model_id: $model.id,
      text,
      background_params: JSON.stringify({ modelId: $modelId, colorId: $colorId, bgId: $bgId, zoom: $zoom })
    })
      .then(({ data }) => {
        if (data.error === 0) {
          window.open(`${linkMap[soc]}${encodeURIComponent(`${location.origin}/backend/site/myshare?id=${data.id}&soc=${soc}`)}`, '_blank')
        }
        console.log('createShare:', data)
      })
  }

  const [, path, id] = location.pathname.split('/')
  if (path === 'share') {
    http.get(`/getShare?id=${id}`)
      .then(({ data }) => {
        if (data.error === 0) {
          const params = JSON.parse(data.background_params)
          modelId.set(params.modelId)
          colorId.set(params.colorId)
          bgId.set(params.bgId)
          zoom.set(params.zoom)

          text = data.text
          sent = true
        }
        console.log('getPost:', data)
      })
  }
</script>

<section class="card">
  <div class="card__container" in:scale={{ start: 0.8, duration: 600 }}>
    <button class="card__logo" type="button" on:click={() => view.set('welcome')}>
      <svg width="96" height="96">
        <use xlink:href="/static/img/sprite.svg#logo"></use>
      </svg>
    </button>

    <h2 class="card__title">
      <span>С&nbsp;Новым Годом!</span>
    </h2>

    {#if !sent}
      <div class="card__textarea">
        <textarea placeholder="Напишите Ваше поздравление" bind:value={text}></textarea>
      </div>

      {#if text}
        <div class="card__sharing" transition:fade={{ duration: 100 }}>
          <h3 class="card__sharing-title">
            <span>Поделиться:</span>
          </h3>

          <div class="card__sharing-links">
            <button type="button" on:click={() => {
              createShare('fb')
              window.gtag('event', 'fb')
            }}>
              <svg width="25" height="25">
                <use xlink:href="/static/img/sprite.svg#fb"></use>
              </svg>
            </button>
            <button type="button" on:click={() => {
              createShare('vk')
              window.gtag('event', 'vk')
            }}>
              <svg width="25" height="25">
                <use xlink:href="/static/img/sprite.svg#vk"></use>
              </svg>
            </button>
            <button type="button" on:click={() => {
              createShare('ok')
              window.gtag('event', 'ok')
            }}>
              <svg width="25" height="25">
                <use xlink:href="/static/img/sprite.svg#ok"></use>
              </svg>
            </button>
          </div>
        </div>
      {/if}
    {:else}
      <div class="card__text">
        <pre>{text}</pre>
      </div>

      <button class="card__btn btn" type="button" on:click={() => {
        navigate('/')
        setTimeout(() => view.set('welcome'))
        window.gtag('event', 'mood')
      }}>
        <span>Создать настроение другу</span>
      </button>
    {/if}
  </div>

  <button class="change-btn" type="button" on:click={() => {
    navigate('/')
    setTimeout(() => view.set('creator'))
  }} out:fade={{ duration: 100 }}>
    <svg width="9" height="16">
      <use xlink:href="/static/img/sprite.svg#arrow"></use>
    </svg>
    <span>изменить</span>
  </button>
</section>
