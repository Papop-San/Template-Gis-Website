# Nexjs + leaflet 
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Install Envoriment
```bash
npm install
```


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Create Env File

```bash
#Server
NEXT_PUBLIC_SERPER_API_URL=https://google.serper.dev/images
NEXT_PUBLIC_SERPER_KEY=d276eec7c1fe8d94bc9c9d41cedb88d598d104b7

NEXT_PUBLIC_FALLBACK_IMAGE=https://via.placeholder.com/400x300?text=No+Image
NEXT_PUBLIC_LOADING_IMAGE=https://via.placeholder.com/400x300?text=Loading...

NEXT_PUBLIC_OSM_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png

NEXT_PUBLIC_LEAFLET_ICON=https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png
NEXT_PUBLIC_LEAFLET_ICON_2X=https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png
NEXT_PUBLIC_LEAFLET_SHADOW=https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png  
```

## URL 

```bash
web url: http://localhost:3000/ 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
