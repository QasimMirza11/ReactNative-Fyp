import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, StyleSheet, Text, Button} from 'react-native';
import Message from '../screens/Message';
import MessageList from '../screens/MessageList';

const Stack = createNativeStackNavigator();

const MessageStackNavigator = props => {
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
        name="ChatList"
        component={MessageList}
        options={{
          headerTitle: props => <Text style={style.heading}>MessageList</Text>,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Message}
        options={({route}) => ({
          // title: route.params.jobDescription,
          headerBackVisible: false,
        })}
        // headerTitle: props => <Text style={style.heading}>Message</Text>,
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

export default MessageStackNavigator;
