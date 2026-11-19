import { CaseStudyView, caseStudyMetadata } from "@/components/case-study-view";

export const generateMetadata = () => caseStudyMetadata("iomt-security");

export default function Page() {
  return <CaseStudyView slug="iomt-security" />;
}
