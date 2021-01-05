import L from 'leaflet'
import {useEffect, useState} from 'react'

const map = L.map('mapid')
const initialPosition: L.LatLngExpression = [
  51.467696956223385,
  10.364964184506334
]
const circle = createCircle()

export default function App() {
  const [position, setPosition] = useState<L.LatLngExpression>(initialPosition)
  const [zoom, setZoom] = useState(7)
  useLeaflet()
  useBrowserLocation()
  useUpdatePosition()

  return null

  function useLeaflet() {
    useEffect(() => {
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)
    }, [])
  }

  function useBrowserLocation() {
    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setZoom(11)
        circle.addTo(map)
        setPosition([position.coords.latitude, position.coords.longitude])
      })
    }, [])
  }

  function useUpdatePosition() {
    useEffect(() => {
      map.setView(position, zoom)
      circle.setLatLng(position)
    }, [position])
  }
}

function createCircle(): L.Circle {
  const color = '#d82a36'
  return L.circle(initialPosition, {
    color,
    fillColor: color,
    fillOpacity: 0.2,
    radius: 15000
  })
}
