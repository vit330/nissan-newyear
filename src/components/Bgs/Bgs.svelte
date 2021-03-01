<script>
  import './bgs.scss'
  import { bgId } from '@/js/stores/design'
  import { userBgs, userBgId } from '@/js/stores/userBg'
  import { Swiper, SwiperSlide } from 'swiper/swiper-svelte.esm'
  import SwiperCore, { Navigation } from 'swiper'
  import bgStub from '@/js/stubs/bg'

  SwiperCore.use([Navigation])

  let slider

  const options = {
    slidesPerView: 'auto',
    navigation: {
      prevEl: '.controls__arrow--prev',
      nextEl: '.controls__arrow--next'
    }
  }

  const setSlider = (e) => {
    const [swiper] = e.detail
    slider = swiper
  }

  // const upload = ({ target }) => {
  //   const file = target.files[0]
  //   const reader = new FileReader()
  //   reader.readAsDataURL(file)
  //   reader.onload = () => {
  //     userBgs.add(reader.result)
  //     target.value = ''

  //     setTimeout(() => {
  //       slider.updateSlides()
  //     })
  //   }
  // }
</script>

<div class="bgs">
  <Swiper {...options} on:swiper={setSlider}>
    {#each Object.values(bgStub) as { title, key, image }}
      <SwiperSlide>
        <button
          class="bgs__item"
          class:active={!$userBgId && key === $bgId}
          type="button"
          on:click={() => {
            bgId.set(key)
            // userBgId.set(null)
          }}
        >
          <img src={image} alt={title}>
          <span class="bgs__title">{title}</span>
        </button>
      </SwiperSlide>
    {/each}
    <!-- {#each Object.values($userBgs) as { title, key, image }}
      <SwiperSlide>
        <button
          class="bgs__item"
          class:active={key === $userBgId}
          type="button"
          on:click={() => userBgId.set(key)}
        >
          <img src={image} alt={title}>
          <span class="bgs__title">{title}</span>
        </button>
      </SwiperSlide>
    {/each} -->
    <!-- <SwiperSlide>
      <label class="bgs__item">
        <span class="bgs__upload">
          <svg width="64" height="64">
            <use xlink:href="/static/img/sprite.svg#upload"></use>
          </svg>
        </span>
        <span class="bgs__title">Загрузить своё</span>
        <input type="file" on:change={upload}>
      </label>
    </SwiperSlide> -->
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
