import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, getApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100&namePrefix=${inputValue}`,
      getApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return{
           options: response.data.map((city)=>{
                return{
                    value: `${city.latitude} ${city.longitude}`  ,
                    label:  `${city.name} ${city.regionCode} ${city.country}`,
                }
            })

        }
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for the city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
