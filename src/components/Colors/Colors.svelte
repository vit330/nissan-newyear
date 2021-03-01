<script>
  import './colors.scss'
  import { model, colorId } from '@/js/stores/design'
  import { Swiper, SwiperSlide } from 'swiper/swiper-svelte.esm'
  import SwiperCore, { Navigation } from 'swiper'

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

<div class="colors">
  <Swiper {...options}>
    {#each Object.values($model.colors) as { title, key, image }}
      <SwiperSlide>
        <button
          class="colors__item"
          class:active={key === $colorId}
          type="button"
          on:click={() => colorId.set(key)}
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
