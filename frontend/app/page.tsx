"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Card, CardContent, TextField, Box } from "@mui/material";

const MapView = dynamic(() => import("./components/MapView"), {
  ssr: false,
});

export default function Page() {
  const [features, setFeatures] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetch("/data/locations.geojson")
      .then((res) => res.json())
      .then((data) => setFeatures(data.features));
  }, []);

  const filtered = features.filter((f) =>
    [f.properties.name, f.properties.province, f.properties.district]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelected(filtered.length > 0 ? filtered[0] : null);
  }, [filtered]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Card sx={{ width: "80%", height: "80%" }}>
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 🔒 TextField ตำแหน่งคงที่ */}
          <TextField
            fullWidth
            label="ค้นหา / สถานที่ / จังหวัด / อำเภอ"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mb: 2,
              flexShrink: 0, // ❗ ห้ามโดนบีบ
            }}
          />

          {/* 🗺 Map ใช้พื้นที่ที่เหลือ */}
          <Box
            sx={{
              flex: 1,
              minHeight: 0, 
            }}
          >
            <MapView features={filtered} selected={selected} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
