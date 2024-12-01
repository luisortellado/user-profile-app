import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const UserCard = ({user}: {user: {name: string}}) => (
  <View style={styles.card}>
    <Text style={styles.name}>{user.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
  },
  name: {fontSize: 18, fontWeight: 'bold'},
  email: {fontSize: 14, color: '#6c757d'},
});

export default UserCard;
