import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, Gauge } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-devops.jpg";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/30 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,76,231,0.1)_50%,transparent_75%,transparent)] bg-[length:60px_60px]"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered DevOps Platform
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Automate.</span><br />
              <span className="text-gradient">Deploy.</span><br />
              <span className="text-gradient">Scale.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              OneOps is the AI-powered DevOps platform for faster deployments, 
              smart automation, and guaranteed uptime. Transform your development 
              workflow today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="hero" size="lg" onClick={() => navigate('/signup')}>
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center bg-card rounded-full px-4 py-2 shadow-md">
                <Gauge className="w-4 h-4 text-success mr-2" />
                <span className="text-sm font-medium">99.9% Uptime</span>
              </div>
              <div className="flex items-center bg-card rounded-full px-4 py-2 shadow-md">
                <Shield className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center bg-card rounded-full px-4 py-2 shadow-md">
                <Zap className="w-4 h-4 text-warning mr-2" />
                <span className="text-sm font-medium">AI Automation</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-devops">
              <img 
                src={heroImage} 
                alt="OneOps DevOps Platform" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card rounded-lg p-4 shadow-lg animate-pulse-subtle">
              <div className="text-sm font-semibold text-success">Deploy Success</div>
              <div className="text-xs text-muted-foreground">2.3s avg time</div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-card rounded-lg p-4 shadow-lg animate-pulse-subtle">
              <div className="text-sm font-semibold text-primary">Active Projects</div>
              <div className="text-2xl font-bold text-gradient">1,247</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;