import './App.css';
import {FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core';
import {useState, useEffect} from 'react';
import InfoBox from './components/InfoBox';
import TableData from './components/Table';
import { sortData } from './components/utils';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response) => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      })
    }
    getCountriesData();
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);
    })
  }

  return (
    <div className="app">
      <div className="app__header">
        <div className="app_headingBox">
          <h1>COVID-19 TRACKER</h1>
          <p>
            Let's encourage our friends and followers in joining India's battle
            against COVID-19.
          </p>
        </div>
        <div></div>
        <FormControl className="app__droprdown">
          <h4>Select any Country </h4>
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox
          className="cases"
          title="Coronavirus Cases"
          cases={countryInfo.todayCases}
          total={countryInfo.cases}
        />
        <InfoBox
          className="recovered"
          title="Recovered"
          cases={countryInfo.todayRecovered}
          total={countryInfo.recovered}
        />
        <InfoBox
          className="deaths"
          title="Deaths"
          cases={countryInfo.todayDeaths}
          total={countryInfo.deaths}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3 className="app__center_heading">Live Cases by Countries</h3>
          <TableData countries={tableData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
