import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator, Modal } from "react-native";
import styles from "../Styles/Styles";
import { RootStackParamList } from "../Navigators/Navigator";
import Icon from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";
import { Producto } from "../data/types";

export type DetalleScreenProps = NativeStackScreenProps<RootStackParamList, "Detalle">;

const DetalleScreen: React.FC<DetalleScreenProps> = ({ navigation, route }) => {

  const [cargando, setCargando] = useState(false);

  const { item } = route.params;
  console.log('Item', item);

  const [modificar, setModificar] = useState(false);

  const [data, setData] = useState<Producto>(item);

  
  const noMostrar = ["id"];

  const filteredData = Object.entries(data).filter(([key]) => !noMostrar.includes(key));

  const handleInputChange = (key: string, value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleEliminar = async () => {
    const eliminar = async () => {
      setCargando(true);
      console.log(item.id);
      firestore().collection('productos').doc(item.id).delete().then(()=>{
        Alert.alert("Eliminado", "El registro ha sido eliminado.");
        setModificar(false);
        navigation.goBack();
      })
      .catch((err)=>{
        Alert.alert("Error", err.code);
      })
      .finally(()=>{
        setCargando(false);
      })
    }
    Alert.alert("¿Eliminar?", "La producto será eliminada. ¿Confirmar?", [
      {
        text:'Confirmar',
        onPress: async ()=>await eliminar(),
      },
      {
        text:'Cancelar',
        style:'cancel'
      }
    ]);
    
  };


  const handleModificar = async () => {
    const modificar = async () => {
      setCargando(true);
      console.log(item.id);
      firestore().collection('productos').doc(item.id).update(data).then(()=>{
        
        
        Alert.alert("Guardado", "Los cambios han sido guardados.");
        setModificar(false);
      })
      .catch((err)=>{
        Alert.alert("Error", err.code);
      })
      .finally(()=>{
        setCargando(false);
      })
    }
    Alert.alert("¿Modificar?", "El producto será modificada. ¿Confirmar?", [
      {
        text:'Confirmar',
        onPress: async ()=>await modificar(),
      },
      {
        text:'Cancelar',
        style:'cancel'
      }
    ]);
    
  };

  // Cancelar edición
  const cancelChanges = () => {
    setData(item); // Restaurar valores originales
    setModificar(false);
  };

  const renderItem = ({ item }: { item: [string, string] }) => {
    const [key, value] = item;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.key}>{key.toUpperCase()}</Text>
        {modificar ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => handleInputChange(key, text)}
            placeholder="Editar valor..."
          />
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
    );
  };

  if(cargando) return (
    <View style={styles.container}>
        <Text style={styles.title}>Cargando...</Text>
        <ActivityIndicator size="large" color="#007BFF" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles</Text>
      <FlatList
        data={filteredData as any} 
        keyExtractor={([key]) => key}
        renderItem={renderItem}
      />
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => setModificar(true)}>
            <Text style={styles.buttonText}><Icon name="pencil" textBreakStrategy="simple" size={20}/> Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={async ()=> await handleEliminar()}>
            <Text style={styles.buttonText}><Icon name="trash" textBreakStrategy="simple" size={20}/> Eliminar</Text>
          </TouchableOpacity>
      </View>
      <Modal visible={modificar} onDismiss={()=>setModificar(false)}>
        <View style={styles.container}>
          <FlatList
          data={filteredData as any} 
          keyExtractor={([key]) => key}
          renderItem={renderItem}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleModificar}>
              <Text style={styles.buttonText}><Icon name="paper-plane" textBreakStrategy="simple" size={20}/> Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelChanges}>
              <Text style={styles.buttonText}><Icon name="close" textBreakStrategy="simple" size={20}/> Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

export default DetalleScreen;
