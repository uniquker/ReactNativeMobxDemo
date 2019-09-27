import React, { Component } from 'react';
import { FlatList, View, NativeModules } from 'react-native';
import PropTypes from 'prop-types';
import refreshState from './refreshState';
import RefreshFooter from './refreshFooter';

export default class RefreshListView extends Component {

    static propTypes = {
        onHeaderRefresh: PropTypes.func, // 下拉刷新的方法
        onFooterRefresh: PropTypes.func, // 上拉加载的方法
        emptyView: PropTypes.object      // 自定义空数据View
    };

    static defaultProps = {
		emptyView: null
    };
    
    constructor(props) {
        super(props);
        this.state = {
            isHeaderRefreshing: false,  // 头部是否正在刷新
            isFooterRefreshing: false,  // 尾部是否正在刷新
            footerState: refreshState.Idle, // 尾部当前的状态，默认为Idle，不显示控件
            width: 0,
            height: 0,
        }
    }

    render() {
        return (
            <FlatList
                ref={(r)=>{
                    this._flatList = r;
                }}
                {...this.props}
                onRefresh={() => { this.beginHeaderRefresh() }}
                refreshing={this.state.isHeaderRefreshing}
                onEndReached={() => { this.beginFooterRefresh() }}
                onEndReachedThreshold={0.1}  // 这里取值0.1，可以根据实际情况调整，取值尽量小
                ListFooterComponent={this._renderFooter}
                ListEmptyComponent={()=>{
                    return <View style={{width: this.state.width, height: this.state.height}}>
                        {
                            this.state.footerState == refreshState.EmptyData? 
                            this.props.emptyView
                            :null
                        }
                    </View>
                }}
                onLayout={
                    (e) => {
                        NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                            // 计算flatList得实际宽高，为布局使用
                            this.setState({
                                width: width,
                                height: height
                            })
                        });
                    }
                }
            />
        )
    }

    getListViewRef() {
        return this._flatList;
    }

    _renderFooter = () => {
        return (
            <RefreshFooter
                state={this.state.footerState}
                onRetryLoading={() => {
                    this.beginFooterRefresh()
                }}
            />
        )
    };

    /// 尾部组件的状态，供外部调用，一般不会用到
    footerState() {
        return this.state.footerState;
    }

    /// 开始下拉刷新
    beginHeaderRefresh() {
        if (this.shouldStartHeaderRefreshing()) {
            const nowTimestamp = new Date().getTime();
            const subTimestamp = nowTimestamp - this.lastTimesttamp;
            if (subTimestamp < 500) {
                return;
            }
            this.lastTimesttamp = new Date().getTime();
            this.startHeaderRefreshing();
        }
    }

    /// 开始上拉加载更多
    beginFooterRefresh() {
        if (this.shouldStartFooterRefreshing()) {
            const nowTimestamp = new Date().getTime();
            const subTimestamp = nowTimestamp - this.lastTimesttamp;
            if (subTimestamp < 500) {
                return;
            }
            this.lastTimesttamp = new Date().getTime();
            this.startFooterRefreshing();
        }
    }

    /// 下拉刷新，设置完刷新状态后再调用刷新方法，使页面上可以显示出加载中的UI，注意这里setState写法
    startHeaderRefreshing() {
        this.setState(
            {
                isHeaderRefreshing: true
            },
            () => {
                this.props.onHeaderRefresh && this.props.onHeaderRefresh();
            }
        );
    }

    /// 上拉加载更多，将底部刷新状态改为正在刷新，然后调用刷新方法，页面上可以显示出加载中的UI，注意这里setState写法
    startFooterRefreshing() {
        this.setState(
            {
                footerState: refreshState.Refreshing,
                isFooterRefreshing: true
            },
            () => {
                this.props.onFooterRefresh && this.props.onFooterRefresh();
            }
        );
    }

    /***
     * 当前是否可以进行下拉刷新
     * @returns {boolean}
     *
     * 如果列表尾部正在执行上拉加载，就返回false
     * 如果列表头部已经在刷新中了，就返回false
     */
    shouldStartHeaderRefreshing() {
        if (this.state.footerState === refreshState.refreshing ||
            this.state.isHeaderRefreshing ||
            this.state.isFooterRefreshing) {
            return false;
        }
        return true;
    }

    /***
     * 当前是否可以进行上拉加载更多
     * @returns {boolean}
     *
     * 如果底部已经在刷新，返回false
     * 如果底部状态是没有更多数据了，返回false
     * 如果头部在刷新，则返回false
     * 如果列表数据为空，则返回false（初始状态下列表是空的，这时候肯定不需要上拉加载更多，而应该执行下拉刷新）
     */
    shouldStartFooterRefreshing() {
        if (this.state.footerState === refreshState.refreshing ||
            this.state.footerState === refreshState.NoMoreData ||
            this.props.data.length === 0 ||
            this.state.isHeaderRefreshing ||
            this.state.isFooterRefreshing) {
            return false;
        }
        return true;
    }

    /**
     * 根据尾部组件状态来停止刷新
     * @param footerState
     *
     * 如果刷新完成，当前列表数据源是空的，就不显示尾部组件了。
     * 这里这样做是因为通常列表无数据时，我们会显示一个空白页，如果再显示尾部组件如"没有更多数据了"就显得很多余
     */
    endRefreshing(footerState: refreshState) {
        let footerrefreshState = footerState;
        if (this.props.data.length === 0) {
            footerrefreshState = refreshState.EmptyData;
        }
        this.setState({
            footerState: footerrefreshState,
            isHeaderRefreshing: false,
            isFooterRefreshing: false
        })
    }
}