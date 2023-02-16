import React, { useState } from "react"
import { Text, View, StyleSheet, TextInput } from "react-native"
import COLORS from "../Bton/COLORS"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
const Input = ({
    lable,
    iconName,
    error,
    password,
    onFocus = () => { },
    ...propes
}) => {

    const [isFocused, SetIsFocused] = useState(false)
    const [hidePassword,setHidePassword]=useState(password)
    return (
        <View style={{ marginBottom: 20, }}>
            <Text style={styles.lable}>{lable}</Text>
            <View style={[styles.inputContainer, {
                borderColor: error ? COLORS.red :
                    isFocused ? COLORS.darkBlue :
                        COLORS.light
            }]}>
                <Icon name={iconName} style={{ fontSize: 22, color: COLORS.darkBlue, marginRight: 10 }} />
                <TextInput style={{ flex: 1, }}
                    placeholderTextColor={{ color: COLORS.darkBlue }}
                    {...propes}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus()
                        SetIsFocused(true)

                    }}
                    onBlur={() => SetIsFocused(false)}
                    secureTextEntry={hidePassword}
                />
              { password&& <Icon onPress={()=>setHidePassword(!hidePassword)} name={hidePassword?"eye-outline" : "eye-off-outline"}  style={{ fontSize: 22, color: COLORS.darkBlue, marginRight: 10 }} />}
            </View>
            {error && <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 7 }}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    lable: {
        marginVertical: 5,
        fontSize: 14,
        color: COLORS.grey
    },
    inputContainer: {
        height: 55,
        backgroundColor: COLORS.light,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1
    }
})
export default Input