/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import methods from './methods.js';

let {height, width} = Dimensions.get('window');

console.ignoredYellowBox = ['Setting a timer'];

export default class accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    }
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {
    methods.subscribe('signup', (res) => {
      console.log(res);
    });
  }

  signup() {
    const {username, email, password} = this.state;
    methods.accounts.signup({
      username: username,
      email: email,
      password: password,
    })
  }

  render() {
    const {username, email, password} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          placeholder='Username'
          keyboardType='default'
          style={{width: width}}
          defaultValue={username}
          onChangeText={(username) => { this.setState({username}) }}
        />
        <TextInput
          placeholder='Enter Email'
          keyboardType='email-address'
          style={{width: width}}
          defaultValue={email}
          onChangeText={(email) => { this.setState({email}) }}
        />
        <TextInput
          placeholder='Password'
          keyboardType='default'
          secureTextEntry={true}
          style={{width: width}}
          defaultValue={password}
          onChangeText={(password) => { this.setState({password}) }}
        />
        <TouchableHighlight style={{width: (width * 98)/100, height: (height * 8)/100, backgroundColor: '#00bfff'}} onPress={this.signup}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Signup</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('accounts', () => accounts);
