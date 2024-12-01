import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const fetchUsers = async () => {
  try {
    const cachedData = await AsyncStorage.getItem('users');
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users',
    );
    await AsyncStorage.setItem('users', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};
