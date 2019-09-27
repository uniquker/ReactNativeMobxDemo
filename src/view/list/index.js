import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import Header from '../../components/header';
import history from '../../common/history';
import {colors} from '../../assets/styles/theme';
import {inject, observer} from 'mobx-react';

const { width } = Dimensions.get('window')

@inject('rootStore')
@observer
export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      name: props.navigation.state.params.name
    }
    // this.listService = new ListService(props)
    this.store = props.rootStore.user
  }

  async componentDidMount() {
    const res = null;//await this.listService.getList();

    if(res) {
      this.setState({
        list: res
      })
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={'List列表页'}
          onBack={history.goBack.bind(this, this)}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{marginBottom: 50}}>
            <Text>Home页传过来的name:{this.state.name}</Text>
          </View>
          <View style={{marginBottom: 50}}>
            <Text>统计到{this.store.timer}次跳转到List</Text>
          </View>
          <View style={{flexDirection: 'row', backgroundColor: '#ccc'}}>
            <View style={styles.number}>
              <Text>次数</Text>
            </View>
            <View style={styles.label}>
              <Text>描述</Text>
            </View>
          </View>
          {
            this.store.list.map((item, index) => {
              return (
                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
                  <View style={styles.number}>
                    <Text>{item.number}</Text>
                  </View>
                  <View style={styles.label}>
                    <Text>{item.label}</Text>
                  </View>
                </View>
              )
            })
          }
          <TouchableOpacity style={styles.button} onPress={() => history.push(this, '/detail', {name: 'suannai'})}>
            <Text style={styles.buttonText}>跳转到Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.flatten({
  button: {
    marginTop: 20,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.statusBarColor
  },
  buttonText: {
    color: '#fff'
  },
  number: {
    width: 0.3 * width,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    width: 0.7 * width,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
})