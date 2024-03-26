import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar, TextInput } from 'react-native';
const backImage = require('../assets/Logo.png');


export default function Login ({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleLogin = () => {
    navigation.navigate('Lector')
    
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Ingresa con tu Usuario FhanRed</Text>
        <TextInput
          style={styles.input}
          placeholder='Tu Correo'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Tu Contraseña'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
          textContentType='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Captura tu Huella</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  backImage: {
    width: '100%',
    height: '20%',
    position:'absolute',
    top: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#D7F4FE",
    alignSelf: "center",
    paddingBottom: 24
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30
  },
  input: {
    backgroundColor: "#D7F4FE",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12
  },
  
  whiteSheet: {
    width: '100%',
    height: '80%',
    position: 'absolute',
    top: 135,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
  },
  button: {
    backgroundColor: "#D7F4FE",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  }
});
