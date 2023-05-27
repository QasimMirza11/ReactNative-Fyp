import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';

const Message = props => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    database()
      .ref('/users/123')
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());
      });

    // database()
    //   .ref('/users/123')
    //   .orderByKey()
    //   .on('value', snapshot => {
    //    const chatList= snapshot.val()
    //    chatList.map((chat)=>{
    //     setMessages((prevMessage)=>{

    //     })
    //    })

    //     console.log('User data: ', snapshot.val());
    //   });
  }, []);

  const renderBubble = props => {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: 'gray',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={style.sendingContainer}>
          <Icon name="send" size={28} color="black" />
        </View>
      </Send>
    );
  };

  const onSend = (messages = []) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {text, user, createdAt: Date.now(), read: false};
      database().ref('/users/123').push(message);
    }
    // console.log('message.', messages);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 123,
      }}
      textInputProps={{style: {color: 'black'}}}
      scrollToBottom
      placeholder="Type Your Message"
      renderSend={renderSend}
      renderBubble={renderBubble}
    />
  );
};

const style = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginLeft: 180,
    marginBottom: 5,
  },
});

export default Message;
