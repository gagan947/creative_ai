export interface ProjectResponse {
  success: boolean;
  status: number;
  message: string;
  data: Project[];
}

export interface Project {
  id: number;
  projectName: string;
  descriptions: string;
  contain: string[];
  projectImage: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}


export interface SubFeature {
  subFeaturesName: string;
  subFeaturedPrice: number;
}

export interface Feature {
  featuresName: string;
  totalSubFeaturedPrice: number;
  countSubFeaturesName: number;
  subFeaturesListWithPrice: SubFeature[];
}

export interface FeatureResponse {
  success: boolean;
  status: number;
  message: string;
  data: Feature[];
}