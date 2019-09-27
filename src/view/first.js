import React, {
	Component
} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import {autorun} from "mobx";

@inject('rootStore')
@observer
export default class firstPage extends Component {

	constructor(props) {
		super(props);
		this.store = props.rootStore.user
		this.state = {
			isLoading: true
		}
	}
	componentDidMount() {
		autorun(() => console.log(this.store.info.labelText));
	}

	render() {
		//这里可以自定义跳转属性相当于iOS中self.navigation,在跳转的时候使用
		const navigate = this.props.navigation;
		return ( 
			<View style = {
				styles.container
			} >
				<Text>data: {this.store.timer}</Text>
				<Text>data: {this.store.info.name}</Text>
				<Text>data: {this.store.info.labelText}</Text>
				{
					(Array.isArray(this.store.list)) && this.store.list.map((v,k)=>{
						return <View><Text>value: {v}</Text></View>
					})
				}
				<View >
					<Button title = "sldfjl"
					onPress = {
						() => this.store.info.setAge(12)
					} />
					<Button style = {
						styles.button2
					}
					title = "Go to second"
					onPress = {
						() => this.props.navigation.navigate('second')
					} /> 
					
				</View>
				<View style={{marginTop: 30}}>
					
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22,
		padding: 30,
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
	button2: {
		paddingTop: 20,
		marginBottom: 20
	}
})
