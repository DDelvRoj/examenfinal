import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native"
import styles from "../Styles/Styles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigators/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../Navigators/HomeNavigator";
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { Usuario } from "../data/types";

export type VisualizarScreenProps = NativeStackScreenProps<BottomTabParamList, "Visualizar">;

const VisualizarScreen:React.FC<VisualizarScreenProps> = ({})=>{
    
    const [cargando, setCargando] = useState(false);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [registro, setRegistro] = useState<Usuario[]>([])


    const cargarItems = async ()=>{
      setCargando(true);
      firestore().collection('data').get().then(data=>{
        const reformar = data.docs.map((registro)=>{
          const reg: Usuario = {
            id: registro.id,
            description: registro.data().description,
            title: registro.data().title
          }
          return reg;
        });
        console.log(reformar);
        
        setRegistro(reformar);
      }).finally(()=>{
        setCargando(false);
      })
    }

    useEffect(()=>{
      cargarItems()
    },[])

    

    const renderItem = ( item:{id:string, title:string, description:string} ) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Detalle', {item} )}
        >
          <Text style={styles.titleItem}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          
        </TouchableOpacity>
      );

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
      <FlatList
        data={registro}

        refreshControl={
          <RefreshControl
            refreshing={cargando}
            onRefresh={cargarItems}
            colors={['#ff0000']} // Color del indicador en Android
            tintColor="#00ff00" // Color del indicador en iOS
            title="Cargando..." // Título opcional en iOS
          />
        }
        renderItem={({item})=>{
            return(
                renderItem({
                    id: item.id??'',
                    description:item.description,
                    title:item.title
                })
            )
        }}
      />
    </View>
    )
}

export default VisualizarScreen;