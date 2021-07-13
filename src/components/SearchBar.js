import React, {useState} from 'react'
import {
  Heading,
  Input } from '@chakra-ui/react';

const SearchBar = ({ results, setResults, setRefresh }) => {


  function searchMatches(result, compare) {
    console.log('searchMatches, results: ', results, 'compare: ', compare);
    const { clicks, url, comments, tags } = result;
    const tagsString = tags.map(tag=>tag.name).join(', ');
    const newClicks = clicks.toString();
    const filterOn = [newClicks, url, comments, tagsString];
  
    return filterOn.some((string) => {
      return string.toLowerCase().includes(compare);
    });
  }

  const handleLinkChange = event => {
    event.preventDefault();
    const searchTerm = event.target.value.toLowerCase();
    if(!searchTerm||!searchTerm.length){
      setRefresh(true);
    }
  
      let filteredResults = results.filter((result) =>
      searchMatches(result, searchTerm)
    );
    setResults(filteredResults);
  }

 return (
      <>
        <Heading>
          Find Links
        </Heading>
        <Input 
          placeholder='Search links...'
          onSearchChange={ handleLinkChange } />
      </>
 );
}

export default SearchBar;