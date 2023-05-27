import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrganizationDetails from '../../screens/OrganizationScreens/OrganizationDetails';
import RequiredSkills from '../../screens/RequiredSkills';
import OurJobs from '../../screens/OurJobs';
import PostJob from '../../screens/PostJob';
import BottomTabNavigation from '../BottomTabNavigation';
import Login_Org from '../../screens/Login_Org';
import SignUp_Org from '../../screens/SignUp_Org';

const Stack = createNativeStackNavigator();

const OrganizationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignUp_Org"
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
      <Stack.Screen
        name="Organization Details"
        component={OrganizationDetails}
      />
      <Stack.Screen
        options={{
          title: 'Organization',
          headerBackVisible: false,
        }}
        name="Organization Bottom Tab"
        component={BottomTabNavigation}
      />

      <Stack.Screen name="Required Skills" component={RequiredSkills} />
      <Stack.Screen name="Our Jobs" component={OurJobs} />
      <Stack.Screen name="Post Job" component={PostJob} />
    </Stack.Navigator>
  );
};
export default OrganizationNavigator;
