import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import axios from 'axios';

const Shorlisted = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const item = await AsyncStorage.getItem('itemid');
    console.log('Itemid: ', item);
    try {
      const response = await axios.get(`http://34.93.204.130:5020/application?job_id=${item}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer} key={item.user_id}>
      <Text style={styles.name}>Applicant Name: {item.name}</Text>
      <Text style={styles.category}>Email: {item.email}</Text>
      <Text style={styles.designation}>Status: {item.status}</Text>
      <Text style={styles.category}>Education: {item.education}</Text>
      <Text style={styles.category}>Phone: {item.phone}</Text>
      <Text style={styles.category}>Skills: {item.skills}</Text>
      <Text style={styles.category}>Experience: {item.experiences}</Text>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No Users found.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.user_id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
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

export default Shorlisted;
