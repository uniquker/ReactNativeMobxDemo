import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {inject, observer} from "mobx-react/native";

const userBean = {
    id: 123,
    name: 'zs',
    age: 14,
};

@inject('user')
@observer
export default class Main extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        const {user} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        user.setUserBean(userBean)
                    }}
                    style={styles.save}
                >
                    <Text>
                        保存登录信息
                    </Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                    实时显示保存信息： {JSON.stringify(user.userbean)}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        user.setUserBean(null)
                    }}
                    style={styles.clear}
                >
                    <Text>
                        清除登录信息
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    save: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#10ffd6'
    },
    clear: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff540b'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});