import { AsyncStorage } from 'react-native'
import { observable, computed, action, autorun } from 'mobx'

/** 控制loading状态 */
class LoadingState {
    @observable show = false;
    /**
     * 保存对象的action
     * @param bean
     */
    @action setShow = show => {
        this.show = show;
        if(show){
            autorun(() => {
                this.show = false;
            }, { delay: 3000 });//此处可以设置超时时间
        }
    };

    @observable mask = true;
    /**
     * 保存对象的action
     * @param bean
     */
    @action setMask = mask => {
        this.mask = mask;
    };

    
    @observable msg = '加载中...';
    /**
     * 保存对象的action
     * @param bean
     */
    @action setMsg = msg => {
        this.msg = msg;
    };


    /**
     *创建构造函数
     */
    constructor() {
        this._constructor();
    }

    async _constructor() {

    }
}
export default new LoadingState()