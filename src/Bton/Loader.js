import React from "react"
import { View, StyleSheet,useWindowDimensions,ActivityIndicator,Text } from "react-native"
import COLORS from "./COLORS";
const Loader = ({ visible = false }) => {
    const {height,width}=useWindowDimensions();
    return visible && <View style={[styles.contianer,{height,width}]}>
     <View style={styles.loader}>
        <ActivityIndicator size={"large"} color={COLORS.blue}/>
        <Text style={styles.load}>Loading...</Text>
     </View>
    </View>
}
const styles = StyleSheet.create({
    contianer: {
        position:"absolute",
        zIndex:10,
        backgroundColor:'rgb(0,0,0,0.5)',
        justifyContent:"center"
    },
    loader:{
        height:70,
        backgroundColor:COLORS.white,
        marginHorizontal:50,
        borderRadius:5,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:20
    },
    load:{
        marginLeft:10,
        fontSize:16
    }
})
export default Loader