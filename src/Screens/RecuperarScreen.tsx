import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import styles from "../Styles/Styles"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigators/Navigator";
import { useState } from "react";

import auth from '@react-native-firebase/auth';

export type RecuperarScreenProps = NativeStackScreenProps<RootStackParamList, "Recuperar">;

const RecuperarScreen:React.FC<RecuperarScreenProps> = ({navigation})=>{

    const [email, setEmail] = useState('');

    const [cargando, setCargando] = useState(false);

    const handleRecuperar = async () => {

        const recuperar = ()=>{
            setCargando(true);
            auth().sendPasswordResetEmail(email).then(()=>{
                Alert.alert('Éxito', "Se envió con éxito la solicitud, revise su correo electrónico.")
            }).catch(err=>{
                Alert.alert('Error', err.code);
            }).finally(()=>{
                setCargando(false);
            });
        }

        Alert.alert('Solicitar nueva contraseña', "Deberá después ingresar su contraseña. ¿Confirmar?",[
            {
                text:'Sí',
                onPress:recuperar
            },
            {
                text:'No',
                style:'cancel'
            }
        ])

    }


    if(cargando) return (
        <View style={styles.container}>
            <Text style={styles.title}>Cargando...</Text>
            <ActivityIndicator size="large" color="#007BFF" />
        </View>
    )

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Solicitar nueva contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity 
            style={(email.length>0?styles.button:styles.buttonDisabled)}
            disabled={!(email.length>0)}
            onPress={async()=>await handleRecuperar()}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.buttonGreen} onPress={()=>navigation.replace('Login')}>
                <Text style={styles.buttonText}>Ir al Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RecuperarScreen