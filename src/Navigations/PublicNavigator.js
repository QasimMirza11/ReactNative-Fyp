import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import Forgot from '../screens/Forgot';
import SignUp_Org from '../screens/SignUp_Org';
import Login_Org from '../screens/Login_Org';

const Stack = createNativeStackNavigator();

const PublicNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#141413',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Login_Org" component={Login_Org} />
      <Stack.Screen name="SignUp_Org" component={SignUp_Org} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Forgot Password?" component={Forgot} />
    </Stack.Navigator>
  );
};

export default PublicNavigator;
