import { View, Text, TouchableOpacity, Image, PermissionsAndroid, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Auth from "@react-native-firebase/auth"
import Button from '../component/Button'
import { useNavigation, StackActions } from '@react-navigation/native'
import firestore from "@react-native-firebase/firestore"
//import { useNavigation } from '@react-navigation/native'
import DocumentPicker from "react-native-document-picker"
import storage from "@react-native-firebase/storage"
import ImagePicker from 'react-native-image-crop-picker'


const Home = () => {

  const [imagePath, setImagePath] = useState('');
  const [userData, setUserData] = useState('');


  useEffect(() => {
    getData()
  }, [])

  const Logout = async () => {
    await Auth().signOut()
    navigation.dispatch(StackActions.replace("Spalsh"))
  }

  const getImage = async () => {
    try {


      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          //  console.log(image);
          setImagePath(image.path)
        });
        //  const uplaodImage=imagePath;
        //let fileName=uplaodImage.substring(uplaodImage.lastIndexOf('/')+1);
        // console.log(fileName)
        const fileExt = imagePath.split('.').pop()

        const uid = Auth().currentUser.uid

        const fileName = `${uid}.${fileExt}`

        const imageData = await storage().ref(`Photos/${fileName}`).putFile(imagePath)
         console.log(imageData)

      }
    }

    catch (error) {
      console.log(error)

    }
  }
  const getData = async () => {
    try {
      const uid = Auth().currentUser.uid;
      const userData = await firestore().collection("User").doc(uid).get()
      setUserData(userData._data)
    } catch (error) {
      console.log(error)
    }

  }

  const navigation = useNavigation()

  // console.log(userData)
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginVertical: 20, color: "black", textAlign: "center" }}>Profile</Text>
      <Image style={{ height: 100, width: 100, alignSelf: "center", borderRadius: 100 }} source={imagePath ? { uri: imagePath } : require('../../Img/img.jpg')} />
      <Text style={{ alignSelf: "center", marginVertical: 5, fontSize: 17 }} onPress={() => getImage()}>Change Profile Photo</Text>
      <View style={{ alignSelf: "center", }}>
        <Text style={styles.name}>{userData ? userData.firstName : "Loading.."} {userData ? userData.lastName : "."}</Text>
        <Text style={styles.email}>{userData ? userData.email : "Loading.."}</Text>
        <Text style={styles.email}>{userData ? userData.phone : "Loading.."}</Text>

      </View>



      <View style={{ marginHorizontal: 20 }}>
        <Button titel='Logout' onPress={() => { Logout() }} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center"
  },
  email: {
    textAlign: "center",
    fontSize: 17
  }
})

export default Home