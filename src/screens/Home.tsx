import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useUsers} from '../hooks/useUsers';
import UserCard from '../components/userCard';
import SearchBar from '../components/searchBar';

type UserProps = {
  id: number;
  name: string;
};

const Home = () => {
  const {data: users, isLoading, error} = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);

  const handleSearch = (searchTerm: string) => {
    if (users && searchTerm) {
      const filtered = users.filter((user: {name: string}) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users || []);
    }
  };

  useEffect(() => {
    setFilteredUsers(users || []);
  }, [users]);

  if (isLoading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }
  if (error) {
    return <Text style={styles.error}>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />

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
