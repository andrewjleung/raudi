import { Highlight } from '@chakra-ui/react';
import NavButton from '../components/Nav/NavButton';
import ToolCardContent from '../components/ToolCardContent';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mt-16 sm:mt-40">
      <div className="font-extrabold text-3xl sm:text-5xl text-center mx-3">
        Welcome to your <Highlight query="">musician&apos;s</Highlight>{' '}
        multi-tool!
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 mb-6 max-w-3xl">
        <NavButton className="col-span-2 sm:col-span-1" href="/sounds">
          <ToolCardContent
            className="sm:px-10 sm:py-20"
            title="Random Sounds"
            description="Demo and download random soundbytes for instant inspiration, Tinder-style."
          />
        </NavButton>
        <NavButton className="col-span-2 sm:col-span-1" href="/genres">
          <ToolCardContent
            className="sm:px-10 sm:py-20"
            title="Random Genres"
            description="Pick a random genre from Anthony Fantano's reviews to make music to."
          />
        </NavButton>
      </div>
    </div>
  );
}
