import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, Autocomplete, InfoWindowF } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

function Map({userLocation, storesData, mapCenter, setMapCenter}) {
    const [map, setMap] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const navigate = useNavigate();    
    // const init_center = userLocation;

    const containerStyle = {
      width: '45vw',
      height: '70vh',
      top: '20px',
      left: '10px',
    };

    useEffect(() => {
        console.log('Load Google Map.');
    }, []);

    // useEffect(() => {
    //     setCenter(mapCenter);
    // }, [mapCenter]);

    // const handleCenterChanged = () => {
    //     if (map) {
    //         const newCenter = map.getCenter();
    //         setCenter(newCenter);
    //     }
    // };

    // const handleZoomChanged = () => {
    //   if (map) {
    //       const newZoom = map.getZoom();
    //       setZoom(newZoom);
    //   }
    // };
    useEffect(()=>{
        console.log("Load GoogleMap.")
    },[])

    const handleMarkerClick = (marker) => {
        console.log('Marker clicked.')
        setSelectedMarker(marker);
    };

    const handleMarkerClose = () => {
        console.log('Marker closed.')
        setSelectedMarker(null);
    };

    const handleCenterChanged = () => {
        console.log('Center changed');
        if (map !== null) {
            console.log("center", map.getCenter().lat(), " ", map.getCenter().lng());
            setMapCenter({ lat: map.getCenter().lat(), lng: map.getCenter().lng() });
        }
    };

    const [ libraries ] = useState(['places']);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const onLoad = (map) => {
        setMap(map);
    };

    // useEffect(()=>{
    //     console.log(storesData);
    // }, [storesData])
    // useEffect(()=>{
    //     console.log("userLocation", userLocation)
    // }, [userLocation])
    
    return (
        <>
        {isLoaded && (
            <GoogleMap mapContainerStyle={containerStyle} center={userLocation} zoom={15} 
                onLoad={onLoad} onDragEnd={() => handleCenterChanged()} onClick={() => handleMarkerClose()}>
                {storesData.map((storeData) => 
                    {return(
                        <MarkerF key={storeData._id} position={{lat: storeData.location.coordinates[1], lng: storeData.location.coordinates[0]}}
                        onClick={() => handleMarkerClick(storeData)} >
                        {selectedMarker === storeData && (
                            <InfoWindowF onCloseClick={() => handleMarkerClose(storeData)}>
                                <div>
                                    <h2>{storeData.name}</h2>
                                    <p>{storeData.address}</p>
                                    <p>{storeData.tel}</p>
                                    <a href={`/store/${storeData._id}`} onClick={()=>{
                                        navigate(`/store/${storeData._id}`, 
                                    { state: { storeData: storeData } });}}>{"店家資訊"}</a>
                                </div>
                            </InfoWindowF>
                        )}
                    </MarkerF>
                    )}
                )}
            </GoogleMap>
        )}
        </>
    );
}

export default Map;