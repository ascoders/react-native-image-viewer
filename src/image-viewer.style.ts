import { ViewStyle, TextStyle, ImageStyle } from 'react-native'

export default (width: number, height: number) => {
    return {
        modalContainer: {
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        } as ViewStyle,
        watchOrigin: {
            position: 'absolute',
            width: width,
            bottom: 20,
            justifyContent: 'center',
            alignItems: 'center'
        } as ViewStyle,
        watchOriginTouchable: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            borderRadius: 30,
            borderColor: 'white',
            borderWidth: 0.5,
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        } as ViewStyle,
        watchOriginText: {
            color: 'white',
            backgroundColor: 'transparent'
        } as TextStyle,
        imageStyle: {} as ImageStyle,
        container: {
            backgroundColor: 'black'
        } as ViewStyle,
        // 多图浏览需要调整整体位置的盒子
        moveBox: {
            flexDirection: 'row',
            alignItems: 'center'
        } as ViewStyle,
        menuContainer: {
            position: 'absolute',
            width: width,
            height: height,
            left: 0,
            bottom: 0
        } as ViewStyle,
        menuShadow: {
            position: 'absolute',
            width: width,
            height: height,
            backgroundColor: 'black',
            left: 0,
            bottom: 0,
            opacity: 0.2,
            zIndex: 10
        } as ViewStyle,
        menuContent: {
            position: 'absolute',
            width: width,
            left: 0,
            bottom: 0,
            zIndex: 11
        } as ViewStyle,
        operateContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            height: 40,
            borderBottomColor: '#ccc',
            borderBottomWidth: 1
        } as ViewStyle,
        operateText: {
            color: '#333'
        },
        loadingTouchable: {
            width: width,
            height: height
        } as ViewStyle,
        loadingContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            height: height
        } as ViewStyle,
        failContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            height: height
        } as ViewStyle,
        failImage: {
            width: 90,
            height: 60
        },
        arrowLeftContainer: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            justifyContent: 'center'
        } as ViewStyle,
        arrowRightContainer: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            justifyContent: 'center'
        } as ViewStyle
    }
}

export const simpleStyle = {
    count: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 38,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    } as ViewStyle,
    countText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {
            width: 0, height: 0.5
        },
        textShadowRadius: 0
    } as TextStyle
}