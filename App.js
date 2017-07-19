import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';

export default class App extends React.Component {

  // We watch for changes in navigation, because we asked Reddit to redirect us
  // to an arbitrary URL callback://login when the login has been completed.
  onNavigationStateChange = (navState) => {

    console.log("===============================")
    console.log("===============================")
    console.log(navState.url)
    console.log("===============================")
    console.log("===============================")

    // if (navState.url.indexOf('about://callback/login#') === 0) {
    //   // Regex shortcut to grab the access_token if the URL matches this format.
    //   const regex = /^about:\/\/callback\/login#access_token=(.+)&token/
    //   let accessToken = navState.url.match(regex)[1]
    //   console.log(accessToken);
    //   // this.props.dispatch(userActionCreators.authenticationSuccess(accessToken))
    // }
  }

  render() {
    const REDDIT_APP_ID = 'Mcnxsc2BLOXi8w'
    const LOGIN_URL = `https://api.npr.org/authorization/v2/authorize?client_id=nprone_trial_mrrw1yBjHbZE&redirect_uri=about%3A%2F%2Fcallback%2Flogin&response_type=code&scope=listening.readonly&state=random_code`
    return (
      <WebView
        source={{uri: LOGIN_URL}}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    )
  }
}
