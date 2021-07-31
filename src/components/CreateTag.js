import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input, Label, FormGroup, Form } from '@chakra-ui/react';
import { createTag } from '../api';

const CreateTag = () => {
  const [tag, setTag] = useState('');
  const history = useHistory();

   return (
     <div className="CreateTag">
       <Form
          onSubmit={async (event) => {
            event.preventDefault();
       

          try {
            await createTag(tag);
            history.push("/tags");
          } catch (error) {}
        }}
      >
        <FormGroup>
          <Label for="tag">Tag</Label>
          <Input
            type="text"
            id="tag"
            placeholder="hashtag here"
            required={true}
            value={tag}
            onChange={(event) => setTag(event.target.value)}
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

export default CreateTag;