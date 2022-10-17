import { Link, Text } from '@chakra-ui/react';
import Writing from '../components/Writing';
import H from '../components/Writing/H';

export default function Contact() {
  return (
    <Writing>
      <H>Contact</H>
      <Text>
        For any inquiries, feel free to contact me at{' '}
        <Link textColor="blue.500" href="mailto:andrewleung104@gmail.com">
          andrewleung104@gmail
        </Link>
        . If you find any bugs, problems, or even just points of improvement,
        please don&apos;t hesitate to open an issue on{' '}
        <Link
          textColor="blue.500"
          href="https://github.com/andrewjleung/raudi/issues/new"
          isExternal
        >
          GitHub
        </Link>
        !
      </Text>
    </Writing>
  );
}
