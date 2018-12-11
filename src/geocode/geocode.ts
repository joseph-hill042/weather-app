import request from 'request'

const googleApiKey = 'AIzaSyAAaGvFJAE-3Clb74krpDJ6At4Mfc0KZ8s'

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address)

  request(
    {
      json: true,
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`,
    },
    (error, response, body) => {
      if (error) {
        callback('Error:::', error)
      } else if (body.status === 'ZERO_RESULTS') {
        callback('Address not found')
      } else if (body.status === 'OK') {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng,
        })
      }
    }
  )
}

export default geocodeAddress
