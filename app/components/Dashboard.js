import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles';

const Dashboard = ({userData, doLogout}) => (
  <View style={styles.container} accessibilityLabel="dashboardView">
    <Text style={styles.welcome}>Name: {userData.name}</Text>
    <Text style={styles.welcome}>
      E-Mail: {userData.email}
    </Text>
    <Image
      source={{ uri: userData.image }}
      style={{
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2
      }}
    />
    <TouchableOpacity
      onPress={doLogout}
      style={[styles.button, { width: 200 }]}
    >
      <Text style={styles.buttonText}>LOGOUT</Text>
    </TouchableOpacity>
  </View>
);

export default Dashboard;
