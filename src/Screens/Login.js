import React, { useState ,useEffect} from "react";
import { Text, View, SafeAreaView, ScrollView, Keyboard, TouchableOpacity } from "react-native";
import COLORS from "../Bton/COLORS";
import Button from "../component/Button";
import Input from "../component/Input"
import { StackActions, useNavigation } from '@react-navigation/native'
import Loader from "../Bton/Loader";
import { Alert } from "react-native/Libraries/Alert/Alert";
import auth from '@react-native-firebase/auth';
import Icon from "react-native-vector-icons/FontAwesome"
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const Login = () => {

     useEffect(()=>{
        GoogleSignin.configure();
     },[])
    const navigation = useNavigation()
    const [erros, setErros] = useState({})
    const [loading, setLoading] = useState(false)
    const [intputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const [errorMsg, setErrorMgs] = useState('')

    const Vailidate = () => {
        Keyboard.dismiss()
        let valid = true;
        if (!intputs.email) {
            handleError('Please input email', 'email')
            valid = false
        }
        else if (!intputs.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            handleError('Please input valid email', 'email')
            valid = false
        }


        if (!intputs.password) {
            handleError('please enter password', 'password')
            valid = false
        }
        else if (intputs.password.length < 8) {
            handleError('password must be greater then 8 cheracter', 'password')
            valid = false
        }
        else if (!intputs.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
            handleError('pasword must be an Uppercase,a special charter and A number ', 'password')
            valid = false
        }
        if (valid) {
            handleLogin()
        }


    }


    const handleLogin = async () => {

        try {
            const user = await auth().signInWithEmailAndPassword(intputs.email, intputs.password);
            console.log(user)
            if (user.user.emailVerified) {
                //
                alert("you are veryfied")
                navigation.dispatch(StackActions.replace("Home"))
            }
            else {
                alert("Please verify your email")
                auth().currentUser.sendEmailVerification()
                auth().signOut()
            }
        } catch (error) {
            setErrorMgs(error.message)
        }


    }




    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }))

    }
    const handleError = (errorMassege, input) => {

        setErros(prevState => ({ ...prevState, [input]: errorMassege }))
    }

    const LoginWIthGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
        } catch (error) {
            // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            //     // user cancelled the login flow
            // } else if (error.code === statusCodes.IN_PROGRESS) {
            //     // operation (e.g. sign in) is in progress already
            // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            //     // play services not available or outdated
            // } else {
            //     // some other error happened
            // }
            console.log(error)
        }

    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView style={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>Login</Text>
                <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>Enter your details to login</Text>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        placeholder="Enter your email address"
                        iconName="email-outline"
                        lable="email"
                        onChangeText={(text) => handleOnChange(text, 'email')}
                        error={erros.email}
                        onFocus={() => {
                            handleError(null, 'email')
                            setErrorMgs('')
                        }
                        }
                    />


                    <Input
                        placeholder="Enter your password"
                        iconName="lock-outline" lable="password"
                        password
                        onChangeText={(text) => handleOnChange(text, 'password')}
                        error={erros.password}
                        onFocus={() => {
                            handleError(null, 'password')
                            setErrorMgs('')
                        }
                        }
                    />
                    <Button titel="Login" onPress={() => Vailidate()} />

                    {errorMsg && <Text style={{ fontSize: 12, color: 'red', marginTop: "-5%" }}>{errorMsg}</Text>}

                    <Text onPress={() => navigation.navigate("SignUp")} style={{ fontSize: 16, color: COLORS.black, textAlign: "center" }}>Don't have an account?Register</Text>
                    <Text onPress={() => navigation.navigate("Mobile")} style={{ fontSize: 16, color: COLORS.black, textAlign: "center", marginTop: "5%" }}>Login with mobile?</Text>

                    <View style={{ flexDirection: "row", marginTop: "20%" }}>
                        <TouchableOpacity style={{ flexDirection: "row" }}  onPress={()=>{LoginWIthGoogle()}} >
                            <Icon name='google-plus-square' size={35} color={'red'} style={{ marginLeft: "1%" }} />
                            <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold", color: "red", marginHorizontal: 2 }}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row", marginLeft: "30%" }}>
                            <Icon name='facebook-square' size={35} color={'skyblue'} style={{ marginLeft: "1%" }} />
                            <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold", color: "skyblue", marginHorizontal: 2 }}>Facebook</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>





        </SafeAreaView>
    )
}
export default Login