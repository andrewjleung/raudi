import { Link, Text } from '@chakra-ui/react';
import Writing from '../components/Writing';
import H from '../components/Writing/H';

export default function About() {
  return (
    <Writing>
      <H>About</H>
      <Text>
        Raudi was created as a tiny open source wrapper around{' '}
        <Link textColor="blue.500" href="freesound.org">
          Freesound
        </Link>
        &apos;s random sound functionality using the{' '}
        <Link
          textColor="blue.500"
          href="https://freesound.org/docs/api/resources_apiv2.html#sound-instance"
        >
          Freesound API
        </Link>
        . It is meant to be an inspiration tool for audio creatives to quickly
        and cycle through random pieces of audio to use in or maybe even
        jumpstart their next project.
      </Text>
      <Text>
        The philosophy of this tool is to help remove all the cruft, noise, and
        second guessing behind starting new ideas. Inspiration should be simple.
        You find a sound, you like it, you use it. Don&apos;t like it? Skip it
        and never see it again, no second thought. You commit to a tiny starting
        point and go from there, no overthinking allowed!
      </Text>
      <Text>
        My hope is for Raudi to eventually become a suite of mini inspiration
        tools or cool music-related bits and bobs.
      </Text>
    </Writing>
  );
}
