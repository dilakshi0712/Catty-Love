import React from 'react'
import { Marker, GoogleApiWrapper } from 'google-maps-react'
import GoogleMap from 'google-maps-react'
import { DEFAULT_LOCATION } from '../constants/googleMapConstants'
import dotenv from 'dotenv'

dotenv.config()

const MapContainer = ({
  location,
  draggable,
  google,
  dragMarkerDisable,
  onMarkerDragEnd,
}) => {
  const handleMarkerDragEnd = (coord) => {
    if (!dragMarkerDisable) {
      onMarkerDragEnd(coord)
    }
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
      <div id='mapcontainer'>
        <GoogleMap
          google={google}
          initialCenter={DEFAULT_LOCATION}
          center={DEFAULT_LOCATION}
          disableDefaultUI={false}
          style={{
            width: '100%',
            height: '100%',
          }}
          zoom={15}
        >
          <Marker
            position={location}
            draggable={draggable}
            onDragend={(t, map, coord) => handleMarkerDragEnd(coord)}
            name={'Marker 1'}
          />
        </GoogleMap>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCgI1kHaGwfxv926wkazyltkdH6hyLyK-I',
})(MapContainer)
