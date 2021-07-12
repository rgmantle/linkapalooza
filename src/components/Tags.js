import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import { getTags } from '../api';

const TagWords = ({ tags }) => {
    const history = useHistory();

    const goToTag = (tagId) => {
        history.push(`/tags/${tagId}`);
    }

    return (
        <div>
          <Text fontSize={'3x1'}>{tags.tag}</Text>
        </div>
    )
};

const Tags = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const getAndSetTags = async () => {
            const serverTags = await getTags();

            setTags(serverTags);
        };

    getAndSetTags();
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
          <h2>All Tags</h2>
          {
            tags.map((p, i) => (
              <TagWords tags={p} key={i} />
            ))
          }
        </div>
      )
    };
    
export default Tags;