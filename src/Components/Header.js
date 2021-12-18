import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { goBack } from '../../Navigations'
import { ArrowLeft } from './Svgs'
import { acolors } from './AppColors';

export const Header = ({title}) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginTop:10 }}>
            <TouchableOpacity
                onPress={() => goBack()}
                style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'PMe', fontSize: 16, color: acolors.white }}>{title}</Text>
            <Text>          </Text>
        </View>
    )
}


