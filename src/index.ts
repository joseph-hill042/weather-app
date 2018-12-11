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
    getForecast(results, (errorMessage, results) => {
      if (errorMessage) {
        console.error(errorMessage)
      } else {
        console.info(JSON.stringify(results, undefined, 2))
      }
    })
  }
})
