import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootNavigator from './RootNavigator';

const Stack = createNativeStackNavigator();

const Navigation = props => {
  // const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  return (
     <RootNavigator/>
    // <NavigationContainer>
    //   {isLoggedIn ? <DashboardNavigator /> : <PublicNavigator />}
    // </NavigationContainer>
  );
};

export default Navigation;
