import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Header from '../../components/header';
import history from '../../common/history';
import { inject, observer } from 'mobx-react';
import { unitWidth } from '../../assets/utils/adapter';
import commonStyle from '../../assets/styles/common';

@inject('rootStore')
@observer
export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.user
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={'Detail详情页'}
          onBack={history.goBack.bind(this, this)}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Detail</Text>
          <Text>current timer {this.store.timer}</Text>
          <TouchableOpacity
            style={[{ height: 40 * unitWidth}, commonStyle.flexCenter]}
            onPress={() => {
              this.store.tick();
            }}>
            <Text>添加次数</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}