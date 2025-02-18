export interface ProjectData {
    PhasesDeliverables:[];
    estimatedDate: string; // ISO string format for date
    estimated_time: number;
    finalCost: number;
    logoStyle: string | null;
    platform: string[];
    projectId: string;
    projectLogo: string | null;
    projectName: string;
    selectdFeature: SelectedFeature[];
    speed: string;
    totalCost: number;
  }
  
  export interface SelectedFeature {
    featuresName: string;
    estimated_time: number;
    totalSubFeaturedPrice: number;
  }
  