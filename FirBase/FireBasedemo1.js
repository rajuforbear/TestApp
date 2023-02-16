import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import firestore from '@react-native-firebase/firestore';

const FireBaseDemo1 = () => {


   const [data,setData]=useState();

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const data = await firestore().collection('Table1').doc('OaLYkuh1Pp7dthOaNHET').get();
      setData(data._data)
    }
    catch (eer) {
      console.log(eer)
    }
  }

  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      <Text>Email:-{data ? data.Email :"loading...."}</Text>
      <Text>First Name:-{data ? data.firstName :"loading...."}</Text>
      <Text>Last Name:-{data ? data.lastName :"loading...."}</Text>
      <Text>Phone:-{data ? data.phone :"loading...."}</Text>
    </View>
  )
}

export default FireBaseDemo1