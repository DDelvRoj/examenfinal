import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegistroScreen from "../Screens/RegistroScreen";
import DetalleScreen from "../Screens/DetalleScreen";
import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";
import RecuperarScreen from "../Screens/RecuperarScreen";
import { Producto } from "../data/types";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined; 
    Registro: undefined;
    Recuperar: undefined;
    Detalle : {item:Producto}
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {


    useEffect(() => {
        const backAction = () => {
          Alert.alert('Espera', '¿Quieres salir de la aplicación?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Salir', onPress: () => BackHandler.exitApp() },
          ]);
          return true; // Bloquea el botón "Atrás"
        };
    
        BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
      }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Login" component={LoginScreen}
                
                options={
                    {
                        headerBackButtonMenuEnabled:false,
                        headerBackVisible:false,
                        
                    }
                }
                />
                <Stack.Screen name="Registro" component={RegistroScreen}
                options={
                    {
                        headerBackButtonMenuEnabled:false,
                        headerBackVisible:false,
                        
                    }
                }
                />
                <Stack.Screen
                name="Home"
                options={
                    {
                        headerShown:false,
                        
                    }
                }
                component={HomeScreen}
                />
                <Stack.Screen name="Detalle" component ={DetalleScreen}/>
                <Stack.Screen name="Recuperar" component={RecuperarScreen} 
                options={
                    {
                        headerBackButtonMenuEnabled:false,
                        headerBackVisible:false,
                        
                    }
                }
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;
   