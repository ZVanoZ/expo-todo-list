import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface LabeledTextInputProps extends TextInputProps {
    label: string;
}

const LabeledTextInput: React.FC<LabeledTextInputProps> = ({ label, style, ...rest }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.textInput, style]}
                {...rest}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    label: {
        width: 150,
        fontSize: 16,
        marginRight: 10,
        color: '#333',
        fontWeight: '500',
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
});

export default LabeledTextInput;