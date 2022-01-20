import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import Reviews from '../../Components/Reviews';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';



const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return useCallback(() => updateState({}), []);
}


const AllReviews = () => {

    const forceUpdate = useForceUpdate()
    const keyExtractor = ((item, index) => index.toString())
    const [data, setData] = useState([
        { name: "William David", img: require("../../assets/reviewImg1.png") },
        { name: "Richard Thomas", img: require("../../assets/review1.png") },
        { name: "William David", img: require("../../assets/reviewImg1.png") },
        { name: "Richard Thomas", img: require("../../assets/review1.png") },
        { name: "William David", img: require("../../assets/reviewImg1.png") },
        { name: "Richard Thomas", img: require("../../assets/review1.png") }
    ])

    const [total, setTotal] = useState(0);

  

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            <SafeAreaView style={{ flex: 1, height: Dimensions.get('window').height,marginTop:10 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row',  justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => goBack()}
                            style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                            <ArrowLeft />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontFamily: 'PMe', fontSize: 16, color: acolors.white }}>All Reviews</Text>
                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: 'rgba(255,255,255,0.5)',alignSelf:'center' }}>(45)</Text>
                        </View>
                        <Text>          </Text>
                    </View>
                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FCFCFC", marginTop: 20, }}>Here are all the review</Text>
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={data}
                        contentContainerStyle={{paddingBottom:400}}
                        showsVerticalScrollIndicator={false}
                        style={{ height: "100%" }}
                        renderItem={({item}) => (
                            <Reviews
                                name={item.name}
                                image={item.img}
                                review="Lorem ipsum dolor sit , consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                                rattings="4.5"
                            />
                            // <ServicesView item={item.item} index={item.index} />
                        )}
                    />
                </View>
            </SafeAreaView>
        </View>


    )
}

export default AllReviews
