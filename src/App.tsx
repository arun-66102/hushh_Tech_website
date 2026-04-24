import React, { Suspense, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate, matchPath } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

// Providers and Global Components
import theme from './theme';
import { AuthSessionProvider, useAuthSession } from './auth/AuthSessionProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import GoogleAnalyticsRouteTracker from './components/GoogleAnalyticsRouteTracker';
import ScrollToTop from './components/ScrollToTop';
import OnboardingShellAutoPadding from './components/OnboardingShellAutoPadding';
import GlobalNDAGate from './components/GlobalNDAGate';
import AuthRequiredRoute from './components/AuthRequiredRoute';
import ProtectedRoute from './components/ProtectedRoute';
import NDARequestModalComponent from './components/NDARequestModal';

// Routing Config
import { ROUTES, RouteConfig } from './routes/route-config';
import { PATHS } from './constants/paths';

/**
 * Hook to find current route metadata based on location
 */
const useCurrentRoute = () => {
  const { pathname } = useLocation();
  return useMemo(() => {
    return ROUTES.find(route => 
      matchPath({ path: route.path, end: true }, pathname) || 
      (route.path.endsWith('/*') && matchPath({ path: route.path }, pathname))
    );
  }, [pathname]);
};

/**
 * Content wrapper that applies conditional top margin based on route metadata
 */
const ContentWrapper = ({ children }: { children: ReactNode }) => {
  const currentRoute = useCurrentRoute();
  const noMargin = currentRoute?.noMargin || false;

  return (
    <div className={noMargin ? '' : 'mt-20'}>
      {children}
    </div>
  );
};

/**
 * Determines layout component visibility based on route metadata
 */
const useLayoutVisibility = () => {
  const currentRoute = useCurrentRoute();
  const hideLayout = currentRoute?.hideLayout || false;

  return {
    showNavbar: !hideLayout,
    showFooter: !hideLayout,
    showMobileNav: !hideLayout,
  };
};

/**
 * Default Loading Fallback for Suspense
 */
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white/50 backdrop-blur-sm">
    <div className="w-12 h-12 border-4 border-[#2F80ED] border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const AppLayout = () => {
    const { showNavbar, showFooter, showMobileNav } = useLayoutVisibility();
    const { session } = useAuthSession();
    const navigate = useNavigate();
    
    return (
      <div className="min-h-screen flex flex-col">
        {showNavbar && <Navbar />}
        <ContentWrapper>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {ROUTES.map((route: RouteConfig) => {
                let element = <route.component />;

                // Wrap in protection if needed
                if (route.isProtected) {
                  element = <ProtectedRoute>{element}</ProtectedRoute>;
                } else if (route.isAuthRequired) {
                  element = <AuthRequiredRoute>{element}</AuthRequiredRoute>;
                }

                return (
                  <Route 
                    key={route.path} 
                    path={route.path} 
                    element={element}
                  />
                );
              })}

              {/* Special Case: NDA Form with props */}
              <Route path={PATHS.NDA_FORM} element={
                <AuthRequiredRoute>
                  <NDARequestModalComponent
                    session={session}
                    onSubmit={(result: string) => {
                      if (["Approved", "Pending", "Requested permission"].includes(result)) {
                        navigate(PATHS.HOME);
                      }
                    }}
                  />
                </AuthRequiredRoute>
              } />

              {/* Fallback & Redirects */}
              <Route path="/metric" element={<Navigate to={PATHS.METRICS} replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ContentWrapper>
        {showFooter && <Footer />}
        {showMobileNav && <MobileBottomNav />}
      </div>
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <AuthSessionProvider>
        <Router>
          <GoogleAnalyticsRouteTracker />
          <ScrollToTop />
          <OnboardingShellAutoPadding />
          <GlobalNDAGate>
            <AppLayout />
          </GlobalNDAGate>
        </Router>
      </AuthSessionProvider>
    </ChakraProvider>
  );
}

export default App;
