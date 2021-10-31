import React, {useState, useEffect} from "react"
import axios from "axios"
import GoogleMapReact from 'google-map-react';
import Pin from "./pin.png"

const App = () => {

    const [lat, setLat] = useState(30.2849)
    const [lng, setLong] = useState(-97.7341)
    const [locEnable, setLocEnable] = useState(false)
    const urlParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        //hello
        if (urlParams.get('name') != null) {
            const interval = setInterval(() => {
                axios.post('https://alcowatch.herokuapp.com/getLocation', {hash: 'CUSTOM_HASH', name: urlParams.get('name')})
                .then(res => {
                    setLat(res.data.lat)
                    setLong(res.data.long)
                    setLocEnable(true)
                })
                .catch(err => console.log(err))
            }, 1000)
        }
    });

    const center = {
        lat: lat, 
        lng: lng
    }

    return (
        <div style={{ height: '100vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "CUSTOM_KEY"}}
                defaultCenter={center}
                defaultZoom={11}
                yesIWantToUseGoogleMapApiInternals
                >
                {locEnable? <Marker lat={lat} lng={lng}/> : null}
            </GoogleMapReact>
        </div>   
    )
}

const Marker = props => {
    return (
        <div className="SuperAwesomePin" style={{height:"30px", width: "20px"}}>
            <img src = {Pin} style={{height:"100%"}}/>
        </div>
    )
}

export default App
