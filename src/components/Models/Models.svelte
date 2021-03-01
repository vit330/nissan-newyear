<script>
  import './models.scss'
  import { modelId } from '@/js/stores/design'
  import { Swiper, SwiperSlide } from 'swiper/swiper-svelte.esm'
  import SwiperCore, { Navigation } from 'swiper'
  import models from '@/js/stubs/common'

  SwiperCore.use([Navigation])

  const options = {
    slidesPerView: 'auto',
    navigation: {
      prevEl: '.controls__arrow--prev',
      nextEl: '.controls__arrow--next'
    },
    breakpoints: {
      1025: {
        allowTouchMove: false,
        navigation: false
      }
    }
  }
</script>

<div class="models">
  <Swiper {...options}>
    {#each Object.values(models) as { title, key, image }}
      <SwiperSlide>
        <button
          class="models__item"
          class:active={key === $modelId}
          type="button"
          on:click={() => modelId.set(key)}
        >
          <img src={image} alt={title}>
          <span>{title}</span>
        </button>
      </SwiperSlide>
    {/each}
  </Swiper>
  <button class="controls__arrow controls__arrow--prev" type="button">
    <svg width="9" height="16">
      <use xlink:href="/static/img/sprite.svg#arrow"></use>
    </svg>
  </button>
  <button class="controls__arrow controls__arrow--next" type="button">
    <svg width="9" height="16">
      <use xlink:href="/static/img/sprite.svg#arrow"></use>
    </svg>
  </button>
</div>
