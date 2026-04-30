import React from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  VStack,
  Badge,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";

// Cookie category metadata for the visual summary cards
const cookieCategories = [
  {
    label: "Essential",
    color: "green",
    description:
      "Required for the site to function. Cannot be disabled. Examples: Supabase session tokens, CSRF protection cookies.",
    examples: ["supabase-auth-token", "sb-access-token", "sb-refresh-token"],
  },
  {
    label: "Analytics",
    color: "blue",
    description:
      "Help us understand how visitors interact with the website. Data is aggregated and anonymous.",
    examples: ["_ga", "_gid", "_gat (Google Analytics)"],
  },
  {
    label: "Functional",
    color: "purple",
    description:
      "Enable enhanced features such as language preferences and personalised UI state.",
    examples: ["i18n-locale", "theme-preference", "hushhid-session"],
  },
  {
    label: "Financial",
    color: "orange",
    description:
      "Set by Plaid during bank-account linking flows. Required for Open Banking integrations.",
    examples: ["plaid-link-token", "plaid-session"],
  },
];

const CookiePolicyPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <Box textAlign="center" mt={{ md: "5rem", base: "2rem" }} mb={10}>
        <Heading
          as="h1"
          size="2xl"
          fontWeight="500"
          className="blue-gradient-text"
          my={{ md: "5rem", base: "2rem" }}
        >
          Cookie Policy
        </Heading>
        <Text color="gray.500" fontSize="sm">
          Last Updated: April 30, 2025
        </Text>
      </Box>

      <Container maxW="container.lg" py={10} px={4}>
        <VStack spacing={8} align="stretch">

          {/* Overview */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Overview
            </Heading>
            <Text mb={4}>
              Hushh Technologies LLC ("Hushh", "we", "our", or "us") uses
              cookies and similar tracking technologies on{" "}
              <strong>hushh-tech.vercel.app</strong> and related Hushh product
              surfaces. This Cookie Policy explains what cookies are, which ones
              we use, why we use them, and how you can manage your preferences.
            </Text>
            <Text>
              By continuing to use our website you consent to our use of cookies
              in accordance with this policy. If you do not agree, please
              configure your browser to block cookies or discontinue use of our
              services.
            </Text>
          </Box>
          <Divider />

          {/* What Are Cookies */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              What Are Cookies?
            </Heading>
            <Text mb={4}>
              Cookies are small text files placed on your device (computer,
              tablet, or mobile) by a website you visit. They are widely used to
              make websites work, or work more efficiently, and to provide
              reporting information to website owners.
            </Text>
            <Text>
              We also use <strong>localStorage</strong> and{" "}
              <strong>sessionStorage</strong> — web browser storage mechanisms
              that behave similarly to cookies but are not transmitted to our
              servers. They are used for client-side state management.
            </Text>
          </Box>
          <Divider />

          {/* Cookie Categories Summary Cards */}
          <Box>
            <Heading as="h2" size="lg" mb={6}>
              Types of Cookies We Use
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {cookieCategories.map((cat) => (
                <Box
                  key={cat.label}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={5}
                  borderColor={`${cat.color}.200`}
                  bg={`${cat.color}.50`}
                  _dark={{ bg: `${cat.color}.900`, borderColor: `${cat.color}.700` }}
                >
                  <Badge colorScheme={cat.color} mb={2} fontSize="0.85em">
                    {cat.label}
                  </Badge>
                  <Text fontSize="sm" mb={3}>
                    {cat.description}
                  </Text>
                  <Text fontSize="xs" color="gray.500" fontFamily="mono">
                    {cat.examples.join(", ")}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
          <Divider />

          {/* Essential Cookies */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              1. Essential / Strictly Necessary Cookies
            </Heading>
            <Text mb={3}>
              These cookies are essential for you to browse the website and use
              its features, such as accessing secure areas. Without these
              cookies, services like user authentication cannot be provided.
            </Text>
            <Box pl={4}>
              <Text>
                <strong>Provider:</strong> Supabase (authentication layer)
              </Text>
              <Text>
                <strong>Purpose:</strong> Maintain your login session, refresh
                access tokens securely, and prevent cross-site request forgery
                (CSRF).
              </Text>
              <Text>
                <strong>Retention:</strong> Session-based or up to 7 days
                (refresh token).
              </Text>
              <Text>
                <strong>Can be disabled?</strong> No — the site will not
                function correctly without these cookies.
              </Text>
            </Box>
          </Box>
          <Divider />

          {/* Analytics Cookies */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              2. Analytics Cookies
            </Heading>
            <Text mb={3}>
              We use Google Analytics to collect information about how visitors
              use our site. We use the information to compile reports and to help
              us improve the site. The cookies collect information in an
              anonymous form.
            </Text>
            <Box pl={4}>
              <Text>
                <strong>Provider:</strong> Google Analytics (Google LLC)
              </Text>
              <Text>
                <strong>Cookies set:</strong> <code>_ga</code>,{" "}
                <code>_gid</code>, <code>_gat</code>
              </Text>
              <Text>
                <strong>Purpose:</strong> Distinguish users, throttle request
                rate, track page views and session duration.
              </Text>
              <Text>
                <strong>Retention:</strong> Up to 2 years (<code>_ga</code>),
                24 hours (<code>_gid</code>).
              </Text>
              <Text>
                <strong>Can be disabled?</strong> Yes — via your browser
                settings or the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  Google Analytics opt-out browser add-on
                </a>
                .
              </Text>
            </Box>
          </Box>
          <Divider />

          {/* Functional Cookies */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              3. Functional Cookies
            </Heading>
            <Text mb={3}>
              These cookies allow the website to remember choices you make (such
              as your preferred language or region) and provide enhanced, more
              personal features.
            </Text>
            <Box pl={4}>
              <Text>
                <strong>Examples:</strong> Theme preferences, locale/language
                selection (i18n), last-visited onboarding step.
              </Text>
              <Text>
                <strong>Retention:</strong> Up to 30 days or until cleared by
                the user.
              </Text>
              <Text>
                <strong>Can be disabled?</strong> Yes — however, some
                personalisation features will no longer work as expected.
              </Text>
            </Box>
          </Box>
          <Divider />

          {/* Financial Cookies */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              4. Financial Integration Cookies (Plaid)
            </Heading>
            <Text mb={3}>
              When you connect a bank account using our Open Banking integration,
              Plaid (our financial data partner) may set cookies and tokens to
              facilitate the secure link flow and maintain the active connection.
            </Text>
            <Box pl={4}>
              <Text>
                <strong>Provider:</strong> Plaid Inc.
              </Text>
              <Text>
                <strong>Purpose:</strong> Authenticate and maintain a secure
                session with your financial institution during account linking.
              </Text>
              <Text>
                <strong>Retention:</strong> Session-based; cleared upon
                completion or cancellation of the flow.
              </Text>
              <Text>
                <strong>Can be disabled?</strong> No — blocking these cookies
                will prevent bank account linking from functioning.
              </Text>
            </Box>
          </Box>
          <Divider />

          {/* Third-Party Cookies */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Third-Party Cookies
            </Heading>
            <Text mb={3}>
              Some pages on our site may include embedded content from third
              parties (e.g., videos, maps, social media widgets). These
              third-party services may set cookies on your device. We do not
              control these cookies — please review the respective third-party
              privacy and cookie policies:
            </Text>
            <Box pl={4}>
              <Text>
                •{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  Google Privacy Policy
                </a>
              </Text>
              <Text>
                •{" "}
                <a
                  href="https://plaid.com/legal/#privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  Plaid Privacy Policy
                </a>
              </Text>
              <Text>
                •{" "}
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  Supabase Privacy Policy
                </a>
              </Text>
            </Box>
          </Box>
          <Divider />

          {/* Managing Cookies */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              How to Manage Cookies
            </Heading>
            <Text mb={3}>
              You can control and/or delete cookies as you wish. You can delete
              all cookies that are already on your computer and you can set most
              browsers to prevent cookies from being placed. If you do this,
              however, you may have to manually adjust some preferences every
              time you visit a site and some services and functionalities may not
              work.
            </Text>
            <Text mb={3}>
              To manage cookies in your browser, refer to the following guides:
            </Text>
            <Box pl={4}>
              <Text>
                •{" "}
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  Google Chrome
                </a>
              </Text>
              <Text>
                •{" "}
                <a
                  href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  Mozilla Firefox
                </a>
              </Text>
              <Text>
                •{" "}
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-sfri11471"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  Apple Safari
                </a>
              </Text>
              <Text>
                •{" "}
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  Microsoft Edge
                </a>
              </Text>
            </Box>
          </Box>
          <Divider />

          {/* GDPR / CCPA Rights */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Your Rights Under GDPR &amp; CCPA
            </Heading>
            <Text mb={3}>
              Depending on your jurisdiction, you may have the following rights
              with respect to cookie-related data:
            </Text>
            <Box pl={4}>
              <Text>
                • <strong>Right to Know:</strong> You may request information
                about the categories of personal data we collect and how we use
                it.
              </Text>
              <Text>
                • <strong>Right to Delete:</strong> You may request deletion of
                personal data we have collected from you, subject to certain
                exceptions.
              </Text>
              <Text>
                • <strong>Right to Opt-Out:</strong> You may opt out of the sale
                or sharing of your personal data. We do not sell personal data
                collected via cookies.
              </Text>
              <Text>
                • <strong>Right to Non-Discrimination:</strong> We will not
                discriminate against you for exercising any of these rights.
              </Text>
            </Box>
          </Box>
          <Divider />

          {/* Changes to Policy */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Changes to This Policy
            </Heading>
            <Text>
              We may update this Cookie Policy from time to time to reflect
              changes in technology, regulation, or our business practices. Any
              changes will be posted on this page with an updated "Last Updated"
              date. We encourage you to review this page periodically.
            </Text>
          </Box>
          <Divider />

          {/* Contact */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Contact Us
            </Heading>
            <Text mb={3}>
              If you have any questions about this Cookie Policy or our data
              practices, please contact us at:
            </Text>
            <Box pl={4}>
              <Text>
                <strong>Hushh Technologies LLC</strong>
              </Text>
              <Text>1021 5th St W, Kirkland, WA 98033</Text>
              <Text>
                Email:{" "}
                <a
                  href="mailto:privacy@hushh.ai"
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  privacy@hushh.ai
                </a>
              </Text>
              <Text>Phone: (888) 462-1726</Text>
            </Box>
          </Box>
          <Divider />

          {/* Footer note */}
          <Box textAlign="center">
            <Text fontSize="sm" color="gray.500">
              Last Updated: April 30, 2025 · Hushh Technologies LLC
            </Text>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default CookiePolicyPage;
