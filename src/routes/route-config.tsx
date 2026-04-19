import React, { lazy } from 'react';
import { PATHS } from '../constants/paths';

export type RouteConfig = {
  path: string;
  component: React.LazyExoticComponent<any> | React.ComponentType<any>;
  isProtected?: boolean;
  isAuthRequired?: boolean; // AuthRequiredRoute vs ProtectedRoute logic in original code
  hideLayout?: boolean; // Hides Navbar, Footer, and MobileNav
  noMargin?: boolean; // Removes 'mt-20' from ContentWrapper
};

// Lazy loaded components
const HomePage = lazy(() => import('../pages/home/ui'));
const Leadership = lazy(() => import('../components/Leadership'));
const Philosophy = lazy(() => import('../components/Philosophy'));
const LoginPage = lazy(() => import('../pages/login/ui'));
const SignupPage = lazy(() => import('../pages/signup/ui'));
const Contact = lazy(() => import('../pages/Contact'));
const BenefitsPage = lazy(() => import('../pages/benefits'));
const Consumers = lazy(() => import('../pages/services/consumers'));
const Business = lazy(() => import('../pages/services/business'));
const Faq = lazy(() => import('../pages/faq'));
const Career = lazy(() => import('../pages/career'));
const CommunityPage = lazy(() => import('../pages/community/ui'));
const CommunityPostPage = lazy(() => import('../pages/community/post-ui'));
const ReportDetailPage = lazy(() => import('../pages/reports/reportDetail'));
const PrivacyPolicy = lazy(() => import('../pages/privacy-policy'));
const CareersPrivacyPolicy = lazy(() => import('../pages/career-privacy-policy'));
const CaliforniaPrivacyPolicy = lazy(() => import('../pages/california-privacy-policy'));
const EUUKPrivacyPolicy = lazy(() => import('../pages/eu-uk-privacy-policy'));
const DeleteAccountPage = lazy(() => import('../pages/delete-account'));
const Profile = lazy(() => import('../pages/profile'));
const AuthCallback = lazy(() => import('../pages/AuthCallback'));
const InvestorGuidePage = lazy(() => import('../pages/onboarding/InvestorGuide'));
const FinancialLinkPage = lazy(() => import('../pages/onboarding/financial-link/ui'));
const OnboardingStep1 = lazy(() => import('../pages/onboarding/step-1/ui'));
const OnboardingStep2 = lazy(() => import('../pages/onboarding/step-2/ui'));
const OnboardingStep3 = lazy(() => import('../pages/onboarding/step-3/ui'));
const OnboardingStep4 = lazy(() => import('../pages/onboarding/step-4/ui'));
const OnboardingStep5 = lazy(() => import('../pages/onboarding/step-5/ui'));
const OnboardingStep6 = lazy(() => import('../pages/onboarding/step-6/ui'));
const OnboardingStep7 = lazy(() => import('../pages/onboarding/step-7/ui'));
const OnboardingReviewStep = lazy(() => import('../pages/onboarding/step-8/ui'));
const OnboardingBankDetailsStep = lazy(() => import('../pages/onboarding/step-9/ui'));
const VerifyIdentityPage = lazy(() => import('../pages/onboarding/verify-identity/ui'));
const VerifyCompletePage = lazy(() => import('../pages/onboarding/verify-complete/ui'));
const MeetCeoPage = lazy(() => import('../pages/onboarding/meet-ceo/ui'));
const HushhUserProfilePage = lazy(() => import('../pages/hushh-user-profile'));
const ViewPreferencesPage = lazy(() => import('../pages/hushh-user-profile/view'));
const PrivacyControlsPage = lazy(() => import('../pages/hushh-user-profile/privacy'));
const PublicHushhProfilePage = lazy(() => import('../pages/hushhid'));
const HushhIDHeroDemo = lazy(() => import('../pages/hushhid-hero-demo'));
const KYCVerificationPage = lazy(() => import('../pages/kyc-verification/page'));
const KYCFormPage = lazy(() => import('../pages/kyc-form/page'));
const DiscoverFundA = lazy(() => import('../pages/discover-fund-a'));
const SellTheWallPage = lazy(() => import('../pages/sell-the-wall'));
const AIPoweredBerkshirePage = lazy(() => import('../pages/ai-powered-berkshire'));
const UserRegistration = lazy(() => import('../pages/UserRegistration'));
const InvestorProfilePage = lazy(() => import('../pages/investor-profile'));
const PublicInvestorProfilePage = lazy(() => import('../pages/investor/PublicInvestorProfile'));
const UserProfilePage = lazy(() => import('../pages/user-profile/page'));
const YourProfilePage = lazy(() => import('../pages/your-profile'));
const KYCDemoPage = lazy(() => import('../pages/kyc-demo'));
const KycFlowPage = lazy(() => import('../pages/kyc-flow'));
const A2APlaygroundPage = lazy(() => import('../pages/a2a-playground'));
const ReceiptGeneratorPage = lazy(() => import('../pages/receipt-generator'));
const DeveloperDocsPage = lazy(() => import('../pages/developer-docs'));
const MetricsPage = lazy(() => import('../pages/metrics'));
const HushhAIPage = lazy(() => import('../hushh-ai/pages'));
const KaiApp = lazy(() => import('../kai/pages'));
const KaiIndiaApp = lazy(() => import('../kai-india/pages'));
const HushhStudioApp = lazy(() => import('../hushh-studio/pages'));
const SignNDAPage = lazy(() => import('../pages/sign-nda'));
const DocumentViewerPage = lazy(() => import('../pages/document-viewer'));
const NDAAdminPage = lazy(() => import('../pages/nda-admin'));

