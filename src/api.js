const API_URL = 'https://backend.cappsule.co.in/api/v1/new_search';

export const fetchSaltSuggestions = async (searchTerm) => {
    console.log(searchTerm)
  const pharmacyIds = '1,2,3'; // Default pharmacy ids
  const response = await fetch(`https://backend.cappsule.co.in/api/v1/new_search?q=${searchTerm}&pharmacyIds=${pharmacyIds}`);
  const data = await response.json();
  console.log(data)
  return data.data.saltSuggestions;
};
