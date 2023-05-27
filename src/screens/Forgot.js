import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Forgot = props => {
  const validate = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Text style={style.textTitle}>Enter Your Email</Text>
      <View style={{marginTop: 10}} />
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validate}
        onSubmit={values => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={style.textBody}>
            <View style={style.forgotFieldContainer}>
              <Icon
                name="envelope"
                size={30}
                color="#262222"
                style={style.icon}
              />
              <TextInput
                style={{width: 200}}
                name="email"
                placeholder="Email"
                placeholderTextColor={'black'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}></TextInput>
            </View>
            {errors.email && (
              <Text style={{color: 'red', marginLeft: 50}}>{errors.email}</Text>
            )}

            <Pressable
              style={style.Button}
              onPress={handleSubmit}
              color={'#141413'}>
              <Text style={style.text}>Submit</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  textTitle: {
    fontFamily: 'Foundation',
    fontSize: 28,
    marginVertical: 10,
    marginBottom: 30,
    marginTop: 55,
    alignSelf: 'center',
    color: '#010614',
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
  Button: {
    width: 200,
    height: 45,
    borderRadius: 30,
    marginVertical: 10,
    marginBottom: 20,
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
  forgotFieldContainer: {
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
});

export default Forgot;
