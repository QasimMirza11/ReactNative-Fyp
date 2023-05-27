import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../../screens/userScreens/Dashboard';
import ApplicantNavigator from './ApplicantNavigator';
import OrganizationNavigator from './OrganizationNavigator';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

const DashboardNavigator = props => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Dashboard'
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
        
      <Stack.Screen name="Dashboard" component={Dashboard} />      
      <Stack.Screen
        options={{headerShown: false}}
        name="ApplicantNavigator"
        component={ApplicantNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OrganizationNavigator"
        component={OrganizationNavigator}
      />
    </Stack.Navigator></NavigationContainer>
  );
};

export default DashboardNavigator;
