import { Map } from "@lad-sapienza/scms-core/components/Map";

/** Minimal GeoJSON shape — avoids a hard dependency on @types/geojson here. */
export interface LuoghiFeatureCollection {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    id: number;
    geometry: { type: "Point"; coordinates: [number, number] };
    properties: {
      id: number;
      nome: string;
      tipologia: string;
      provincia: string;
      n_persone: number;
      record_url: string;
    };
  }>;
}

const popupTemplate = [
  '<strong>${nome}</strong>',
  '${tipologia} · ${provincia}',
  'Associated women: ${n_persone}',
  '<a href="${record_url}">Place record &rarr;</a>',
].join("<br/>");

export default function LuoghiMap({ data }: { data: LuoghiFeatureCollection }) {
  return (
    <Map
      height="600px"
      baseLayers={["OSM", "EsriSatellite"]}
      navigationControl="top-left"
      fullscreenControl="top-right"
      scaleControl="bottom-left"
      layerControl="top-right"
      overlayLayers={[
        {
          name: "Places of interest",
          source: { type: "geojson", data },
          fitToContent: true,
          popupTemplate,
          style: {
            type: "circle",
            paint: {
              "circle-radius": 7,
              "circle-color": "#9c3f8c",
              "circle-stroke-width": 1.5,
              "circle-stroke-color": "#ffffff",
            },
          },
        },
      ]}
    />
  );
}
