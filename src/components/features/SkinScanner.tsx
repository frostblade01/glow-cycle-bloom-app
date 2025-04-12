
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, Image, RefreshCw, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export const SkinScanner: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setUploadedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResult(true);
    }, 3000);
  };
  
  const handleReset = () => {
    setUploadedImage(null);
    setHasResult(false);
  };
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Skin Scanner</CardTitle>
          <CardDescription>
            Upload a selfie to analyze your skin condition
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!uploadedImage ? (
            <div className="border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center justify-center text-center h-64">
              <Camera className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg">Upload a photo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Take a clear, well-lit selfie without makeup
              </p>
              <div className="flex gap-4">
                <Button>
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <div className="relative">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    accept="image/*"
                    onChange={handleUpload}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img 
                src={uploadedImage} 
                alt="Uploaded skin" 
                className="w-full h-full object-cover"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                  <RefreshCw className="h-8 w-8 animate-spin mb-4" />
                  <p className="font-medium">Analyzing your skin...</p>
                  <Progress value={65} className="w-2/3 h-2 mt-4" />
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={handleReset} disabled={!uploadedImage || isAnalyzing}>
            Reset
          </Button>
          <Button 
            onClick={handleAnalyze} 
            disabled={!uploadedImage || isAnalyzing || hasResult}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Skin'}
          </Button>
        </CardFooter>
      </Card>
      
      <Card className={cn(!hasResult && 'opacity-50')}>
        <CardHeader>
          <CardTitle>Skin Analysis Report</CardTitle>
          <CardDescription>
            {hasResult ? 'Your personalized skin assessment' : 'Scan your skin to see results'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!hasResult ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="font-medium">No Analysis Yet</h3>
              <p className="text-sm text-muted-foreground">
                Upload a photo and analyze to see your results
              </p>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-sm font-medium mb-2">Skin Concerns</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Mild Acne</Badge>
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Inflammation</Badge>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Dehydration</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Skin Metrics</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Hydration Level</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Oil Production</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sensitivity</span>
                      <span>58%</span>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">AI Recommendations</h3>
                <ul className="space-y-2">
                  <li className="text-sm flex items-start gap-2">
                    <span className="text-green-500 text-xs mt-0.5">✓</span>
                    <span>Increase hydration with hyaluronic acid serum</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <span className="text-green-500 text-xs mt-0.5">✓</span>
                    <span>Use salicylic acid cleanser for acne prevention</span>
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <span className="text-green-500 text-xs mt-0.5">✓</span>
                    <span>Add soothing ingredients like centella asiatica</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            variant="outline" 
            disabled={!hasResult}
          >
            Get Full Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
