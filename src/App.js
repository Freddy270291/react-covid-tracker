import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["worldwide"]);

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

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid19 tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={1234} total={2000} />
          <InfoBox title="Recovered" cases={123} total={3000} />
          <InfoBox title="Deaths" cases={12345} total={4000} />
        </div>
        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
