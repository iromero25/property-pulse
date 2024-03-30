"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress, GeocodeOptions } from "react-geocode";

import pin from "@/assets/images/pin.svg";
import { PropertySchemaType } from "@/models/Property";

import Spinner from "./Spinner";

import "mapbox-gl/dist/mapbox-gl.css";

interface PropertyMapProps {
  property: PropertySchemaType;
}

export default function PropertyMap({ property }: PropertyMapProps) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  } as GeocodeOptions);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location?.street} ${property.location?.city} ${property.location?.state} ${property.location?.zipcode}`
        );

        //  Check for results
        if (res.results.length === 0) {
          // No results found
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setViewport((previousViewport) => ({
          ...previousViewport,
          latitude: lat,
          longitude: lng,
        }));

        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, [
    property.location?.city,
    property.location?.state,
    property.location?.street,
    property.location?.zipcode,
  ]);

  if (loading || !lng || !lat) return <Spinner />;

  // Handle case where geocoding failed
  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: "100%", height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
}
