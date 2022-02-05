import React from 'react'
import { View, Text, Image } from 'react-native'
import { RattingStarIcon } from './Svgs'

const Reviews = (props) => {

    const MakeReview = ({ number }) => {
        console.log(number)
        var stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                // <View>
                <RattingStarIcon color={i > number ? "grey" : null} />
                // </View>
            )
        }
        return <View style={{ flexDirection: 'row' }}>{stars}</View>

    }
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    function make_datetime(v) {
        if (v) {
            var t = v.split(/[- :]/);
            var v = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
            const month = months[v.getMonth()];
            const date = v.getDate();
            const year = v.getFullYear();
            const hours = v.getHours();
            const minutes = v.getMinutes();
            console.log(v)
            let timeString = date + " " + month + " " + year + "  " + hours + ":" + minutes;
            return timeString;
        }
        else return null;
    }

    return (
        <View
            key={props.key}
            style={{ flexDirection: 'row', color: 'white', marginTop: 20, borderBottomWidth: props.last ? 0 : 0.5, paddingBottom: 30, borderColor: '#707070', width: "100%", }}>
            <Image
                source={{ uri: props.image }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
            />

            <View style={{ marginLeft: 10, width: "65%", }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: 'white' }}>{props.name}</Text>
                <Text style={{ color: 'rgba(252, 252, 252, 0.3)', fontSize: 12, fontFamily: 'PRe' }}>{make_datetime(props.rev_datetime)}</Text>
                <Text numberOfLines={3} style={{ fontSize: 14, fontFamily: 'PRe', color: 'rgba(255,255,255,0.8)', marginTop: 5 }}>{props.review}</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <MakeReview number={props.rattings} />
            </View>
            {/* <Text style={{position: 'absolute',right: 5,fontSize:16,fontFamily:'PMe',color:'white'}}>{props.rattings}</Text> */}
        </View>
    )
}

export default Reviews
