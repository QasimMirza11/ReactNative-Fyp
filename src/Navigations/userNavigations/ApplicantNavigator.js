import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GeneralDetails from '../../screens/ApplicantScreens/GeneralDetails';
import PreviousExperience from '../../screens/ApplicantScreens/PreviousExperience';
import PreviousSkills from '../../screens/ApplicantScreens/PreviousSkills';
import BottomTabNavigation from '../BottomTabNavigation';
import Login from '../../screens/Login';
import SignUp from '../../screens/SignUp';

const Stack = createNativeStackNavigator();

const ApplicantNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignUp"
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
        <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="General Details" component={GeneralDetails} />
      <Stack.Screen name="Previous Experience" component={PreviousExperience} />
      <Stack.Screen name="Previous Skills" component={PreviousSkills} />
      <Stack.Screen
        name="Applicant Bottom Tab"
        component={BottomTabNavigation}
        options={
          {
            // headerShown: false,
          }
        }
      />
    </Stack.Navigator>
  );
};
export default ApplicantNavigator;
