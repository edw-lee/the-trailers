import { SectionTypeEnums } from "@/enums/services/sectionTypeEnums";
import HeroBanner from "./_components/HeroBanner";
import TrailersListSection from "../../components/TrailersListSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <HeroBanner />
      <TrailersListSection sectionType={SectionTypeEnums.POPULAR} />
      <TrailersListSection sectionType={SectionTypeEnums.TOP_RATED} />
      <TrailersListSection sectionType={SectionTypeEnums.UPCOMING} />
      <TrailersListSection sectionType={SectionTypeEnums.NOW_PLAYING} />
    </div>
  );
}
