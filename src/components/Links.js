import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Text } from '@chakra-ui/react';
import { getLinks } from '../api/index';

const LinkCard = ({ links }) => {
    const history = useHistory();

    const goToLink = (linkId) => {
        history.push(`/links/${linkId}`);
    }

    return (
        <div>
            <Text fontSize={'3x1'}>{links.linkurl}</Text>
            <Button
                colorScheme={'teal'}
                onClick={
                () => {
                    goToLink(links.id);
                }
                }
            >
                See Details
      </Button>
        </div>
    )
};

const Links = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const getAndSetLinks = async () => {
            const serverLinks = await getLinks();

            setLinks(serverLinks);
        };

    getAndSetLinks();
    }, [])

    return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2>All Links</h2>
          {
            links.map((p, i) => (
              <LinkCard links={p} key={i} />
            ))
          }
        </div>
      )
    };
    
export default Links;