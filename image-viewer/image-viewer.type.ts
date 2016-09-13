import * as React from 'react'
import * as ReactNative from 'react-native'

export interface PropsDefine extends ReactNative.ViewProperties {

}

export class PropsGaea {
    gaeaName = '大图浏览'
    gaeaIcon = 'square-o'
    gaeaUniqueKey = 'nt-image-viewer'
}

export class Props extends PropsGaea implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}
                