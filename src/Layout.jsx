import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { FileText, Home, Settings, Download, Sparkles, User as UserIcon, Target, Mail, Info, Heart, Briefcase, TrendingUp, LogOut, Settings as SettingsIcon, Bell, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
// Removed import: import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ResumeLoader from "@/components/common/ResumeLoader";

// Custom Avatar Component to replace Radix UI Avatar
const CustomAvatar = ({ src, alt, fallback, className, fallbackClassName }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false); // Reset error state when `src` prop changes
  }, [src]);

  // If `src` is provided and there's no image error, try to render the image
  if (src && !imageError) {
    return (
      <div className={`relative flex shrink-0 overflow-hidden rounded-full ${className}`}>
        <img
          className="aspect-square h-full w-full object-cover"
          src={src}
          alt={alt}
          onError={() => setImageError(true)} // Set error if image fails to load
        />
      </div>
    );
  }

  // Fallback: either image failed or src was not provided
  return (
    <div className={`relative flex shrink-0 overflow-hidden rounded-full items-center justify-center ${className} ${fallbackClassName}`}>
      <span className="text-sm font-medium leading-none">{fallback}</span>
    </div>
  );
};

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: FileText,
    requiresAuth: true,
  },
  {
    title: "Templates",
    url: createPageUrl("Templates"),
    icon: Sparkles,
  },
  {
    title: "Job Board",
    url: createPageUrl("Jobs"),
    icon: Briefcase,
  },
  {
    title: "Job Matcher",
    url: createPageUrl("JobMatcher"),
    icon: Target,
    requiresAuth: true,
  },
  {
    title: "Analytics", 
    url: createPageUrl("Analytics"),
    icon: TrendingUp,
    requiresAuth: true,
  },
  {
    title: "News & Trends",
    url: createPageUrl("News"),
    icon: Bell,
  },
];

