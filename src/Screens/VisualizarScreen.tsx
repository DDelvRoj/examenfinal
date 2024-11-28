import { ActivityIndicator, FlatList, RefreshControl, Switch, Text, TouchableOpacity, View } from "react-native"
import styles from "../Styles/Styles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigators/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../Navigators/HomeNavigator";
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { Producto } from "../data/types";

export type VisualizarScreenProps = NativeStackScreenProps<BottomTabParamList, "Visualizar">;

const VisualizarScreen:React.FC<VisualizarScreenProps> = ({})=>{
    
    const [cargando, setCargando] = useState(false);

    const [ordenar, setOrdenar] = useState({
      precio:false,
      cantidad:false
    })

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [registro, setRegistro] = useState<Producto[]>([])


    const cargarItems = async ()=>{
      setCargando(true);
      firestore().collection('productos').get().then(data=>{
        const reformar = data.docs.map((registro)=>{
          const res = registro.data() as Producto
          res.id = registro.id;
          return res;
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

    useEffect(()=>{

      const nuevoRegistro = registro.sort((a, b) => {
        const precioA = Number(a.precio);
        const precioB = Number(b.precio);
        const cantidadA = Number(a.cantidad);
        const cantidadB = Number(b.cantidad);
      
        if (ordenar.precio && ordenar.cantidad) {
          if (precioB === precioA) {
            return cantidadB - cantidadA;
          }
          return precioB - precioA;
        }
        if (ordenar.precio) {
          return precioB - precioA;
        }
      
        if (ordenar.cantidad) {
          return cantidadB - cantidadA;
        }
        return 0;
      });
      if(registro!==nuevoRegistro)
      setRegistro(nuevoRegistro);

    }, [ordenar.cantidad, ordenar.precio, registro])
    

    const renderItem = ( item:Producto) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Detalle', {item} )}
        >
          <Text style={styles.titleItem}>Nombre: {item.nombre}</Text>
          <Text style={styles.titleItem}>Precio: {item.precio} - Cantidad:{item.cantidad}</Text>
          
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
          <View style={{...styles.buttonContainer, alignContent:'center'}}>
            <Text style={styles.titleItem}>Precio</Text>
            <Switch 
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={ordenar.precio ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={()=>setOrdenar({...ordenar , precio:!ordenar.precio})}
            value={ordenar.precio}
            />
            <Text style={styles.titleItem}>Cantidad</Text>
            <Switch 
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={ordenar.cantidad ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={()=>setOrdenar({...ordenar , cantidad:!ordenar.cantidad})}
            value={ordenar.cantidad}
            />
          </View>
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
                    renderItem(item)
                )
            }}
          />
    </View>
    )
}

export default VisualizarScreen;