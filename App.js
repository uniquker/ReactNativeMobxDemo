/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
    SafeAreaView,
    NativeModules,
    DeviceEventEmitter,
    AppState
} from 'react-native';
import {
    createAppContainer
} from 'react-navigation';
import { Provider, observer } from 'mobx-react'
import * as stores from './src/mobx/index';
import _tabNavigator from './src/router/index';
import { colors } from './src/assets/styles/theme';
import LoadingMobx from './src/common/loadingMobx';
import SplashScreen from 'react-native-splash-screen'
// import Loading from './src/common/loading'
// import constants from 'jest-haste-map/build/constants';
// add mobx https://juejin.im/post/5d68f14c6fb9a06b065c89b6
const { StatusBarManager } = NativeModules;

@observer
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading_show: false,
            appState: AppState.currentState
        }
        this.loading_msg = '加载中...';
        this.loading_mask = true;
    }
    loading_Fn = () => {
        this.setState({ loading_show: false })
    }
    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
            SplashScreen.show();
            //  切换应用2s后隐藏
            setTimeout(()=>{
                SplashScreen.hide();
            }, 2000);
        }
        console.log('【appstate】 is '+nextAppState)
        this.setState({ appState: nextAppState });
    }
    componentDidMount() {
        console.log('skdljfsjdf')
        AppState.addEventListener('change', this._handleAppStateChange);
        // 第一次启动3s后隐藏
        setTimeout(()=>{
            SplashScreen.hide();
      
        }, 3000);
        // loading 第一种方案
        // this.loading_emit = DeviceEventEmitter.addListener(constants.LOADING_EMIT, (notice)=>{
        //     console.log(notice)
        //     if(notice){
        //         this.setState({ loading_show: notice.show })
        //         if(notice.maskFn){
        //             this.loading_Fn = notice.maskFn;
        //         }
        //     }
        // });

        //  loading 第二种方案使用mobx状态管理


        // BackHandler.addEventListener("hardwareBackPress",  ()=> {
        //     // this.onMainScreen()和this.goBack()两个方法都只是伪方法，需要你自己去实现！
        //     // if (this.state.loading_show) {
        //     //     this.setState({ loading_show: false });
        //     //     return true;
        //     // }
        //     console.log('back is click')
        //     return false;
        // });
    }
    componentWillUnmount() {
        this.loading_emit && this.loading_emit.remove();
    }

    render() {
        const AppStack = createAppContainer(_tabNavigator);
        const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
        return (
            <Provider rootStore={stores}>
                <SafeAreaView
                    style={{ flex: 1, backgroundColor: colors.statusBarColor, marginTop: STATUSBAR_HEIGHT }}
                >
                    <StatusBar
                        animated={true}
                        barStyle={'light-content'}
                        backgroundColor={colors.statusBarColor}
                        translucent={true}
                    />
                    {
                        // this.state.loading_show ?
                        //     <Loading msg={this.loading_msg} mask={this.loading_mask} maskFn={this.loading_Fn}></Loading>
                        //     : null
                    }
                    <LoadingMobx ></LoadingMobx>
                    <AppStack />
                </SafeAreaView>
            </Provider>
        );
    };

}

