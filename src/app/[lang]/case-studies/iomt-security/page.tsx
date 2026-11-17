import { CaseStudyView, caseStudyMetadata } from "@/components/case-study-view";

export const metadata = caseStudyMetadata("iomt-security");

export default function Page() {
  return <CaseStudyView slug="iomt-security" />;
}
