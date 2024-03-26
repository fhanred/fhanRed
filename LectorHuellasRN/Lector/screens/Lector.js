import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function CapturaHuellasScreen() {
  const [biometricData, setBiometricData] = useState(null);

  const handleAuthButtonPress = async () => {
    try {
      const { success, data } = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Por favor, autentica tu huella dactilar.',
      });

      if (success) {
        // Autenticación exitosa, enviar datos biométricos al servidor
        console.log('Datos biométricos:', data); // Agregar console.log aquí
        setBiometricData(data);
        await enviarDatosAlServidor(data);
        Alert.alert('Éxito', 'Datos biométricos enviados al servidor correctamente.');
      } else {
        Alert.alert('Error', 'La autenticación biométrica falló.');
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      Alert.alert('Error', 'Se produjo un error al autenticar.');
    }
  }

  const enviarDatosAlServidor = async (data) => {
    try {
      
      const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ biometricData: data }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar datos al servidor');
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
      throw error; 
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Autenticar con Huella" onPress={handleAuthButtonPress} />
    </View>
  );
};


