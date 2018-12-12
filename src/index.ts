import './env'
import * as yargs from 'yargs'
// import geocode from './geocode/geocode'
import geocode from './geocode/geocodePromise'
import getForecast from './forecast/forecast'

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

geocode(argv.a)
  .then(results => {
    getForecast(
      results.latitude,
      results.longitude,
      (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.error(errorMessage)
        } else {
          console.info(
            `${results.address}\nIt's currently ${
              weatherResults.temperature
            }, and feels like ${weatherResults.apparentTemperature}.`
          )
        }
      }
    )
  })
  .catch(err => console.error(err))
