import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/common';

const DATA_COLUMNS: Array<keyof FreesoundSoundInstance> = [
  'created',
  'type',
  'channels',
  'filesize',
  'bitrate',
  'bitdepth',
  'duration',
  'samplerate',
];

type SoundDataRowProps = {
  property: string;
  value: FreesoundSoundInstance[keyof FreesoundSoundInstance];
};

const SoundDataRow = ({ property, value }: SoundDataRowProps) => (
  <Tr>
    <Td>{property}</Td>
    <Td>
      <div className="truncate ...">{JSON.stringify(value)}</div>
    </Td>
  </Tr>
);

type SoundDataProps = {
  sound: FreesoundSoundInstance;
};

// TODO: Format these values to be more human readable, e.g. the created date.
export default function SoundData({ sound }: SoundDataProps) {
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Property</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(sound)
            .filter((value) =>
              DATA_COLUMNS.includes(value[0] as keyof FreesoundSoundInstance),
            )
            .map((value) => (
              <SoundDataRow
                key={value[0]}
                property={value[0]}
                value={value[1]}
              />
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
