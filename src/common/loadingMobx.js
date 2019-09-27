import React, {
	Component,
} from 'react';
import {
	Text, View, StyleSheet, ActivityIndicator, Modal, TouchableOpacity
} from 'react-native';
const { size, colors, layout } = require('../assets/styles/theme');
const { unitWidth, width } = require("../assets/utils/adapter");
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
export default class LoadingMobx extends Component {
	constructor(props) {
		super(props)
		this.loadingState = props.rootStore.loadingState;
		this.state = {
		  deviceNo: '',
		  pageSize: ''
		}
	}
	

	state = {
		visible: true
	};

	render() {
		return (
			<Modal
				visible={this.loadingState.show}
				transparent={true}
				animationType="fade">
				<View style={[styles.loading, styles.centerVH]}>
					<View style={[styles.loading_w]}>
						<ActivityIndicator size="large" />
						<Text style={styles.loading_txt} numberOfLines={2}>{this.loadingState.msg || 'loading...'}</Text>
					</View>
					{
						this.loadingState.mask?
						<TouchableOpacity style={[styles.loading, styles.mask]}
							onPress={
								()=>{
									// console.log('【mask】click')
									this.loadingState.setShow(false);
								}
							}></TouchableOpacity>
						:null
					}
				</View>
			</Modal>
		);
	};

}
const styles = StyleSheet.create({
	loading: { position: "absolute", top: 0, left: 0, width: width, height: '100%', zIndex: 100 },
	mask: { backgroundColor: 'rgba(0,0,0,0)', zIndex: 1},
	loading_w: {
		zIndex: 2, width: 120 * unitWidth, height: 120 * unitWidth, backgroundColor: 'rgba(0,0,0,0.8)',
		...layout.borderRadius(4 * unitWidth), justifyContent: 'space-around', alignItems: 'center'
	},
	loading_txt: { color: colors.white, fontSize: 13 * unitWidth, ...layout.padding(0, 10 * unitWidth), textAlign: "center" },
	centerVH: {
		...layout.centerVH()
	},

})