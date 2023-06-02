import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useState } from "react";

// Set your Google Maps API key
const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100px",
};

export default function LocationSearchInput() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          setCoordinates(latLng);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => (
      <li onClick={handleSelect(suggestion)}>{suggestion.description}</li>
    ));

  return (
    <div>
      {status === "OK" && (
        <>
          <input
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Where are you?"
          />
          <ul>{renderSuggestions()}</ul>
          <MyMapComponent center={coordinates} />
        </>
      )}
    </div>
  );
}

export function MyMapComponent({ center }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      <Marker position={center} />
    </GoogleMap>
  ) : null;
}
