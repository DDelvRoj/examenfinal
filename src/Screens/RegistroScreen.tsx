import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigators/Navigator";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

import auth from '@react-native-firebase/auth';
import styles from "../Styles/Styles";

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Registro">;

const RegistroScreen: React.FC<LoginScreenProps> = ({navigation}:LoginScreenProps) =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerificar, setPasswordVerificar] = useState('');

    const [cargando, setCargando] = useState(false);


    const handleRegistro = async ()=>{
        const registrar = async ()=>{
            setCargando(true);
            auth().createUserWithEmailAndPassword(email,password).then(()=>{
                Alert.alert("Registro éxitoso", `${email} se ha registrado correctamente.`)
            })
            .catch((error)=>{
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        Alert.alert('Error',`${email} ya está registrado.`);
                        break;
                    default:
                        Alert.alert('Error',error.code);
                }
            })
            .finally(()=>{
                setCargando(false);
                setEmail('');
                setPassword('');
                setPasswordVerificar('');
            });
        }
        Alert.alert('Registrar', `¿Está seguro de registrar a ${email}?`,[
            {
                text:'Confirmar',
                onPress: registrar
            },
            {
                text:'Cancelar',
                style:'cancel'
            }
        ]);
    }

    if(cargando) return (
        <View style={styles.container}>
            <Text style={styles.title}>Cargando...</Text>
            <ActivityIndicator size="large" color="#007BFF" />
        </View>
    )

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>
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

            {
                (password.length && password.length<8) && (
                    <Text style={styles.errorText}>
                        La contraseña debe tener un mínimo de 8 carácteres.
                    </Text>
                )
            }
            <TextInput
                style={styles.input}
                placeholder="Ingrese nuevamente su contraseña"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={passwordVerificar}
                onChangeText={setPasswordVerificar}
            />

            {
                (passwordVerificar.length && passwordVerificar.length && password !== passwordVerificar) && (
                    <Text style={styles.errorText}>
                        Las contraseñas no son iguales.
                    </Text>
                )
            }

            <TouchableOpacity disabled={password.length<8 || password!== passwordVerificar} 
            style={(password.length>=8 && password === passwordVerificar?styles.button:styles.buttonDisabled)} onPress={async()=>await handleRegistro()}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.buttonGreen} onPress={()=>navigation.replace('Login')}>
                <Text style={styles.buttonText}>Ir al Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RegistroScreen;