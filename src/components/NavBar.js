import React from 'react';
import { useHistory } from 'react-router-dom';
import { Stack, Button } from '@chakra-ui/react';

const NavBar = () => {
  const history = useHistory();

  const goTo = (link) => {
    history.push(link);
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '60px',
        borderBottom: 'solid 1px black',
        backgroundColor: '#a30000',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'Open Sans',
      }}
    >
      <h1
        style={{
          padding: '0 0.5em',
        }}
      >
        Linkapalooza
      </h1>
      <Stack direction={'row'} spacing={2}>
        <Button
          onClick={
            () => goTo('/links')
          }
          size={'sm'}
        >
              Links
          </Button>
        <Button
          onClick={
            () => goTo('/tags')
          }
          size={'sm'}
        >
          Tags
        </Button>
      </Stack>
    </div>
  );
}

export default NavBar;