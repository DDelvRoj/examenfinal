import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../Navigators/HomeNavigator";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigators/Navigator";
import styles from "../Styles/Styles";
import { Producto } from "../data/types";

import firestore from '@react-native-firebase/firestore';

export type RegistrarScreenProps = NativeStackScreenProps<BottomTabParamList, "Registrar">;

const RegistrarScreen:React.FC<RegistrarScreenProps> = ({})=>{

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [cargando, setCargando] = useState(false);

    const vacio: Producto = {
      cantidad:'',
      nombre:'',
      precio:''
    };
    const [entradas, setEntradas] = useState<Producto>(vacio);


    const handleRegistrar = async ()=>{
     
      const registrar = async () => {
        setCargando(true);
        firestore().collection('productos').add(entradas).then((data)=>{
          entradas.id = data.id;
          Alert.alert('Éxito', "Su producto fue guardado correctamente.")
        })
        .catch((error)=>{
          Alert.alert('Error',error.code)
        })
        .finally(()=>{
          setCargando(false);
        });
      }
      Alert.alert('Registrar','¿Desea registrar producto?',
        [
          {
            text:'Confirmar',
            onPress:async()=>await registrar(),
          },
          {
            text:'No',
            style:'cancel'
          }
        ]
      )
    }

    if(cargando) {
      return(
        <View style={styles.container}>
          <Text style={styles.title}>Cargando...</Text>
          <ActivityIndicator size="large" color="#007BFF" />
      </View>
      )
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Registrar Productos
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#aaa"
                keyboardType="default"
                autoCapitalize="none"
                value={entradas.nombre}
                onChangeText={(texto)=>{
                  const data = {...entradas};
                  data.nombre = texto;
                  setEntradas(data)
                }}
            />

            <TextInput
                style={styles.input}
                placeholder="Precio"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                autoCapitalize="none"
                value={entradas.precio} 
                onChangeText={(texto)=>{
                  const data = {...entradas};
                  data.precio = texto;
                  setEntradas(data)
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Cantidad"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                autoCapitalize="none"
                value={entradas.cantidad} 
                onChangeText={(texto)=>{
                  const data = {...entradas};
                  data.cantidad = texto;
                  setEntradas(data)
                }}
            />

            <TouchableOpacity style={(entradas.nombre.length>0 && entradas.precio.length>0 && entradas.cantidad.length>0 ?styles.button:styles.buttonDisabled)} onPress={async()=>await handleRegistrar()}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>

        </View>
    );
}



export default RegistrarScreen;