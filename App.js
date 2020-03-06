import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Input } from './components/Input';
import { Button } from './components/Button';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export default class App extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    birthday: '',
    message: '',
    authenticating: false,
    signUp: false,
    user: null,
    error: '',

  }
  state1 = { isSignIn: false, }
  uiConfig = {
    signInflow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInsucces: () => false,
    }
  }


  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyCMzVlBAdYbt16j5O-X7hSnv1RG2Vc7Vqo",
      authDomain: "react-native-firebase-70a83.firebaseapp.com",
    }

    firebase.initializeApp(firebaseConfig);

  }
  onPressSendMail() {

  }
  onPressSignUp() {
    this.setState({
      signUp: true,
    });
  }
  onPressSignIn() {
    this.setState({
      authenticating: true,
    });

    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => this.setState({
        authenticating: false,
        user,
        error: '',
      }))
      .catch(() => {
        // Login was not successful
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => this.setState({
            authenticating: false,
            user,
            error: '',
          }))
          .catch(() => this.setState({
            authenticating: false,
            user: null,
            error: 'Authentication Failure',
          }))
      })
  }

  onPressLogOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          email: '',
          password: '',
          authenticating: false,
          user: null,
        })
      }, error => {
        console.error('Sign Out Error', error);
      });
  }

  onPresssignUpwithgoogle() {

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
    firebase.auth().getRedirectResult().then(function (result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }
  _fbAuth() {
    LoginManager.logInWithPermissions(['public_profile']).then(function (result) {
      if (result.isCancelled) {
        console.log('login cancled')
      } else {
        console.log('logged in' + result.grantedPermissions.toString());
      }
    },
      function (error) {
        console.log('An error orrcured:' + error)
      })
  }

  
  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    if (this.state.signUp) {
      return (
        <View style={styles.form}>
          <Text>Sign Up</Text>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
           />
          <Button onPress={() => this.onPresssignUpwithgoogle()}>Sign Up with Google</Button>
          <Button onPress={() => this.onPresssignUpwithgoogle()}>Sign Up with faceBook</Button>
        </View>
      )
    }

    if (this.state.user !== null) {
      return (
        <View style={styles.form}>


          <Input
            placeholder='Enter your name...'
            label='Name'
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
          <Input
            placeholder='Enter your birtday...'
            label='Birtday'
            secureTextEntry
            onChangeText={birthday => this.setState({ birthday })}
            value={this.state.birthday}
          />
          <Input

            placeholder='Enter your message...'
            label='Message'
            secureTextEntry
            onChangeText={message => this.setState({ message })}
            value={this.state.message}
            multiline={true}
            numberOfLines={4}
          />
          <Button onPress={() => this.onPressSendMail()}>Send</Button>
          <Button onPress={() => this.onPressLogOut()}>Log Out</Button>

        </View>
      )
    }

    return (
      <View style={styles.form}>
      
        <Input
          placeholder='Enter your email...'
          label='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          placeholder='Enter your password...'
          label='Password'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button onPress={() => this.onPressSignIn()}>Log In</Button>
        <Button onPress={() => this.onPressSignUp()}>Sign Up</Button>
        <Text>{this.state.error}</Text>
      </View>
    )

  }

  render() {
    return (

      <View style={styles.container}>

        {this.renderCurrentState()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  form: {
    flex: 1
  }
});