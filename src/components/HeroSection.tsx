import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Link2, Zap, CheckCircle, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/hero-security.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-background to-card overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="inline-flex items-center gap-2">
                <Shield className="h-4 w-4" />
                AI-Powered Security
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Protect Social Media from{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Deepfakes
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Advanced AI detection system that analyzes images, videos, and audio across 
                Instagram, YouTube, Facebook, and more. Blockchain-verified results ensure 
                content authenticity in real-time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Start Detection
              </Button>
              <Button variant="security" size="lg" className="text-lg px-8 py-6">
                View Demo
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                <span className="text-sm">Multi-Modal Analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <Link2 className="h-6 w-6 text-primary" />
                <span className="text-sm">Blockchain Verified</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-sm">Real-Time Detection</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-sm">99.2% Accuracy</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6">
            <Card className="gradient-security border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-verified">2.4M+</h3>
                    <p className="text-muted-foreground">Content Verified</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-verified" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-security border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-fake-detected">15.7K</h3>
                    <p className="text-muted-foreground">Deepfakes Detected</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-fake-detected" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-security border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">99.2%</h3>
                    <p className="text-muted-foreground">Detection Accuracy</p>
                  </div>
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};