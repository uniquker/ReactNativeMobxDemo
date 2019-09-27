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
    // 作者：牛奶
    // 链接：https://juejin.im/post/5cbee18df265da03937869a8
    // 来源：掘金
    // 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
}
export default new User()