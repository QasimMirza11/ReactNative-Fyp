import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, AsyncStorage, Pressable } from 'react-native';

const OrganizationProfile = ({navigation}) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile data from API
    fetchUserProfile()
      .then((data) => setUserProfile(data))
      .catch((error) => console.error(error));
  }, []);

  const fetchUserProfile = async () => {
    const id = await AsyncStorage.getItem('id');
    try {
      const response = await fetch(`http://34.93.204.130:5020/organizations/profile?id=${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch user profile data');
    }
  };

  if (!userProfile) {
    // Render loading indicator while fetching data
    return (
      <View style={style.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View>
        <Pressable
        onPress={() => {
          navigation.navigate('Dashboard');
        }}
          color={'#141413'}>
          <Text style={style.text}>Sign Out</Text>
        </Pressable>
      </View>
       <View style={style.container}>
       <Text style={[style.name,{fontWeight:'bold',fontSize:24, backgroundColor:'black',padding:'2%',borderRadius:10}]}>Organization Profile</Text>
        <Text style={style.name}>Name: {userProfile.name}</Text>
        <Text style={style.education}>About: {userProfile.about}</Text>
        <Text style={style.phone}>Website: {userProfile.website}</Text>
        <Text style={style.skills}>Email: {userProfile.email}</Text>
        <Text style={style.experiences}>Created At: {userProfile.CreatedAt}</Text>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  text: {
    borderRadius:20,
    alignSelf:'center',
    margin:'10%',
    width: '30%',
    padding: '5%',
    color: 'white',
    backgroundColor:'darkred',
    fontSize: 18,
  },
  container: {
    borderRadius:30,
    marginVertical:'10%',
    marginHorizontal:'10%',
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#38393b',

    color:'white'
  },
  name: {
    color:'white',
    flexDirection: 'row',
    fontSize: 18,
    marginTop:'5%',
    marginBottom: '5%',
  },
  education: {
    color:'white',
    flexDirection: 'row',
    fontSize: 18,
    marginBottom: '5%',
  },
  phone: {
    color:'white',
    flexDirection: 'row',
    fontSize: 18,
    marginBottom: '5%',
  },
  skills: {
    color:'white',
    flexDirection: 'row',
    fontSize: 18,
    marginBottom: '5%',
  },
  experiences: {
    color:'white',
    flexDirection: 'row',
    fontSize: 18,
    marginBottom: '5%',
  },
  submitButton:{
    borderRadius:10,
    marginLeft:'3%',
  },
  heading: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
  },
  h1: {
    color: 'black',
    margin: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  h2: {
    color: 'black',
    margin: 10,
    marginBottom: 5,
    fontSize: 17,
    fontWeight: 'bold',
  },
  h3: {
    color: 'black',
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  h4: {
    color: 'black',
    fontSize: 15,
    marginLeft: 13,
  },
  h5: {
    color: 'black',
    fontSize: 15,
    marginLeft: 13,
  },
  h6: {
    color: 'black',
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  h7: {
    color: 'black',
    marginLeft: 13,
    fontSize: 15,
  },
  h8: {
    color: 'black',
    marginLeft: 13,
    fontSize: 15,
  },
  h9: {
    color: 'black',
    marginLeft: 13,
    fontSize: 15,
  },
  h10: {
    color: 'black',
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  h11: {
    color: 'black',
    marginLeft: 13,
    fontSize: 15,
  },
  h12: {
    color: 'black',
    marginLeft: 13,
    fontSize: 15,
  },
});

export default OrganizationProfile;
