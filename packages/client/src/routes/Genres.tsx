import { Button, CircularProgress } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchRandomGenre } from '../api/raudiApi';

export default function Genres() {
  const { data, error, isLoading, refetch } = useQuery(
    ['genre'],
    fetchRandomGenre,
    {
      refetchOnWindowFocus: false,
    },
  );

  if (data === undefined || isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <div>{data}</div>
      <Button onClick={() => refetch()}>Get a new genre</Button>
    </div>
  );
}
