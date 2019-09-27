import React, {
    Component,
} from 'react';
import {
    Text, View, StyleSheet, Modal, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
const { size, colors, layout } = require('../assets/styles/theme');
const { unitWidth, width } = require("../assets/utils/adapter");

export default class Dialog extends Component {
    static propTypes = {
        show: PropTypes.bool,
        msg: PropTypes.string,
        mask: PropTypes.bool,
        maskFn: PropTypes.func,
        confirmFn: PropTypes.func,
        cancelFn: PropTypes.func,
        render: PropTypes.object,
        cancelText: PropTypes.string,
        confirmText: PropTypes.string,
        title: PropTypes.string,
    };


    state = {
        show: false
    };
    componentDidMount(){
        this.setState({
            show: this.props.show
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            show: nextProps.show
        })
    }
    hide2(){
        this.setState({
            show: false
        })
    }
    confirmFn(){
        if(this.state.confirmFn){
            this.state.confirmFn();
        }else{
            this.hide2();
        }
    }
    cancelFn(){
        if(this.state.cancelFn){
            this.state.cancelFn();
        }else{
            this.hide2();
        }
    }
    maskFn(){
        console.log('sdfsdfsfsfs')
        if(this.state.maskFn){
            this.state.maskFn();
        }else{
            this.hide2();
        }
    }

    render() {
        let { msg, mask, maskFn, confirmFn, cancelFn, render } = this.props
        
        this.state.confirmFn = confirmFn
        this.state.cancelFn = cancelFn
        this.state.maskFn = maskFn
        typeof cancelText === 'string' ? null : cancelText = '取消'
        typeof confirmText === 'string' ? null : confirmText = '确认'
        typeof title === 'string' ? null : title = '提示'
        return (
            <Modal
                visible={this.state.show}
                transparent={true}
                animationType="fade">
                <View style={[styles.dialog, styles.centerVH]}>
                    {
                        mask===false ?
                            null: 
                            <TouchableOpacity style={[styles.dialog, styles.mask]}
                                activeOpacity={1}
                                onPress={
                                    () => {
                                        console.log('【mask】click')
                                        this.maskFn();
                                    }
                                }></TouchableOpacity>
                            
                    }
                    <View style={[styles.dialog_w]}>
                        <View style={[styles.centerVH, {flex: 1}]}>
                            <Text style={styles.dialog_txt} numberOfLines={2}>{msg}</Text>
                            { this.props.render }

                        </View>
                        <View style={[styles.centerVH, styles.btns]}>
                            <TouchableOpacity
                                style={[styles.centerVH, styles.btn]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    this.cancelFn();
                                }}>
                                <Text style={styles.cancel_txt}>{cancelText||'cancel'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.centerVH, styles.btn, styles.borderLeft]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    this.confirmFn();
                                }}>
                                <Text style={styles.confirm_txt}>{confirmText||'confirm'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        );
    };

}
const styles = StyleSheet.create({
    dialog: { position: "absolute", top: 0, left: 0, width: width, height: '100%', zIndex: 90 },
    mask: { backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1 },
    dialog_w: {
        zIndex: 2, width: 300 * unitWidth, height: 150 * unitWidth, backgroundColor: 'rgba(255,255,255,1)',
        ...layout.borderRadius(4 * unitWidth), justifyContent: 'space-around', alignItems: 'center'
    },
    dialog_txt: { color: colors.white, fontSize: 13 * unitWidth, ...layout.padding(0, 10 * unitWidth), textAlign: "center" },
    centerVH: {
        ...layout.centerVH()
    },
    cancel_txt: {
        color: colors.sub_title,fontSize: size.fontSize*unitWidth
    },
    confirm_txt: {
        color: colors.title,fontSize: size.fontSize
    },
    btn: {
        flex: 1,height: 45*unitWidth,lineHeight: 45*unitWidth
    },
    borderLeft: {borderLeftColor: colors.border_color, borderLeftWidth: size.border},
    btns:{flexDirection: "row", borderTopColor: colors.border_color, borderTopWidth: size.border}
})