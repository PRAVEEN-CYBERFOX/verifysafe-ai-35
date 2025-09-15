import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shield, Lock, Database, AlertCircle } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isDemo, setIsDemo] = useState(false);
  const { toast } = useToast();

  const handleDemoLogin = () => {
    setIsDemo(true);
    toast({
      title: "Demo Mode Activated",
      description: "You're now using the platform in demonstration mode.",
    });
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleSupabaseRequired = () => {
    toast({
      title: "Supabase Required",
      description: "Real authentication requires Supabase integration. Use demo mode for now.",
      variant: "destructive",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Authentication
          </DialogTitle>
          <DialogDescription>
            Sign in to access full deepfake detection features
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="demo" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="demo">Demo Mode</TabsTrigger>
            <TabsTrigger value="auth">Full Access</TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="space-y-4">
            <Card className="gradient-security border-border/50">
              <CardContent className="p-4 space-y-4">
                <div className="text-center space-y-2">
                  <Shield className="h-12 w-12 text-primary mx-auto" />
                  <h3 className="font-medium">Try Demo Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Experience AI-powered deepfake detection with sample analysis
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-center">
                    ✓ Image, Video & Audio Analysis
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-center">
                    ✓ AI Detection Results
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center">
                    ⚠ Limited to Client-Side Processing
                  </Badge>
                </div>

                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={handleDemoLogin}
                >
                  Enter Demo Mode
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auth" className="space-y-4">
            <Card className="gradient-security border-border/50">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <Database className="h-5 w-5 text-warning" />
                  <div>
                    <p className="text-sm font-medium">Supabase Integration Required</p>
                    <p className="text-xs text-muted-foreground">
                      Connect to Supabase for full authentication & backend features
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com"
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••"
                      disabled
                    />
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleSupabaseRequired}
                  disabled
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Sign In (Requires Supabase)
                </Button>

                <div className="text-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open('https://docs.lovable.dev/integrations/supabase/', '_blank')}
                  >
                    Learn about Supabase Integration →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};