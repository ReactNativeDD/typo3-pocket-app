/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { sendRequestForJson } from './services/ApiHandler';
import * as Keychain from 'react-native-keychain';

//import RSAKey from 'react-native-rsa';

const SERVER_NAME_API = 'typo3';

export default class App extends Component<Props> {
  state = {
    userData: {
      userid: '',
      userName: '',
      name: '',
      email: '',
      image: ''
    },
    loginData: {
      username: '',
      password: ''
    },
    action: 'login',
    loading: false
  };

  componentWillMount() {
    this.setState({ loading: true });
    this.getSavedCredetials();
  }

  getSavedCredetials = async () => {
    let credentials = await Keychain.getGenericPassword();

    if (credentials !== false) {
      this.setState({
        loginData: {
          username: credentials.username,
          password: credentials.password
        }
      });

      this.doLogin();
    } else {
      this.setState({ loading: false });
    }
  };

  doLogin = () => {
    this.setState({ loading: true });
    sendRequestForJson(
      'https://typo3.jmwd.de',
      `/?user=${this.state.loginData.username}&pass=${
        this.state.loginData.password
      }&logintype=login&pid=3&type=5000`,
      response => this.loginCallBack(response),
      error => this.errorCallback(error)
    );
  };

  doLogout = () => {
    this.setState({ loading: true });
    sendRequestForJson(
      'https://typo3.jmwd.de',
      `/?logintype=logout&pid=3&type=5000`,
      response => this.logoutCallBack(response),
      error => this.errorCallback(error)
    );
  };

  //rsaKeyCallback = ( response ) => {
  //	let keyParts = response.split(":");
  //
  //	this.setState({
  //		rsa: {
  //			publicKey: keyParts[0],
  //			short: keyParts[1]
  //		}
  //	});
  //
  //
  //	let rsa = new RSAKey();
  //
  //	console.log('STATE: ', this.state.rsa.publicKey);
  //
  //	rsa.setPublicString(JSON.stringify({n: this.state.rsa.publicKey, e: this.state.rsa.short}));
  //	let originText = 'test123';
  //
  //	let encryptedPassword = rsa.encrypt(originText);
  //
  //
  //	//https://typo3.jmwd.de/index.php?user=admin&pass=rsa%3Aebsqx%2B%2BZP1Ya8gTTHJb3GR6vMuYxBXVwKZLlw2ONg04%2F3RKv%2BpaXax7TPCEEr5wcgzP7S8t5ftyP0770%2BJX1YvnULJ5pkSjv34%2FYAOYW2%2FatgmmwM6ruYVZE%2BYOStAGrTbSY3KYquw3l84%2BMnhaDgghULm3TxysP2thC2DYhLXVvTL%2Fve7jKjf2F444GZMuHbViwX%2BFD9412JhTYkSgKVuwJJLv7PnmxtaAYpH0jQOY%2FILhUSQ3IyVCVHFG4rIAAXxLNLCjVCZj%2FacAEL1WhhiZILfXCBuiNMjAj4Cyj1yKW6JanRdH7NXx%2BipG2jJKd9RYgcla5pDbcoLKFLphyCw%3D%3D&logintype=login&pid=3&redirect_url=&tx_felogin_pi1%5Bnoredirect%5D=0
  //
  //	console.log('https://typo3.jmwd.de' + '/index.php?id=46&user=admin&pass=' + encryptedPassword + '&logintype=login&pid=3&redirect_url=&tx_felogin_pi1%5Bnoredirect%5D=0', );
  //
  //
  //	sendRequestForHtml(
  //		'https://typo3.jmwd.de',
  //		'/index.php?id=46&user=admin&pass=' + encryptedPassword + '&logintype=login&pid=3&redirect_url=&tx_felogin_pi1%5Bnoredirect%5D=0',
  //		( response ) => this.loginCallBack( response ),
  //		( error ) => this.errorCallback( error )
  //	);
  //};
  loginCallBack = response => {
    console.log('LOGIN: ', response);

    if (typeof response.userid != 'undefined' && response.userid > 0) {
      this.setState({
        userData: {
          userid: response.userid,
          userName: response.username,
          name: response.name,
          email: response.email,
          image: response.image
        },
        action: 'dashboard'
      });

      Keychain.setGenericPassword(
        this.state.loginData.username,
        this.state.loginData.password
      );
    } else {
      Alert.alert('Ihre Zugangsdaten sind nicht valide!');
    }

    this.setState({ loading: false });
  };

  logoutCallBack = response => {
    console.log('LOGOUT: ', response);

    if (typeof response.userid === 'undefined') {
      this.setState({
        userData: {
          userid: '',
          userName: '',
          name: '',
          email: '',
          image: ''
        },
        loginData: {
          username: '',
          password: ''
        },
        action: 'login'
      });

      Keychain.resetGenericPassword();
    }

    this.setState({ loading: false });
  };

  errorCallback = error => {
    console.log('ERROR', error);
    this.setState({ loading: false });
  };

  onChangeLoginData(newValue, key) {
    let loginData = this.state.loginData;

    this.setState({
      loginData: {
        ...loginData,
        [key]: newValue
      }
    });
  }

  renderLoading = () => {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  renderContent = () => {
    if (this.state.loading === true) {
      return this.renderLoading();
    }

    switch (this.state.action) {
      case 'login':
        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>Login:</Text>
            <TextInput
              style={{
                width: 200,
                height: 40,
                borderColor: 'gray',
                borderWidth: 1
              }}
              onChangeText={text => this.onChangeLoginData(text, 'username')}
              value={this.state.loginData.username}
              autoCapitalize="none"
            />
            <Text style={styles.instructions}>Passwort:</Text>
            <TextInput
              style={{
                width: 200,
                height: 40,
                borderColor: 'gray',
                borderWidth: 1
              }}
              onChangeText={text => this.onChangeLoginData(text, 'password')}
              value={this.state.loginData.password}
              autoCapitalize="none"
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={this.doLogin}>
              <Text>Login</Text>
            </TouchableOpacity>
          </View>
        );
      case 'dashboard':
        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>Name: {this.state.userData.name}</Text>
            <Text style={styles.welcome}>
              E-Mail: {this.state.userData.email}
            </Text>
            <Image
              source={{ uri: this.state.userData.image }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                borderWidth: 2
              }}
            />
            <TouchableOpacity onPress={this.doLogout}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
