import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TextInput, StyleSheet, Button, TouchableOpacity, AsyncStorage } from 'react-native';
import axios from 'axios';

const FindJobs = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://34.93.204.130:5020/jobs');
      setData(response.data);
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
  const [clickedItems, setClickedItems] = useState([]);


  const handleItemClick = async (itemId) => {
    const id = await AsyncStorage.getItem('id');
    if (!clickedItems.includes(itemId)) {
    try {
      const response = await fetch('http://34.93.204.130:5020/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
        job_id: itemId,
        status: 'Waiting',
        }),
      });
     console.log('Applied By: ',id);
    } catch (error) {
      console.log('invalid Credentials');
      ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
      console.error(error);
    }
      console.log(`Applied to Job: ${itemId}`);
      // Update the state to include the clicked item
      setClickedItems([...clickedItems, itemId]);
    }
  };

  const renderItem = ({ item }) => {
    const isItemClicked = clickedItems.includes(item.id);

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>Organization: {item.name}</Text>
      <Text style={styles.category}>Category: {item.category}</Text>
      <Text style={styles.designation}>Job Title: {item.designation}</Text>
      <Text style={styles.description}>Job Description: {item.description}</Text>
      <Text style={styles.location}>Location: {item.location}</Text>
      <Text style={styles.salary}>Expected Salary: {item.salary}</Text>
      <View style={styles.submitButton}>
      <Button
                      color={'darkgreen'}
      title={isItemClicked ? 'Applied!' : 'Apply'}
          style={[styles.button, isItemClicked && styles.buttonClicked]}
          onPress={() => handleItemClick(item.id)}
          disabled={isItemClicked} // Disable the button if item has been clicked
        >
          <Text style={styles.buttonText}>
            {isItemClicked ? 'Applied!' : 'Apply'}
          </Text>
        </Button>
        </View>
    </View>
  );
};

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
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
        ListEmptyComponent={renderEmptyList}
      />
      {renderSearchResults()}
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton:{
    alignSelf:'center',
    margin:'10%',
    marginBottom:'5%',
    width:'60%'
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

export default FindJobs;
