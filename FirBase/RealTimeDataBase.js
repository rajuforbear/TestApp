import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, FlatList, TextBase, Alert } from 'react-native'
import database from '@react-native-firebase/database';
const RealTimeDataBase = () => {

    const [inputValue, setInputValue] = useState()
    const [list, setList] = useState([])
    const [iseUpdate, setUpdate] = useState(false)
    const [cardInputindex, setCardInputIndex] = useState(null)

    useEffect(
        () => {
            getData()
        }, []

    )
    const getData = async () => {
        try {
            //const data = await database().ref('Users').once('value');
            await database().ref('Users').once('value', (tempData) => {
                setList(tempData.val())
            });
            // console.log(data)

        }
        catch (err) {
            console.log(err)
        }
    }

    const handleDataupdate = async () => {
        try {
            await database().ref(`Users/${cardInputindex}`).update({
                value: inputValue
            })
            setInputValue('')
            setUpdate(false)
        }
        catch (err) {
            console.log(err)
        }
    }
    const handlecardPress = (cardIndex, inputValue) => {
        try {
            setUpdate(true)
            setInputValue(inputValue)
            setCardInputIndex(cardIndex)
        } catch (error) {

        }

    }
    const handleData = async () => {
        try {

            const index = list.length
            const respones = await database().ref(`Users/${index}`).set({
                value: inputValue
            });
            console.log(respones)
            setInputValue('')

        } catch (error) {
            console.log(error)
        }
    }
    const handleLognpress = async (cardIndex,BoxValue) => {
            try {
                Alert.alert("Alert",`Are you sure to ${BoxValue}`,
                [
                    {
                        text:"CANCLE",
                        onPress:()=>{
                            console.log("cancle preessed")
                        }
                    },
                    {
                        text:"OK",
                        onPress: async()=>{

                            try
                            {
                                await database().ref(`/Users/${cardIndex}`).remove()
                            }
                            catch(err)
                            {
                                console.log(err)
                            }
                            
                        }
                    }
                ])
                
            } catch (error) {
                console.log(error)
            }
    }

    return (
        <View style={styles.container}>
            <View>
                <TextInput style={styles.inputBox} placeholder='Enter any value' value={inputValue} onChangeText={(txt) => { setInputValue(txt) }} />
                {
                    !iseUpdate ? (
                        <TouchableOpacity style={styles.btn} onPress={() => { handleData() }}><Text style={styles.text}>Add</Text></TouchableOpacity>
                    )
                        : (
                            <TouchableOpacity style={styles.btn} onPress={() => { handleDataupdate() }}><Text style={styles.text}>Update</Text></TouchableOpacity>
                        )
                }
            </View>

            <View style={styles.cardContainer}>
                <Text style={{ marginVertical: 20, fontSize: 20, fontWeight: "bold" }}>TODO LIST</Text>

                <FlatList

                    data={list}
                    renderItem={item => {
                        console.log(item.item)
                        const cardIndext = item.index
                        if (item.item != null)
                            return (
                                <TouchableOpacity onPress={() => handlecardPress(cardIndext, item.item.value)} style={styles.cardContainer}

                                    onLongPress={() => handleLognpress(cardIndext, item.item.value)}

                                >
                                    <View style={styles.card}>
                                        <Text style={{ marginLeft: "10%" }}>{item.item.value}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                    }}
                />
            </View>

        </View>
    )
}
const { height, width } = Dimensions.get("screen")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: 'center'
    },
    inputBox: {
        width: width - 30,
        borderRadius: 15,
        borderWidth: 1,
        padding: 10,
        marginTop: 10
    },
    btn: {
        paddingVertical: "4%",
        marginVertical: "5%",
        backgroundColor: "skyblue",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16
    },
    text: {
        fontWeight: "bold",
        color: "white"
    },
    card: {
        backgroundColor: "#fff",
        width: width - 40,
        paddingVertical: 20,
        borderRadius: 30,
        marginVertical: -10
    },
    cardContainer: {
        marginVertical: 20

    }
})

export default RealTimeDataBase