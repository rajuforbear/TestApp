import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView, Keyboard } from "react-native";
import COLORS from "../Bton/COLORS";
import Button from "../component/Button";
import Input from "../component/Input"
import { useNavigation } from '@react-navigation/native'
import Loader from "../Bton/Loader";
import { Alert } from "react-native/Libraries/Alert/Alert";
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore"
const SignUp = () => {
    const navigation = useNavigation()
    const [erros, setErros] = useState({})
    const [loading, setLoading] = useState(false)
    const [intputs, setInputs] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })


    const Vailidate = () => {

        Keyboard.dismiss()
        let valid = true
        if (!intputs.email) {
            handleError('Please input email', 'email')
            valid = false
        }
        else if (!intputs.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            handleError('Please input valid email', 'email')
            valid = false
        }
        if (!intputs.firstName) {
            handleError('please enter first name', 'firstName')
            valid = false

        }
        else if (intputs.firstName.length < 3) {
            handleError('First name sould be greater then 3 character', 'firstName')
            valid = false
        }

        if (!intputs.lastName) {
            handleError('please enter last name', 'lastName')
            valid = false

        }
        else if (intputs.lastName.length < 3) {
            handleError('Last name sould be greater ten 2 character', 'lastName')
            valid = false
        }

        if (!intputs.phone) {
            handleError('please enter phone number', 'phone')
            valid = false
        }
        else if (intputs.phone.length < 10) {
            handleError("Mobile number sould be 10 digits", 'phone')
            valid = false
        }
        if (!intputs.password) {
            handleError('please enter password', 'password')
            valid = false
        }

        else if (!intputs.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
            handleError('pasword must be an Uppercase,a special charter and A number and greater then 8 character ', 'password')
        }


        if (!intputs.confirmPassword) {
            handleError('please re-enter your password', 'confirmPassword')
            valid = false
        }
        else if (intputs.password != intputs.confirmPassword) {
            handleError("password dosen't matched", 'confirmPassword')
            valid = false
        }

        if (valid) {
            handleSignUp()
        }
    }



    const handleSignUp = async () => {

        try {
             const User = await auth().createUserWithEmailAndPassword(intputs.email, intputs.password);
            // console.log(isUser)
            const userData={
                id:User.user.uid,
                email:intputs.email,
                firstName:intputs.firstName,
                lastName:intputs.lastName,
                phone:intputs.phone
            }

         await firestore().collection("User").doc(User.user.uid).set(userData)

            await auth().currentUser.sendEmailVerification()
            await auth().signOut()
            alert("Please check your mail box to verify email")

            navigation.navigate("Login")

        } catch (error) {
            console.log(error);
        }
        try {
            console.log("Email:- ", intputs.email, "Password:- ", intputs.password);
        } catch (error) {
            console.log(error);
        }

    } 




    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }))

    }
    const handleError = (errorMassege, input) => {

        setErros(prevState => ({ ...prevState, [input]: errorMassege }))
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView style={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>SignUp</Text>
                <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>Enter your details to register</Text>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        placeholder="Enter your email address"
                        iconName="email-outline"
                        lable="email"
                        onChangeText={(text) => handleOnChange(text, 'email')}
                        error={erros.email}
                        onFocus={() => {
                            handleError(null, 'email')
                        }
                        }
                    />
                    <Input
                        placeholder="Enter your first name"
                        iconName="account-outline"
                        lable="Fullname"
                        onChangeText={(text) => handleOnChange(text, 'firstName')}
                        error={erros.firstName}
                        onFocus={() => {
                            handleError(null, 'firstName')
                        }
                        }
                    />
                    <Input
                        placeholder="Enter your last name"
                        iconName="account-outline"
                        lable="Lastname"
                        onChangeText={(text) => handleOnChange(text, 'lastName')}
                        error={erros.lastName}
                        onFocus={() => {
                            handleError(null, 'lastName')
                        }
                        }
                    />
                    <Input
                        placeholder="Enter your phone number"
                        iconName="phone-outline"
                        lable="Phone Number"
                        keyboardType='numeric'
                        onChangeText={(text) => handleOnChange(text, 'phone')}
                        error={erros.phone}
                        onFocus={() => {
                            handleError(null, 'phone')
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
                        }
                        }
                    />
                        <Input
                        placeholder="Confirm your password "
                        iconName="lock-outline" lable="Confirm password"
                         password
                        onChangeText={(text) => handleOnChange(text, 'confirmPassword')}
                        error={erros.confirmPassword}
                        onFocus={() => {
                            handleError(null, 'confirmPassword')
                        }
                        }
                    />
                    <Button titel="Register" onPress={() => Vailidate()} />
                    <Text onPress={() => navigation.navigate("Login")} style={{ fontSize: 16, color: COLORS.black, textAlign: "center" }}>Already have an account?Login</Text>
                </View>

            </ScrollView>



        </SafeAreaView>
    )
}
export default SignUp