import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Rocket, 
  FolderOpen, 
  ScrollText, 
  GitBranch,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bot,
  BarChart3,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  activeItem?: string;
  onItemSelect?: (item: string) => void;
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({ activeItem = "dashboard", onItemSelect, className, isCollapsed = false, onToggleCollapse }: SidebarProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "oneai", label: "OneAI", icon: Bot },
    { id: "deployments", label: "Deployments", icon: Rocket },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "usage", label: "Usage", icon: BarChart3 },
    { id: "logs", label: "Logs", icon: ScrollText },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <aside className={cn(
      "bg-card border-r border-border flex flex-col h-screen transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Brand */}
      <div className={cn("p-6 border-b border-border", isCollapsed && "p-4")}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <img 
              src="https://i.postimg.cc/cLPfdKBC/image-removebg-preview.png" 
              alt="OneOps Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-foreground">OneOps</h1>
              <p className="text-xs text-muted-foreground">DevOps Platform</p>
            </div>
          )}
        </div>
        
        {/* Collapse Toggle Button - Hidden on mobile */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className={cn(
              "mt-4 w-full border border-border/50 hover:bg-accent",
              isCollapsed ? "px-2 justify-center" : "justify-between px-3"
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <span className="text-sm">Collapse</span>
                <ChevronLeft className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full h-10",
                isCollapsed ? "justify-center px-2" : "justify-start",
                isActive && "bg-primary/10 text-primary border-primary/20"
              )}
              onClick={() => onItemSelect?.(item.id)}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
              {!isCollapsed && item.label}
            </Button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        {!isCollapsed ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Theme</span>
              <ThemeToggle />
            </div>
            
            <div className="flex items-center space-x-3 mb-4 p-2 rounded-lg bg-accent">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@oneops.com</p>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={() => navigate('/')}>
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
            
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-center px-2" 
              onClick={() => navigate('/')}
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;