import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Project {
  id: string;
  name: string;
  repo: string;
  target: string;
  status: string;
  lastDeploy: string;
  branch: string;
  previewUrl: string;
  domain?: string | null;
}

export interface LogActivity {
  id: string;
  type: string;
  status: string;
  title: string;
  project: string;
  time: string;
  details: string;
  icon: string;
}

interface AppDataContextType {
  projects: Project[];
  activities: LogActivity[];
  addProject: (project: Omit<Project, 'id'>) => void;
  addActivity: (activity: Omit<LogActivity, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};

interface AppDataProviderProps {
  children: ReactNode;
}

export const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Frontend App",
      repo: "github.com/user/frontend-app",
      target: "ECS",
      status: "active",
      lastDeploy: "2 hours ago",
      branch: "main",
      previewUrl: "https://frontend-app.oneops.dev",
      domain: "myapp.com"
    },
    {
      id: "2", 
      name: "API Service",
      repo: "gitlab.com/user/api-service",
      target: "EC2",
      status: "deploying",
      lastDeploy: "5 minutes ago",
      branch: "develop",
      previewUrl: "https://api-service.oneops.dev",
      domain: null
    },
    {
      id: "3",
      name: "Worker Service",
      repo: "bitbucket.org/user/worker",
      target: "ECS",
      status: "failed",
      lastDeploy: "1 day ago", 
      branch: "feature/new-worker",
      previewUrl: "https://worker.oneops.dev",
      domain: null
    }
  ]);

  const [activities, setActivities] = useState<LogActivity[]>([
    {
      id: "1",
      type: "deployment",
      status: "success",
      title: "Frontend App deployed successfully",
      project: "Frontend App",
      time: "2 minutes ago",
      details: "Deployment to ECS cluster completed. 3 tasks running.",
      icon: "Rocket"
    },
    {
      id: "2", 
      type: "build",
      status: "in-progress",
      title: "API Service build started",
      project: "API Service",
      time: "5 minutes ago",
      details: "Docker image build initiated from commit a1b2c3d",
      icon: "Activity"
    },
    {
      id: "3",
      type: "commit",
      status: "info",
      title: "New commit pushed to main",
      project: "Worker Service",
      time: "12 minutes ago",
      details: "Added new worker queue processing logic",
      icon: "GitCommit"
    },
    {
      id: "4",
      type: "deployment",
      status: "failed",
      title: "Worker Service deployment failed",
      project: "Worker Service", 
      time: "1 hour ago",
      details: "ECS task failed to start. Health check timeout.",
      icon: "Rocket"
    },
    {
      id: "5",
      type: "build",
      status: "success", 
      title: "Frontend App build completed",
      project: "Frontend App",
      time: "2 hours ago",
      details: "Docker image built and pushed to registry",
      icon: "Activity"
    },
    {
      id: "6",
      type: "system",
      status: "warning",
      title: "High CPU usage detected",
      project: "API Service",
      time: "3 hours ago", 
      details: "EC2 instance i-1234567890 CPU usage at 85%",
      icon: "AlertTriangle"
    },
    {
      id: "7",
      type: "deployment",
      status: "success",
      title: "API Service rollback completed",
      project: "API Service",
      time: "6 hours ago",
      details: "Successfully rolled back to previous version v1.2.3",
      icon: "Rocket"
    },
    {
      id: "8",
      type: "commit",
      status: "info",
      title: "Feature branch merged",
      project: "Frontend App",
      time: "1 day ago",
      details: "Pull request #42 merged into main branch",
      icon: "GitCommit"
    }
  ]);

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString()
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const addActivity = (activityData: Omit<LogActivity, 'id'>) => {
    const newActivity: LogActivity = {
      ...activityData,
      id: Date.now().toString()
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  return (
    <AppDataContext.Provider value={{
      projects,
      activities,
      addProject,
      addActivity,
      updateProject
    }}>
      {children}
    </AppDataContext.Provider>
  );
};