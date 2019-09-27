import React, {
	Component,
} from 'react';
import {
	Text, View, StyleSheet, ActivityIndicator, Modal, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
const { size, colors, layout } = require('../assets/styles/theme');
const { unitWidth, width } = require("../assets/utils/adapter");

export default class Loading extends Component {
	static propTypes = {
		show: PropTypes.bool,
		msg: PropTypes.string,
		mask: PropTypes.bool,
		maskFn: PropTypes.func
	};

	static defaultProps = {
		show: false,
		msg: '',
		mask: true,
		maskFn: null,
	};

	state = {
		visible: true
	};

	render() {
		return (
			<Modal
				visible={this.state.visible}
				transparent={true}
				animationType="fade">
				<View style={[styles.loading, styles.centerVH]}>
					<View style={[styles.loading_w]}>
						<ActivityIndicator size="large" />
						<Text style={styles.loading_txt} numberOfLines={2}>{this.props.msg || 'loading...'}</Text>
					</View>
					{
						this.props.mask?
						<TouchableOpacity style={[styles.loading, styles.mask]}
							onPress={
								()=>{
									// console.log('【mask】click')
									this.props.maskFn && (this.props.maskFn());
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