const secondaryItems = [
  {
    title: "About Us",
    url: createPageUrl("About"),
    icon: Info,
  },
  {
    title: "Contact",
    url: createPageUrl("Contact"),
    icon: Mail,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const isLanding = currentPageName === "Home";
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuestMode, setIsGuestMode] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
      setIsGuestMode(false);
    } catch (error) {
      // User not logged in
      setCurrentUser(null);
      setIsGuestMode(true);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      await User.logout();
      setCurrentUser(null);
      setIsGuestMode(true);
      window.location.href = createPageUrl("Home");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      await User.loginWithRedirect(window.location.href);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (isLoading) {
    return <ResumeLoader />;
  }

  if (isLanding) {
    return (
      <div>
        {/* Top Navigation Bar for Landing */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-green-200/30">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to={createPageUrl("Home")} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-xl text-gray-900">ResumeAI</h1>
                  <p className="text-xs text-gray-500">AI-Powered Resume Builder</p>
                </div>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to={createPageUrl("Templates")} className="text-gray-600 hover:text-green-600 transition-colors">Templates</Link>
                <Link to={createPageUrl("Jobs")} className="text-gray-600 hover:text-green-600 transition-colors">Jobs</Link>
                <Link to={createPageUrl("News")} className="text-gray-600 hover:text-green-600 transition-colors">News</Link>
                <Link to={createPageUrl("About")} className="text-gray-600 hover:text-green-600 transition-colors">About</Link>
                <Link to={createPageUrl("Contact")} className="text-gray-600 hover:text-green-600 transition-colors">Contact</Link>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
                {currentUser ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <CustomAvatar
                          src={currentUser.avatar}
                          alt={currentUser.full_name}
                          fallback={currentUser.full_name?.charAt(0) || 'U'}
                          className="h-10 w-10"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{currentUser.full_name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={createPageUrl("Dashboard")}>
                          <FileText className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={createPageUrl("Profile")}>
                          <UserIcon className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button variant="ghost" onClick={handleLogin}>
                      Log In
                    </Button>
                    <Button onClick={handleLogin} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content with padding for fixed nav */}
        <div className="pt-20">
          {children}
        </div>

        {/* Enhanced Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">ResumeAI</h3>
                    <p className="text-gray-400 text-sm">AI Resume Builder</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Build professional, ATS-optimized resumes with AI assistance and stunning templates.
                </p>
                <p className="text-green-400 text-sm font-medium">
                  🇮🇳 Made in Jhansi, Uttar Pradesh, India
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to={createPageUrl("Templates")} className="hover:text-green-400 transition-colors">Resume Templates</Link></li>
                  <li><Link to={createPageUrl("Jobs")} className="hover:text-green-400 transition-colors">Job Board</Link></li>
                  <li><Link to={createPageUrl("JobMatcher")} className="hover:text-green-400 transition-colors">Job Matcher</Link></li>
                  <li><Link to={createPageUrl("News")} className="hover:text-green-400 transition-colors">Career News</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to={createPageUrl("About")} className="hover:text-green-400 transition-colors">About Us</Link></li>
                  <li><Link to={createPageUrl("Contact")} className="hover:text-green-400 transition-colors">Contact</Link></li>
                  <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="https://twitter.com/resumeai" className="hover:text-green-400 transition-colors">🐦 Twitter</a></li>
                  <li><a href="https://linkedin.com/company/resumeai" className="hover:text-green-400 transition-colors">💼 LinkedIn</a></li>
                  <li><a href="https://github.com/resumeai" className="hover:text-green-400 transition-colors">💻 GitHub</a></li>
                  <li><a href="mailto:support@resumeai.com" className="hover:text-green-400 transition-colors">📧 Email</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2024 ResumeAI. All rights reserved.</p>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                Built by <Heart className="w-4 h-4 text-red-500" /> 
                <span className="text-green-400 font-medium">Sudhanshu Yadav</span> & 
                <span className="text-green-400 font-medium">Team Iinvo Techy</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-green-50">
        <Sidebar className="border-r border-green-200/30 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-green-200/30 p-6">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">ResumeAI</h2>
                <p className="text-sm text-gray-500">AI Resume Builder</p>
              </div>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            {/* Guest Mode Notice */}
            {isGuestMode && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-800 text-sm mb-2">🎯 Guest Mode</h3>
                <p className="text-yellow-700 text-xs mb-3">You're browsing as a guest. Sign up for full features!</p>
                <Button size="sm" onClick={handleLogin} className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
                  Sign Up Free
                </Button>
              </div>
            )}

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-3">
                Main Features
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => {
                    const isRestricted = item.requiresAuth && isGuestMode;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild={!isRestricted}
                          className={`hover:bg-green-50 hover:text-green-700 transition-all duration-300 rounded-xl mb-2 group ${
                            location.pathname === item.url ? 'bg-green-100 text-green-800 shadow-sm' : ''
                          } ${isRestricted ? 'opacity-50' : ''}`}
                          onClick={isRestricted ? handleLogin : undefined}
                        >
                          {isRestricted ? (
                            <div className="flex items-center gap-3 px-4 py-3 cursor-pointer">
                              <item.icon className="w-5 h-5" />
                              <span className="font-medium">{item.title}</span>
                              <span className="ml-auto text-xs text-yellow-600">🔒</span>
                            </div>
                          ) : (
                            <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                              <span className="font-medium">{item.title}</span>
                            </Link>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-3">
                Information
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {secondaryItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-xl mb-2 group ${
                          location.pathname === item.url ? 'bg-blue-100 text-blue-800 shadow-sm' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {!isGuestMode && (
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-3">
                  Quick Stats
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-3 py-2 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Resumes</span>
                      <span className="ml-auto font-semibold">3</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">Avg ATS Score</span>
                      <span className="ml-auto font-semibold text-green-600">94%</span>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter className="border-t border-green-200/30 p-6">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start h-auto p-0">
                    <div className="flex items-center gap-3 w-full">
                      <CustomAvatar
                        src={currentUser.avatar}
                        alt={currentUser.full_name}
                        fallback={currentUser.full_name?.charAt(0) || 'U'}
                        className="h-10 w-10"
                        fallbackClassName="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <p className="font-semibold text-gray-900 text-sm truncate">{currentUser.full_name}</p>
                        <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl("Profile")}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-y-2">
                <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
                  Sign In
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Join thousands of users!
                </p>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/60 backdrop-blur-md border-b border-green-200/30 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-green-50 p-2 rounded-xl transition-colors duration-300" />
              <Link to={createPageUrl("Home")} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">ResumeAI</h1>
              </Link>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
      
      <style jsx>{`
        :root {
          --color-mint-white: #F7FFF6;
          --color-soft-green: #BCEBCB;
          --color-fresh-green: #87D68D;
          --color-sage: #93B48B;
          --color-blue-gray: #8491A3;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </SidebarProvider>
  );
}