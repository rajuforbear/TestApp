import { View, Text, Keyboard } from 'react-native'
import React, { useState } from 'react'
import Input from '../component/Input'
import Button from '../component/Button'
import auth from "@react-native-firebase/auth"

const MobileAuth = () => {

  const [mobile, SetMobile] = useState('')
  const [error1, setErro1] = useState('')
  const [otp, SetOtp] = useState('')
  const [otperro, setOpterr] = useState('')
  const [confirmData, setCOnfiremData] = useState('')

  const changeMobie = (text) => {
    Keyboard.dismiss()
    let valid = true
    if (!mobile) {
      setErro1("Please Enter mobile number")
      valid = false
    }
    else if (mobile.length < 10) {
      setErro1("Mobile number must be 10 digits with country code")
      valid = false
    }
    if (valid) {
      MobileAuth()
    }

  }
  const chanOtp = async() => {

    if (!otp) {
      setOpterr("please Enter Otp")
    }
    else{
      const response = await confirmData.confirm(otp);
      console.log(response)
      alert("verified")
    }
  }
  

  const MobileAuth = async () => {

    try {

      
      const response = await auth().signInWithPhoneNumber(mobile)
      setCOnfiremData(response)
      console.log(response)
      alert("Opt is send")
    } catch (error) {
      console.log(error)

    }
  }


  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 20, marginTop: "40%" }}>
        <Input
          placeholder="Enter your phone number"
          iconName="phone-outline"
          lable="Phone Number"
        //  keyboardType='numeric'
          onChangeText={(text) => SetMobile(text)}
          error={error1}
          onFocus={() => {
            setErro1('')

          }
          }
        />
        <Button titel='Get Otp' onPress={() => changeMobie()} />
        <Input
          placeholder="Enter opt"
          iconName="alert-plus"
          lable="Otp"
          keyboardType='numeric'
          onChangeText={(text) => SetOtp(text)}
          error={otperro}
          onFocus={() => {
            setErro1('')
          }
          }
        />
        <Button titel='Set Otp' onPress={() => chanOtp()} />

      </View>

    </View>
  )
}

export default MobileAuth