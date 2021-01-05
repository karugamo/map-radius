import L from 'leaflet'
import {useEffect, useState} from 'react'

const map = L.map('mapid')
const initialZoom = 11
const circle = createCircle()

export default function App() {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09])
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
        setPosition([position.coords.latitude, position.coords.longitude])
      })
    }, [])
  }

  function useUpdatePosition() {
    useEffect(() => {
      map.setView(position, initialZoom)
      circle?.setLatLng(position)
    }, [position])
  }
}

function createCircle(): L.Circle {
  const color = '#d82a36'
  return L.circle([51.508, -0.11], {
    color,
    fillColor: color,
    fillOpacity: 0.2,
    radius: 15000
  }).addTo(map)
}
