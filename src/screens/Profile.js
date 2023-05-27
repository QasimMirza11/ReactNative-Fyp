import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Pressable,
  Button,
  AsyncStorage,
} from 'react-native';
import LoadingIndicator from '../Components/LoadingIndicator';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';

const Profile = ({ navigation }) => {
    const [fileResponse, setfileResponse] = useState([]);
  const [loading, setLoading] = useState(false);
   //FUNCTION OF GETTING FILE FROM PHONE

   const uploadFile = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      ToastAndroid.show('Files is Added', ToastAndroid.SHORT);
      setfileResponse(response);
    } catch (error) {
      console.log(error);
    }
  };
//API OF UPLOAD FILES TO SERVER

const sendFile = async () => {
  
  const data = new FormData();
  for (const res of fileResponse) {
    //Printing the log realted to the file
    // console.log('res : ' + JSON.stringify(res));
    var urii = res.uri;
    var namee = res.name;
    var typee = res.type;
    console.log('Type : ' + res.type);
    console.log('File Name : ' + res.name);
    console.log('File Size : ' + res.size);
    data.append('myFile', {
      name: namee,
      type: typee,
      uri: urii,
    });
  }
  console.log(JSON.stringify(data));

  try {
    setLoading(true);
    const id = await AsyncStorage.getItem('id');
    console.log('id',id);
    await fetch(`http://34.93.204.130:5020/upload?user_id=${id}`, {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setLoading(false);
    ToastAndroid.show('Upload Successfully', ToastAndroid.SHORT);
    console.log(data);
  } catch (error) {
    ToastAndroid.show('Upload Unsuccessful', ToastAndroid.LONG);
    setLoading(false);
    console.log(error);
  }
};


  const [userProfile, setUserProfile] = useState(null);

  const fetchUserProfile = async () => {
    const id = await AsyncStorage.getItem('id');
    try {
      const response = await fetch(`http://34.93.204.130:5020/profile?user_id=${id}`);
      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error('Failed to fetch user profile data', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
            {loading && <LoadingIndicator />}
       <View>
        <Pressable
        onPress={() => {
          navigation.navigate('Dashboard');
        }}
          color={'#141413'}>
          <Text style={style.text}>Sign Out</Text>
        </Pressable>
      </View>
      
      {fileResponse.map((file, index) => (
        <Text
          key={index.toString()}
          style={style.name}
          numberOfLines={3}
          ellipsizeMode={'middle'}>
          {file?.name}
        </Text>
      ))}
      <View
        style={[
          {
            marginTop: '10%',
            alignSelf: 'center',
            flexDirection: 'row',
          },
        ]}>
          
        <Button
          title="Upload CV"
          enctype="multipart/form-data"
          method="post"
          color={'black'}
          onPress={uploadFile}
        />

        <View style={style.submitButton}>
          <Button title="Submit" color={'black'} onPress={sendFile} />
        </View>
      </View>
      <View style={style.container}>
        <Text style={style.name}>Name: {userProfile.name}</Text>
        <Text style={style.education}>Education: {userProfile.education}</Text>
        <Text style={style.phone}>Phone: {userProfile.phone}</Text>
        <Text style={style.skills}>Skills: {userProfile.skills}</Text>
        <Text style={style.experiences}>Experiences: {userProfile.experiences}</Text>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
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
});

export default Profile;