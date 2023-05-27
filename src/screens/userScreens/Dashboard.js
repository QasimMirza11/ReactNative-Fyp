import * as React from 'react';
import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';

const Dashboard = ({navigation}) => {
  const Separator = () => <View style={style.separator} />;
  return (
      <View style={style.container}>
        <Text style={style.textTitle}>Hii there!!</Text>
        <Text style={style.textTitle1}>Welcome to J2E!</Text>
      <View style={style.styleLoginBtn}>
        <Button style={style.styleBtn}
          onPress={() => {
            navigation.navigate('Login');
          }}
          title="Applicant"
          color={'#14130f'}
        />
        <Separator />
        <Button
          onPress={() => {
            navigation.navigate('Login_Org');
          }}
          title="Organization"
          color={'#14130f'}
        />
        </View>
      </View>
    
  );
};

const style = StyleSheet.create({
  styleBtn:{
    fontSize:25,
    padding:'6%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textTitle1:{
    fontFamily: 'Foundation',
    backgroundColor: '#010614',
    borderRadius: 10,
    fontSize: 28,
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '5%',
    paddingBottom: '5%',
    alignSelf: 'center',
    color: 'white',
    marginBottom: '3%',
  },
  textTitle: {
    fontFamily: 'Foundation',
    fontStyle: 'italic',
    fontSize: 28,
    marginBottom: '8%',
    alignSelf: 'center',
    color: '#01050d',
  },
  separator: {
    marginVertical: '2%',
  },
  styleLoginBtn: {
    width: '65%',
    marginTop: '5%',
    marginLeft: '14%',
    marginRight: '14%',
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'black', //button background/border color
    overflow: 'hidden',
    marginBottom: '10%',
    justifyContent: 'center',
  },
});

export default Dashboard;
