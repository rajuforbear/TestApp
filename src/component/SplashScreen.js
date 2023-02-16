import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, } from 'react'
import Auth from "@react-native-firebase/auth"
import { useNavigation, StackActions } from '@react-navigation/native'

const SplashScreen = () => {
  const navigation = useNavigation()
  const [isLogin, setIsLogin] = useState(false)


  useEffect(() => {
    setTimeout(async () => {
      const unsubcibe = await Auth().onAuthStateChanged((user) => {
        const isUser = user !== null ? "Home" : "Login"
        console.log(isUser)
    
        navigation.dispatch(StackActions.replace(isUser))
      })
      unsubcibe()



    }, 3000);
  }, [])



  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <ActivityIndicator size={50} />
      <Text>Loading....</Text>
    </View>
  )
}

export default SplashScreen