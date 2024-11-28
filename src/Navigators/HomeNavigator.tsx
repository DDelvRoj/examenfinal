import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import RegistrarScreen from '../Screens/RegistrarScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import VisualizarScreen from '../Screens/VisualizarScreen';

import auth from '@react-native-firebase/auth';
import { Alert, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './Navigator';


export type BottomTabParamList = {
    Registrar: undefined;
    Visualizar: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeNavigator = ()=>{

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleCerrarSesion = async ()=>{
        const cerrarSesion = async ()=>{
            auth().signOut().then(()=>{
                Alert.alert('Éxito', "Se cerró la sesión correctamente")
            }).finally(()=>{
               
                navigation.navigate('Login');
            });
        }
        Alert.alert('¿Cerrar sesión?',"Se cerrará la sesión activa. ¿Continuar?", [
            {
                text:'Sí',
                onPress:cerrarSesion
            },
            {
                text:'No',
                style:"cancel"
            }
        ])
    }

    return(
        <Tab.Navigator screenOptions={
            {
                headerRight:({pressOpacity, pressColor})=>{
                    return (
                        <TouchableOpacity onPress={handleCerrarSesion} >
                            <Icon name='log-out' size={30} color="red"/>
                        </TouchableOpacity>
                    )
                },
            }
        }>
            
            <Tab.Screen name='Visualizar' component={VisualizarScreen}

                options={
                    {
                        animation:'shift',
                        tabBarIcon: ({ color, size}) => (
                            <Icon name="person" color={color} size={size}/>
                        ),
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                    }
                }
            />
            <Tab.Screen name='Registrar' component={RegistrarScreen}
                
                options={
                    {
                        animation:'shift',
                        tabBarIcon: ({ color, size}) => (
                            <Icon name='home' color={color} size={size}/>
                        ),
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                    }
                }
            />
        </Tab.Navigator>
    )
}

export default HomeNavigator;


