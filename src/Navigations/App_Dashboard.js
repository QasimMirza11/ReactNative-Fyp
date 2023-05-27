import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MessageStackNavigator from './MessageStackNavigator';
import FindJobs from '../screens/FindJobs';
import MyJobs from '../screens/MyJobs';
import ApplicantSettingNavigator from './ApplicantSettingNavigator';

const Tab = createBottomTabNavigator();

export default function App_Dashboard() {
  return (
    <Tab.Navigator
      initialRouteName="FindJobs"
      screenOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="FindJobs"
        component={FindJobs}
        options={{headerShown: false,
          tabBarLabel: 'Find Jobs',
          tabBarIcon: ({ color, size }) => (
            <Icon name={'home'} color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="MyJobs"
        component={MyJobs}
        options={{headerShown: false,
          tabBarLabel: 'My Jobs',
          tabBarIcon: ({ color, size }) => (
            <Icon name={'tasks'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MessageStackNavigator"
        component={MessageStackNavigator}
        options={{headerShown: false,
          tabBarLabel: 'Message',
          tabBarIcon: ({ color, size }) => (
            <Icon name={'envelope-o'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ApplicantSettingNavigator"
        component={ApplicantSettingNavigator}
        options={{headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name={'user-circle'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}