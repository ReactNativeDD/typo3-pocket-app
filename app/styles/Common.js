import { StyleSheet } from 'react-native';

export default (styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%',
    padding: 5
  },
  footer: {
    flex: 1,
    backgroundColor: '#CCCCCC',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  button: {
    backgroundColor: '#FF4023',
    padding: 5,
    borderRadius: 10,
    height: 28,
    alignItems: 'center',
    marginVertical: 5
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
}));
