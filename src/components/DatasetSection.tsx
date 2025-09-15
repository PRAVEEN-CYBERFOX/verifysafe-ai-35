import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Instagram, 
  Youtube, 
  Facebook, 
  Twitter,
  Image as ImageIcon,
  Video,
  Mic,
  Users,
  TrendingUp,
  Shield,
  AlertCircle
} from "lucide-react";

export const DatasetSection = () => {
  const datasets = [
    {
      name: "FaceForensics++",
      type: "Research Dataset",
      icon: ImageIcon,
      samples: "1.8M",
      accuracy: "99.3%",
      description: "Comprehensive deepfake detection dataset with manipulated facial videos",
      status: "active"
    },
    {
      name: "DFDC Dataset", 
      type: "Challenge Dataset",
      icon: Video,
      samples: "128K",
      accuracy: "97.8%",
      description: "Facebook's Deepfake Detection Challenge dataset",
      status: "active"
    },
    {
      name: "CelebDF",
      type: "Celebrity Dataset", 
      icon: Users,
      samples: "590",
      accuracy: "96.1%",
      description: "High-quality deepfake videos of celebrities",
      status: "active"
    },
    {
      name: "Real-time Social Feed",
      type: "Live Dataset",
      icon: TrendingUp,
      samples: "Live",
      accuracy: "95.7%", 
      description: "Continuously updated social media content analysis",
      status: "requires_supabase"
    }
  ];

  const socialPlatforms = [
    {
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-500",
      status: "Demo Available",
      description: "Analyze posts, stories, and reels for deepfake content"
    },
    {
      name: "YouTube", 
      icon: Youtube,
      color: "text-red-500",
      status: "Demo Available",
      description: "Video content analysis and comment verification"
    },
    {
      name: "Facebook",
      icon: Facebook, 
      color: "text-blue-500",
      status: "Demo Available",
      description: "Posts, videos, and profile image authentication"
    },
    {
      name: "Twitter/X",
      icon: Twitter,
      color: "text-gray-400", 
      status: "Demo Available",
      description: "Tweet media and profile verification"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-card to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Trained on Industry-Leading Datasets
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI models are trained on the most comprehensive deepfake detection 
            datasets, ensuring high accuracy across diverse content types and platforms.
          </p>
        </div>

        {/* Datasets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {datasets.map((dataset) => (
            <Card key={dataset.name} className="gradient-security border-border/50 shadow-card hover:shadow-glow transition-smooth">
              <CardHeader className="text-center pb-4">
                <dataset.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <CardTitle className="text-lg">{dataset.name}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {dataset.type}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Samples:</span>
                    <span className="font-medium text-primary">{dataset.samples}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Accuracy:</span>
                    <span className="font-medium text-verified">{dataset.accuracy}</span>
                  </div>
                </div>
                
                <Progress 
                  value={parseFloat(dataset.accuracy)} 
                  className="h-2" 
                />
                
                <p className="text-xs text-muted-foreground">
                  {dataset.description}
                </p>
                
                {dataset.status === "requires_supabase" && (
                  <div className="flex items-center gap-2 p-2 rounded bg-warning/10 border border-warning/20">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <span className="text-xs text-warning">Requires Supabase</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Media Integration */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              Social Media Platform Integration
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect directly with major social platforms for real-time content verification 
              and automated deepfake detection across your feeds.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialPlatforms.map((platform) => (
              <Card key={platform.name} className="gradient-security border-border/50 shadow-card hover:shadow-glow transition-smooth">
                <CardContent className="p-6 text-center space-y-4">
                  <platform.icon className={`h-12 w-12 mx-auto ${platform.color}`} />
                  <div>
                    <h4 className="font-semibold mb-1">{platform.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {platform.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {platform.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Connect Platform
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Integration Notice */}
          <Card className="gradient-security border-warning/20 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Database className="h-6 w-6 text-warning mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-warning mb-2">
                    Enhanced Features with Supabase Integration
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    For production use with real social media APIs, user authentication, 
                    data storage, and blockchain verification, connect your project to Supabase. 
                    This enables full backend functionality including:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    {[
                      "Real-time social media API access",
                      "User authentication & profiles", 
                      "Analysis history storage",
                      "Blockchain hash recording",
                      "Advanced reporting & analytics",
                      "Team collaboration features"
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="hero"
                    onClick={() => window.open('https://docs.lovable.dev/integrations/supabase/', '_blank')}
                  >
                    Connect Supabase Integration →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};