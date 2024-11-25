import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../Navigators/HomeNavigator";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigators/Navigator";
import styles from "../Styles/Styles";
import { Usuario } from "../data/types";

import firestore from '@react-native-firebase/firestore';

export type RegistrarScreenProps = NativeStackScreenProps<BottomTabParamList, "Registrar">;

const RegistrarScreen:React.FC<RegistrarScreenProps> = ({})=>{

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [cargando, setCargando] = useState(false);

    const [entradas, setEntradas] = useState<Usuario>({id:'',description:'',title:''});


    const handleRegistrar = async ()=>{
     
      const registrar = async () => {
        setCargando(true);
        firestore().collection('data').add(entradas).then((data)=>{
          entradas.id = data.id;
          

          Alert.alert('Éxito', "Su información fue guardado correctamente.")
        })
        .catch((error)=>{
          Alert.alert('Error',error.code)
        })
        .finally(()=>{
          setCargando(false);
        });
      }
      Alert.alert('Registrar','¿Desea registrar información?',
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
                Registrar
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Titulo"
                placeholderTextColor="#aaa"
                keyboardType="default"
                autoCapitalize="none"
                value={entradas.title}
                onChangeText={(texto)=>{
                  const data = {...entradas};
                  data.title = texto;
                  setEntradas(data)
                }}
            />

            <TextInput
                style={styles.input}
                placeholder="Descripcion"
                placeholderTextColor="#aaa"
                keyboardType="default"
                autoCapitalize="none"
                value={entradas.description}
                onChangeText={(texto)=>{
                  const data = {...entradas};
                  data.description = texto;
                  setEntradas(data)
                }}
            />

            <TouchableOpacity style={(entradas.description.length>0 && entradas.title.length>0?styles.button:styles.buttonDisabled)} onPress={async()=>await handleRegistrar()}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>

        </View>
    );
}



export default RegistrarScreen;