import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, StyleSheet} from 'react-native';
import {useUsers} from '../hooks/useUsers';
import UserCard from '../components/UserCard';

type userProps = {
  id: number;
  name: string;
};

const Home = () => {
  const {data: users, isLoading, error} = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<userProps[]>([]);

  useEffect(() => {
    if (users && searchTerm) {
      const filtered = users.filter((user: {name: string}) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users || []);
    }
  }, [searchTerm, users]);

  if (isLoading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }
  if (error) {
    return <Text style={styles.error}>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <UserCard user={item} />}
        ListEmptyComponent={
          <Text style={styles.noResults}>No users found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#fff'},
  searchInput: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loading: {textAlign: 'center', marginTop: 20, fontSize: 16},
  error: {color: 'red', textAlign: 'center', marginTop: 20, fontSize: 16},
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#6c757d',
  },
});

export default Home;
