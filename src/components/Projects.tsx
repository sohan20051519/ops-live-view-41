import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppData } from "@/contexts/AppDataContext";
import ProjectConfigDialog from "./ProjectConfigDialog";
import { 
  FolderOpen, 
  Play, 
  RotateCcw, 
  ExternalLink, 
  Trash2, 
  Globe, 
  Settings,
  GitBranch,
  Server,
  Activity
} from "lucide-react";

const Projects = () => {
  const { projects } = useAppData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "deploying": return "bg-warning text-warning-foreground";
      case "failed": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">Manage your deployed projects and configurations</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </div>
                <Badge className={`${getStatusColor(project.status)} text-xs`}>
                  {project.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  {project.branch}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Server className="w-3 h-3" />
                  {project.target}
                </p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Project Info */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Repository:</p>
                <p className="text-sm font-mono bg-accent/50 p-2 rounded text-accent-foreground">
                  {project.repo}
                </p>
              </div>

              {/* URLs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Preview URL:</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-sm text-primary truncate">{project.previewUrl}</p>
                
                {project.domain && (
                  <>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Custom Domain:</span>
                    </div>
                    <p className="text-sm text-success truncate">{project.domain}</p>
                  </>
                )}
              </div>

              {/* Last Deploy */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Activity className="w-3 h-3" />
                Last deployed {project.lastDeploy}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {/* Main Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1 h-9">
                    <Play className="w-3 h-3 mr-1" />
                    Redeploy
                  </Button>
                  <ProjectConfigDialog project={project}>
                    <Button variant="outline" className="flex-1 h-9">
                      <Settings className="w-3 h-3 mr-1" />
                      Configure
                    </Button>
                  </ProjectConfigDialog>
                </div>
                
                {/* Secondary Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Rollback
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                </div>
                
                {/* Domain & Delete */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Globe className="w-3 h-3 mr-1" />
                    {project.domain ? "Manage Domain" : "Add Domain"}
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;