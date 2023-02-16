import React from "react"
import { TouchableOpacity, Text } from "react-native"
import COLORS from "../Bton/COLORS"
const Button = ({  titel, onPress = () => { } }) => {
    return (
        <TouchableOpacity onPress={onPress}
            style={
                {
                    height: 55,
                    backgroundColor: COLORS.blue,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical:20
                }
            }
            activeOpacity={0.7}
            >
            <Text style={
                {
                    color: COLORS.white,
                    fontSize:18,
                    fontWeight:"bold"
                }
            }>
                {titel}
            </Text>

        </TouchableOpacity>
    )
}
export default Button