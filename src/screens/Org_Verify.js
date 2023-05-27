import * as React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const Org_Verify = ({navigation}) => {
  return (
    <View style={style.container}>
      <Text style={style.textTitle}>Please Verify your Email!</Text>
      <Text style={style.text1}>Already Verified?</Text>
              <Pressable
                style={style.Button1}
                onPress={() => navigation.navigate('Login_Org')}
                color={'#141413'}>
                <Text style={style.text}>Login</Text>
              </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 10,
  },
  textTitle: {
    fontFamily: 'Foundation',
      backgroundColor: '#010614',
      borderRadius: 10,
      fontSize: 22,
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingTop: '5%',
      paddingBottom: '5%',
      alignSelf: 'center',
      color: 'white',
      marginBottom: '3%',
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'Foundation',
    fontSize: 22,
    marginTop: 10,
    paddingBottom: '1%',
    color: 'white',
  },
  Button1: {
    paddingRight:'8%',
    paddingLeft:'8%',
    paddingBottom:'2%',
    borderRadius: 30,
    marginVertical: 10,
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: 'darkblue',
  },
  text1: {
    marginTop:'10%',
    alignSelf: 'center',
    fontFamily: 'Foundation',
    fontSize: 16,
  },
});

export default Org_Verify;
