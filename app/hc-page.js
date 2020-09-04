const debug = require('debug')('hcepPdfServer:hcPage')
const generateLaunchOptions = () => {
  const options = {
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  }
  if (process.env.HCEP_USE_CHROMIUM === 'true') {
    debug('use Chromium')
  } else {
    const chromeBinary = process.env.HCEP_CHROME_BINARY || '/usr/bin/google-chrome'
    options['executablePath'] = chromeBinary
    debug('use chromeBinary:', chromeBinary)
  }
  return options
}
module.exports.hcPage = async () => {
  const puppeteer = require('puppeteer')
  const launchOptions = generateLaunchOptions()
  debug('launchOptions:', launchOptions)
  // launch browser and page only once
  const browser = await puppeteer.launch(launchOptions)
  const chromeVersion = await browser.version()
  debug('chromeVersion:', chromeVersion)
  const page = await browser.newPage()
  return page
}
