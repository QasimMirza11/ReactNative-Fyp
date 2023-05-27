import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import LoadingIndicator from '../Components/LoadingIndicator';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import {create} from 'react-test-renderer';

const OrganizationEditProfile = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);

  const submitOrganizationData = values => {
    console.log('value', values);
    setLoading(true);
  };

  const validate = Yup.object().shape({
    name: Yup.string().required('Please enter name'),
    website: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!',
      )
      .required('Please enter website'),
  });

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {loading && <LoadingIndicator />}
      <Text style={style.textTitle}>Edit Profile</Text>
      <View style={{marginTop: 20}} />
      <Formik
        initialValues={{
          name: '',
          website: '',
          about: '',
        }}
        // validationSchema={validate}
        onSubmit={submitOrganizationData}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={style.textBody}>
            <View style={style.editProfileFieldContainer}>
              <Icon
                name="smile-o"
                size={30}
                color="#262222"
                style={style.icon}
              />
              <TextInput
                style={{width: 200}}
                name="name"
                color="black"
                placeholder="Name"
                placeholderTextColor={'black'}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}></TextInput>
            </View>
            {errors.name && (
              <Text style={{color: 'red', marginLeft: 50}}>{errors.name}</Text>
            )}
            <View style={style.editProfileFieldContainer}>
              <Icon name="globe" size={30} color="#262222" style={style.icon} />
              <TextInput
                style={{width: 200}}
                name="website"
                color="black"
                placeholder="Website"
                placeholderTextColor={'black'}
                onChangeText={handleChange('website')}
                onBlur={handleBlur('website')}
                value={values.website}></TextInput>
            </View>
            {errors.website && (
              <Text style={{color: 'red', marginLeft: 50}}>
                {errors.website}
              </Text>
            )}
            <View style={style.aboutFieldContainer}>
              <Icon
                name="comment"
                size={30}
                color="#262222"
                style={style.icon}
              />
              <TextInput
                style={[style.about, {width: 200}]}
                name="about"
                multiline={true}
                color="black"
                placeholder="About"
                placeholderTextColor={'black'}
                onChangeText={handleChange('about')}
                onBlur={handleBlur('about')}
                value={values.about}></TextInput>
            </View>
            {errors.about && (
              <Text style={{color: 'red', marginLeft: 50}}>{errors.about}</Text>
            )}

            <Pressable
              style={style.Button}
              onPress={handleSubmit}
              color={'#141413'}>
              <Text style={style.text}>Submit</Text>
            </Pressable>
            <Pressable
              style={style.Button}
              onPress={() => {
                navigation.navigate('Profile');
              }}
              color={'#141413'}>
              <Text style={style.text}>Cancel</Text>
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
    marginBottom: 10,
    marginTop: 40,
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
  editProfileFieldContainer: {
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
  },
  about: {
    marginBottom: 105,
  },
  icon: {
    marginRight: 5,
  },
});

export default OrganizationEditProfile;
