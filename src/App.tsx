import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme } from 'native-base';

const Stack = createNativeStackNavigator();

function LoginScreen() {
  return (
    <></>
  );
}

function RegisterScreen() {
  return (
    <></>
  );
}

function DashboardScreen() {
  return (
    <></>
  );
}

function RecordsScreen() {
  return (
    <></>
  );
}

function RevisionsScreen() {
  return (
    <></>
  );
}

function AbsencesScreen() {
  return (
    <></>
  );
}

// Define your custom theme
const theme = extendTheme({
  colors: {
    // Define the color palette for light mode
    primary: {
      light: '#FFFFFF', // white
      50: '#FAFAFA', // very light gray
      100: '#F5F5F5', // light gray
      200: '#E0E0E0', // gray
      300: '#BDBDBD', // medium gray
      400: '#9E9E9E', // dark gray going to brown
      500: '#757575', // more intense gray-brown
    },
    // Define the color palette for dark mode (sample colors from the screenshot)
    dark: {
      50: '#343434', // dark background
      100: '#2D2D2D', // lighter dark
      200: '#262626', // light for dark mode
      300: '#1F1F1F', // hover state or selected
      400: '#181818', // active state or button
      500: '#121212', // darkest for components
      600: '#0A0A0A', // accents or for depth
      700: '#3832A0', // accent color (like the bar chart)
      800: '#7861D7', // secondary accent (like the line chart)
      900: '#9B51E0', // additional accent (hover state for accent color)
    },
  },
  config: {
    // Add custom configurations here
    initialColorMode: 'light',
  },
  components: {
    Heading: {
      baseStyle: {
        _light: { color: 'primary.400' },
        _dark: { color: 'dark.700' },
      },
    },
    // You can add more component stylings here
  },
});

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Records" component={RecordsScreen} />
          <Stack.Screen name="Revisions" component={RevisionsScreen} />
          <Stack.Screen name="Absences" component={AbsencesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
