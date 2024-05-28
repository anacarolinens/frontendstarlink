import React, { useEffect, useState } from "react";
import axios from "axios";


function StarlinkList() {
    const [starlinks, setStarlinks] = useState([]);

    useEffect(() => {
    const fetchStarlinks = async () => {
        try {
            const response = await axios.post('https://api.spacexdata.com/v4/starlink/query', {
                "query": {},
                "options": {
                limit: 5
                }
            });
            setStarlinks(response.data.docs);

        } catch (error) {
            console.error('Error ao obter os dados da API da starlink: ', error);
        }
        
    }
        fetchStarlinks();
    }, []);

    return (
        <div>
            <h1>Starlink Satélites</h1>

            <ul>
                {starlinks.map((sat) => (
                    <li key={sat.id}> {sat.spaceTrack.OBJECT_NAME} </li>
                ))}
            </ul>
        </div>
        
    );
}



export default StarlinkList;