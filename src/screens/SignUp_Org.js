import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LoadingIndicator from '../Components/LoadingIndicator';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  ToastAndroid, Button
} from 'react-native';


const SignUp_Org = ({navigation}) => {
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const [website, setWebsite] = useState('');
  const [about, setAbout] = useState('');
  const error = async () => {
    if(website == '' || about == '' || name == '' || email=='' || pass == '' || confirmpass == '')
   {
    ToastAndroid.show('Credentials not Entered', ToastAndroid.LONG);
    
   }
   else{
    if(pass == confirmpass){
    handleSignUpOrg();
   }
   else{
    ToastAndroid.show('Passwords do not match', ToastAndroid.LONG);
   }
   }
  };

  const handleSignUpOrg = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://34.93.204.130:5020/organizations/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          pass: pass,
          website: website,
          about: about,
        }),
      });
      console.log(response);
      // const json = await response.json();
      //  await AsyncStorage.setItem('id',JSON.stringify(json.id));
      setLoading(false);
      navigation.navigate('Org_Verify');
      ToastAndroid.show('Credentials Saved', ToastAndroid.SHORT);

    //   const id = await AsyncStorage.getItem('id');
      // console.log(json);
    //  console.log(id);
    } catch (error) {
      console.log('invalid Credentials');
      ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
                   {loading && <LoadingIndicator />}
           <View style={[style.container]}>
             <Text style={style.textTitle}>Organization Sign Up</Text>
             <Text style={style.textTitle1}>Create a New Account</Text>
             <View style={{marginTop: 10}} />
                <View style={style.textBody}>
                  <View style={style.signUpFieldContainer}>
                    <Icon
                      name="user"
                      size={30}
                      color="#262222"
                      style={style.icon}
                    />
                    <TextInput
                      style={{width: 200}}
                      name="name"
                      color="#262222"
                      placeholder="Name"
                      placeholderTextColor={'black'}
                      onChangeText={(text) => setName(text)}
                      ></TextInput>
                  </View>
                  
    
                  <View style={style.signUpFieldContainer}>
                    <Icon
                      name="envelope"
                      size={27}
                      color="#262222"
                      style={style.icon}
                    />
                    <TextInput
                      style={{width: 200}}
                      name="email"
                      color="#262222"
                      placeholder="Email"
                      placeholderTextColor={'black'}
                      onChangeText={(text) => setEmail(text)}
                      ></TextInput>
                  </View>
                 
    
                  <View
                    style={{
                      ...style.signUpFieldContainer,
                      justifyContent: 'space-between',
                    }}>
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
                        onChangeText={(text) => setPass(text)}
                        secureTextEntry={hidePass ? true : false}></TextInput>
                    </View>
                    <Icon
                      style={style.eyeSlash}
                      name={hidePass ? 'eye-slash' : 'eye'}
                      size={15}
                      color="#262222"
                      onPress={() => setHidePass(!hidePass)}
                    />
                  </View>
                  
    
                  <View
                    style={{
                      ...style.signUpFieldContainer,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="lock"
                        size={30}
                        color="#262222"
                        style={style.icon}
                      />
                      <TextInput
                        style={{width: 200}}
                        name="confirmPassword"
                        color="#262222"
                        placeholder="Confirm Password"
                        placeholderTextColor={'black'}
                        onChangeText={(text) => setConfirmPass(text)}
                        secureTextEntry={hidePass ? true : false}></TextInput>
                    </View>
                    <Icon
                      style={style.eyeSlash}
                      name={hidePass ? 'eye-slash' : 'eye'}
                      size={15}
                      color="#262222"
                      onPress={() => setHidePass(!hidePass)}
                    />
                  </View>
    
                  
                  <View style={style.profileFieldContainer}>
                  <Icon name="globe" size={30} color="#262222" style={style.icon} />
                  <TextInput
                    style={{width: 200}}
                    name="website"
                    color="black"
                    placeholder="Website"
                    placeholderTextColor={'black'}
                    onChangeText={(text) => setWebsite(text)}
                    ></TextInput>
                </View>
               
                <View style={style.aboutFieldContainer}>
                  <Icon
                    name="comment"
                    size={30}
                    color="#262222"
                    style={style.icon}
                  />
                  <TextInput
                    style={style.about}
                    name="about"
                    multiline={true}
                    color="black"
                    placeholder="About"
                    placeholderTextColor={'black'}
                    onChangeText={(text) => setAbout(text)}
                    ></TextInput>
                </View>
    
                  <Pressable
                    style={style.Button}
                    onPress={error}
                    color={'#141413'}>
                    <Text style={style.text}>Sign Up</Text>
                  </Pressable>
                  <Text style={style.textBody}>Don't Have an account? </Text>
      <Text
        style={[style.textBody, {color: 'blue', paddingBottom:3, paddingTop:2, fontWeight:'bold'}]}
        onPress={() => {
          navigation.navigate('Login_Org');
        }}>
        Sign In
      </Text>
                </View>
          </View>
        </ScrollView>
      );
    };
    
    const style = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
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
        marginBottom: '2%',
         paddingBottom: '3%',
        marginTop: 15,
        alignSelf: 'center',
        color: '#01050d',
      },
      Button: {
        paddingRight:'8%',
        paddingLeft:'8%',
        paddingBottom:'2%',
        borderRadius: 30,
        marginVertical: 10,
        marginBottom: 20,
        alignSelf: 'center',
        backgroundColor: '#010614',
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
      text: {
        alignSelf: 'center',
        fontFamily: 'Foundation',
        fontSize: 22,
        marginTop: 10,
        paddingBottom: '1%',
        color: 'white',
      },
      signUpFieldContainer: {
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
      eyeSlash: {
        alignSelf: 'center',
        paddingBottom: 5,
      },
      //
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: 5,
      },
      text1: {
        alignSelf: 'center',
        fontFamily: 'Foundation',
        fontSize: 16,
      },
      profileFieldContainer: {
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
        alignSelf: 'center',
      },
      aboutFieldContainer: {
        display: 'flex',
        borderWidth: 3,
        flexDirection: 'row',
        borderRadius: 30,
        margin: 10,
        height: 150,
        paddingHorizontal: 15,
        paddingTop: 3,
        width: 270,
        color: '#262222',
        alignSelf: 'center',
        alignContent: 'flex-start',
      },
      about: {
        width: 200,
        height: 150,
        textAlignVertical: 'top',
      },
      icon: {
        marginRight: 5,
      },
    });
    
export default SignUp_Org;