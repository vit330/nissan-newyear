const express = require('express')
const puppeteer = require('puppeteer')

const app = express()

app.get('/services/screenshot', async (request, response) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const { width, height, model, color, bg, zoom, userbg } = request.query
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.goto(`https://nissan-kaleidoscope.slava.digital/screenshot?model=${model}&color=${color}&bg=${bg}&zoom=${zoom}&userbg=${userbg}`)
  const image = await page.screenshot({ type: 'jpeg', encoding: 'base64' })
  response.send({ image })
  await browser.close()
})

app.listen(3000)
