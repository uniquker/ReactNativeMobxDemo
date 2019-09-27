import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, RefreshControl, ScrollView } from 'react-native'
import { colors, size, layout } from '../../assets/styles/theme';
import Header from '../../components/header';
import constants from '../../common/constants';
import Dialog from '../../common/dialog'
import { inject, observer } from 'mobx-react';
import { NoticeBar, WhiteSpace } from '@ant-design/react-native';
import { unitWidth } from '../../assets/utils/adapter';
import commonStyle from '../../assets/styles/common';
// import { getUniqueId, getManufacturer, getVersion } from 'react-native-device-info'


@inject('rootStore')
@observer
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.store = props.rootStore.user;
        this.loadingState = props.rootStore.loadingState;
        this.state = {
            deviceNo: '',
            pageSize: '',
            phone: '',
            list: []
        }
    }

    componentDidMount() {
        // this.loading_emit = DeviceEventEmitter.emit(constants.LOADING_EMIT, {
        //     show: true
        // })
        this.setState({
            deviceNo: constants.deviceNo,
            pageSize: constants.pageSize,
            dialog_show: false,
            refreshing: false
        })


    }

    componentWillUnmount() {
        this.loading_emit && this.loading_emit.remove();
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

                <Header title={'Home'} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    <NoticeBar mode="closable" onPress={() => console.log('will close')}>
                        {this.state.deviceNo}-{this.state.pageSize}----{this.state.phone}
                    </NoticeBar>
                    {
                        this.state.list.map(v => {
                            return (<Text>{v}</Text>)
                        })
                    }

                    <Dialog
                        // render={<Text>sdsfsfs</Text>} 
                        render={
                            <TextInput
                                onChangeText={(text) => this.setState({ phone: text })}
                                value={this.state.phone}
                                editable={true}
                                maxLength={11}
                                placeholder={'phone need enter.'}
                                keyboardType="phone-pad"
                            />
                        }
                        msg={'系统错误'} show={this.state.dialog_show}
                        confirmFn={() => {
                            this.loadingState.setShow(true);
                        }}
                    ></Dialog>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={commonStyle.split_bar}>dialog block</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            this.setState({ dialog_show: true });
                        }}>
                            <Text style={styles.buttonText}>show dialog</Text>
                        </TouchableOpacity>
                        <Text style={commonStyle.split_bar}>loading block</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            // this.loading_emit = DeviceEventEmitter.emit('LOADING_EMIT', {
                            //   show: true
                            // })
                            // setTimeout(()=>{
                            //   this.loading_emit = DeviceEventEmitter.emit('LOADING_EMIT', {
                            //     show: false
                            //   })
                            // }, 4000)
                            // this.setState({dialog_show: true});
                            this.loadingState.setShow(true);
                        }}>
                            <Text style={styles.buttonText}>show loading</Text>
                        </TouchableOpacity>

                        <Text style={commonStyle.split_bar}>iconfont</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            this.props.navigation.navigate('iconfont')
                        }}>
                            <Text style={styles.buttonText}>iconfont</Text>
                        </TouchableOpacity>

                        <Text style={commonStyle.split_bar}>device info</Text>
                        <Text>deviceNo: {this.state.deviceNo}</Text>
                        <Text>versionName: {constants.versionName}</Text>

                        <Text style={commonStyle.split_bar}>first page</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            this.props.navigation.navigate('first')
                        }}>
                            <Text style={styles.buttonText}>first</Text>
                        </TouchableOpacity>


                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.flatten({
    title: {
        width: '100%',color: '#666',backgroundColor: colors.bg_gray, height: 30*unitWidth,lineHeight: 30*unitWidth,
        paddingLeft: 10*unitWidth, fontSize: size.fontSize, marginTop: 20*unitWidth
    },
    button: {
        marginTop: 10*unitWidth,
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