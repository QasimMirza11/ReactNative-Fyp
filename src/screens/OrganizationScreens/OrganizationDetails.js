import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setLoggedInAction} from '../../redux/reduxSlice/user';
// import FetchData from '../../network/fetchData';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import LoadingIndicator from '../../Components/LoadingIndicator';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const OrganizationDetail = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);

    const body = {
      name: values.name,
      website: values.website,
      about: values.about,
    };
    try {
      // await dispatch(FetchData.Organizations(body));
      navigation.navigate('Organization Bottom Tab', {
        navigatedFrom: 'organization',
      });
    } catch (error) {
      ToastAndroid.show('Something has wrong', ToastAndroid.SHORT);
    }
    setLoading(false);
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
      <Text style={style.textTitle}>Organization Details</Text>
      <View style={{marginTop: '3%'}} />
      <Formik
        initialValues={{
          name: '',
          website: '',
          about: '',
        }}
        // validationSchema={validate}
        onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={style.textBody}>
            <View style={style.profileFieldContainer}>
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
            <View style={style.profileFieldContainer}>
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
                style={style.about}
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
                dispatch(setLoggedInAction(true));
              }}
              color={'#141413'}>
              <Text style={style.text}>Sign Out</Text>
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
    // marginVertical: 5,
  },
  textTitle: {
    fontFamily: 'Foundation',
    fontStyle: 'italic',
    fontSize: 28,
    marginVertical: '5%',
    marginBottom: '8%',
    marginTop: '13%',
    alignSelf: 'center',
    color: '#010614',
  },
  // TextInput: {
  //   width: 100,
  //   height: 20,
  //   margin: 10,
  //   borderWidth: 3,
  //   padding: 10,
  //   color: '#02050d',
  //   borderRadius: 50,
  //   alignSelf: 'center',
  //   backgroundColor: 'red',
  // },
  Button: {
    width: '50%',
    height: '10%',
    borderRadius: 30,
    marginVertical: '2%',
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
    alignContent: 'flex-start',
  },
  about: {
    width: 200,
    height: 150,
    textAlignVertical: 'top',
  },
  icon: {
    marginRight: 5,
  },
});

export default OrganizationDetail;
