'use client'
import siteMetadata from '@/data/siteMetadata'
import mapboxgl, { Map as MapboxMap, Marker } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

const Map = () => {
  const defaultLongitude = 15.691069
  const defaultLatitude = 51.801953
  const supported = mapboxgl.supported()

  const mapRef = useRef<MapboxMap>()
  const markerRef = useRef<Marker>()
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [lng, setLng] = useState<number>(defaultLongitude)
  const [lat, setLat] = useState<number>(defaultLatitude)
  const [zoom, setZoom] = useState<number>(16)
  const { resolvedTheme } = useTheme()

  mapboxgl.accessToken = siteMetadata.mapboxToken

  useEffect(() => {
    console.log('supported', supported)

    if (!supported) {
      return
    }

    const mapTheme = resolvedTheme === 'dark' ? 'dark' : 'light'

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current || '',
      style: `mapbox://styles/mapbox/${mapTheme}-v11`,
      center: [lng, lat],
      zoom: zoom,
    })

    if (!mapRef.current) {
      return
    }

    mapRef.current.on('move', () => {
      const mapCenter = mapRef.current!.getCenter()
      const mapZoom = mapRef.current!.getZoom()

      setLng(Number(mapCenter.lng.toFixed(4)))
      setLat(Number(mapCenter.lat.toFixed(4)))
      setZoom(Number(mapZoom.toFixed(2)))
    })

    markerRef.current = new mapboxgl.Marker()
      .setLngLat([defaultLongitude, defaultLatitude])
      .addTo(mapRef.current)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (mapRef.current && markerRef.current && supported) {
      const mapTheme = resolvedTheme === 'dark' ? 'dark' : 'light'

      mapRef.current.setStyle(`mapbox://styles/mapbox/${mapTheme}-v11`)

      const element = markerRef.current!.getElement()
      const svg = element.getElementsByTagName('svg')[0]
      const path = svg.getElementsByTagName('path')[0]
      path.setAttribute('fill', mapTheme === 'dark' ? 'white' : 'black')
      const circle = svg.getElementsByTagName('circle')[0]
      circle.setAttribute('fill', mapTheme === 'dark' ? 'white' : 'black')
    }
  }, [resolvedTheme])

  return supported && mapContainerRef ? (
    <div className={'my-4'}>
      <div id="map-container" ref={mapContainerRef} className={'h-[400px]'} />
    </div>
  ) : null
}

export default Map
