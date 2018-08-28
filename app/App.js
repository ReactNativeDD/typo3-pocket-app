import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Login, ServiceCenter, Dashboard } from './components';
import { styles } from './styles';
import {
  sendRequestForJson,
  sendRequestForXml,
  determineCurrentLocation,
  getDistance
} from './services';
import { ApiStatics } from "./statics";
import * as Keychain from 'react-native-keychain';
import XMLParser from 'react-xml-parser';

export default class App extends Component<Props> {
  state = {
    userData: {
      userId: '',
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
    loading: false,
    serviceCenters: [],
    location: {}
  };

  componentWillMount() {
    this.locationSuccessCallback({
      coords: {
        latitude: 51.050407,
        longitude: 13.737262
      }
    });
  }

  sortByDistanceAsc = array => {
    return array.sort(function(a, b) {
      return b.distance > a.distance ? -1 : b.distance < a.distance ? 1 : 0;
    });
  };

  locationSuccessCallback = position => {
    this.setState({
      location: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });

    sendRequestForXml(
      ApiStatics.apiUrl,
      ApiStatics.apiPathAddress,
      response => this.getAddressesCallBack(response),
      error => this.errorCallback(error)
    );
  };

  getAddressesCallBack = response => {
    let xml = new XMLParser().parseFromString(response); // Assume xmlText contains the example XML
    let items = xml.getElementsByTagName('addressItem');
    let serviceCenters = [];
    let currentLocation = this.state.location;

    items.map(function callback(centerXml, index) {
      serviceCenters[index] = centerXml.attributes;
      serviceCenters[index].distance = getDistance(
        currentLocation,
        serviceCenters[index]
      );
    });

    this.setState({ serviceCenters: this.sortByDistanceAsc(serviceCenters) });
  };

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
    if (
      this.state.loginData.username === '' &&
      this.state.loginData.password === ''
    ) {
      Alert.alert('Bitte geben Sie Ihre Zugangsdaten ein.');

      return;
    }

    this.setState({ loading: true });

    if (
      this.state.loginData.username === 'jan.maennig' &&
      this.state.loginData.password === 'test123'
    ) {
      this.loginCallBack({
        userid: 1,
        username: 'jan.maennig',
        name: 'Jan Männig',
        email: 'janmaennig@gmail.com',
        image: 'https://avatars0.githubusercontent.com/u/5433846?s=460&v=4'
      });
    } else {
      this.errorCallback();
    }


  };

  doLogout = () => {
    this.setState({ loading: true });
    sendRequestForJson(
      ApiStatics.apiUrl,
      ApiStatics.apiPathLogout,
      response => this.logoutCallBack(response),
      error => this.errorCallback(error)
    );
  };

  loginCallBack = response => {
    if (typeof response.userid != 'undefined' && response.userid > 0) {
      this.setState({
        userData: {
          userId: response.userid,
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
      Alert.alert('Ihre Zugangsdaten sind nicht valide.');
    }

    this.setState({ loading: false });
  };

  logoutCallBack = response => {
    if (typeof response.userId === 'undefined') {
      this.setState({
        userData: {
          userId: '',
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

  showServiceCenter = () => {
    this.setState({ action: 'serviceCenter' });
  };

  showDashboard = () => {
    if (this.state.userData.userId === '') {
      this.setState({ action: 'login' });
    } else {
      this.setState({ action: 'dashboard' });
    }
  };

  determinePhoneNumberByUserState = index => {
    let center = this.state.serviceCenters[index];
    if (this.state.userData.userId !== '') {
      return `${center.phone_support} \n (Ihr persönlicher Berater)`;
    }

    return center.phone_central;
  };

  renderContent = () => {
    if (this.state.loading === true) {
      return this.renderLoading();
    }

    switch (this.state.action) {
      case 'serviceCenter':
        return (
          <ServiceCenter
            serviceCenter = {this.state.serviceCenters[0]}
            determinePhoneNumberByUserState = {(index) => this.determinePhoneNumberByUserState(index)}
            showDashboard = {this.showDashboard}
          />
        );
      case 'login':
        console.log(this.doLogin);
        return (
          <Login
            doLogin={this.doLogin}
            loginData={this.state.loginData}
            onChangeLoginData={(text, key) => this.onChangeLoginData(text, key)}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            userData={this.state.userData}
            doLogout={this.doLogout}
          />
        );
    }
  };

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>{this.renderContent()}</View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={this.showServiceCenter}
            style={[styles.button, { width: '50%' }]}
          >
            <Text style={styles.buttonText}>GESCHÄFTSTELLE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
