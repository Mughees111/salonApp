import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { acolors } from './AppColors';

const CustomTextInput = ({ style, onChangeText, placeholder, placeholderTextColor,secureTextEntry=false,autoFocus = false,keyboardType,keyboardAppearance}) => {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor ? placeholder : acolors.white}
            style={[styles.textInput, style]}
            onChangeText={(v) => onChangeText(v)}
            secureTextEntry={secureTextEntry}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            keyboardAppearance={keyboardAppearance ? keyboardAppearance : "default"}
            // {...props}
        />
    )
}

const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        height: 42,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: acolors.white,
        color: acolors.white,
        fontFamily: 'PRe',
        fontSize: 14,
        paddingHorizontal: 10,
        marginTop:10

    }
})

export default CustomTextInput
