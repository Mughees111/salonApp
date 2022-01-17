
import React from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  StyleSheet
} from "react-native";

 
import { Container,Right, Left,  ListItem, Radio } from 'native-base';

 

  
  const Confirm= (props) => {
    const [data, setData] = React.useState(props.data);
    const [filteredData, setFilteredData] = React.useState(props.data);
    const [modal, setModal] = React.useState(true);
    const [current, setCurrnet] = React.useState(props.selected);


    return (
        <View style={{}}>
         
            <Modal
                animationType="slide"
                transparent={true}

                style={{

                }}
                visible={modal}
                onRequestClose={() => {
                   setModal(false)
                   props.Cancel()
                }}
            >
                <Container style={{backgroundColor:"rgba(0,0,0,0.7)",justifyContent:"center",alignItems:"center"}}>
                  <View style={{
                    backgroundColor:"#fff",
                    borderRadius:8,
                    width:"70%",overflow:"hidden"
                  }}>
                    <View style={{alignItems:"center",justifyContent:"center",paddingVertical:5,borderBottomWidth:1,borderColor:"#f2f2f2"}}>
                      <Text style={{fontFamily: 'PB', fontSize: 18}}>{props.title ?? "Sure?"}</Text>
                    </View>
                    <View style={{alignItems:"center", width:"80%", justifyContent:"center",paddingVertical:5, alignSelf:"center",  marginTop:20, paddingBottom:30}}>
                      <Text style={{fontFamily: 'PR', fontSize: 13, flexWrap:"wrap",textAlign:"center" }}>{props.text ?? "Are you sure about this?"}</Text>
                    </View>

                    <View style={{ borderBottomWidth:1,borderColor:"#f2f2f2",width:"100%"}}></View>

                  <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <TouchableOpacity
                    onPress={()=>props.Cancel()}
                    
                    style={{
                      paddingVertical:10,
                      flex:0.5,borderRightWidth:StyleSheet.hairlineWidth,borderColor:"#f2f2f2",
                      justifyContent:"center",
                      alignSelf:"center"
                    }}>
                      <Text style={{textAlign:"center",fontFamily:"PB"}}>{props.btn1 ?? "Cancel"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>props.Confirm()}
                    style={{
                      paddingVertical:10,
                      flex:0.5,borderRightWidth:StyleSheet.hairlineWidth,borderColor:"#f2f2f2",
                      justifyContent:"center",
                      alignSelf:"center",
                      backgroundColor:"#FCC732"
                    }}>
                      <Text style={{textAlign:"center",fontFamily:"PB",color:"#fff"}}>{props.btn2 ?? "Confirm"}</Text>
                    </TouchableOpacity>
                  </View>

                  </View>


                </Container>
            </Modal>
        </View>);
     
};
export default Confirm;
