import {tileLayer, map} from 'leaflet'
import React, {useEffect} from 'react'

export default function App() {
  useLeaflet()
  return <div id="mapid"></div>
}

function useLeaflet() {
  useEffect(() => {
    const mymap = map('mapid').setView([51.505, -0.09], 13)

    tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap)
  }, [])
}
