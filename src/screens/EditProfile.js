import * as React from 'react';
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
  KeyboardAvoidingView,
} from 'react-native';

const EditProfile = ({navigation}) => {

  const [loading, setLoading] = React.useState(false);
  const [educationField, setEducationField] = React.useState(profile.education);
  const [skillField, setSkillFeild] = React.useState(['']);
  const [experienceField, setExperienceField] = React.useState(['']);

  const addField = () => {
    const education = [...educationField];
    education.push('');
    setEducationField(education);
  };

  const handleChangeEducation = (value, index) => {
    console.log('..', education);

    console.log('value..', value);
    const education = [...educationField];
    education[index] = value;
    setEducationField(education);
  };

  const removeField = index => {
    let data = [...educationField];
    data.splice(index, 1);
    setEducationField(data);
  };

  const addSkillField = () => {
    const skill = [...skillField];
    skill.push('');
    setSkillFeild(skill);
  };

  const handleChangeSkill = (value, index) => {
    console.log('..', skill);

    console.log('value', value);
    const skill = [...skillField];
    skill[index] = value;
    setSkillFeild(skill);
  };

  const removeSkillField = index => {
    let data = [...skillField];
    data.splice(index, 1);
    setSkillFeild(data);
  };

  const addExperienceField = () => {
    const experience = [...experienceField];
    experience.push('');
    setExperienceField(experience);
  };

  const handleChangeExperience = (value, index) => {
    console.log('..', experience);

    console.log('value', value);
    const experience = [...experienceField];
    experience[index] = value;
    setExperienceField(experience);
  };

  const removeExperienceField = index => {
    let data = [...experienceField];
    data.splice(index, 1);
    setExperienceField(data);
  };

  // const handleFormChange = (index, event) => {
  //   const data = [...educationField];
  //   data[index][event.target.education] = event.target.value;
  //   setEducationField(data);
  // };

  const submitApplicantData = values => {
    console.log('education', educationField);
    console.log('values..', values);
    setLoading(true);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validate = Yup.object().shape({
    name: Yup.string().required('Input is required'),
    email: Yup.string().required('Input is required'),
    phone: Yup.string()
      .required('Phone Number is required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'to short')
      .max(10, 'to long'),
    // education: Yup.string().required('Education is required'),
    skill: Yup.string().required('Input is required'),
    experience: Yup.string().required('Input is required'),
  });

  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      keyboardDismissMode="interactive">
      {loading && <LoadingIndicator />}
      <Text style={style.textTitle}>Edit Profile</Text>
      <View style={{marginTop: 20}} />
      <Formik
        initialValues={{
          name: profile.name,
          email: profile.email,
          contact: profile.contact,
          education: '',
          skill: '',
          experience: '',
        }}
        // validationSchema={validate}
        onSubmit={submitApplicantData}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={style.textBody}>
            <View style={style.editProfileFieldContainer}>
              <Icon name="user" size={30} color="#262222" style={style.icon} />
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
              <Icon
                name="envelope"
                size={30}
                color="#262222"
                style={style.icon}
              />
              <TextInput
                style={{width: 200}}
                name="email"
                color="black"
                placeholder="Email"
                placeholderTextColor={'black'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}></TextInput>
            </View>
            {errors.email && (
              <Text style={{color: 'red', marginLeft: 50}}>{errors.email}</Text>
            )}
            <View style={style.editProfileFieldContainer}>
              <Icon name="phone" size={30} color="#262222" style={style.icon} />
              <TextInput
                style={{width: 200}}
                name="phone"
                color="black"
                placeholder="Phone"
                placeholderTextColor={'black'}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}></TextInput>
            </View>
            {errors.phone && (
              <Text style={{color: 'red', marginLeft: 50}}>{errors.phone}</Text>
            )}

            {educationField.map((values, index) => (
              <View style={style.editProfileFieldContainer1}>
                <Icon
                  name="graduation-cap"
                  size={30}
                  color="#262222"
                  style={style.icon}
                />
                <TextInput
                  style={{width: '50%'}}
                  color="black"
                  placeholder="Education"
                  placeholderTextColor={'black'}
                  onChangeText={value => handleChangeEducation(value, index)}
                  value={educationField[index]}></TextInput>
                {index !== 0 && educationField.length === index + 1 && (
                  <View style={style.removeButton}>
                    <Pressable onPress={removeField} color={'#141413'}>
                      <Text style={{color: 'white'}}>Remove</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ))}

            <View style={style.addButton}>
              <Pressable onPress={addField} color={'#141413'}>
                <Text style={{color: 'white'}}>Add more</Text>
              </Pressable>
            </View>

            {skillField.map((values, index) => (
              <View style={style.editProfileFieldContainer2}>
                <Icon
                  name="smile-o"
                  size={30}
                  color="#262222"
                  style={style.icon}
                />
                <TextInput
                  style={{width: '50%'}}
                  color="black"
                  placeholder="Skills"
                  placeholderTextColor={'black'}
                  onChangeText={value => handleChangeSkill(value, index)}
                  value={skillField[index]}></TextInput>
                {index !== 0 && skillField.length === index + 1 && (
                  <View style={style.removeButton1}>
                    <Pressable onPress={removeSkillField} color={'#141413'}>
                      <Text style={{color: 'white'}}>Remove</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ))}

            <View style={style.addButton}>
              <Pressable onPress={addSkillField} color={'#141413'}>
                <Text style={{color: 'white'}}>Add more</Text>
              </Pressable>
            </View>

            {/* {errors.skill && (
  <Text style={{color: 'red', marginLeft: 50}}>
    {errors.skill}
  </Text>
)} */}

            {experienceField.map((values, index) => (
              <View style={style.editProfileFieldContainer3}>
                <Icon
                  name="smile-o"
                  size={30}
                  color="#262222"
                  style={style.icon}
                />
                <TextInput
                  style={{width: '50%'}}
                  color="black"
                  placeholder="Experience"
                  placeholderTextColor={'black'}
                  onChangeText={value => handleChangeExperience(value, index)}
                  value={experienceField[index]}></TextInput>
                {index !== 0 && experienceField.length === index + 1 && (
                  <View style={style.removeButton2}>
                    <Pressable
                      onPress={removeExperienceField}
                      color={'#141413'}>
                      <Text style={{color: 'white'}}>Remove</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ))}

            <View style={style.addButton}>
              <Pressable onPress={addExperienceField} color={'#141413'}>
                <Text style={{color: 'white'}}>Add more</Text>
              </Pressable>
            </View>

            {/* {errors.experience && (
              <Text style={{color: 'red', marginLeft: 50}}>
                {errors.experience}
              </Text>
            )} */}

            <Pressable
              style={style.Button1}
              onPress={handleSubmit}
              color={'#141413'}>
              <Text style={style.text}>Submit</Text>
            </Pressable>
            <Pressable
              style={style.Button2}
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
  Button1: {
    width: 200,
    height: 45,
    borderRadius: 30,
    marginVertical: 10,
    marginBottom: 20,
    marginTop: 30,
    borderWidth: 2,
    backgroundColor: '#010614',
    alignSelf: 'center',
  },
  Button2: {
    width: 200,
    height: 45,
    borderRadius: 30,
    marginVertical: 10,
    marginBottom: 20,
    marginTop: 5,
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
    width: 250,
    color: '#262222',
    alignSelf: 'center',
  },
  icon: {
    marginRight: 5,
  },
  addButton: {
    width: '20%',
    height: '4%',
    backgroundColor: '#141413',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    width: '28%',
    height: 42,
    backgroundColor: '#141413',
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%',
  },
  removeButton1: {
    width: '28%',
    height: 42,
    backgroundColor: '#141413',
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '16%',
  },
  removeButton2: {
    width: '28%',
    height: 42,
    backgroundColor: '#141413',
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '16%',
  },
  editProfileFieldContainer1: {
    display: 'flex',
    borderWidth: 3,
    flexDirection: 'row',
    borderRadius: 30,
    margin: 10,
    height: 45,
    paddingHorizontal: 15,
    paddingTop: 3,
    width: 250,
    color: '#262222',
    alignSelf: 'center',
  },
  editProfileFieldContainer2: {
    display: 'flex',
    borderWidth: 3,
    flexDirection: 'row',
    borderRadius: 30,
    margin: 10,
    height: 45,
    paddingHorizontal: 15,
    paddingTop: 3,
    width: 250,
    color: '#262222',
    alignSelf: 'center',
  },
  editProfileFieldContainer3: {
    display: 'flex',
    borderWidth: 3,
    flexDirection: 'row',
    borderRadius: 30,
    margin: 10,
    height: 45,
    paddingHorizontal: 15,
    paddingTop: 3,
    width: 250,
    color: '#262222',
    alignSelf: 'center',
  },
});

export default EditProfile;
