import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Header from '../../components/header';

export default class Page3 extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header title={'Page3'}/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Page3</Text>
        </View>
      </View>
    )
  }
}