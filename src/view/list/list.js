import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, FlatList } from 'react-native'
import Header from '../../components/header';
import history from '../../common/history';
import { colors } from '../../assets/styles/theme';
import { inject, observer } from 'mobx-react';
import { unitWidth } from '../../assets/utils/adapter';

const { width } = Dimensions.get('window')

@inject('rootStore')
@observer
export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      refreshing: false,
      logData: [1, 22, 2, 3, 3, 3]
    }
    this.store = props.rootStore.user
  }

  async componentDidMount() {

  }
  //下拉刷新,更改状态，重新获取数据
  _onRefresh() {
    this.setState({
      currentPage: 1,
      refreshing: true,
      logData: []
    }, () => {
      this.getCallLog();
    });

  }
  //获取数据，根据当前页面的页码，获取相应的数据，并将数据合并，赋值到logData,并隐藏加载动画
  getCallLog() {
    if (this.doing) {
      return;
    }
    this.doing = true;
    let param = {
      page: this.state.currentPage
    }, l = [];
    // debugger
    if (this.state.currentPage <= 6) {
      for (let i = 0; i < 10; i++) {
        l.push(i + (this.state.currentPage - 1) * 10 + 1);
      }
      setTimeout(() => {
        this.setState({
          refreshing: false,
          logData: this.state.logData.concat(l),
          totalCount: 55,
          lastPage: 6
        });
        this.doing = false;
      }, 1000);
    }
  }
  //当当前页面小于最大页面时，继续加载，否则提示已全部加载完成
  _endReached() {
    let that = this;
    // 判断首屏满屏的情况
    if (that.state.logData && that.state.lastPage > this.state.currentPage) {
      that.state.currentPage++;
      console.log(that.state.currentPage)
      // that.setState({refreshing: true})
      this.getCallLog();
    } else {
      //若总数未满一屏，进去就提示
      // this.showToast('已加载全部');
    }
  }
  

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={'List列表页'}
          onBack={history.goBack.bind(this, this)}
          onCenter={
            ()=>{
              this._flatList && this._flatList.scrollToIndex({index: 0})
            }
          }
        />
        <FlatList
          ref={(r)=>{
            this._flatList = r;
          }}
          onEndReachedThreshold={0.1} //当距离内容比例不足内容0.1比例时触发onEndReached
          onEndReached={this._endReached.bind(this)} //上拉加载数据
          numColumns={1}
          data={this.state.logData}
          onRefresh={this._onRefresh.bind(this)} //刷新操作
          refreshing={this.state.refreshing} //等待加载出现加载的符号是否显示
          renderItem={({ item }) =>
            <View style={styles.label}><Text>{item}</Text></View>
          }
          ListFooterComponent={
            this.state.refreshing ? <View style={{flexDirection: "row", justifyContent: 'center', alignItems: "center"}}>
              <Text style={{color: '#999', fontSize: 14*unitWidth}}>loading more</Text>
              <ActivityIndicator size="small" color="#666" />
            </View>
              : this.state.logData.length ? <Text>have no more data.</Text> : null
          }
          ListEmptyComponent={
            this.state.refreshing ? null : <Text>have empty data.</Text>
          }
        />

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
    width: 0.25 * width,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
})