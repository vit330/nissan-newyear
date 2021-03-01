<script>
  import './pattern.scss'
  import '@/js/graphemescope'
  import { onMount, afterUpdate } from 'svelte'
  import { graphemescope, zoom } from '@/js/stores/common'
  import { patternImage, modelId, colorId, bgId } from '@/js/stores/design'
  import commonStub from '@/js/stubs/common'
  import { throttle } from 'lodash'

  let container

  onMount(() => {
    window.zoomFactor = 0.6

    const urlParams = new URLSearchParams(location.search)
    const modelParam = urlParams.get('model')
    const colorParam = urlParams.get('color')
    const bgParam = urlParams.get('bg')
    const zoomParam = urlParams.get('zoom')

    if (zoomParam) {
      window.zoomFactor = +zoomParam / 100 * 0.5 + 0.45
    }
    graphemescope.set(new window.Graphemescope(container))

    if (modelParam && colorParam && bgParam) {
      modelId.set(modelParam)
      colorId.set(colorParam)
      bgId.set(bgParam)
      const currentImage = commonStub[$modelId].colors[$colorId].patterns[$bgId].image
      $graphemescope.setImage(currentImage)
    } else {
      $graphemescope.setImage($patternImage)
    }

    if (zoomParam) {
      $graphemescope.zoomTarget = +zoomParam / 100 * 0.5 + 0.45
    } else {
      $graphemescope.zoomTarget = $zoom / 100 * 0.5 + 0.45
    }

    if (location.pathname.replace(/\//g, '') !== 'screenshot') {
      const angleInc = throttle(() => $graphemescope.angleTarget += 0.02, 100)
      const loop = () => {
        angleInc()
        requestAnimationFrame(loop)
      }
      loop()
    }
  })

  afterUpdate(() => {
    $graphemescope.setImage($patternImage)
  })
</script>

<section class="pattern" bind:this={container}></section>
