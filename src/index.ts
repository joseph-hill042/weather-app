import * as yargs from 'yargs'
import geocode from './geocode/geocode'
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

geocode(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.error(errorMessage)
  } else {
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
  }
})
