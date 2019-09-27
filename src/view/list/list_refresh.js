import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import RefreshListView from "../../components/refresh/refreshListView";
import MovieItemCell from "./MovieItemCell";
import refreshState from "../../components/refresh/refreshState";
import Header from '../../components/header';
import history from '../../common/history';
import { unitWidth } from '../../assets/utils/adapter';
const http = require('../../assets/utils/http');

export default class MovieListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],  // 电影列表的数据源
            startPage: 0,   // 从第几页开始加载
            pageSize: 10,   // 每页加载多少条数据
        };
    }

    componentDidMount() {
        this.listView.beginHeaderRefresh();
    }

    render() {
        return (
            <View style={{ height: '100%' }}>
                <Header
                    title={'List列表页'}
                    onBack={history.goBack.bind(this, this)}
                    onCenter={
                        () => {
                            this.listView && this.listView.getListViewRef().scrollToIndex({ index: 0 })
                        }
                    }
                />
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <RefreshListView
                        ref={(ref) => { this.listView = ref }}
                        data={this.state.movieList}
                        renderItem={this._renderItem}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={this._renderEmptyView}
                        onHeaderRefresh={() => {
                            // 下拉刷新清空数据，重置页码
                            console.log('doing header refresh')
                            this.setState({ movieList: [], startPage: 0 }, () => {
                                this.loadDisplayingMovies()
                            })
                        }}
                        onFooterRefresh={() => { console.log('doing footer loading');this.loadDisplayingMovies() }}
                        emptyView={
                            <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <Image source={require('../../static/img/nodata.png')} style={{width: 48*unitWidth, height: 48*unitWidth}}></Image>
                                <Text>no data.</Text>
                            </View>
                        }
                    />

                </View>
            </View>
        )
    }

    _renderItem = (item) => {
        return (
            <MovieItemCell movie={item.item} onPress={() => {
                console.log('点击了电影----' + item.item.title);
            }} />
        )
    };

    /// 渲染一个空白页，当列表无数据的时候显示。这里简单写成一个View控件
    _renderEmptyView = (item) => {
        return <View />
    };

    queryMovies(city, start, count) {
        console.log("index " + start)
        return "/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=10&page_start=" + start
    }
    /**
     * 加载正在上映的电影列表，此处默认城市为北京，取20条数据显示
     */
    loadDisplayingMovies() {
        let that = this;
        http.get(this.queryMovies('北京', this.state.startPage, this.state.pageSize), {}).then((json) => {
            console.log(json);
            let movies = [];
            for (let idx in json.subjects) {
                let movieItem = json.subjects[idx];
                let directors = movieItem.title; // 导演
                // for (let index in movieItem.directors) {
                //     // 得到每一条电影的数据
                //     let director = movieItem.directors[index];
                //     // 将多个导演的名字用空格分隔开显示
                //     if (directors === "") {
                //         directors = directors + director.name
                //     } else {
                //         directors = directors + " " + director.name
                //     }
                // }
                movieItem["directorNames"] = directors;

                // 拼装主演的演员名字，多个名字用空格分隔显示
                let actors = "";
                // for (let index in movieItem.casts) {
                //     let actor = movieItem.casts[index];
                //     if (actors === "") {
                //         actors = actors + actor.name
                //     } else {
                //         actors = actors + " " + actor.name
                //     }
                // }
                movieItem["actorNames"] = actors;
                movies.push(movieItem)
            }
            // 获取总的条数
            let totalCount = json.total || 50;

            // 当前已经加载的条数
            let currentCount = this.state.movieList.length;

            // 根据已经加载的条数和总条数的比较，判断是否还有下一页
            let footerState = refreshState.Idle;
            let startPage = this.state.startPage;
            if (currentCount + movies.length < totalCount) {
                // 还有数据可以加载
                footerState = refreshState.CanLoadMore;
                // 下次加载从第几条数据开始
                startPage = startPage + movies.length;
            } else {
                footerState = refreshState.NoMoreData;
            }
            // 更新movieList的值
            let movieList = this.state.movieList.concat(movies);
            // 测试空数据
            // let movieList = [];
            that.setState({
                movieList: movieList,
                startPage: startPage
            });
            that.listView.endRefreshing(footerState);
        }).catch((e) => {
            console.log("加载失败");
            that.listView.endRefreshing(refreshState.Failure);
        }).done();
    }
}