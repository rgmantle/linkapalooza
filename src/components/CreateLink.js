import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input, Label, FormGroup, Form } from '@chakra-ui/react';
import { createLink } from '../api';

const CreateLink = () => {
  const [linkurl, setLinkUrl] = useState('');
  const clicks = 0;
  const [comment, setCommentText] = useState('')
  const history = useHistory();

   return (
     <div className="CreateLink">
       <Form
          onSubmit={async (event) => {
            event.preventDefault();
       

          try {
            await createLink(linkurl, comment);
            history.push("/links");
          } catch (error) {}
        }}
      >
        <FormGroup>
          <Label for="link">Link</Label>
          <Input
            type="text"
            id="link"
            placeholder="link url here"
            required={true}
            value={linkurl}
            onChange={(event) => setLinkUrl(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="link">Description</Label>
          <Input
            type="text"
            id="comment"
            placeholder="description"
            required={true}
            value={comment}
            onChange={(event) => setCommentText(event.target.value)}
          />
        </FormGroup>
        <Button
          colorScheme={'orange'}
          size={'sm'}
          style={{
            marginTop: '1em',
          }}
          type="submit"
          
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateLink;