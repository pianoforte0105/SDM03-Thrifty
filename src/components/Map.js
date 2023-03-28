import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, Autocomplete, InfoWindowF } from '@react-google-maps/api';

const containerStyle = {
  width: '40vw',
  height: '40vh',
  float: 'right',
};

const fake_restaurants = [
  {
    _id: '1',
    name: 'Restaurant A',
    location: {
      lat: 37.7749,
      lng: -122.4194,
    },
    type: '7-11',
  },
  {
    _id: '2',
    name: 'Restaurant B',
    location: {
      lat: 37.773972,
      lng: -122.431297,
    },
    type: 'Family Mart',
  },
  {
    _id: '3',
    name: 'Restaurant C',
    location: {
      lat: 37.789773,
      lng: -122.390037,
    },
    type: 'other',
  },
];

function Map() {

    const [searchQuery, setSearchQuery] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [map, setMap] = useState(null);

    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };

    const handleMarkerClose = () => {
        setSelectedMarker(null);
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    const [center, setCenter] = useState({
        lat: 37.7749,
        lng: -122.4194,
      });

    useEffect(() => {
        if (isLoaded) {
            const autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), { types: ['geocode'] });
            autocomplete.setFields(['formatted_address', 'geometry']);
            autocomplete.addListener('place_changed', handlePlaceSelect);
        }
    }, [isLoaded]);

    const handlePlaceSelect = async (place) => {
        const { geometry } = place;
        const { location } = geometry;
        setSearchQuery(place.formatted_address);
    
        // Call the API endpoint with the search query and update the state with the matching restaurants
        // const response = await fetch(`/api/restaurants?q=${place.name}`);
        // const data = await response.json();
        // setRestaurants(data);
        setRestaurants(fake_restaurants);
        setCenter(location);
      };

    const onLoad = (map) => {
        setMap(map);
    };

    return (
        <>
        <input id="autocomplete" type="text" placeholder="Enter a location" />
        {isLoaded && (
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={onLoad}>
                {/* activate after API is done
                {restaurants.map((restaurant) => (
                    <MarkerF key={restaurant._id} position={restaurant.location} />
                ))} */}
                {fake_restaurants.map((fake_restaurants) => (
                    <MarkerF key={fake_restaurants._id} position={fake_restaurants.location} onMouseOver={() => handleMarkerClick(fake_restaurants)} onMouseOut={handleMarkerClose} >
                        {selectedMarker === fake_restaurants && (
                            <InfoWindowF onMouseOut={handleMarkerClose}>
                                <div>
                                    <h2>{fake_restaurants.name}</h2>
                                    <p>{fake_restaurants.type}</p>
                                </div>
                            </InfoWindowF>
                        )}
                    </MarkerF>
                ))}
            </GoogleMap>
        )}
        </>
    );
}

export default Map;