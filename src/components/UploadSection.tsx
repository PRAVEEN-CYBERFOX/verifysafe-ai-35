import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAIAnalysis, type AnalysisResult } from "@/components/AIAnalysisEngine";
import { 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  Instagram, 
  Youtube, 
  Facebook,
  Link2,
  Scan,
  CheckCircle2,
  AlertTriangle,
  FileX,
  Shield
} from "lucide-react";

export const UploadSection = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | 'audio' | null>(null);
  
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const { analyzeFile, isAnalyzing, progress, result, error, reset } = useAIAnalysis();

  const handleFileUpload = async (file: File, type: 'image' | 'video' | 'audio') => {
    console.log('Uploading file:', file.name, 'Type:', type);
    
    // Validate file type
    const validTypes = {
      image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
      video: ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'],
      audio: ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac']
    };

    if (!validTypes[type].includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: `Please upload a valid ${type} file.`,
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "File Too Large", 
        description: "Please upload a file smaller than 100MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    setFileType(type);
    
    toast({
      title: "File Uploaded Successfully",
      description: `${file.name} is ready for analysis.`,
    });
  };

  const handleAnalysis = async () => {
    if (!uploadedFile || !fileType) {
      toast({
        title: "No File Selected",
        description: "Please upload a file first.",
        variant: "destructive",
      });
      return;
    }

    console.log('Starting analysis for:', uploadedFile.name);
    
    try {
      await analyzeFile(uploadedFile, fileType);
      toast({
        title: "Analysis Complete",
        description: "Your content has been analyzed successfully.",
      });
    } catch (err) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your content. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetAnalysis = () => {
    reset();
    setUploadedFile(null);
    setFileType(null);
    if (imageRef.current) imageRef.current.value = '';
    if (videoRef.current) videoRef.current.value = '';
    if (audioRef.current) audioRef.current.value = '';
  };

  return (
    <section id="detection" className="py-20 bg-gradient-to-b from-background to-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            AI-Powered Content Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your media or analyze social media content directly. Our advanced 
            AI models detect deepfakes across multiple formats with blockchain verification.
          </p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload">Direct Upload</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Image Upload */}
              <Card className="gradient-security border-border/50 shadow-card hover:shadow-glow transition-smooth">
                <CardHeader className="text-center">
                  <ImageIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Image Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input
                    ref={imageRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'image')}
                    className="hidden"
                  />
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth cursor-pointer"
                    onClick={() => imageRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploadedFile && fileType === 'image' ? uploadedFile.name : 'Drop images or click to upload'}
                    </p>
                  </div>
                  <Button 
                    variant="hero" 
                    className="w-full"
                    onClick={handleAnalysis}
                    disabled={isAnalyzing || !uploadedFile || fileType !== 'image'}
                  >
                    {isAnalyzing && fileType === 'image' ? (
                      <Scan className="h-4 w-4 animate-spin" />
                    ) : (
                      'Analyze Image'
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Video Upload */}
              <Card className="gradient-security border-border/50 shadow-card hover:shadow-glow transition-smooth">
                <CardHeader className="text-center">
                  <Video className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Video Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input
                    ref={videoRef}
                    type="file"
                    accept="video/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'video')}
                    className="hidden"
                  />
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth cursor-pointer"
                    onClick={() => videoRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploadedFile && fileType === 'video' ? uploadedFile.name : 'Drop videos or click to upload'}
                    </p>
                  </div>
                  <Button 
                    variant="hero" 
                    className="w-full"
                    onClick={handleAnalysis}
                    disabled={isAnalyzing || !uploadedFile || fileType !== 'video'}
                  >
                    {isAnalyzing && fileType === 'video' ? (
                      <Scan className="h-4 w-4 animate-spin" />
                    ) : (
                      'Analyze Video'
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Audio Upload */}
              <Card className="gradient-security border-border/50 shadow-card hover:shadow-glow transition-smooth">
                <CardHeader className="text-center">
                  <Mic className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Audio Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input
                    ref={audioRef}
                    type="file"
                    accept="audio/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'audio')}
                    className="hidden"
                  />
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth cursor-pointer"
                    onClick={() => audioRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploadedFile && fileType === 'audio' ? uploadedFile.name : 'Drop audio or click to upload'}
                    </p>
                  </div>
                  <Button 
                    variant="hero" 
                    className="w-full"
                    onClick={handleAnalysis}
                    disabled={isAnalyzing || !uploadedFile || fileType !== 'audio'}
                  >
                    {isAnalyzing && fileType === 'audio' ? (
                      <Scan className="h-4 w-4 animate-spin" />
                    ) : (
                      'Analyze Audio'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Social Media Platforms */}
              {[
                { name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
                { name: 'YouTube', icon: Youtube, color: 'text-red-500' },
                { name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
                { name: 'Twitter/X', icon: Link2, color: 'text-gray-400' },
              ].map((platform) => (
                <Card key={platform.name} className="gradient-security border-border/50 shadow-card hover:shadow-glow transition-smooth">
                  <CardContent className="p-6 text-center space-y-4">
                    <platform.icon className={`h-12 w-12 mx-auto ${platform.color}`} />
                    <h3 className="font-semibold">{platform.name}</h3>
                    <Button variant="outline" className="w-full">
                      Connect & Analyze
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Analysis Progress and Results */}
        {(isAnalyzing || result || error) && (
          <Card className="mt-8 gradient-security border-border/50 shadow-card">
            <CardContent className="p-6">
              {isAnalyzing && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Analyzing Content...</h3>
                    <Badge variant="secondary">
                      <Scan className="h-4 w-4 mr-1 animate-spin" />
                      Processing
                    </Badge>
                  </div>
                  <Progress value={progress} className="mb-4" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${progress >= 25 ? 'bg-verified' : 'bg-muted'}`} />
                      <span>Content Loading</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${progress >= 50 ? 'bg-verified' : 'bg-muted'}`} />
                      <span>AI Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${progress >= 75 ? 'bg-verified' : 'bg-muted'}`} />
                      <span>Pattern Detection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${progress >= 100 ? 'bg-verified' : 'bg-muted'}`} />
                      <span>Report Generation</span>
                    </div>
                  </div>
                </>
              )}
              
              {error && (
                <div className="p-4 rounded-lg bg-fake-detected/10 border border-fake-detected/20">
                  <div className="flex items-start gap-3">
                    <FileX className="h-5 w-5 text-fake-detected mt-0.5" />
                    <div>
                      <h4 className="font-medium text-fake-detected">Analysis Failed</h4>
                      <p className="text-sm text-muted-foreground">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Analysis Complete</h3>
                    <Button variant="outline" size="sm" onClick={resetAnalysis}>
                      Analyze New File
                    </Button>
                  </div>
                  
                  {/* Result Summary */}
                  <div className={`p-4 rounded-lg border ${
                    result.isDeepfake 
                      ? 'bg-fake-detected/10 border-fake-detected/20' 
                      : 'bg-verified/10 border-verified/20'
                  }`}>
                    <div className="flex items-start gap-3">
                      {result.isDeepfake ? (
                        <AlertTriangle className="h-5 w-5 text-fake-detected mt-0.5" />
                      ) : (
                        <Shield className="h-5 w-5 text-verified mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-medium ${
                            result.isDeepfake ? 'text-fake-detected' : 'text-verified'
                          }`}>
                            {result.isDeepfake ? 'Deepfake Detected!' : 'Content Authentic'}
                          </h4>
                          <Badge variant={result.isDeepfake ? 'destructive' : 'default'}>
                            {(result.confidence * 100).toFixed(1)}% Confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {result.isDeepfake 
                            ? 'This content shows signs of artificial manipulation or generation.'
                            : 'This content appears to be authentic with no signs of deepfake manipulation.'
                          }
                        </p>
                        
                        {/* Analysis Details */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Analysis Details:</h5>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {result.details.map((detail, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="h-1 w-1 bg-current rounded-full" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Blockchain Hash Simulation */}
                        <div className="mt-3 pt-3 border-t border-border/30">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Blockchain Hash:</span> 
                            {' '}0x{Math.random().toString(16).substr(2, 8)}...{Math.random().toString(16).substr(2, 8)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Verified:</span> {new Date(result.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};