import React from 'react'
import { View, Text, Image } from 'react-native'
import { RattingStarIcon } from './Svgs'

const Reviews = (props) => {
    return (
        <View style={{ flexDirection: 'row', color: 'white', marginTop: 20, borderBottomWidth: props.last ? 0 : 0.5, paddingBottom: 30, borderColor: '#707070' }}>
            <Image
                source={props.image}
            />
            <View style={{ marginLeft: 15 }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: 'white' }}>{props.name}</Text>
                <Text style={{ color: 'rgba(252, 252, 252, 0.3)', fontSize: 12, fontFamily: 'PRe' }}>10 May 2021 04:30 PM</Text>
                <Text numberOfLines={3} style={{ fontSize: 14, fontFamily: 'PRe', color: 'rgba(255,255,255,0.8)', width: 245,  marginTop: 5 }}>{props.review}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <RattingStarIcon />
                <RattingStarIcon styles={{ marginLeft: 7 }} />
                <RattingStarIcon styles={{ marginLeft: 7 }} />
                <RattingStarIcon styles={{ marginLeft: 7 }} />
                <RattingStarIcon styles={{ marginLeft: 7 }} />
                {/* <Text style={{ marginLeft: 10, marginTop: -2, fontFamily: 'PMe', color: 'white' }}>5.0</Text> */}
            </View>
            {/* <Text style={{position: 'absolute',right: 5,fontSize:16,fontFamily:'PMe',color:'white'}}>{props.rattings}</Text> */}
        </View>
    )
}

export default Reviews
