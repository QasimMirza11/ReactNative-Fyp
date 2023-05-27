import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LoadingIndicator from '../Components/LoadingIndicator';
import React, { useState } from 'react';
import { View, Image, Text, TextInput,Pressable, Button, ToastAndroid, AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native';


const Login_Org = ({navigation}) => {
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const error = async () => {
    if(email=='' || pass == '')
   {
    ToastAndroid.show('Credentials not Entered', ToastAndroid.SHORT);
   }
   else{
    handleLogin();
   }
  };
  const handleLogin = async () => {
    
    setLoading(true);
    try {
      const response = await fetch('http://34.93.204.130:5020/organizations/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          pass: pass,
        }),
      });
      const json = await response.json();
      await AsyncStorage.setItem('id',JSON.stringify(json.id));
      navigation.navigate('Org_Dashboard');
      const id = await AsyncStorage.getItem('id');
      setLoading(false);

      console.log(json);
     console.log(id);
     ToastAndroid.show('Sign In Successful', ToastAndroid.SHORT);
    } catch (error) {
      console.log('invalid Credentials');
      ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
      console.error(error);
      setLoading(false);

    }
  };

  return (
    <View style={style.container}>
    {loading && <LoadingIndicator />}
    <Text style={style.textTitle}>Welcome</Text>
    <Text style={style.textTitle1}>Organization Login</Text>
    <View style={style.textBody}>
      <View style={style.loginFieldContainer}>
      <Icon name="user" size={30} color="#262222" style={style.icon} />
        <TextInput style={{width: 200}} 
          name="email"
          color="#262222"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={'black'}
          onChangeText={(text) => setEmail(text)} />
      </View>
      <View style={{...style.loginFieldContainer, justifyContent: 'space-between',}}>
      <View style={{flexDirection: 'row'}}>
              <Icon
                name="lock"
                size={30}
                color="#262222"
                style={style.icon}
              />
    <TextInput
    style={{width: 200}}  
    name="password"
    color="#262222"
    placeholder="Password"
    placeholderTextColor={'black'}
    secureTextEntry={hidePass ? true : false} 
      onChangeText={(text) => setPass(text)} />
      </View>
      <Icon
              style={style.eyeSlash}
              name={hidePass ? 'eye-slash' : 'eye'}
              size={15}
              color="#262222"
              onPress={() => setHidePass(!hidePass)}
            />
            </View>
    </View>
    <TouchableOpacity
            style={style.Button}
            onPress={error}
            color={'#141413'}>
            <Text style={style.text}>Sign In</Text>
          </TouchableOpacity>
          <View
      style={{
        flexDirection: 'row',
        marginVertical: 5,
        alignSelf: 'center',
      }}>
      <Text style={style.textBody}>Don't Have an account? </Text>
      <Text
        style={[style.textBody, {color: 'blue', paddingBottom:3, paddingTop:2, fontWeight:'bold'}]}
        onPress={() => {
          navigation.navigate('SignUp_Org');
        }}>
        Sign Up
      </Text>
    </View>
  </View>
);
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 190,
    marginBottom: 10,
  },
  textTitle: {
    fontFamily: 'Foundation',
    backgroundColor: '#010614',
    borderRadius: 10,
    fontSize: 28,
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '5%',
    paddingBottom: '5%',
    marginTop: 45,
    alignSelf: 'center',
    color: 'white',
    marginBottom: '3%',
  },
  textTitle1: {
    fontFamily: 'Foundation',
    fontSize: 28,
    marginVertical: 10,
    marginBottom: '4%',
     paddingBottom: '3%',
    marginTop: 15,
    alignSelf: 'center',
    color: '#01050d',
  },
  textBody: {
    fontFamily: 'Foundation',
    fontSize: 15,
    marginTop: 1,
    marginBottom: 5,
    marginLeft: 2,
    color: '#010614',
    alignSelf: 'center',
  },
  loginFieldContainer: {
    display: 'flex',
    borderWidth: 3,
    flexDirection: 'row',
    borderRadius: 30,
    margin: 10,
    height: 45,
    paddingHorizontal: 15,
    paddingTop: 3,
    width: 270,
    color: '#262222',
  },
  icon: {
    marginRight: 5,
  },
  Button: {
    padding:"2%",
    paddingLeft:"5%",
    paddingRight:"5%",
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 2,
    backgroundColor: '#010614',
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'Foundation',
    fontSize: 20,
    padding:'2%',
    marginBottom:1,
    color: 'white',
  },
  eyeSlash: {
    alignSelf: 'center',
    paddingBottom: 5,
  },
  textloading: {
    backgroundColor: 'red',
    color: 'black',
  },
});


export default Login_Org;