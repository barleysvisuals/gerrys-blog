import type { Metadata } from "next";
import { PartyArea } from "@/components/party-area";

export const metadata: Metadata = {
  title: "Nur für Freunde",
  robots: {
    index: false,
    follow: false
  }
};

export default function PartyPage() {
  return <PartyArea />;
}
