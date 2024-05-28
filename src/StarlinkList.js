import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const satIcon = new L.Icon({
    iconUrl: 'satellite.png',
    iconSize: [25,25],
    iconAnchor: [12,12],
    popupAnchor: [0, -12]
})

function StartlinkList() {
    const [starlinks, setStarlinks] = useState([]);

    useEffect(() => {
        const fetchStarlinks = async () => {
            try {
                const response = await axios.post('https://api.spacexdata.com/v4/starlink/query', {
                    "query": {},
                    "options": { limit: 100 }
                });
                console.log(response.data);
                setStarlinks(response.data.docs);
            } catch (error) {
                console.error('Erro ao obter dados da api da starlink:', error);
            }
        }
        fetchStarlinks();
    },[]);

    return (
        <div>
            <h1>Satélites da Startlink</h1>
            <MapContainer center={[0,0]} zoom={2} style={{height: '80vh', width:'100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {starlinks
                    .filter((sat) => sat.latitude !== null && sat.longitude !==null)
                    .map((sat) => (
                        <Marker key={sat.id} position={[sat.latitude, sat.longitude]} icon={satIcon}>
                            <Popup>
                                <h1>{sat.spaceTrack.OBJECT_NAME}</h1>
                                <p>Latitude: {sat.latitude}</p>
                                <p>Longitude: {sat.longitude}</p>
                                <p>Velocity: {sat.velocity_kms}</p>
                                <p>Altitude: {sat.height_km}</p>
                                <p>Data de lançamento: {sat.spaceTrack.LAUNCH_DATE}</p>


                            </Popup>
                        </Marker>
                ))}
            </MapContainer>
            
        </div>
    );
}

export default StartlinkList;