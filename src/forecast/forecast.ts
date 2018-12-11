import request from 'request'

const darkSkyApiKey = '093229efafd23b0eeb54cfa6fa8cc380'

const getForecast = (results, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${darkSkyApiKey}/${
        results.latitude
      }, ${results.longitude}`,
      json: true,
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
        })
      } else {
        callback('Unable to fetch weather')
      }
    }
  )
}

export default getForecast
