import React, { useState, useEffect } from 'react';

 const Xstates = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
  
    useEffect(() => {
      // Fetch all countries from the API
      fetch('https://crio-location-selector.onrender.com/countries')
        .then(response => response.json())
        .then(data => setCountries(data))
        .catch(error => console.error('Error fetching countries:', error));
    }, []);
  
    const handleCountryChange = event => {
      const country = event.target.value;
      setSelectedCountry(country);
      setSelectedState(''); // Reset state and city when country changes
      setCities([]); // Clear cities when country changes
  
      // Fetch states for the selected country
      fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
        .then(response => response.json())
        .then(data => setStates(data))
        .catch(error => console.error('Error fetching states:', error));
    };
  
    const handleStateChange = event => {
      const state = event.target.value;
      setSelectedState(state);
      setCities([]); // Clear cities when state changes
  
      // Fetch cities for the selected state
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`)
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(error => console.error('Error fetching cities:', error));
    };
  
    const handleCityChange = event => {
      const city = event.target.value;
      setSelectedCity(city);
  
      // Display the selected location
      alert(`You Selected ${city}, ${selectedState}, ${selectedCountry}`);
    };
  
    return (
      <div>
        <h2>Select Location</h2>
        <select onChange={handleCountryChange} value={selectedCountry}>
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
  
        <select onChange={handleStateChange} value={selectedState} disabled={!selectedCountry}>
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
  
        <select onChange={handleCityChange} value={selectedCity} disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    );
}

export default Xstates;


