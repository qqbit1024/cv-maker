import { useOutletContext } from "react-router-dom";
import type { ResumeStudioController } from "./useResumeStudio";

export function useStudioOutlet() {
  return useOutletContext<ResumeStudioController>();
}
