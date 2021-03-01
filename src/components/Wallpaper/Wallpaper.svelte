<script>
  import './wallpaper.scss'
  import '@/js/graphemescope'
  import { onMount, afterUpdate } from 'svelte'
  import { wallPattern, zoom, model, color, bg, wallpaper } from '@/js/stores'
  import stub from '../Designer/stub'

  let container
  let link

  $: currentImage = stub[$model].colors[$color].patterns[$bg].image
  $: currentCar = stub[$model].colors[$color].car

  onMount(() => {
    wallPattern.set(new window.Graphemescope(container))
    $wallPattern.setImage(currentImage)
    $wallPattern.angleTarget = 0
  })

  afterUpdate(() => {
    $wallPattern.zoomTarget  = $zoom / 100 * 0.5 + 0.35
  })

  const download = () => {
    // const bgCanvas = document.querySelector('.wallpaper canvas')
    // const bgImage = new Image()
    // // bgImage.src = bgCanvas.toDataURL('image/jpeg')
    // bgImage.src = '/static/img/cars/qashqai/red.png'

    // const resultCanvas = document.createElement('canvas')
    // resultCanvas.width = bgCanvas.clientWidth
    // resultCanvas.height = bgCanvas.clientHeight

    // const ctx = resultCanvas.getContext('2d')
    // // ctx.drawImage(bgImage, 0, 0, bgCanvas.clientWidth, bgCanvas.clientHeight)
    // ctx.drawImage(bgImage, -100, -100)
    // console.log(resultCanvas)

    // link.href = resultCanvas.toDataURL('image/jpeg')
    // link.click()

    // link.href = canvas.toDataURL('image/jpeg')
    // link.click()
  }
</script>

<section class="wallpaper">
  <div class="wallpaper__container">
    <div class="wallpaper__device">
      <div class="wapplaper__screen" bind:this={container}></div>
      <img class="wallpaper__car" src={currentCar} alt="">
    </div>

    <div class="wallpaper__bottom">
      <h3 class="wallpaper__title">Создайте уникальный узор</h3>

      <div class="wallpaper__range range">
        <input type="range" bind:value={$zoom}>
      </div>

      <button class="wallpaper__btn btn" type="button" on:click={download}>
        <span>Скачать</span>
      </button>

      <a class="wallpaper__link" download="wallpaper.jpg" bind:this={link}></a>
    </div>

    <button class="wallpaper__close-btn close-btn" type="button" on:click={() => wallpaper.set(false)}>
      <svg width="20" height="20">
        <use xlink:href="/static/img/sprite.svg#close"></use>
      </svg>
    </button>
  </div>
</section>
