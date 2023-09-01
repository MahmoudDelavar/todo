import { ToastContainer, toast } from 'react-toastify';
import Map from './components/map/Map';
import 'react-toastify/dist/ReactToastify.css';

const handleGetposition = (latlng) => {
  let _location = [latlng.lat, latlng.lng];
  console.log('loc', _location);
};

function App() {
  const notify = () => toast('Wow so easy !');
  return (
    <div>
      <button onClick={notify}>Notify !</button>
      <ToastContainer />
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
