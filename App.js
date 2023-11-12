import 'react-native-gesture-handler';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import NoteScreen from './screens/NoteScreen';
import DrawerContent from './components/DrawerContent';
const Drawer = createDrawerNavigator();

export default function App() {
  

  return (
    <NavigationContainer>
    <Drawer.Navigator  drawerContent={(props) => <DrawerContent{...props} /> }screenOptions={{headerShown : false ,drawerStyle: {
      
    }, swipeEdgeWidth: 100  }}    >
      <Drawer.Screen name="NoteScreen" component={NoteScreen} options={{unmountOnBlur:true}} />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}

