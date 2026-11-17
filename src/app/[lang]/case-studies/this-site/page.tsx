import { CaseStudyView, caseStudyMetadata } from "@/components/case-study-view";

export const metadata = caseStudyMetadata("this-site");

export default function Page() {
  return <CaseStudyView slug="this-site" />;
}
