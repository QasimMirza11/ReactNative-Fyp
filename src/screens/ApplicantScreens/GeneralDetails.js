import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  TextInput,
  ScrollView,
  ToastAndroid,AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LoadingIndicator from '../../Components/LoadingIndicator';

  const GeneralDetails = ({navigation}) => {
    
    const [hidePass, setHidePass] = useState(true);
    const [loading, setLoading] = useState(false);
  const [education, setEducation] = useState('');
  const [phone, setPhone] = useState('');

  const error = async () => {
    if(education == '' || phone =='')
   {
    ToastAndroid.show('No data Entered', ToastAndroid.LONG);
    
   }
   else{
    handleDetails();
   
   }
  };

  const handleDetails = async () => {
    setLoading(true);
    const id = await AsyncStorage.getItem('id');
    try {
      const response = await fetch('http://34.93.204.130:5020/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
          education: education,
          phone: phone,
        }),
      });
      setLoading(false);
      navigation.navigate('PreviousExperience');
      ToastAndroid.show('Data Saved!', ToastAndroid.SHORT);
     console.log('id:',id);
    } catch (error) {
      console.log('invalid Credentials');
      setLoading(false);
      ToastAndroid.show('Invalid Credentials', ToastAndroid.LONG);
      console.error(error);
    }
  };

  return (
    <View style={[style.container,{backgroundColor: 'white'}]}>
           {loading && <LoadingIndicator />}
           <Text style={style.textTitle}>General Details</Text>
           <View style={{marginTop: '3%'}} />
              <View style={style.textBody}>
                <View style={style.profileFieldContainer}>
                  <Icon
                    name="mortar-board"
                    size={30}
                    color="#262222"
                    style={style.icon}
                  />
    
                  <TextInput
                    style={{width: 200}}
                    name="education"
                    color="black"
                    placeholder="Education"
                    placeholderTextColor={'black'}
                    onChangeText={(text) => setEducation(text)}
                    ></TextInput>
                </View>
                <View style={style.profileFieldContainer}>
                  <Icon name="phone" size={30} color="#262222" style={style.icon} />
                  <Text style={{color: 'black', paddingTop: 6}}>+92</Text>
                  <TextInput
                    style={{width: 200}}
                    name="phone"
                    color="black"
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    placeholderTextColor={'black'}
                    onChangeText={(text) => setPhone(text)}
                    ></TextInput>
                </View>
              
                <Pressable
                  style={style.Button1}
                  onPress={error}
                  color={'#141413'}>
                  <Text style={style.text}>Next</Text>
                </Pressable>
          </View>
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
      TextInput: {
        width: 270,
        height: 45,
        margin: 10,
        borderWidth: 3,
        padding: 10,
        color: '#02050d',
        borderRadius: 50,
        alignSelf: 'center',
      },
      Button1: {
        width: 200,
        height: 45,
        borderRadius: 30,
        marginVertical: 10,
        marginBottom: 20,
        marginTop: 35,
        borderWidth: 2,
        backgroundColor: '#010614',
        alignSelf: 'center',
      },
      Button2: {
        width: 200,
        height: 45,
        borderRadius: 30,
        marginVertical: 10,
        marginBottom: 20,
        marginTop: 5,
        borderWidth: 2,
        backgroundColor: '#010614',
        alignSelf: 'center',
      },
      text: {
        alignSelf: 'center',
        fontFamily: 'Foundation',
        fontSize: 22,
        marginTop: 10,
        color: 'white',
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
      icon: {
        marginRight: 5,
      },
      submitButton: {
        marginLeft: '5%',
      },
      textStyle: {
        color: 'black',
      },
    });

export default GeneralDetails;