import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { colors } from '../assets/styles/theme';
// import Icon from 'react-native-vector-icons/Ionicons'
import { Icon } from '@ant-design/react-native';

const { width } = Dimensions.get('window')

export default class NaviBar extends Component {
    static propTypes = {
        style: PropTypes.object,
        leftItem: PropTypes.node, //原则上控制在宽度40的icon
        rightItem: PropTypes.node, //原则上控制在宽度40的icon
        title: PropTypes.string,
        titleColor: PropTypes.string,
        onBack: PropTypes.func,
        onCenter: PropTypes.func,
        iconColor: PropTypes.string
    }

    render() {
        const props = this.props;
        return (
            <View style={[styles.naviBar, props.style]}>
                <View style={{ width: 40 }}>
                    {
                        props.leftItem ? props.leftItem : (
                            props.onBack ? (
                                <TouchableOpacity style={{ paddingLeft: 15 }} onPress={props.onBack} activeOpacity={0.8}>
                                    <Icon
                                        name={"left"}
                                        size={20}
                                        color={props.iconColor || '#ffffff'}
                                    />
                                </TouchableOpacity>
                            ) : <View />
                        )
                    }
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>{
                        this.props.onCenter && this.props.onCenter();
                    }}
                >
                    <Text style={{ color: props.titleColor || '#fff' }}>{props.title}</Text>

                </TouchableOpacity>
                <View style={{ width: 40 }}>
                    {
                        props.rightItem ? props.rightItem : <View />
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.flatten({
    naviBar: {
        width,
        height: Platform.OS === 'ios' ? 44 : 45, //ios原生导航高度是44，android是56
        backgroundColor: colors.statusBarColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})