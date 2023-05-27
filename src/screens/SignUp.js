import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LoadingIndicator from '../Components/LoadingIndicator';
import React, { useState } from 'react';
import { View, Image, Text, TextInput,Pressable, Button, ToastAndroid, AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native';

const SignUp = ({ navigation }) => {
  
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const error = async () => {
    if(name == '' || email=='' || pass == '' || confirmpass == '')
   {
    ToastAndroid.show('Credentials not Entered', ToastAndroid.LONG);
    
   }
   else{
    if(pass == confirmpass){
    handleSignUp();
   }
   else{
    ToastAndroid.show('Passwords do not match', ToastAndroid.LONG);
   }
   }
  };

  const handleSignUp = async () => {
    
    try {
      setLoading(true);
      const response = await fetch('http://34.93.204.130:5020/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          pass: pass,
        }),
      });
      const json = await response.json();
      await AsyncStorage.setItem('id', JSON.stringify(json.id));
      navigation.navigate('GeneralDetails');
      const id = await AsyncStorage.getItem('id');
      console.log(json);
      console.log(id);
      ToastAndroid.show('Credentials Saved', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Invalid Credentials');
      ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={[style.container]}>
    {loading && <LoadingIndicator />}
    <Text style={style.textTitle}>Applicant Registration</Text>
    <Text style={style.textTitle1}>Create a New Account</Text>
    <View style={style.textBody}>
   
                <View style={style.signupFieldContainer}>
      <Icon name="user" size={30} color="#262222" style={style.icon} />
        <TextInput style={{width: 200}} 
          name="name"
          color="#262222"
          placeholder="Name"
          placeholderTextColor={'black'}
          onChangeText={(text) => setName(text)} />
      </View>
      <View style={style.signupFieldContainer}>
      <Icon
        name="envelope"
        size={27}
        color="#262222"
        style={style.icon}
      />
        <TextInput style={{width: 200}} 
          name="email"
          color="#262222"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={'black'}
          onChangeText={(text) => setEmail(text)} />
      </View>
      <View style={{...style.signupFieldContainer, justifyContent: 'space-between',}}>
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
            <View style={{...style.signupFieldContainer, justifyContent: 'space-between',}}>
      <View style={{flexDirection: 'row'}}>
              <Icon
                name="lock"
                size={30}
                color="#262222"
                style={style.icon}
              />
    <TextInput
    style={{width: 200}}  
    name="confirmpassword"
    color="#262222"
    placeholder="Confirm Password"
    placeholderTextColor={'black'}
    secureTextEntry={hidePass ? true : false} 
      onChangeText={(text) => setConfirmPass(text)} />
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
            <Text style={style.text}>Sign Up</Text>
          </TouchableOpacity>
          <View
      style={{
        flexDirection: 'row',
        marginVertical: 5,
        alignSelf: 'center',
      }}>
      <Text style={style.textBody}>Already have an account? </Text>
      <Text
        style={[style.textBody, {color: 'blue', paddingBottom:3, paddingTop:2, fontWeight:'bold'}]}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Sign In
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
    marginTop: 15,
    alignSelf: 'center',
    color: 'white',
    marginBottom: '3%',
  },
  textTitle1: {
    fontFamily: 'Foundation',
    fontSize: 28,
    marginVertical: 10,
    marginBottom: '2%',
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
  signupFieldContainer: {
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

export default SignUp;