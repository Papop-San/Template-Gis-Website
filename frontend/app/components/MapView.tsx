"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Feature = {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    name: string;
    district: string;
    province: string;
    description?: string;
  };
};

const DEFAULT_CENTER: [number, number] = [18.9, 98];

const FALLBACK_IMAGE = process.env.NEXT_PUBLIC_FALLBACK_IMAGE!;
const LOADING_IMAGE = process.env.NEXT_PUBLIC_LOADING_IMAGE!;

const defaultIcon = L.icon({
  iconUrl: process.env.NEXT_PUBLIC_LEAFLET_ICON!,
  iconRetinaUrl: process.env.NEXT_PUBLIC_LEAFLET_ICON_2X!,
  shadowUrl: process.env.NEXT_PUBLIC_LEAFLET_SHADOW!,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FlyTo({ location }: { location: Feature }) {
  const map = useMap();

  useEffect(() => {
    const [lng, lat] = location.geometry.coordinates;
    map.flyTo([lat, lng], 10);
  }, [location, map]);

  return null;
}

async function getSingleImage(placeName: string): Promise<string> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERPER_API_URL!,
    {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_SERPER_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: placeName,
        num: 1,
      }),
    }
  );

  const data = await response.json();
  return data?.images?.[0]?.imageUrl ?? FALLBACK_IMAGE;
}

function PlacePopup({ feature }: { feature: Feature }) {
  const [imageUrl, setImageUrl] = useState(LOADING_IMAGE);

  useEffect(() => {
    let active = true;

    getSingleImage(feature.properties.name)
      .then((url) => active && setImageUrl(url))
      .catch(() => setImageUrl(FALLBACK_IMAGE));

    return () => {
      active = false;
    };
  }, [feature.properties.name]);

  return (
    <div style={{ width: 300 }}>
      <img
        src={imageUrl}
        alt={feature.properties.name}
        onError={() => setImageUrl(FALLBACK_IMAGE)}
        style={{
          width: "100%",
          height: 120,
          objectFit: "cover",
          borderRadius: 6,
          marginBottom: 6,
        }}
      />

      <strong>{feature.properties.name}</strong>
      <div style={{ fontSize: 13 }}>
        {feature.properties.district}, {feature.properties.province}
      </div>

      <p style={{ fontSize: 12, marginTop: 4 }}>
        {feature.properties.description || "-"}
      </p>
    </div>
  );
}

export default function MapView({
  features,
  selected,
}: {
  features: Feature[];
  selected?: Feature;
}) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url={process.env.NEXT_PUBLIC_OSM_TILE_URL!} />

      {selected && <FlyTo location={selected} />}

      {features.map((feature, index) => {
        const [lng, lat] = feature.geometry.coordinates;

        return (
          <Marker key={index} icon={defaultIcon} position={[lat, lng]}>
            <Popup>
              <PlacePopup feature={feature} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
