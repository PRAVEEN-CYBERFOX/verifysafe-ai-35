import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Menu, ChevronDown, User } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";
import { WalletButton } from "@/components/WalletButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary glow-effect" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Deepfake Detection
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#detection" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Detection
            </a>
            <a href="#verification" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Verification
            </a>
            <a href="#blockchain" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Blockchain
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  Social Media <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Instagram</DropdownMenuItem>
                <DropdownMenuItem>YouTube</DropdownMenuItem>
                <DropdownMenuItem>Facebook</DropdownMenuItem>
                <DropdownMenuItem>Twitter/X</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center gap-4">
            <WalletButton />
            <Button 
              variant="outline" 
              className="hidden sm:inline-flex"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="hero">
              Get Started
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};