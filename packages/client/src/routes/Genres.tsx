import { CircularProgress } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchRandomGenre } from '../api/raudiApi';

const PROMPTS: string[] = [
  "Why don't you try making some $ music?",
  'How about $?',
  "I really think you'd make a good $ track.",
  '$ is in.',
  'Next stop, $.',
  'You and $. A match made in heaven.',
  'What even is $?',
  "You're long overdue for flexing those $ chops.",
  "Let's keep things simple. Up for some $?",
  'I heard a really great $ track the other day...',
  "C'mon... I know you're itching to make some $.",
  'This is gonna sound weird but... what about $?',
  'Please bless our ears with some $.',
  'Take a shot at some $.',
  "I'd like to see you do your best $ impression.",
  "$? Isn't that what Radiohead does?",
];

export default function Genres() {
  const { data, error, isLoading, refetch } = useQuery(
    ['genre'],
    fetchRandomGenre,
    {
      refetchOnWindowFocus: false,
    },
  );

  const [before, after] =
    PROMPTS[Math.floor(Math.random() * PROMPTS.length)].split('$');

  if (data === undefined || isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="flex flex-row gap-8 text-center justify-center items-center mt-20 sm:mt-32">
      <div
        className="text-4xl max-w-md cursor-pointer hover:scale-105 active:scale-100 transition ease-in-out duration-100 rounded-xl px-6 py-4 border-1 hover:bg-orange-100"
        onClick={() => refetch()}
      >
        {before}
        <span className="underline font-bold decoration-4 decoration-solid decoration-orange-400 text-orange-400">
          {data.toUpperCase()}
        </span>
        {after}
      </div>
    </div>
  );
}
