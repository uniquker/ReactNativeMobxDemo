import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Header from '../../components/header';
import commonStyle from '../../assets/styles/common';
import history from '../../common/history';

export default class Page2 extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title={'Page2'} />
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={commonStyle.split_bar}>common style use introduce</Text>
                    <TouchableOpacity style={[commonStyle.btn, { width: 140 }]} onPress={() => {
                        
                    }}>
                        <Text style={commonStyle.btn_txt}>重置List和timer</Text>
                    </TouchableOpacity>
                    <Text style={commonStyle.split_bar}>common style use introduce</Text>
                    <TouchableOpacity style={[commonStyle.btn, { width: 140 }]} onPress={() => {
                        history.push(this, '/listRefresh', { name: 'niunai' })
                    }}>
                        <Text style={commonStyle.btn_txt}>list refresh</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}