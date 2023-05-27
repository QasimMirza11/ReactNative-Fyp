import React, { useState } from 'react';
import { View, Text, TextInput, Button, ToastAndroid, AsyncStorage,ScrollView,StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LoadingIndicator from '../Components/LoadingIndicator';


const PostJob = ({navigation}) => {
  const [designation, setDesignation] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');  
  const [loading, setLoading] = useState(false);
  
  const error = async () => {
    if(designation == '' || location =='' || description =='' || category =='' || salary =='')
   {
    ToastAndroid.show('No data Entered', ToastAndroid.LONG);
   }
   else{
    handlePostJob();
   }
  };
  const handlePostJob = async () => {
    setLoading(true);
        const id = await AsyncStorage.getItem('id');
          console.log(id);
    try {
      const response = await fetch('http://34.93.204.130:5020/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          org_id: id,
          designation: designation,
          location: location,
          salary: salary,
          category: category,
          description: description,
        }),
      });
      const json = await response.json();
       await AsyncStorage.setItem('job_id',JSON.stringify(json.id));
      navigation.navigate('RequiredSkills');
      const job_id = await AsyncStorage.getItem('job_id');
      console.log(json);
     console.log(job_id);
     setLoading(false);
     ToastAndroid.show('Details Saved', ToastAndroid.SHORT);
    } catch (error) {
      console.log('invalid Credentials');
      ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <View style={[style.container]}>
            {loading && <LoadingIndicator />}
             <Text style={style.textTitle}>Job Details</Text>
                <View style={style.textBody}>
                  <View style={style.postJobFieldContainer}>
                    <Icon
                      name="user"
                      size={30}
                      color="#262222"
                      style={style.icon}
                    />
                    <TextInput
                      style={{width: 200}}
                      name="designation"
                      color="#262222"
                      placeholder="Designation"
                      placeholderTextColor={'black'}
                      onChangeText={(text) => setDesignation(text)}
                      ></TextInput>
                  </View>
    
                  <View style={style.postJobFieldContainer}>
                    <Icon
                      name="location-arrow"
                      size={27}
                      color="#262222"
                      style={style.icon}
                    />
                    <TextInput
                      style={{width: 200}}
                      name="location"
                      color="#262222"
                      placeholder="Location"
                      placeholderTextColor={'black'}
                      onChangeText={(text) => setLocation(text)}
                      ></TextInput>
                  </View>
                  <View
                    style={{
                      ...style.postJobFieldContainer,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="money"
                        size={30}
                        color="#262222"
                        style={style.icon}
                      />
                      <TextInput
                        style={{width: 200}}
                        name="salary"
                        color="#262222"
                        placeholder="Salary"
                        placeholderTextColor={'black'}
                        onChangeText={(text) => setSalary(text)}
                        ></TextInput>
                    </View>
                  </View>
                  <View
                    style={{
                      ...style.postJobFieldContainer,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="reddit"
                        size={30}
                        color="#262222"
                        style={style.icon}
                      />
                      <TextInput
                        style={{width: 200}}
                        name="category"
                        color="#262222"
                        placeholder="Category"
                        placeholderTextColor={'black'}
                        onChangeText={(text) => setCategory(text)}
                        ></TextInput>
                    </View>
                  </View>
                  <View
                    style={[
                      style.descriptionFieldContainer,
                      {justifyContent: 'space-between'},
                    ]}>
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="comment"
                        size={30}
                        color="#262222"
                        style={style.icon}
                      />
                      <TextInput
                        style={[style.description, {width: 200}]}
                        multiline
                        name="description"
                        color="#262222"
                        placeholder="Description"
                        placeholderTextColor={'black'}
                        onChangeText={(text) => setDescription(text)}
                        ></TextInput>
                    </View>
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
        marginVertical: 10,
      },
      textBody: {
        fontFamily: 20,
      },
      textTitle: {
        fontFamily: 'Foundation',
        fontSize: 28,
        marginVertical: 10,
        marginBottom: 10,
        marginTop: 15,
        alignSelf: 'center',
        color: '#01050d',
      },
      Button1: {
        width: 110,
        height: 50,
        borderRadius: 30,
        marginVertical: 10,
        marginTop: 5,
        borderWidth: 2,
        backgroundColor: '#010614',
        alignSelf: 'center',
      },
      Button2: {
        width: 110,
        height: 40,
        borderRadius: 30,
        marginVertical: 10,
        marginTop: 2,
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
      postJobFieldContainer: {
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
      descriptionFieldContainer: {
        display: 'flex',
        borderWidth: 3,
        flexDirection: 'row',
        borderRadius: 30,
        margin: 10,
        height: 100,
        paddingHorizontal: 15,
        paddingTop: 3,
        width: 270,
        color: '#262222',
      },
      icon: {
        marginRight: 5,
      },
      description: {
        marginBottom: 55,
      },
    });
    
export default PostJob;