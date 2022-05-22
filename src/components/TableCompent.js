import React, { useState, useEffect } from 'react';
import EmptyState from './EmptyState';
import axios from 'axios';

// Sorting Help
//codesandbox.io/s/table-sorting-example-ur2z9?from-embed=&file=/src/App.js:1058-1073
//www.smashingmagazine.com/2020/03/sortable-tables-react/

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Input,
  Button,
} from '@chakra-ui/react';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  //data fetch to jsonplaceholder
  useEffect(() => {
    setIsLoading(true);

    const search = async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );

      setData(data);
      setIsLoading(false);
    };

    search();
  }, []);

  console.log('Data', data);

  if (isLoading && !data) {
    return <Spinner />;
  }

  if (data?.length === 0 && !isLoading) {
    return <EmptyState />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      <Input
        variant='filled'
        placeholder='Find Person'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Table colorScheme='blue' overflow='none'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Company</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>User Name</Th>
            <Th>Website</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data
            .filter((person) => {
              if (query === '') {
                return person;
              } else if (
                person.name.toLowerCase().includes(query.toLowerCase()) ||
                person.company.name
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                person.username.toLowerCase().includes(query.toLowerCase())
              ) {
                return person;
              }
            })
            .map((person) => (
              <Tr key={person.name}>
                <Td>{person.name}</Td>
                <Td>{person.company.name}</Td>
                <Td>{person.email}</Td>
                <Td>{person.phone}</Td>
                <Td>{person.username}</Td>
                <Td>{person.website}</Td>
              </Tr>
            ))}
          {data?.length === 0 && !isLoading && <EmptyState />}
        </Tbody>
      </Table>
    </>
  );
};

export default TableComponent;
