const gConfig = require('./../../gConfig.json')
const assert = require('assert')
const axios = require('axios')
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const AWS = require('aws-sdk')
const {describe, before, it} = require('mocha')
const { log } = require('console')

describe('API Data Endpoint', function () {
  const rootUrl = gConfig.configApiGateway
  const poolData = {
    UserPoolId: null,
    ClientId: null
  }

  const login = {
    Username: null,
    Password: null
  }
  var accessToken

    this.timeout(5000)
  AWS.config.update({region: 'us-east-1'})
  
  // Set up Mocha hooks to authenticate with Cognito and get an authorization token
  before(async () => {
    await GetConfig()
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
  async function GetConfig() {
    const userpool_pname =  '/Serverlesspresso/core/userpool'
    const userpoolclient_pname =  '/Serverlesspresso/core/userpoolclient'
    const apilogin_pname =  '/Serverlesspresso/core/apilogin'

    let ssm = new AWS.SSM()
    let ssps = new AWS.SecretsManager()

    // Get the UserPool Details from Parameter Store
    let p1 = ssm.getParameter({Name: userpool_pname}).promise()     
    let p2 = ssm.getParameter({Name: userpoolclient_pname}).promise()

    await Promise.all([p1, p2]).then((data) => {
      data.forEach(element => {
        if (element.Parameter.Name == userpool_pname) {
          poolData.UserPoolId = element.Parameter.Value
        }
        if (element.Parameter.Name == userpoolclient_pname) {
          poolData.ClientId = element.Parameter.Value
        }
      })
    })
    
    await ssps.getSecretValue({SecretId: apilogin_pname}).promise()
      .then(data => {
        login.Username = JSON.parse(data.SecretString).Username
        login.Password = JSON.parse(data.SecretString).Password
    })
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

