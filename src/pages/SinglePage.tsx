import PageLayout from "@/components/PageLayout";
import { HomeSection } from "./Index";
import { WeekendSection } from "./Weekend";
import { VenueSection } from "./Venue";
import { TravelSection } from "./Travel";
import { StaySection } from "./Stay";
import { FaqSection } from "./Faq";
import { RsvpSection } from "./Rsvp";

const SinglePage = () => (
  <PageLayout>
    <HomeSection />
    <WeekendSection />
    <VenueSection />
    <TravelSection />
    <StaySection />
    <FaqSection />
    <RsvpSection />
  </PageLayout>
);

export default SinglePage;
