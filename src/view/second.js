import React, {
	Component
} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	FlatList
} from 'react-native';
import { inject, observer } from 'mobx-react';

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
		
		return {}
	}

	render() {
		//这里可以自定义跳转属性相当于iOS中self.navigation,在跳转的时候使用
		const navigate = this.props.navigation;
		return ( 
			<View style = {
				styles.container
			} >
				<Text>timer:{this.store.timer}</Text>
				{
					(Array.isArray(this.store.list)) && this.store.list.map((v,k)=>{
						return <View><Text>value: {v}</Text></View>
					})
				}
				<View >
					<Button title = "sldfjl" 
					onPress = {
						() =>{
							let list = this.store.list;
							list.push('sdjf');
							// list.push('sdjf');
							// list.push('sdjf');
							this.store.setList(list);
						} 
						// this.props.navigation.navigate('first')
					}/>
					<Button style = {
						styles.button2
					}
					title = "Go to first"
					onPress = {
						() =>{
							this.store.tick();
						} 
						// this.props.navigation.navigate('first')
					} /> 
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
