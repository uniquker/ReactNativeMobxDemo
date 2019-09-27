# ReactNativeMobxDemo
一个react-native+mobx的完整app demo，包含基础框架搭建、路由封装、导航栏封装、网络请求、列表下拉刷新上拉加载更多、loading、alert、Android端app启动页

___
__项目参考了：https://github.com/niunai2016/ReactNativeAppDemo，有兴趣可以看一下__

# mobx安装
devDependencies中得babel相关得东西一定要完整，
```
$ yarn add mobx mobx-react
$ yarn add @babel/cli @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-classes @babel/plugin-transform-flow-strip-types @babel/plugin-transform-runtime @babel/polyfill @babel/preset-env @babel/preset-flow @babel/preset-react babel-loader babel-plugin-import babel-plugin-module-resolver babel-plugin-transform-runtime babel-polyfill babel-preset-es2015 babel-preset-react babel-preset-react-native babel-preset-react-native-stage-0 babel-preset-react-native-syntax -D
```

`babel.config.js`添加如下代码：

```js
{
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-flow'],
  plugins: [
    '@babel/transform-flow-strip-types',
    [
      '@babel/plugin-proposal-decorators', { 'legacy' : true }
    ],
    [
      '@babel/plugin-proposal-class-properties', {'loose': true}
    ],
    [
      '@babel/plugin-transform-runtime', {}
    ],
    ['import', { 'libraryName': '@ant-design/react-native' }]
  ]
}
```

在`src`下新建`mobx/user.js`和`stores/index.js`

`stores/user.js`示例：
```js
import { observable, computed, action } from 'mobx'
import { AsyncStorage } from 'react-native'
/** 存储登录信息*/
class User {
    @observable
    list = [];

    @observable
    timer = 0

    @action
    async setList(data) {
        this.list = data;
        try {
            let jsonStr = JSON.stringify(data.slice());
            await AsyncStorage.setItem('list', jsonStr);
        } catch (error) {
            console.log(error)            
        }
    }

    @action
    resetTimer() {
        this.timer = 0
    }

    @action
    tick() {
        this.timer += 1
    }

    info = observable({
        // observable 属性:
        name: "John",
        age: 42,
        showAge: false,
    
        // 计算属性:
        get labelText() {
            return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
        },
    
        // 动作:
        setAge(age) {
            this.showAge = true;
            this.age = age;
        }
    }, {
        setAge: action
    })
    constructor() {
        this._constructor();
    }

    async _constructor() {
        AsyncStorage.getItem('list').then(r=>{
            console.log(r);

        });
        AsyncStorage.getItem('list').then(jsonStr=>{
            let list = JSON.parse(jsonStr);
            if(Array.isArray(list) && list.length){
                this.list = list;
            }
            console.log('user init list: '+JSON.stringify(this.list))
        })
    }
}
export default new User()
```

在`App.js`中新增`mobx`,具体使用参考[mobx中文文档](https://cn.mobx.js.org/)

`App.js`示例：

```js
...
import { Provider, observer } from 'mobx-react'
import * as stores from './src/stores/index';

@observer
export default class App extends Component {
  ...

  render() {
    return (
      <Provider rootStore={stores}>
        ...
      </Provider>
    );
  }
}

```
在`detail/detail.js list/index.js`中查看详细mobx得调用，下面是简单使用模板

```js

import {inject, observer} from 'mobx-react';

//注入store
@inject('rootStore')
@observer
export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      name: props.navigation.state.params.name
    }
    this.store = props.rootStore.user
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={'List列表页'}
          onBack={history.goBack.bind(this, this)}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          
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

```
# Android api使用了28
在gradle后可以一键把所有不兼容api更新为AndroidX。
Refactor->Migrate to AndroidX...
___
不喜勿喷
本文档纯属个人记录，有问题可以留言
