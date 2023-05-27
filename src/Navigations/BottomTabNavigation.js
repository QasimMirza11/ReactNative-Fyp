import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ApplicantSettingNavigator from './ApplicantSettingNavigator';
import OrganizationSettingNavigator from './OrganizationSettingNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import FindJobs from '../screens/FindJobs';
import MyJobs from '../screens/MyJobs';
import PostJob from '../screens/PostJob';
import OurJobs from '../screens/OurJobs';
import MessageStackNavigator from './MessageStackNavigator';

const Tab = createBottomTabNavigator();

const Screens = {
  applicant: [
    {name: 'Find Jobs', component: FindJobs, icon: 'home'},
    {name: 'My Jobs', component: MyJobs, icon: 'tasks'},
    {name: 'Message', component: MessageStackNavigator, icon: 'envelope-o'},
    {
      name: 'My Profile',
      component: ApplicantSettingNavigator,
      icon: 'user-circle',
    },
  ],
  organization: [
    {name: 'Post Job', component: PostJob, icon: 'home'},
    {name: 'Our Jobs', component: OurJobs, icon: 'tasks'},
    {name: 'Message', component: MessageStackNavigator, icon: 'envelope-o'},
    {
      name: 'Our Profile',
      component: OrganizationSettingNavigator,
      icon: 'user-circle',
    },
  ],
};
const BottomTabNavigation = ({route}) => {
  const {navigatedFrom} = route.params;
  const screenList = Screens[navigatedFrom];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      {screenList.map((screen, index) => (
        <Tab.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarIcon: ({size, color}) => (
              <Icon name={screen.icon} color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
export default BottomTabNavigation;
