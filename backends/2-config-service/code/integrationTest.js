const gConfig = require('./../../gConfig.json')
const assert = require('assert')
const axios = require('axios')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const {describe, before, it} = require('mocha')
const { log } = require('console')

describe('API Data Endpoint', function () {
  const rootUrl = gConfig.configApiGateway
  const poolData = {
    UserPoolId: gConfig.cognito.userPoolId,
    ClientId: gConfig.cognito.clientId
  };
  
  const login = {
    Username: gConfig.cognito.username,
    Password: gConfig.cognito.password,
  }
  var accessToken
  
  // Set up Mocha hooks to authenticate with Cognito and get an authorization token
  before(async () => {
    await GetJwtTokens()
  })
  
  describe('PUT /store', function () {
    it('should set the store to closed and return status 200', async function () {
      let response = await SetStore('closed')
      assert.strictEqual(response.status, 200)
      assert.deepStrictEqual(response.data.Attributes.storeOpen, {BOOL: false})
    })

    it('should set the store to open and return status 200', async function () {
      let response = await SetStore('open')
      assert.strictEqual(response.status, 200)
      assert.deepStrictEqual(response.data.Attributes.storeOpen, {BOOL: true})
    })
  })

  describe('GET /config', function () {
    it('should get the store is open and return status 200', async function () {
      const endpoint = rootUrl + '/config'
      const config = { 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': accessToken 
        }
      }
      try {
        var response = await axios.get(endpoint, null, config)
      }
      catch (error) {
        console.log(error.message)
      }
      assert.strictEqual(response.status, 200)
    })
  })

  async function SetStore(state) {
    const endpoint = rootUrl + '/store'
    const config = { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': accessToken 
      },
      params: {
        state: state
      }
    }
    try {
      return axios.put(endpoint, null, config)
    }
    catch (error) {
      console.log(error.message)
    }
  }

  async function GetJwtTokens() {
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
    let authDetails = new AmazonCognitoIdentity.AuthenticationDetails(login)
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(
      {
        Username: login.Username,
        Pool: userPool
      })
      try {
        let result = await asyncAuthenticateUser(cognitoUser, authDetails)
        accessToken = result.getAccessToken().getJwtToken()
      }
      catch (error) {
        console.log(error.message)
      }
  }
  
  function asyncAuthenticateUser(cognitoUser, authDetails) {
    return new Promise(function(resolve, reject) {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: resolve,
        onFailure: reject,
        newPasswordRequired: resolve
      })
    })
  }
})

