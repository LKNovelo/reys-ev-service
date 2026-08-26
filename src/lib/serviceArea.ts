export const SERVICE_AREA_CENTER = {
  address: "12571 Limonite Ave, Eastvale, CA 91752",
  lat: 33.9778501,
  lng: -117.5542494,
} as const;

export const SERVICE_RINGS = [
  {
    maxMiles: 20,
    range: "Within 20 miles",
    fee: 0,
    label: "Standard Service Area",
    color: "#1A5C00",
    fillColor: "#DFF0D8",
  },
  {
    maxMiles: 40,
    range: "21–40 miles",
    fee: 25,
    label: "Extended Service Area",
    color: "#2B5FA6",
    fillColor: "#DCE8F8",
  },
  {
    maxMiles: 60,
    range: "41–60 miles",
    fee: 50,
    label: "Extended Service Area",
    color: "#B77400",
    fillColor: "#FFF0CF",
  },
  {
    maxMiles: 80,
    range: "61–80 miles",
    fee: 75,
    label: "Extended Service Area",
    color: "#9A4E19",
    fillColor: "#FBE4D5",
  },
  {
    maxMiles: 100,
    range: "81–100 miles",
    fee: 100,
    label: "Extended Service Area",
    color: "#7B3441",
    fillColor: "#F3DDE2",
  },
] as const;

export const EXTENDED_HOURS_FEE = 50;
export const NORMAL_SERVICE_HOURS = "9:00 AM–5:00 PM";

export function getServiceRing(distanceMiles: number) {
  return SERVICE_RINGS.find(({ maxMiles }) => distanceMiles <= maxMiles) ?? null;
}

export function distanceFromServiceCenter(lat: number, lng: number) {
  const earthRadiusMiles = 3958.8;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDelta = toRadians(lat - SERVICE_AREA_CENTER.lat);
  const longitudeDelta = toRadians(lng - SERVICE_AREA_CENTER.lng);
  const centerLatitude = toRadians(SERVICE_AREA_CENTER.lat);
  const destinationLatitude = toRadians(lat);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(centerLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;

  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(haversine));
}

export function formatServiceAreaFee(fee: number) {
  return fee === 0 ? "No service-area fee" : `$${fee} service-area fee`;
}
