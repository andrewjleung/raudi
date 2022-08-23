import { Link, Text } from '@chakra-ui/react';
import Writing from '../components/Writing';
import H from '../components/Writing/H';

export default function PrivacyPolicy() {
  return (
    <Writing>
      <H>Privacy Policy</H>
      <Text>
        Raudi is built using the Freesound API. By choosing to use this app, you
        agree to the use of your Freesound account to retrieve and download
        sounds from Freesound. Raudi will never take any other actions on your
        behalf. If you would ever like to revoke Raudi's permissions, please
        visit your account settings on Freesound{' '}
        <Link
          textColor="blue.500"
          href="https://freesound.org/home/app_permissions/"
          isExternal
        >
          here
        </Link>
        .
      </Text>
      <Text>
        Raudi does not utilize any third-party analytics or advertising
        frameworks, nor does it collect and store any information from you.
      </Text>
      <H>Cookies</H>
      <Text>
        Raudi makes use of a single secure &quot;ACCESS_DATA&quot; cookie with a
        lifetime of one hour. This cookie is used to remember a user&apos;s
        Freesound login session so that they may use Raudi for an extended
        period of time without logging back in.
      </Text>
    </Writing>
  );
}
