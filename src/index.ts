import './env'
import * as yargs from 'yargs'
import axios from 'axios'

const argv = yargs
  .options({
    a: {
      demandOption: true,
      alias: 'address',
      describe: 'Address to fetch weather for.',
      string: true,
    },
  })
  .help()
  .alias('help', 'h').argv

const encodedAddress = encodeURIComponent(argv.a)
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${
  process.env.GOOGLE_API_KEY
}`

axios
  .get(geocodeURL)
  .then(res => {
    if (res.data.status === 'ZERO_RESULTS') {
      console.error('Address not found')
    } else if (res.data.error_message) {
      console.error(res.data.error_message)
    } else if (res.data.status === 'OK') {
      const lat = res.data.results[0].geometry.location.lat
      const lng = res.data.results[0].geometry.location.lng
      const weatherURL = `https://api.darksky.net/forecast/${
        process.env.DARK_SKY_API_KEY
      }/${lat}, ${lng}`
      console.info(res.data.results[0].formatted_address)
      return axios.get(weatherURL)
    }
  })
  .then(res => {
    console.info(
      `It's currently ${res.data.currently.temperature} and it feels like ${
        res.data.currently.apparentTemperature
      }`
    )
  })
  .catch(err => {
    console.error(err.message)
  })
