import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TextInput, StyleSheet, Button, TouchableOpacity, AsyncStorage, ToastAndroid, ScrollView, RefreshControl} from 'react-native';
import axios from 'axios';
import LoadingIndicator from '../Components/LoadingIndicator';

const OurJobs = ({navigation}) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const [loading, setLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const id = await AsyncStorage.getItem('id');
    try {
      const response = await axios.get(`http://34.93.204.130:5020/jobs?org_id=${id}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const searchJobs = (text) => {
    setSearchText(text);

    if (text.length === 0) {
      setSearchResults([]);
      return;
    }

    const results = data.filter((item) =>
      item.designation.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(results);
  };

  const DeleteJob = async (itemId) => {
    setLoading(true);
    const id = await AsyncStorage.getItem('id');
    await AsyncStorage.setItem('itemid',itemId);
     try {
      const response = await fetch(`http://34.93.204.130:5020/jobs?id=${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
     console.log('Deleted Job: ',id);
     console.log('ItemId',itemId);
     setLoading(false);
     reloadData();     

     ToastAndroid.show('Job Deleted', ToastAndroid.SHORT);
     
    } catch (error) {
      console.log('invalid Credentials');

      ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
      console.error(error);
      setLoading(false);
    }
      console.log(`Deleted Job: ${itemId}`);
  };

  const reloadData = async () => {
    setLoading(true);
    const id = await AsyncStorage.getItem('id');
    try {
      const response = await axios.get(`http://34.93.204.130:5020/jobs?org_id=${id}`);
      setData(response.data);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      ToastAndroid.show('No Jobs', ToastAndroid.SHORT);
    }
  };

  const Shorlisted = async (itemId) => {
    setLoading(true);
    const id = await AsyncStorage.getItem('id');
    await AsyncStorage.setItem('itemid',itemId);
     try {
      const response = await fetch(`http://34.93.204.130:5020/application/shorlist?job_id=${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
     console.log('Shorlisted By: ',id);
     console.log('ItemId',itemId);
     setLoading(false);
     ToastAndroid.show('Shorlisted Candidates', ToastAndroid.LONG);
     navigation.navigate('Shorlisted');
    } catch (error) {
      console.log('invalid Credentials');
      ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
      console.error(error);
    }
      console.log(`Shorlisted Job: ${itemId}`);
  };

  const renderItem = ({ item }) => {

  return (
    <View style={styles.itemContainer}>
      {loading && <LoadingIndicator />}
      <Text style={styles.name}>Organization: {item.name}</Text>
      <Text style={styles.category}>Category: {item.category}</Text>
      <Text style={styles.designation}>Job Title: {item.designation}</Text>
      <Text style={styles.description}>Job Description: {item.description}</Text>
      <Text style={styles.location}>Location: {item.location}</Text>
      <Text style={styles.salary}>Expected Salary: {item.salary}</Text>
      <Text style={styles.salary}>Date Of Creation: {item.CreatedAt}</Text>
      
        <View
        style={[
          {
            marginTop: '5%',
            marginBottom:'5%',
            alignSelf: 'center',
            flexDirection: 'row',
          },
        ]}>
          
          <Button
      title='Shorlisted'
          style={styles.button}
          onPress={() => Shorlisted(item.id)}
          color={'darkgreen'}
        />

        <View style={styles.submitButton}>
          <Button 
          title="Delete Job" 
          color={'darkred'}
          onPress={() => DeleteJob(item.id)}
            />
        </View>
      </View>
    </View>
  );
};

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      {loading && <LoadingIndicator />}
      <Text style={styles.emptyText}>No jobs found.</Text>
    </View>
  );

  const renderSearchResults = () => {
    if (searchText.length === 0 || searchResults.length === 0) {
      return null;
    }

    return (
      <View style={styles.searchResultsContainer}>

        <Text style={styles.searchResultsText}>Search results:</Text>
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.searchResultsList}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search jobs"
        value={searchText}
        onChangeText={searchJobs}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyList}
      />
      {renderSearchResults()}
    </View>
  );
};

const styles = StyleSheet.create({

  submitButton:{
    marginLeft:'8%',
  },
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    alignItems:'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  category: {
    fontSize: 16,
    marginBottom: '3%',
  },
  designation: {
    fontSize: 16,
    marginBottom: '3%',
  },
  description: {
    fontSize: 16,
    marginBottom: '3%',
  },
  location: {
    fontSize: 16,
    marginBottom: '3%',
  },
  salary: {
    fontSize: 16,
    marginBottom:'3%'
  },
  status: {
    fontSize: 16,
  },
  searchResultsContainer: {
    marginTop: 16,
  },
  searchResultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  searchResultsList: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OurJobs;
