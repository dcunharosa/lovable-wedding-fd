import PageLayout from "@/components/PageLayout";
import { HomeSection } from "./Index";
import { WeekendSection } from "./Weekend";
import { DressCodeSection } from "./DressCode";
import { VenueSection } from "./Venue";
import { TravelSection } from "./Travel";
import { StaySection } from "./Stay";
import { GiftsSection } from "./Gifts";
import { FaqSection } from "./Faq";
import { RsvpSection } from "./Rsvp";

const SinglePage = () => {
  return (
    <PageLayout>
      <HomeSection />
      <WeekendSection />
      <DressCodeSection />
      <VenueSection />
      <TravelSection />
      <StaySection />
      <GiftsSection />
      <RsvpSection />
      <FaqSection />
    </PageLayout>
  );
};

export default SinglePage;
