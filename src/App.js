import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // The code inside here will run once when the component loads, not again
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // united States, United Kingdom, France
            value: country.countryInfo.iso2, // US, UK, FR
          }));

          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app_header">
        <h1>Covid19 tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {/* Loop through all the countries and show them as options */}

            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Header */}
        {/* Title + select input dropdown field */}
        {/* InfoBoxs */}
        {/* InfoBoxs */}
        {/* InfoBoxs */}
        {/* Table */}
        {/* Graph */}
        {/* Map */}
      </div>
    </div>
  );
}

export default App;
