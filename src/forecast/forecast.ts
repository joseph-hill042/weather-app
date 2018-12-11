import request from 'request'

const darkSkyApiKey = '093229efafd23b0eeb54cfa6fa8cc380'

const getForecast = (latitude, longitude, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${darkSkyApiKey}/${latitude}, ${longitude}`,
      json: true,
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature,
        })
      } else {
        callback('Unable to fetch weather')
      }
    }
  )
}

export default getForecast
