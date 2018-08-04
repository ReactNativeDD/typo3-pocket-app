import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

const ServiceCenter = ({serviceCenter, determinePhoneNumberByUserState, showDashboard}) => (
  <View style={[styles.container, { padding: 20 }]}>
  <View
    style={{
      backgroundColor: '#EEEEEE',
      width: '100%',
      height: '100%',
      borderRadius: 20,
      padding: 5,
      flexDirection: 'column'
    }}
  >
    <View style={{ flex: 9 }}>
      <Text style={styles.welcome}>Für Sie vor Ort:</Text>
      <Text style={styles.welcome}>
        {serviceCenter.company}
      </Text>
      <Text style={styles.instructions}>
        {serviceCenter.address}
      </Text>
      <Text style={styles.instructions}>
        {serviceCenter.zip}{' '}
        {serviceCenter.city}
      </Text>
      <Text />
      <Text style={styles.instructions}>
        Telefon: {determinePhoneNumberByUserState(0)}
      </Text>
    </View>
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end'
      }}
    >
      <TouchableOpacity
        onPress={showDashboard}
        style={[styles.button, { width: '100%' }]}
      >
        <Text style={styles.buttonText}>SCHLIESSEN</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>
);

export default ServiceCenter;
