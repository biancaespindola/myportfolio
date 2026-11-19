import { CaseStudyView, caseStudyMetadata } from "@/components/case-study-view";

export const generateMetadata = () => caseStudyMetadata("sportsbook");

export default function Page() {
  return <CaseStudyView slug="sportsbook" />;
}
