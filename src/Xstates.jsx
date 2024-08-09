import React, { useState, useEffect } from 'react';

 const Xstates = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [showLocation, setShowLocation] = useState(false);
  
    useEffect(() => {
      fetch('https://crio-location-selector.onrender.com/countries')
        .then(response => response.json())
        .then(data => setCountries(data))
        .catch(error => console.error('Error fetching countries:', error));
    }, []);
  
    const handleCountryChange = event => {
      const country = event.target.value;
      setSelectedCountry(country);
      setSelectedState(''); 
      setCities([]); 
      fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
        .then(response => response.json())
        .then(data => setStates(data))
        .catch(error => console.error('Error fetching states:', error));
    };
  
    const handleStateChange = event => {
      const state = event.target.value;
      setSelectedState(state);
      setCities([]); 
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`)
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(error => console.error('Error fetching cities:', error));
    };
  
    const handleCityChange = event => {
      const city = event.target.value;
      setSelectedCity(city);
      setShowLocation(true);
    };
  
    return (
      <>
      <h1>Select Location</h1>
      <div className='stateContainer'>
        
        <select onChange={handleCountryChange} value={selectedCountry} className='selectStyle'>
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
  
        <select onChange={handleStateChange} value={selectedState} className='selectStyle1' disabled={!selectedCountry}>
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
  
        <select onChange={handleCityChange} value={selectedCity} className='selectStyle2' disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {showLocation && (
        <h2 className='Dispaly-result'>
          You selected <span> {selectedCity},</span>
          <span className='fade'>{" "} {selectedState}, {selectedCountry}</span>
        </h2>
        
      )}
      </>
    );
}

export default Xstates;