// Note: NDA Form is handled as a component with props in App.tsx, we'll keep it special or handle it.
// For now, let's map the rest.

export const ROUTES: RouteConfig[] = [
  { path: PATHS.HOME, component: HomePage, noMargin: true, hideLayout: true },
  { path: PATHS.LEADERSHIP, component: Leadership },
  { path: PATHS.PHILOSOPHY, component: Philosophy },
  { path: PATHS.LOGIN, component: LoginPage, noMargin: true, hideLayout: true },
  { path: PATHS.SIGNUP, component: SignupPage, noMargin: true, hideLayout: true },
  { path: PATHS.CONTACT, component: Contact },
  { path: PATHS.BENEFITS, component: BenefitsPage },
  { path: PATHS.CONSUMERS, component: Consumers },
  { path: PATHS.BUSINESS, component: Business },
  { path: PATHS.FAQ, component: Faq },
  { path: PATHS.PROFILE, component: Profile, isAuthRequired: true, noMargin: true, hideLayout: true },
  { path: PATHS.CAREER, component: Career },
  { path: PATHS.PRIVACY_POLICY, component: PrivacyPolicy },
  { path: PATHS.CAREER_PRIVACY_POLICY, component: CareersPrivacyPolicy },
  { path: PATHS.COMMUNITY, component: CommunityPage, noMargin: true, hideLayout: true },
  { path: `${PATHS.COMMUNITY}/*`, component: CommunityPostPage, noMargin: true, hideLayout: true },
  { path: PATHS.CALIFORNIA_PRIVACY_POLICY, component: CaliforniaPrivacyPolicy },
  { path: PATHS.EU_UK_PRIVACY_POLICY, component: EUUKPrivacyPolicy },
  { path: PATHS.DELETE_ACCOUNT, component: DeleteAccountPage, isAuthRequired: true, noMargin: true, hideLayout: true },
  { path: PATHS.REPORTS_DETAIL, component: ReportDetailPage },
  { path: PATHS.AUTH_CALLBACK, component: AuthCallback, noMargin: true },
  { path: PATHS.INVESTOR_GUIDE, component: InvestorGuidePage, noMargin: true },
  
  // Onboarding (all noMargin and hideLayout based on App.tsx)
  { path: PATHS.ONBOARDING_FINANCIAL_LINK, component: FinancialLinkPage, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.ONBOARDING_STEP1, component: OnboardingStep1, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.ONBOARDING_STEP2, component: OnboardingStep2, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.ONBOARDING_STEP3, component: OnboardingStep3, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.ONBOARDING_STEP4, component: OnboardingStep4, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.ONBOARDING_STEP5, component: OnboardingStep5, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.ONBOARDING_STEP6, component: OnboardingStep6, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.ONBOARDING_STEP7, component: OnboardingStep7, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.ONBOARDING_REVIEW, component: OnboardingReviewStep, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.ONBOARDING_BANK_DETAILS, component: OnboardingBankDetailsStep, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.ONBOARDING_VERIFY, component: VerifyIdentityPage, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.ONBOARDING_VERIFY_COMPLETE, component: VerifyCompletePage, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.ONBOARDING_MEET_CEO, component: MeetCeoPage, isProtected: true, noMargin: true, hideLayout: true },

  // Hushh User Profile
  { path: PATHS.HUSHH_USER_PROFILE, component: HushhUserProfilePage, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.HUSHH_USER_PROFILE_VIEW, component: ViewPreferencesPage, isProtected: true, noMargin: true, hideLayout: true },
  { path: PATHS.HUSHH_USER_PROFILE_PRIVACY, component: PrivacyControlsPage, isProtected: true, noMargin: true, hideLayout: true },
  { path: '/profile/:id', component: ViewPreferencesPage, isAuthRequired: true },
  { path: '/hushhid/:id', component: PublicHushhProfilePage },
  { path: '/hushhid-hero-demo', component: HushhIDHeroDemo },

  // KYC
  { path: PATHS.KYC_VERIFICATION, component: KYCVerificationPage },
  { path: PATHS.KYC_FORM, component: KYCFormPage },
  { path: PATHS.KYC_DEMO, component: KYCDemoPage, noMargin: true, hideLayout: true },
  { path: PATHS.KYC_FLOW, component: KycFlowPage, noMargin: true, hideLayout: true },
  { path: PATHS.A2A_PLAYGROUND, component: A2APlaygroundPage, noMargin: true, hideLayout: true },

  // Investment
  { path: PATHS.FUND_A, component: DiscoverFundA, noMargin: true, hideLayout: true },
  { path: PATHS.SELL_THE_WALL, component: SellTheWallPage },
  { path: PATHS.AI_POWERED_BERKSHIRE, component: AIPoweredBerkshirePage },
  { path: PATHS.USER_REGISTRATION, component: UserRegistration, isProtected: true, noMargin: true },
  { path: PATHS.INVESTOR_PROFILE, component: InvestorProfilePage, isProtected: true, noMargin: true },
  { path: PATHS.PUBLIC_INVESTOR_PROFILE, component: PublicInvestorProfilePage, noMargin: true, hideLayout: true },
  { path: PATHS.HUSHH_AI, component: HushhAIPage, noMargin: true, hideLayout: true },
  { path: PATHS.HUSHH_AI_LOGIN, component: lazy(() => import('../hushh-ai/presentation/pages').then(m => ({ default: m.LoginPage }))), noMargin: true, hideLayout: true },
  { path: PATHS.HUSHH_AI_SIGNUP, component: lazy(() => import('../hushh-ai/presentation/pages').then(m => ({ default: m.SignupPage }))), noMargin: true, hideLayout: true },
  { path: PATHS.KAI, component: KaiApp, noMargin: true, hideLayout: true },
  { path: PATHS.KAI_INDIA, component: KaiIndiaApp, noMargin: true },
  { path: PATHS.STUDIO, component: HushhStudioApp, noMargin: true, hideLayout: true },
  
  // Profiles (extra ones from App.tsx)
  { path: '/user-profile', component: UserProfilePage, isAuthRequired: true },
  { path: '/your-profile', component: YourProfilePage, isAuthRequired: true },

  // Tools
  { path: PATHS.RECEIPT_GENERATOR, component: ReceiptGeneratorPage },
  { path: PATHS.DEVELOPER_DOCS, component: DeveloperDocsPage },
  { path: PATHS.METRICS, component: MetricsPage, noMargin: true, hideLayout: true },
  { path: '/metric', component: () => <div /> }, // Navigate hander in App.tsx

  // NDA
  { path: PATHS.SIGN_NDA, component: SignNDAPage, noMargin: true, hideLayout: true },
  { path: PATHS.DOCUMENT_VIEWER, component: DocumentViewerPage, noMargin: true, hideLayout: true },
  { path: PATHS.NDA_ADMIN, component: NDAAdminPage },
];
