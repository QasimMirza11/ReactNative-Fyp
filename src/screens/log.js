import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {setLoggedInAction} from '../redux/reduxSlice/user';
import {useDispatch} from 'react-redux';
import FetchData from '../network/fetchData';
import LoadingIndicator from '../Components/LoadingIndicator';
const log = ({navigation}) => {
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);

    const body = {
      email: values.email,
      pass: values.password,
    };
    try {
      const res = await dispatch(FetchData.login(body));
      console.log(res)
      // await dispatch(FetchData.login(body));
      // await AsyncStorage.setItem('token', value);
    } catch (error) {
      ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
    }

    setLoading(false);
  };

  const validate = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <View style={style.container}>
      <Image
        source={require('../assets/login.png')}
        resizeMode="center"
        style={style.image}
      />
      {loading && <LoadingIndicator />}
      <Text style={style.textTitle}>Welcome</Text>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validate}
        onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={style.textBody}>
            <View style={style.loginFieldContainer}>
              <Icon name="user" size={30} color="#262222" style={style.icon} />
              <TextInput
                style={{width: 200}}
                name="email"
                color="#262222"
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor={'black'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}></TextInput>
            </View>
            {errors.email && (
              <Text style={{color: 'red', marginLeft: 20}}>{errors.email}</Text>
            )}
            <View
              style={{
                ...style.loginFieldContainer,
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
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
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
            {errors.password && (
              <Text style={{color: 'red', marginLeft: 20}}>
                {errors.password}
              </Text>
            )}

            <Pressable
              style={style.Button}
              onPress={handleSubmit}
              color={'#141413'}>
              <Text style={style.text}>Sign In</Text>
            </Pressable>
          </View>
        )}
      </Formik>
      <View style={{width: '50%'}}>
        <Text
          style={style.textBody}
          onPress={() => {
            navigation.navigate('Forgot Password?');
          }}>
          Forgot Password?
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 5,
          alignSelf: 'center',
        }}>
        <Text style={style.textBody}>Don't Have an account</Text>
        <Text
          style={[style.textBody, {color: 'blue'}]}
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          Sign Up
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
    fontSize: 40,
    marginVertical: 10,
    marginBottom: 30,
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
  loginFieldContainer: {
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
  eyeSlash: {
    alignSelf: 'center',
    paddingBottom: 5,
  },
  textloading: {
    backgroundColor: 'red',
    color: 'black',
  },
});

export default log;
