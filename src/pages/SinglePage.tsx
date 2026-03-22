import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { HomeSection } from "./Index";
import { WeekendSection } from "./Weekend";
import { VenueSection } from "./Venue";
import { TravelSection } from "./Travel";
import { StaySection } from "./Stay";
import { GiftsSection } from "./Gifts";
import { FaqSection } from "./Faq";
import { RsvpSection } from "./Rsvp";

const SinglePage = () => {
  // Scroll to the hash target on initial load (e.g. sharing /#venue).
  // React renders asynchronously, so the browser's native hash scroll
  // fires before the elements exist — this replays it after mount.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <PageLayout>
      <HomeSection />
      <WeekendSection />
      <VenueSection />
      <TravelSection />
      <StaySection />
      <GiftsSection />
      <FaqSection />
      <RsvpSection />
    </PageLayout>
  );
};

export default SinglePage;
