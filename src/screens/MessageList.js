import {ThemeProvider} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Pressable,
  FlatList,
  UserInfo,
} from 'react-native';

// import database from '@react-native-firebase/database';
// import {useSelector} from 'react-redux';

const MessageList = ({navigation}) => {
  // const {user} = useSelector(state => state.user);
  // const [allUser, setallUser] = useState([]);

  const messagesData = [
    {
      id: '1',
      userName: 'Ahmed',
      messageTime: '4 mins ago',
      messageText: 'Hey there, are you ahmed?',
    },
    {
      id: '2',
      userName: 'Ali',
      messageTime: '20 mins ago',
      messageText: 'Hey there, are you ali?',
    },
    {
      id: '3',
      userName: 'Usama',
      messageTime: '50 mins ago',
      messageText: 'Hey there, are you usama?',
    },
  ];

  // React.useEffect(() => {
  //   getAllUser();
  // }, []);

  // const getAllUser = () => {
  //   database()
  //     .ref('/users/123')
  //     .once('value')
  //     .then(snapshot => {
  //       console.log('User data: ', Object.values(snapshot.val()));
  //       // setallUser(
  //       //   Object.values(snapshot.val()).filter(item => item.id != user.id),
  //       // );
  //     });
  // };

  return (
    <View style={[style.container, {backgroundColor: 'white'}]}>
      <FlatList
        data={messagesData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            style={style.card}
            onPress={() => {
              navigation.navigate('Chat'); // , {userName: item.userName}
            }}>
            <View style={style.UserInfo}>
              <View style={style.TextSection}>
                <View style={style.UserInfoText}>
                  <Text style={style.UserName}>{item.userName}</Text>
                  <Text style={style.PostTime}>{item.messageTime}</Text>
                </View>
                <Text style={style.MessageText}>{item.messageText}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
    //   <View
    //     style={[
    //       {
    //         flexDirection: 'row',
    //         padding: 2,
    //         margin: 5,
    //         marginLeft: 240,
    //         // justifyContent: 'flex-end',
    //         borderWidth: 1,
    //         borderRadius: 20,
    //         width: 110,
    //         backgroundColor: '#1a1c1b',
    //       },
    //     ]}>
    //     <Pressable
    //       // onPress={() => {
    //       //   navigation.navigate('Chat');
    //       // }}
    //       color={'#141413'}>
    //       <Text style={style.text}>New Message</Text>
    //     </Pressable>
    //   </View>
    // </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  card: {
    width: '100%',
  },
  UserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  UserInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  UserName: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
  },
  text: {
    width: 120,
    padding: 5,
    color: 'white',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  PostTime: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Lato-Regular',
  },
  MessageText: {
    fontSize: 14,
    color: '#333333',
  },
});

export default MessageList;
