"use strict";

var react_native_1 = require('react-native');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    modalContainer: {
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    count: {
        position: 'absolute',
        width: react_native_1.Dimensions.get('window').width,
        top: 38,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    countText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {
            width: 0, height: 0.5
        },
        textShadowRadius: 0
    },
    watchOrigin: {
        position: 'absolute',
        width: react_native_1.Dimensions.get('window').width,
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    watchOriginTouchable: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 0.5,
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    watchOriginText: {
        color: 'white',
        backgroundColor: 'transparent'
    },
    imageStyle: {},
    container: {
        backgroundColor: 'black'
    },
    moveBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuContainer: {
        position: 'absolute',
        width: react_native_1.Dimensions.get('window').width,
        height: react_native_1.Dimensions.get('window').height,
        left: 0,
        bottom: 0
    },
    menuShadow: {
        position: 'absolute',
        width: react_native_1.Dimensions.get('window').width,
        height: react_native_1.Dimensions.get('window').height,
        backgroundColor: 'black',
        left: 0,
        bottom: 0,
        opacity: 0.2,
        zIndex: 10
    },
    menuContent: {
        position: 'absolute',
        width: react_native_1.Dimensions.get('window').width,
        left: 0,
        bottom: 0,
        zIndex: 11
    },
    operateContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 40
    },
    operateText: {},
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: react_native_1.Dimensions.get('window').width,
        height: react_native_1.Dimensions.get('window').height
    },
    failContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: react_native_1.Dimensions.get('window').width,
        height: react_native_1.Dimensions.get('window').height
    },
    failImage: {
        width: 90,
        height: 60
    }
};