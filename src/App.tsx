import L from 'leaflet'
import React from 'react'
import {MapContainer} from 'react-leaflet'
import MapContent from './MapContent'

const initialPosition: L.LatLngExpression = [
  51.467696956223385,
  10.364964184506334
]

export default function App() {
  return (
    <MapContainer
      center={initialPosition}
      zoom={7}
      scrollWheelZoom={true}
      style={{height: '100%'}}
    >
      <MapContent />
    </MapContainer>
  )
}
