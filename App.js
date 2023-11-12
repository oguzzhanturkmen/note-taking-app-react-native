import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NoteScreen from './screens/NoteScreen';
import DrawerContent from './components/DrawerContent';
import { NotesProvider } from './context/NotesContext'; // Update this path

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NotesProvider>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{ headerShown: false, drawerStyle: {}, swipeEdgeWidth: 100 }}>
          <Drawer.Screen name="NoteScreen" component={NoteScreen} options={{ unmountOnBlur: true }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
}
