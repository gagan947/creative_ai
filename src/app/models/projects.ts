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
    createdAt: string; // or Date if you parse it
    updatedAt: string; // or Date if you parse it
  }
  