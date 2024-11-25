import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigators/Navigator';
import styles from '../Styles/Styles';

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps>  = ({ navigation })=> {
    

  const [cargando, setCargando] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle user state changes
  function onAuthStateChanged(user:FirebaseAuthTypes.User|null) {
    if (user) {
        setUser(user);
        navigation.replace('Home');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  const handleLogin = async () => {
    
    if(email && password){
        setCargando(true);
        auth().signInWithEmailAndPassword(email,password).then(()=>{
            Alert.alert('Bienvenido', `Has iniciado sesión como ${email}`);
        }).catch((error)=>{
            if (error.code === 'auth/invalid-credential') {
                Alert.alert('Error', `Credenciales inválidas`);
            } else {
                Alert.alert('Error', error.code);
            }
        }).finally(()=>{
            setCargando(false);
        })
    }
    setCargando(false);
  };

    if(cargando){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Cargando...</Text>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }
  
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={async()=>await handleLogin()}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.replace('Registro')}>
                <Text style={styles.forgotPassword}>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.replace('Recuperar')}>
                <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </View>
    );
  

  
}


export default LoginScreen;