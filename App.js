import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';

export default class App extends React.Component {
  // We watch for changes in navigation, because we asked Reddit to redirect us
  // to an arbitrary URL callback://login when the login has been completed.
  onNavigationStateChange = (navState) => {
    if (navState.url.slice(0,22) === 'about://callback/login') {
      // Regex shortcut to grab the access_token if the URL matches this format.
      const regex = /^about:\/\/callback\/login\?code=(.+)&state=random_string&uidt=(.+)/
      let authorization_code = navState.url.match(regex)[1]
      // console.log(authorization_code)
      // this.props.dispatch(userActionCreators.authenticationSuccess(accessToken))
      const url = 'https://api.npr.org/authorization/v2/token'
      fetch(url,
        {
          body: `grant_type=authorization_code&client_id=nprone_trial_mrrw1yBjHbZE&client_secret=jzg2hoVOvWEyIUzMPTnMImK8w1LKIInyxTZ0yIAy&code=${authorization_code}&redirect_uri=about%3A%2F%2Fcallback%2Flogin`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
        }).then((response) => {
            const access_token = JSON.parse(response["_bodyText"])["access_token"]
            if (access_token) {
              fetch("https://api.npr.org/listening/v2/recommendations?channel=npr", {
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer 973225974b7cb2b60e89ded2cf14a0ae2a26aeff796435b7307e41b2f55e36ba39c8f1221918100e"
                }
              }).then((response) => {
                console.log(JSON.parse(response["_bodyText"])["items"][0]["href"])
              })
            }

          }
        )

    }
  }

  render() {
    const client_id = 'nprone_trial_mrrw1yBjHbZE'
    const redirect_uri = 'about%3A%2F%2Fcallback%2Flogin'
    const scope = 'listening.readonly'
    const state = 'random_string'
    const LOGIN_URL = `https://api.npr.org/authorization/v2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}`
    return (
      <WebView
        source={{uri: LOGIN_URL}}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    )
  }
}
