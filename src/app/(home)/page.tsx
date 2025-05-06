import { SectionTypeEnums } from "@/enums/services/sectionTypeEnums";
import HeroBanner from "./_components/HeroBanner";
import TrailersListSection from "./_components/TrailersListSection";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <TrailersListSection sectionType={SectionTypeEnums.POPULAR} />
      <TrailersListSection sectionType={SectionTypeEnums.TOP_RATED} />
      <TrailersListSection sectionType={SectionTypeEnums.UPCOMING} />
      <TrailersListSection sectionType={SectionTypeEnums.NOW_PLAYING} />
    </div>
  );
}
