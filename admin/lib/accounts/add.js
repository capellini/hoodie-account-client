module.exports = add

var request = require('../../../utils/request')
var deserialise = require('../../../utils/deserialise')
var serialise = require('../../../utils/serialise')

function add (state, account, options) {
  return request({
    url: state.url + '/accounts' + query(options),
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.api+json',
      'Authorization': 'Bearer ' + state.session.id,
      'Content-Type': 'application/vnd.api+json'
    },
    body: JSON.stringify(serialise('account', account))
  })

  .then(function (response) {
    var data = JSON.parse(response.body)
    return deserialise(data, options)
  })
}

function query (options) {
  if (!options || !options.include === 'profile') {
    return ''
  }

  return '?include=profile'
}
