import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageHref, createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { base44 } from "@/api/base44Client";
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
    title: "Start",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Übersicht",
    url: createPageUrl("Dashboard"),
    icon: FileText,
    requiresAuth: true,
  },
  {
    title: "Vorlagen",
    url: createPageUrl("Templates"),
    icon: Sparkles,
  },
  {
    title: "Stellen",
    url: createPageUrl("Jobs"),
    icon: Briefcase,
  },
  {
    title: "Job-Abgleich",
    url: createPageUrl("JobMatcher"),
    icon: Target,
    requiresAuth: true,
  },
  {
    title: "Statistik", 
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
    title: "Über uns",
    url: createPageUrl("About"),
    icon: Info,
  },
  {
    title: "Kontakt",
    url: createPageUrl("Contact"),
    icon: Mail,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const isLanding = currentPageName === "Start";
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
      window.location.href = createPageHref("Start");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      // loginWithProvider carries the app_id, so Base44 knows which app the
      // returning token belongs to. redirectToLogin drops it, which ends in the
      // user authenticating against no app at all and being bounced back.
      base44.auth.loginWithProvider("google", window.location.href);
    } catch (error) {
      console.error("Login error:", error);
      base44.auth.redirectToLogin(window.location.href);
    }
  };

  if (isLoading) {
    return <ResumeLoader />;
  }

  if (isLanding) {
    return (
      <div>
        {/* Top Navigation Bar for Landing */}
        <nav className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#070b09]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to={createPageUrl("Home")} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">ResumeAI</h1>
                  <p className="text-xs text-white/45">KI-gestützter Lebenslauf-Editor</p>
                </div>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to={createPageUrl("Templates")} className="text-sm text-white/60 transition-colors hover:text-emerald-300">Vorlagen</Link>
                <Link to={createPageUrl("ATSChecker")} className="text-sm text-white/60 transition-colors hover:text-emerald-300">ATS-Prüfung</Link>
                <Link to={createPageUrl("CoverLetter")} className="text-sm text-white/60 transition-colors hover:text-emerald-300">Anschreiben</Link>
                <Link to={createPageUrl("Jobs")} className="text-sm text-white/60 transition-colors hover:text-emerald-300">Jobs</Link>
                <Link to={createPageUrl("News")} className="text-sm text-white/60 transition-colors hover:text-emerald-300">News</Link>
                <Link to={createPageUrl("About")} className="text-sm text-white/60 transition-colors hover:text-emerald-300">Über uns</Link>
                <Link to={createPageUrl("Contact")} className="text-sm text-white/60 transition-colors hover:text-emerald-300">Kontakt</Link>
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
                          Übersicht
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={createPageUrl("Profile")}>
                          <UserIcon className="mr-2 h-4 w-4" />
                          Profil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Abmelden
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={handleLogin}
                      className="text-white/70 hover:bg-white/[0.06] hover:text-white"
                    >
                      Anmelden
                    </Button>
                    <Button
                      onClick={handleLogin}
                      className="rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 font-semibold text-[#04120c] hover:from-emerald-300 hover:to-teal-400"
                    >
                      Loslegen
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
        <footer className="border-t border-white/[0.06] bg-[#050806] py-16 text-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">ResumeAI</h3>
                    <p className="text-gray-400 text-sm">KI-Lebenslauf-Editor</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Erstelle professionelle, ATS-optimierte Lebensläufe mit KI-Unterstützung und modernen Vorlagen.
                </p>
                <p className="text-green-400 text-sm font-medium">
                  🇮🇳 Made in Jhansi, Uttar Pradesh, India
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Produkt</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to={createPageUrl("Templates")} className="hover:text-green-400 transition-colors">Lebenslauf-Vorlagen</Link></li>
                  <li><Link to={createPageUrl("Jobs")} className="hover:text-green-400 transition-colors">Stellen</Link></li>
                  <li><Link to={createPageUrl("JobMatcher")} className="hover:text-green-400 transition-colors">Job-Abgleich</Link></li>
                    <li><Link to={createPageUrl("ATSChecker")} className="hover:text-green-400 transition-colors">ATS-Prüfung</Link></li>
                    <li><Link to={createPageUrl("CoverLetter")} className="hover:text-green-400 transition-colors">Anschreiben-Generator</Link></li>
                  <li><Link to={createPageUrl("News")} className="hover:text-green-400 transition-colors">Karriere-News</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Unternehmen</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to={createPageUrl("About")} className="hover:text-green-400 transition-colors">Über uns</Link></li>
                  <li><Link to={createPageUrl("Contact")} className="hover:text-green-400 transition-colors">Kontakt</Link></li>
                  <li><Link to={createPageUrl("Datenschutz")} className="hover:text-green-400 transition-colors">Datenschutz / Privacy</Link></li>
                  <li><a href="#" className="hover:text-green-400 transition-colors">AGB</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Kontakt</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="https://twitter.com/resumeai" className="hover:text-green-400 transition-colors">🐦 Twitter</a></li>
                  <li><a href="https://linkedin.com/company/resumeai" className="hover:text-green-400 transition-colors">💼 LinkedIn</a></li>
                  <li><a href="https://github.com/resumeai" className="hover:text-green-400 transition-colors">💻 GitHub</a></li>
                  <li><a href="mailto:support@resumeai.com" className="hover:text-green-400 transition-colors">📧 Email</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2024 ResumeAI. Alle Rechte vorbehalten.</p>
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
      <div className="flex min-h-screen w-full bg-[#070b09]">
        <Sidebar className="border-r border-white/[0.06] bg-[#0a110e]/95 backdrop-blur-xl">
          <SidebarHeader className="border-b border-white/[0.06] p-5">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">ResumeAI</h2>
                <p className="text-sm text-white/45">KI-Lebenslauf-Editor</p>
              </div>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            {/* Guest Mode Notice */}
            {isGuestMode && (
              <div className="mb-6 rounded-xl border border-amber-400/25 bg-amber-400/[0.07] p-4">
                <h3 className="mb-2 text-sm font-semibold text-amber-200">Gastmodus</h3>
                <p className="mb-3 text-xs text-amber-200/70">You're browsing as a guest. Sign up for full features!</p>
                <Button size="sm" onClick={handleLogin} className="w-full rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 font-semibold text-[#04120c]">
                  Kostenlos registrieren
                </Button>
              </div>
            )}

            <SidebarGroup>
              <SidebarGroupLabel className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Hauptfunktionen
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => {
                    const isRestricted = item.requiresAuth && isGuestMode;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild={!isRestricted}
                          className={`group mb-1.5 rounded-xl text-white/60 transition-all duration-300 hover:bg-white/[0.06] hover:text-white ${
                            location.pathname === item.url ? 'bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-400/25' : ''
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
              <SidebarGroupLabel className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Informationen
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {secondaryItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`group mb-1.5 rounded-xl text-white/60 transition-all duration-300 hover:bg-white/[0.06] hover:text-white ${
                          location.pathname === item.url ? 'bg-sky-400/10 text-sky-200 ring-1 ring-sky-400/25' : ''
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
                <SidebarGroupLabel className="px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                  Schnellstatistik
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-3 py-2 space-y-2">
                    <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm">
                      <FileText className="h-4 w-4 text-emerald-400" />
                      <span className="text-white/55">Lebensläufe</span>
                      <span className="ml-auto font-semibold text-white">3</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm">
                      <Target className="h-4 w-4 text-sky-400" />
                      <span className="text-white/55">Ø ATS-Wert</span>
                      <span className="ml-auto font-semibold text-emerald-300">94%</span>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter className="border-t border-white/[0.06] p-4">
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
                        fallbackClassName="bg-emerald-400/15 text-emerald-200"
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <p className="truncate text-sm font-semibold text-white">{currentUser.full_name}</p>
                        <p className="truncate text-xs text-white/45">{currentUser.email}</p>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>Mein Konto</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl("Profile")}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Einstellungen
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Abmelden
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-y-2">
                <Button onClick={handleLogin} className="w-full rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 font-semibold text-[#04120c]">
                  Anmelden
                </Button>
                <p className="text-center text-xs text-white/40">
                  Schließe dich Tausenden an!
                </p>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="border-b border-white/[0.06] bg-[#070b09]/85 px-5 py-4 backdrop-blur-xl md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="rounded-xl p-2 text-white/70 transition-colors duration-300 hover:bg-white/[0.06] hover:text-white" />
              <Link to={createPageUrl("Home")} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">ResumeAI</h1>
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