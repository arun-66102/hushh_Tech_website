import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { Image, useToast, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import hushhLogo from "./images/Hushhogo.png";
import DeleteAccountModal from "./DeleteAccountModal";
import { useAuthSession } from "../auth/AuthSessionProvider";
import { PATHS } from "../constants/paths";

// Sub-components
import TickerStrip from "./navbar/TickerStrip";
import NavUserUtilities from "./navbar/NavUserUtilities";
import MobileSideMenu from "./navbar/MobileSideMenu";
import "./navbar/navbar.css";

const WELCOME_TOAST_PENDING_KEY = "showWelcomeToast";
const WELCOME_TOAST_USER_KEY = "showWelcomeToastUserId";

export default function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  const previousUserIdRef = useRef<string | null>(null);
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const isDesktop = isMobile === false;
  const { session, user, signOut } = useAuthSession();

  // Route markers
  const isOnboarding = location.pathname.startsWith('/onboarding');
  const isProfilePage = location.pathname.startsWith('/hushh-user-profile');
  const hideTicker = isOnboarding || isProfilePage;

  useEffect(() => {
    const currentUserId = user?.id ?? null;
    if (previousUserIdRef.current !== currentUserId) {
      setToastShown(false);
      previousUserIdRef.current = currentUserId;
    }
  }, [user?.id]);

  const handleLogout = async () => {
    await signOut();
  };

  // Welcome Toast Logic
  useEffect(() => {
    if (!session || toastShown) return;
    const accountJustDeleted = localStorage.getItem("accountJustDeleted");
    if (accountJustDeleted === "true") {
      localStorage.removeItem("accountJustDeleted");
      setToastShown(true);
      return;
    }
    const shouldShowWelcomeToast = sessionStorage.getItem(WELCOME_TOAST_PENDING_KEY) === "true";
    const pendingToastUserId = sessionStorage.getItem(WELCOME_TOAST_USER_KEY);
    const currentUserId = user?.id ?? null;
    const isPendingForCurrentUser = shouldShowWelcomeToast && (!pendingToastUserId || pendingToastUserId === currentUserId);
    if (!isPendingForCurrentUser) {
      setToastShown(true);
      return;
    }
    toast({
      title: t('common.welcome'),
      description: t('common.signInMessage'),
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    sessionStorage.removeItem(WELCOME_TOAST_PENDING_KEY);
    sessionStorage.removeItem(WELCOME_TOAST_USER_KEY);
    setToastShown(true);
  }, [session, toastShown, toast, t, user?.id]);

  const primaryNavLinks = [
    { path: PATHS.HOME, label: t('nav.home') },
    { path: PATHS.LEADERSHIP, label: t('nav.ourPhilosophy') },
    { path: PATHS.FUND_A, label: t('nav.fundA') },
    { path: PATHS.COMMUNITY, label: t('nav.community') },
    { path: PATHS.KYC_STUDIO, label: t('nav.kycStudio') },
    { path: PATHS.CONTACT, label: t('nav.contact') },
    { path: PATHS.FAQ, label: t('nav.faq') },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed w-full z-[999] top-0">
        <nav className="flex w-full items-center justify-between bg-[#F8F9FA] px-4 lg:px-8 h-16 border-b border-gray-200">
          {/* Brand Lockup */}
          <Link to={PATHS.HOME} className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200/50 shadow-sm shrink-0 overflow-hidden">
              <Image src={hushhLogo} alt="Hushh Logo" className="w-7 h-7 object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[18px] font-bold leading-none tracking-tight text-gray-900">Hushh</h1>
              <span className="text-[13px] text-gray-500 font-medium mt-0.5">Technologies</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {primaryNavLinks.map(({ path, label }) => (
              <button
                key={path}
                onClick={() => handleLinkClick(path)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive(path) ? 'bg-[#2F80ED]/10 text-[#1f6cc7]' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <NavUserUtilities isDesktop={isDesktop} />
            {!isDesktop && (
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-[#2F80ED] text-white active:scale-95 transition-transform shadow-lg shadow-blue-500/30 hover:bg-blue-600"
                aria-label="Toggle menu"
              >
                <FiMenu className="w-5 h-5" />
              </button>
            )}
          </div>
        </nav>

        <TickerStrip isVisible={!hideTicker} />
      </header>

      <div className={hideTicker ? "h-16" : "h-28"} />

      <MobileSideMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        onLinkClick={handleLinkClick}
        onDeleteAccount={() => {
          setIsOpen(false);
          onDeleteModalOpen();
        }}
        isActive={isActive}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onAccountDeleted={() => {
          setToastShown(true);
          setIsOpen(false);
          onDeleteModalClose();
          setTimeout(() => navigate(PATHS.HOME), 100);
        }}
      />
    </>
  );
}
