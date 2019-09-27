
const {unitWidth, width, unitWidth2x} = require("../utils/adapter");

export const size = {
	border: 0.6*unitWidth,
	radius: 4*unitWidth,
	fontSize: 14*unitWidth,
};
/**
 * 控制全app的颜色
 * @type {{statusBarColor: string}}
 */
export const colors = {
    statusBarColor: '#7b59c0',
	primary: "#ed781f",
	title: "#333333",
	sub_title: "#999999",
	white: "#ffffff",
	bg_gray: "#f9f9f9",
	border_color: "#dddddd",

}

export const layout = {
	centerVH(){
		return {
			justifyContent: 'center',
			alignItems: 'center',
		}
	},
	
	margin(...arg) {
		let margin = {};
		switch (arg.length) {
			case 1:
				margin = {
					marginTop: arg[0],
					marginRight: arg[1],
					marginBottom: arg[2],
					marginLeft: arg[3]
				};
				break;
			case 2:
				margin = {
					marginVertical: arg[0],
					marginHorizontal: arg[1]
				};
				break;
			case 3:
				margin = {
					marginTop: arg[0],
					marginHorizontal: arg[1],
					marginBottom: arg[2]
				};
				break;
			case 4:
				margin = {
					marginTop: arg[0],
					marginRight: arg[1],
					marginBottom: arg[2],
					marginLeft: arg[3]
				};
				break;
			default:
				break;
		}
		return margin;
	},
	
	padding(...arg) {
		let padding = {};
		switch (arg.length) {
			case 1:
				padding = {
					paddingTop: arg[0],
					paddingRight: arg[1],
					paddingBottom: arg[2],
					paddingLeft: arg[3]
				};
				break;
			case 2:
				padding = {
					paddingVertical: arg[0],
					paddingHorizontal: arg[1]
				};
				break;
			case 3:
				padding = {
					paddingTop: arg[0],
					paddingHorizontal: arg[1],
					paddingBottom: arg[2]
				};
				break;
			case 4:
				padding = {
					paddingTop: arg[0],
					paddingRight: arg[1],
					paddingBottom: arg[2],
					paddingLeft: arg[3]
				};
				break;
			default:
				break;
		}
		return padding;
	},

	borderWidth(...arg) {
		let borderWidth = {};
		switch (arg.length) {
			case 1:
				borderWidth = {
					borderTopWidth: arg[0],
					borderRightWidth: arg[0],
					borderBottomWidth: arg[0],
					borderLeftWidth: arg[0]
				};
				break;
			case 2:
				borderWidth = {
					borderTopWidth: arg[0],
					borderRightWidth: arg[1],
					borderBottomWidth: arg[0],
					borderLeftWidth: arg[1]
				};
				break;
			case 3:
				borderWidth = {
					borderTopWidth: arg[0],
					borderRightWidth: arg[1],
					borderBottomWidth: arg[2],
					borderLeftWidth: arg[1]
				};
				break;
			case 4:
				borderWidth = {
					borderTopWidth: arg[0],
					borderRightWidth: arg[1],
					borderBottomWidth: arg[2],
					borderLeftWidth: arg[3]
				};
				break;
			default:
				break;
		}
		return borderWidth;
	},
	
	borderRadius(...arg) {
		let obj = {};
		switch (arg.length) {
			case 1:
				obj = {
					borderTopLeftRadius: arg[0],
					borderTopRightRadius: arg[0],
					borderBottomLeftRadius: arg[0],
					borderBottomRightRadius: arg[0]
				};
				break;
			case 2:
				obj = {
					borderTopLeftRadius: arg[0],
					borderTopRightRadius: arg[1],
					borderBottomLeftRadius: arg[0],
					borderBottomRightRadius: arg[1]
				};
				break;
			case 3:
				obj = {
					borderTopLeftRadius: arg[0],
					borderTopRightRadius: arg[1],
					borderBottomLeftRadius: arg[2],
					borderBottomRightRadius: arg[1]
				};
				break;
			case 4:
				obj = {
					borderTopLeftRadius: arg[0],
					borderTopRightRadius: arg[1],
					borderBottomLeftRadius: arg[2],
					borderBottomRightRadius: arg[3]
				};
				break;
			default:
				break;
		}
		return obj;
	}

}