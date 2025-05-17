export interface LeadFields {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  linkedInProfile: string;
  visasOfInterest: string[];
  additionalInfo: string;
  resume?: File | null;
  status?: string;
}
