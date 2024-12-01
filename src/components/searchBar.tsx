import React, {useMemo} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {debounce} from 'lodash';

const SearchBar = ({onSearch}: {onSearch: (query: string) => void}) => {
  // We create a debounced function that will be executed every 300ms
  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

  return (
    <TextInput
      style={styles.input}
      placeholder="Search users..."
      onChangeText={debouncedSearch}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default SearchBar;
