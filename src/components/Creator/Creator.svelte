<script>
  import './creator.scss'
  import { view, zoom } from '@/js/stores/common'
  import { toyPdf, modelId, colorId, bgId } from '@/js/stores/design'
  import axios from 'axios'
  import b64toBlob from 'b64-to-blob'
  import { saveAs } from 'file-saver'

  let downloadLock = false

  const getScreenshot = () => {
    downloadLock = true
    const { width , height } = window.screen
    axios.get(`/puphpeteer/app.php?width=${width}&height=${height}&model=${$modelId}&color=${$colorId}&bg=${$bgId}&zoom=${$zoom}`)
      .then(({ data }) => {
        const file = b64toBlob(data.image, 'image/jpeg')
        saveAs(file, 'wallpaper')
        downloadLock = false
      })
  }
</script>

<section class="creator">
  <h2 class="creator__title">Новогодний набор с&nbsp;твоим характером</h2>

  <div class="creator__items">
    <div class="creator__item">
      <svg width="64" height="64">
        <use xlink:href="/static/img/sprite.svg#card"></use>
      </svg>
      <h3>Виртуальная<br>открытка</h3>
      <p>Напиши искренние поздравления друзьям</p>
      <button class="btn" type="button" on:click={() => {
        view.set('card')
        window.gtag('event', 'postcard')
      }}>Создать</button>
    </div>

    <div class="creator__item">
      <svg width="64" height="64">
        <use xlink:href="/static/img/sprite.svg#ball"></use>
      </svg>
      <h3>Ёлочная<br>игрушка</h3>
      <p>Распечатай макет и&nbsp;собери по&nbsp;нашей инструкции</p>
      <a class="btn" href={$toyPdf} download="toy.pdf" on:click={() => {
        window.gtag('event', 'toy')
      }}>Создать</a>
    </div>

    <div class="creator__item">
      <svg width="64" height="64">
        <use xlink:href="/static/img/sprite.svg#wallpaper"></use>
      </svg>
      <h3>Заставка<br>на&nbsp;экран</h3>
      <p>Создай картинку для экрана смартфона или планшета</p>
      <!-- <button class="btn" type="button" on:click={() => wallpaper.set('true')}>Создать</button> -->
      <button class="btn" type="button" on:click={() => {
        getScreenshot()
        window.gtag('event', 'wallpaper')
      }} disabled={downloadLock}>Создать</button>
    </div>
  </div>

  <footer class="creator__footer">
    <p><b>&copy; Nissan 2020</b></p>
    <a href="https://www.nissan.ru/legal/privacy.html" target="_blank">Политика конфиденциальности</a>
    <a href="https://www.nissan.ru/legal/cookies.html" target="_blank">Файлы Cookies</a>
    <a href="https://www.nissan.ru/legal/terms-conditions.html" target="_blank">Правила и условия</a>
  </footer>
</section>
