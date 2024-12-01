import {useQuery} from '@tanstack/react-query';
import {fetchUsers} from '../services/ApiService';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
