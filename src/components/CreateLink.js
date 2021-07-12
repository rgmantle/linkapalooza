import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { createLink } from '../api/index';

const CreateLink = () => {
  const [linkurl, setLinkUrl] = useState('');
  const clicks = 0;
  const [comment, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const goToLinks = () => {
    history.push('/links');
  };

  const setLink = (link) => {
    if(error) {
      setError('');
    }

    if (link.length <= 85) {
      setLinkUrl(link);
    }
  };

  // const setComment = (comment) => {
  //   if(error) {
  //     setError('');
  //   }

  //   if (comment.length <= 85) {
  //     setComment(comment);
  //   }
  // };

  const handleSubmit = async (linkurl, clicks, comment) => {
    setSubmitting(true);

    const success = await createLink(linkurl, clicks, comment);

    if (success) {
      setLinkUrl('');
      setCommentText('');
      goToLinks();
    } else {
      setError('Failed to create link! Please try again.');
    }
    setSubmitting(false);
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <span
        style={{
          fontSize: '3em',
          fontWeight: 'bold',
        }}
      >
        Add a Link
      </span>
      <form
        onSubmit={
          (e) => {
            e.preventDefault();
          }
        }
        style={{
          border: 'solid 3px red',
          padding: '1em',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: submitting ? 'gray' : undefined,
        }}
      >
        <label>
          Link Address:
          &nbsp;
          <input
            style={{
              color: 'black',
            }}
            onChange={
              ({ target: { value } }) => {
                setLink(value);
              }
            }
            value={linkurl}
            disabled={submitting}
          />
        </label>
        {/* <label>
          Description:
          &nbsp;
          <input
            style={{
              color: 'black',
            }}
            onChange={
              ({ target: { value } }) => {
                setComment(value);
              }
            }
            value={comment}
            disabled={submitting}
          />
        </label> */}
        {
          error && (
            <span
              style={{
                color: 'red',
              }}
            >
              {error}
            </span>
          )
        }
        <Button
          colorScheme={'teal'}
          size={'sm'}
          style={{
            marginTop: '1em',
          }}
          disabled={submitting}
          onClick={
            () => handleSubmit(linkurl, clicks, comment)
          }
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateLink;