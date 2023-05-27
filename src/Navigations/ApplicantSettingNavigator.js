import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import {View, StyleSheet, Text, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();

const ApplicantSettingNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#010614',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: props => <Text style={style.heading}>Profile</Text>,

          // headerRight: () => (
          //   <View style={[{flexDirection: 'row', padding: 0, margin: 5}]}>
          //     <Button
          //       onPress={() => {
          //         props.navigation.navigate('EditProfile');
          //       }}
          //       title="Edit"
          //       color="#020712"
          //     />
          //     <Icon
          //       style={{marginTop: 9}}
          //       name="edit"
          //       size={20}
          //       color="white"
          //     />
          //   </View>
          // ),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const style = StyleSheet.create({
  heading: {
    fontSize: 20,
    color: 'white',
  },
});

export default ApplicantSettingNavigator;
