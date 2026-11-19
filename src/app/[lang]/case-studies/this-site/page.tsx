import { CaseStudyView, caseStudyMetadata } from "@/components/case-study-view";

export const generateMetadata = () => caseStudyMetadata("this-site");

export default function Page() {
  return <CaseStudyView slug="this-site" />;
}
