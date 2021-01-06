import {LatLngExpression} from 'leaflet'
import React, {useEffect, useState} from 'react'
import {Circle, TileLayer, Marker, useMap} from 'react-leaflet'

type MapContentProps = {
  initialPosition: LatLngExpression
}

export default function MapContent({initialPosition}: MapContentProps) {
  const [position, setPosition] = useState<LatLngExpression>(null)
  const map = useMap()
  useBrowserLocation()

  useEffect(() => {
    if (position) map.setView(position, 11)
  }, [position])
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {position && <Marker position={position} />}
      {position && <Circle center={position} radius={15000} />}
    </>
  )

  function useBrowserLocation() {
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        ({coords: {latitude, longitude}}) => {
          const position: LatLngExpression = [latitude, longitude]
          setPosition(position)
        }
      )
    }, [])
  }
}

// function createCircle(): L.Circle {
//     const color = '#d82a36'
//     return L.circle(initialPosition, {
//       color,
//       fillColor: color,
//       fillOpacity: 0.2,
//       radius: 15000
//     })
//   }
