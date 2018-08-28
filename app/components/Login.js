import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

const Login = ({ doLogin, loginData, onChangeLoginData }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Login:</Text>
    <TextInput
      style={{
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
      }}
      accessibilityLabel="inputUsername"
      onChangeText={text => onChangeLoginData(text, 'username')}
      value={loginData.username}
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
      accessibilityLabel="inputPassword"
      onChangeText={text => onChangeLoginData(text, 'password')}
      value={loginData.password}
      autoCapitalize="none"
      secureTextEntry={true}
    />
    <TouchableOpacity
      onPress={doLogin}
      accessibilityLabel="buttonLogin"
      style={[styles.button, { width: 200 }]}
    >
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  </View>
);

export default Login;
