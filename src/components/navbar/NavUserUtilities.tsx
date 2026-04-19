import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthSession } from "../../auth/AuthSessionProvider";
import LanguageSwitcher from "../LanguageSwitcher";
import { PATHS } from "../../constants/paths";

interface NavUserUtilitiesProps {
  isDesktop: boolean;
}

const NavUserUtilities = ({ isDesktop }: NavUserUtilitiesProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { status, signOut } = useAuthSession();
  const isAuthenticated = status === "authenticated";

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex items-center gap-3">
      {/* Language Selector */}
      <LanguageSwitcher variant="light" />

      {/* Desktop Utility Actions */}
      {isDesktop && (
        <>
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate(PATHS.HUSHH_USER_PROFILE)}
                className="hidden xl:inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {t('nav.viewProfile')}
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-full bg-[#2F80ED] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f6cc7] transition-colors"
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate(PATHS.LOGIN)}
              className="inline-flex items-center justify-center rounded-full bg-[#2F80ED] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f6cc7] transition-colors"
            >
              {t('nav.login')}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default NavUserUtilities;
