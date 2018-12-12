import request from 'request'

const geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address)

    request(
      {
        json: true,
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${
          process.env.GOOGLE_API_KEY
        }`,
      },
      (error, response, body) => {
        if (error) {
          reject('Could not reach Geocode API')
        } else if (body.status === 'ZERO_RESULTS') {
          reject('Address not found')
        } else if (body.status === 'OK') {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng,
          })
        }
      }
    )
  })
}

export default geocodeAddress
