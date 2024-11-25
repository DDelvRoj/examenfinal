import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator } from "react-native";
import styles from "../Styles/Styles";
import { RootStackParamList } from "../Navigators/Navigator";
import Icon from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";

export type DetalleScreenProps = NativeStackScreenProps<RootStackParamList, "Detalle">;

const DetalleScreen: React.FC<DetalleScreenProps> = ({ navigation, route }) => {

  const [cargando, setCargando] = useState(false);

  const { item } = route.params;
  console.log('Item', item);
  

  // Estado para manejar el modo de edición
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(item); // JSON editable

  // Claves a excluir de la vista
  const excludedKeys = ["id"]; // Agrega aquí las claves que quieras excluir

  // Filtrar datos excluyendo claves no deseadas
  const filteredData = Object.entries(data).filter(([key]) => !excludedKeys.includes(key));

  // Función para manejar cambios
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
      firestore().collection('data').doc(item.id).delete().then(()=>{
        Alert.alert("Eliminado", "El registro ha sido eliminado.");
        setIsEditing(false);
        navigation.goBack();
      })
      .catch((err)=>{
        Alert.alert("Error", err.code);
      })
      .finally(()=>{
        setCargando(false);
      })
    }
    Alert.alert("¿Eliminar?", "La información será eliminada. ¿Confirmar?", [
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


  // Guardar cambios
  const handleModificar = async () => {
    const modificar = async () => {
      setCargando(true);
      console.log(item.id);
      firestore().collection('data').doc(item.id).update(data).then(()=>{
        
        
        Alert.alert("Guardado", "Los cambios han sido guardados.");
        setIsEditing(false);
      })
      .catch((err)=>{
        Alert.alert("Error", err.code);
      })
      .finally(()=>{
        setCargando(false);
      })
    }
    Alert.alert("¿Modificar?", "La información será modificada. ¿Confirmar?", [
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
    setIsEditing(false);
  };

  // Renderizar cada clave-valor del JSON
  const renderItem = ({ item }: { item: [string, string] }) => {
    const [key, value] = item;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.key}>{key.toUpperCase()}</Text>
        {isEditing ? (
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
        data={filteredData as any} // Usar datos filtrados
        keyExtractor={([key]) => key}
        renderItem={renderItem}
      />
      {isEditing ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleModificar}>
            <Text style={styles.buttonText}><Icon name="paper-plane" textBreakStrategy="simple" size={20}/> Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelChanges}>
            <Text style={styles.buttonText}><Icon name="close" textBreakStrategy="simple" size={20}/> Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}><Icon name="pencil" textBreakStrategy="simple" size={20}/> Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={async ()=> await handleEliminar()}>
            <Text style={styles.buttonText}><Icon name="trash" textBreakStrategy="simple" size={20}/> Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DetalleScreen;
