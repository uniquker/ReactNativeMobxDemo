import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, AsyncStorage, StyleSheet } from 'react-native'
import Header from '../../components/header';
import { inject, observer } from 'mobx-react';
import { colors } from '../../assets/styles/theme';
import history from '../../common/history';

@inject('rootStore')
@observer
export default class Page1 extends Component {
    constructor(props) {
        super(props)
        this.store = props.rootStore.user;
        this.state = {
            deviceNo: '',
            pageSize: '',
            phone: '',
            list: []
        }
    }
    _onRefresh() {
        let list = this.state.list;
        list.push(parseInt(Math.random() * 1000000))
        this.setState({
            list: list,
            // refreshing: true
        })
        setTimeout(() => {
            this.setState({
                refreshing: false
            })
        }, 2000)
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title={'Page1'} />
                <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text>mobx状态数据</Text>
                        <Text>用户信息{this.store.info.age}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            AsyncStorage.getItem('list').then(r => {
                                console.log(r);

                            });
                            // this.store.info.setAge(20);
                            history.push(this, '/listIndex', { name: 'niunai' })
                        }}>
                            <Text style={styles.buttonText}>设置用户年龄20</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            //添加timer的次数
                            this.store.tick();
                            let list = this.store.list;
                            list.push({
                                number: this.store.timer,
                                label: '第' + this.store.timer + '次点击'
                            })
                            this.store.setList(list)
                            history.push(this, '/list', { name: 'niunai' })
                        }}>
                            <Text style={styles.buttonText}>跳转到List 添加次数</Text>
                        </TouchableOpacity>

                        <View style={{ marginTop: 30 }}>
                            <Text>统计跳转到List的次数: {this.store.timer}</Text>
                        </View>
                        <TouchableOpacity style={[styles.button, { width: 140 }]} onPress={() => {
                            this.store.setList([]);
                            this.store.resetTimer();
                        }}>
                            <Text style={styles.buttonText}>重置List和timer</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    }
})