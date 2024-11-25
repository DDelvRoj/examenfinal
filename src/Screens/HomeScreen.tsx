import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, View } from "react-native";
import { RootStackParamList } from "../Navigators/Navigator";
import HomeNavigator from "../Navigators/HomeNavigator";

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps>  = () => {
    return (
     
        <HomeNavigator/>
    );
};

export default HomeScreen;

