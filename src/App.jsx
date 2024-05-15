import React, { useState, useEffect } from 'react';
import SearchBar from './components/Searchar';

import { fetchSaltSuggestions } from './api';
import Result from './components/Result';

const App = () => {
  const [saltSuggestions, setSaltSuggestions] = useState([]);
  const [isloading , setIsloading]=useState(true);
  


  // useEffect(() => {
  //   // Fetch initial data
    
  //   fetchSaltSuggestions('paracetamol')
  //     .then((data) => setSaltSuggestions(data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);
  
  const handleSearch =(searchTerm)=>{
    setIsloading(false);
    fetchSaltSuggestions(searchTerm)
    .then((data)=>setSaltSuggestions(data))
    .catch((error)=>console.log('Error fetching Data',error))
  }
 
  return (
    <div>
      <SearchBar onSearch={handleSearch}  />
      <Result saltSuggestions={saltSuggestions} isloading={isloading} />
   
    </div>
  );
};

export default App;




