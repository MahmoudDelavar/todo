import Map from './components/map/Map';

const handleGetposition = (latlng) => {
  let _location = [latlng.lat, latlng.lng];
  // formik.setFieldValue('location', _location);
  // formik.setFieldValue('location_latitude', latlng.lng);
  // formik.setFieldValue('location_longitude', latlng.lat);
};

function App() {
  return (
    <div>
      <p> map </p>
      <Map
        draggable={true}
        center={{
          lat: 0,
          lng: 0,
        }}
        onGetPosition={handleGetposition}
        zoom={15}
      />
    </div>
  );
}

export default App;
