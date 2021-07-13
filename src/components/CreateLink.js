import axios from 'axios';
import React, { setState, useState } from 'react';
import { Button, Form, Stack, Input } from '@chakra-ui/react';

const AddNewLink = ({setRefresh}) => {
  const initialFormData = Object.freeze({})

  const [formData, setFormData] = useState(initialFormData);
  const {linkurl, comment, tags} = formData
  
  const handleURL = (e) => {
    setFormData({
      ...formData, linkurl : e.target.value
    });
  }

  const handleComments = (e) => {
    setFormData({
       ...formData, comment : e.target.value
    });
  }

  const handleTags = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',');
    setFormData({
        ...formData,tags : tagsArray
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if (formData.linkurl===''||!formData.linkurl) {
        alert('Please enter a link address');
        console.log('No url')
        return;
      }
      axios.post('/api/links', formData)
      .then((res)=>{
          setFormData({})
          setRefresh(true);

      })
    } catch (error) {
      throw error;
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Input variant="outline" placeholder="URL" size="md" onChange={handleURL} />
          <Input variant="outline" placeholder="Describe this url" size="md" onChange={handleComments} />
          <Input variant="outline" placeholder="tags here" size="md" onChange={handleTags} />
        </Stack>
        <Button>Submit</Button>
      </Form>
    );
  };
    

};


export default AddNewLink;