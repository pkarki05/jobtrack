export const STATUSES = ["Applied", "Screening", "Interview", "Offer", "Rejected"] as const;
export type ApplicationStatus = (typeof STATUSES)[number];
export type JobApplication = {
  id: string; company: string; title: string; status: ApplicationStatus;
  appliedDate: string; followUpDate: string; interviewDate: string; deadline: string;
  notes: string; createdAt: number; updatedAt: number;
};
export type ApplicationInput = Omit<JobApplication, "id" | "createdAt" | "updatedAt">;
