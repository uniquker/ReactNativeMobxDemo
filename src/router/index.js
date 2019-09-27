import React, {
	Component
} from 'react';
import first from '../view/first';
import second from '../view/second';
import detail from '../view/detail/detail';
import list from '../view/list/list';
import listIndex from '../view/list/index';
import listRefresh from '../view/list/list_refresh';
import iconfont from '../view/iconfont/index';
import {TabNav} from './menu';
import {
	createStackNavigator,
} from 'react-navigation';

function router(path, screen){
    return {
        path,
        screen
    }
}

const stackRouters = {
    main: TabNav,
    first: router('/first', first),
    second: router('/second', second),
    detail: router('/detail', detail),
    list: router('/list', list),
    listIndex: router('/listIndex', listIndex),
    listRefresh: router('/listRefresh', listRefresh),
    iconfont: router('/iconfont', iconfont),
}

export default createStackNavigator(stackRouters, {
    initialRouteName: 'main',
    headerMode: 'none'
})



