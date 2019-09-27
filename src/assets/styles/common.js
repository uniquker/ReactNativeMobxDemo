import { StyleSheet } from 'react-native'
import { colors, size, layout } from './theme';
import { unitWidth } from '../utils/adapter';

export default StyleSheet.create({
    btn: {
        marginTop: 20,
        width: 100,
        height: 40,
        ...layout.centerVH(),
        backgroundColor: colors.statusBarColor
    },
    btn_txt: {
        color: '#fff'
    },
    split_bar: {
        width: '100%',color: '#666',backgroundColor: colors.bg_gray, height: 30*unitWidth,lineHeight: 30*unitWidth,
        paddingLeft: 10*unitWidth, fontSize: size.fontSize, marginTop: 20*unitWidth, ...layout.borderWidth(0, 0, 0, 4*unitWidth),
        borderLeftColor: colors.statusBarColor
    },
    flexCenter: {
        flexDirection: "row", justifyContent: "center", alignItems: "center"
    }
})