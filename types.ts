
export interface CitizenProfile {
  name: string;
  role: 'Youth' | 'Senior' | 'Worker' | 'Disabled' | 'Business Owner';
  passions: string;
  challenges: string;
  timeCommitment: string;
}

export interface AIProjectIdea {
  title: string;
  type: 'Creative' | 'Economic' | 'Community' | 'Infrastructure';
  description: string;
  potentialImpact: string;
  revenueModel?: string;
}

export interface HubFeature {
  title: string;
  description: string;
  icon: string;
}
