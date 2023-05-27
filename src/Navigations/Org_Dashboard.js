import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostJob from '../screens/PostJob';
import OurJobs from '../screens/OurJobs';
import MessageStackNavigator from './MessageStackNavigator';
import OrganizationSettingNavigator from './OrganizationSettingNavigator';

const Tab = createBottomTabNavigator();

export default function Org_Dashboard() {
  return (
    <Tab.Navigator
      initialRouteName="PostJob"
      screenOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="PostJob"
        component={PostJob}
        options={{headerShown: false,
          tabBarLabel: 'Post Job',
          tabBarIcon: ({ color, size }) => (
            <Icon name={'home'} color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="OurJobs"
        component={OurJobs}
        options={{headerShown: false,
          tabBarLabel: 'Our Jobs',
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
        name="OrganizationSettingNavigator"
        component={OrganizationSettingNavigator}
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