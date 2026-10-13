export type JourneyLocation = {
  id: string;
  name: string;
  detail: string;
  lat: number;
  lng: number;
  postSlugs: string[];
};

export const journeyLocations: JourneyLocation[] = [
  {
    id: "christchurch",
    name: "Christchurch",
    detail: "Mein Startpunkt auf der Südinsel",
    lat: -43.5321,
    lng: 172.6362,
    postSlugs: [
      "ankommen-in-christchurch",
      "mein-erstes-auto-in-neuseeland"
    ]
  },
  {
    id: "akaroa",
    name: "Akaroa",
    detail: "Buchten, Wanderungen und die erste Nacht im Auto",
    lat: -43.8038,
    lng: 172.9682,
    postSlugs: [
      "akaroa-newton-falls-und-lyttelton",
      "erste-camping-erfahrung-bei-akaroa"
    ]
  },
  {
    id: "lyttelton",
    name: "Lyttelton",
    detail: "Hafen und Pizza zum Abschluss des Tages",
    lat: -43.6033,
    lng: 172.7202,
    postSlugs: ["akaroa-newton-falls-und-lyttelton"]
  },
  {
    id: "adventure-park",
    name: "Adventure Park",
    detail: "Zu Fuß nach oben und mit dem Lift zurück",
    lat: -43.5905,
    lng: 172.6024,
    postSlugs: ["wandern-im-christchurch-adventure-park"]
  },
  {
    id: "sheffield",
    name: "Sheffield",
    detail: "Der erste Stopp auf dem Weg zur Westküste",
    lat: -43.3891,
    lng: 172.0228,
    postSlugs: ["erster-stopp-richtung-westkueste"]
  }
];

export const journeyPath = [
  "christchurch",
  "akaroa",
  "lyttelton",
  "christchurch",
  "adventure-park",
  "christchurch",
  "akaroa",
  "christchurch",
  "sheffield"
];
