import React, { useState } from "react"
import { Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import Auth from "@react-native-firebase/auth"
import SplashScreen from "../component/SplashScreen";
import MobileAuth from "./MobileAuth";
import ImageUplod from "./ImageUplod";



const Stack = createStackNavigator();
const MyStack = () => {

    const [isLogin, setIsLogin] = useState(false)

    Auth().onAuthStateChanged((user) => {
        if (user !== null) {
            setIsLogin(true)
        }
        else {
            setIsLogin(false)
        }

    })
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Spalsh" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Spalsh" component={SplashScreen} />

                <Stack.Screen name="Login" component={Login} />


                <Stack.Screen name="SignUp" component={SignUp} />


                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Mobile" component={MobileAuth} />
                <Stack.Screen name="Photo" component={ImageUplod} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default MyStack