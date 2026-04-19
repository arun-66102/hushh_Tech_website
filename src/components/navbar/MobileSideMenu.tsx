import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import { useAuthSession } from "../../auth/AuthSessionProvider";
import config from "../../resources/config/config";
import { PATHS } from "../../constants/paths";

interface MobileSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLinkClick: (path: string) => void;
  onDeleteAccount: () => void;
  isActive: (path: string) => boolean;
}

const MobileSideMenu = ({ isOpen, onClose, onLinkClick, onDeleteAccount, isActive }: MobileSideMenuProps) => {
  const { t } = useTranslation();
  const { user, status, signOut } = useAuthSession();
  const [hushhCoins, setHushhCoins] = useState<number | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  
  const isAuthenticated = status === "authenticated";

  // Fetch Hushh Coins balance when authenticated
  useEffect(() => {
    if (!user?.id || !config.supabaseClient) { setHushhCoins(null); return; }
    const fetchCoins = async () => {
      try {
        const { data } = await config.supabaseClient!
          .from('ceo_meeting_payments')
          .select('hushh_coins_awarded')
          .eq('user_id', user.id)
          .maybeSingle();
        setHushhCoins(data?.hushh_coins_awarded ?? 0);
      } catch { setHushhCoins(0); }
    };
    fetchCoins();
  }, [user?.id]);

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  // Handle scroll check for indicator
  const handleMenuScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 50;
    setShowScrollIndicator(!isNearBottom);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] transition-opacity duration-300"
      style={{ background: "rgba(0, 0, 0, 0.25)" }}
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        className="fixed inset-0 bg-[#F2F2F7] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onScroll={handleMenuScroll}
      >
        <div className="flex flex-col min-h-full max-w-md mx-auto w-full px-4 pb-10">
          {/* Header: Menu title + Close button */}
          <div className="flex items-center justify-between pt-14 pb-4 px-0">
            <h2 className="text-[34px] font-bold text-black tracking-tight leading-none">
              {t('nav.menu', 'Menu')}
            </h2>
            <button
              onClick={onClose}
              className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#E3E3E8] text-[#8E8E93] active:bg-[#D1D1D6] transition-colors"
              aria-label="Close menu"
            >
              <FiX size={18} strokeWidth={3} />
            </button>
          </div>

          {/* Section 1: Primary Navigation */}
          <div className="bg-white rounded-[10px] overflow-hidden mb-5 shadow-sm">
            {[
              { path: PATHS.HOME, label: t('nav.home'), icon: "home", bg: "#007AFF" },
              { path: PATHS.LEADERSHIP, label: t('nav.ourPhilosophy'), icon: "menu_book", bg: "#34C759" },
              { path: PATHS.FUND_A, label: t('nav.fundA'), icon: "pie_chart", bg: "#5856D6" },
              { path: PATHS.COMMUNITY, label: t('nav.community'), icon: "groups", bg: "#FF9500" },
              { path: PATHS.KYC_STUDIO, label: t('nav.kycStudio'), icon: "verified_user", bg: "#FF2D55" },
            ].map(({ path, label, icon, bg }, idx, arr) => (
              <button
                key={path}
                onClick={() => onLinkClick(path)}
                className="flex items-center w-full min-h-[44px] py-2.5 pr-4 pl-4 active:bg-[#E5E5EA] transition-colors relative"
              >
                <div
                  className="w-[29px] h-[29px] rounded-[7px] flex items-center justify-center mr-3 shrink-0"
                  style={{ backgroundColor: bg }}
                >
                  <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>{icon}</span>
                </div>
                <span className={`text-[17px] flex-grow text-left leading-none ${isActive(path) ? 'font-semibold text-[#007AFF]' : 'text-black'}`}>
                  {label}
                </span>
                <svg className="w-[7px] h-[12px] text-[#C7C7CC] shrink-0" viewBox="0 0 7 12" fill="none">
                  <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {idx < arr.length - 1 && (
                  <div className="absolute bottom-0 right-0 h-[0.5px] bg-[#C6C6C8]" style={{ width: 'calc(100% - 56px)', marginLeft: '56px' }} />
                )}
              </button>
            ))}
          </div>

          {/* Section 2: Contact & FAQ */}
          <div className="bg-white rounded-[10px] overflow-hidden mb-5 shadow-sm">
            {[
              { path: PATHS.CONTACT, label: t('nav.contact'), icon: "mail", bg: "#8E8E93" },
              { path: PATHS.FAQ, label: t('nav.faq'), icon: "help", bg: "#FF9500" },
            ].map(({ path, label, icon, bg }, idx, arr) => (
              <button
                key={path}
                onClick={() => onLinkClick(path)}
                className="flex items-center w-full min-h-[44px] py-2.5 pr-4 pl-4 active:bg-[#E5E5EA] transition-colors relative"
              >
                <div
                  className="w-[29px] h-[29px] rounded-[7px] flex items-center justify-center mr-3 shrink-0"
                  style={{ backgroundColor: bg }}
                >
                  <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>{icon}</span>
                </div>
                <span className={`text-[17px] flex-grow text-left leading-none ${isActive(path) ? 'font-semibold text-[#007AFF]' : 'text-black'}`}>
                  {label}
                </span>
                <svg className="w-[7px] h-[12px] text-[#C7C7CC] shrink-0" viewBox="0 0 7 12" fill="none">
                  <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {idx < arr.length - 1 && (
                  <div className="absolute bottom-0 right-0 h-[0.5px] bg-[#C6C6C8]" style={{ width: 'calc(100% - 56px)', marginLeft: '56px' }} />
                )}
              </button>
            ))}
          </div>

          {/* Section 3: Hushh Coins */}
          {isAuthenticated && hushhCoins !== null && hushhCoins === 0 && (
            <div className="bg-white rounded-[10px] overflow-hidden mb-5 shadow-sm">
              <button
                onClick={() => onLinkClick(PATHS.MEET_CEO)}
                className="flex items-center w-full min-h-[52px] py-3 pr-4 pl-4 active:bg-[#E5E5EA] transition-colors"
              >
                <div className="w-[29px] h-[29px] rounded-[7px] bg-[#FF9F0A] flex items-center justify-center mr-3 shrink-0">
                  <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>lock</span>
                </div>
                <div className="flex flex-col flex-grow text-left">
                  <span className="text-[17px] text-black font-medium leading-tight">Unlock 300K Coins</span>
                  <span className="text-[13px] text-[#8E8E93] leading-tight mt-0.5">$1 or use coupon code</span>
                </div>
                <svg className="w-[7px] h-[12px] text-[#C7C7CC] shrink-0" viewBox="0 0 7 12" fill="none">
                  <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
          {isAuthenticated && hushhCoins !== null && hushhCoins > 0 && (
            <div className="rounded-[10px] overflow-hidden mb-5 shadow-sm">
              <div className="bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] p-4 rounded-t-[10px]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-[29px] h-[29px] rounded-[7px] bg-[#FF9F0A] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>monetization_on</span>
                    </div>
                    <span className="text-[15px] font-semibold text-white/90">Hushh Coins</span>
                  </div>
                  <span className="text-[11px] text-white/40 font-medium">HC</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold text-white leading-none tracking-tight">
                    {hushhCoins.toLocaleString()}
                  </span>
                  <span className="text-[13px] text-white/50 font-medium">coins</span>
                </div>
                <p className="text-[12px] text-white/40 mt-1.5">≈ ${(hushhCoins / 100).toLocaleString()} value</p>
              </div>
              <div className="bg-white rounded-b-[10px]">
                <button
                  onClick={() => onLinkClick(PATHS.MEET_CEO)}
                  className="flex items-center w-full min-h-[44px] py-2.5 pr-4 pl-4 active:bg-[#E5E5EA] transition-colors relative"
                >
                  <div className="w-[29px] h-[29px] rounded-[7px] bg-[#34C759] flex items-center justify-center mr-3 shrink-0">
                    <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>calendar_month</span>
                  </div>
                  <span className="text-[17px] text-black flex-grow text-left leading-none">Book Consultation</span>
                  <svg className="w-[7px] h-[12px] text-[#C7C7CC] shrink-0" viewBox="0 0 7 12" fill="none">
                    <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="absolute bottom-0 right-0 h-[0.5px] bg-[#C6C6C8]" style={{ width: 'calc(100% - 56px)', marginLeft: '56px' }} />
                </button>
                <button
                  onClick={() => onLinkClick(PATHS.HUSHH_USER_PROFILE)}
                  className="flex items-center w-full min-h-[44px] py-2.5 pr-4 pl-4 active:bg-[#E5E5EA] transition-colors"
                >
                  <div className="w-[29px] h-[29px] rounded-[7px] bg-[#5856D6] flex items-center justify-center mr-3 shrink-0">
                    <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>receipt_long</span>
                  </div>
                  <span className="text-[17px] text-black flex-grow text-left leading-none">Transaction History</span>
                  <svg className="w-[7px] h-[12px] text-[#C7C7CC] shrink-0" viewBox="0 0 7 12" fill="none">
                    <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Section 4: Profile & Account */}
          {isAuthenticated && (
            <div className="bg-white rounded-[10px] overflow-hidden mb-5 shadow-sm">
              <button
                onClick={() => onLinkClick(PATHS.HUSHH_USER_PROFILE)}
                className="flex items-center w-full min-h-[44px] py-2.5 pr-4 pl-4 active:bg-[#E5E5EA] transition-colors relative"
              >
                <div className="w-[29px] h-[29px] rounded-[7px] bg-[#007AFF] flex items-center justify-center mr-3 shrink-0">
                  <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>person</span>
                </div>
                <span className="text-[17px] text-black flex-grow text-left leading-none">
                  {t('nav.viewProfile')}
                </span>
                <svg className="w-[7px] h-[12px] text-[#C7C7CC] shrink-0" viewBox="0 0 7 12" fill="none">
                  <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="absolute bottom-0 right-0 h-[0.5px] bg-[#C6C6C8]" style={{ width: 'calc(100% - 56px)', marginLeft: '56px' }} />
              </button>
              <button
                onClick={onDeleteAccount}
                className="flex items-center w-full min-h-[44px] py-2.5 pr-4 pl-4 active:bg-[#E5E5EA] transition-colors"
              >
                <span className="text-[17px] text-[#FF3B30] flex-grow text-left leading-none pl-0">
                  {t('nav.deleteAccount')}
                </span>
              </button>
            </div>
          )}

          <div className="flex-grow" />

          {/* Log Out / Login Button */}
          <div className="mt-auto pt-2 pb-6 flex flex-col items-center">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full h-[50px] rounded-[12px] bg-white text-[#007AFF] font-semibold text-[17px] active:scale-[0.98] active:opacity-90 transition-all flex items-center justify-center shadow-sm"
              >
                {t('nav.logout')}
              </button>
            ) : (
              <button
                onClick={() => onLinkClick(PATHS.LOGIN)}
                className="w-full h-[50px] rounded-[12px] bg-[#007AFF] text-white font-semibold text-[17px] active:scale-[0.98] active:opacity-90 transition-all flex items-center justify-center shadow-sm"
              >
                {t('nav.login')}
              </button>
            )}
            <p className="text-center text-[13px] text-[#8E8E93] font-normal mt-4">
              Version 2.4.0 (Build 302)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSideMenu;
