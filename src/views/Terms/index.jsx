import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="p-6 md:p-12 font-sans text-gray-800 space-y-6">
      <h1 className="text-3xl font-bold text-black">Terms and Conditions</h1>

      <p>
        Welcome to <span className="font-semibold">WotchGotcha</span>. These
        Terms and Conditions ("Terms") govern your use of our website and
        services. By accessing or using WotchGotcha, you agree to be bound by
        these Terms.
      </p>
      <p>
        If you do not agree with these Terms, please do not use the platform.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">1. Eligibility</h2>
        <p>
          You must be at least 13 years old to use WotchGotcha. By using the
          platform, you confirm that you meet the eligibility requirements.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">2. User Accounts</h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </li>
          <li>
            You agree to provide accurate and complete information during
            registration.
          </li>
          <li>
            You are solely responsible for any activity that occurs under your
            account.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">3. User Content</h2>
        <p>
          You may upload videos, images, open letters, comments, and other
          content ("User Content") under the following conditions:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>You own or have rights to the content you upload.</li>
          <li>
            Your content must not contain illegal, harmful, or offensive
            material.
          </li>
          <li>
            WotchGotcha has the right to remove or restrict any content that
            violates these terms.
          </li>
        </ul>
        <p className="mt-2">
          By submitting content, you grant WotchGotcha a non-exclusive,
          royalty-free license to use, display, and distribute your content
          within the platform.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          4. Prohibited Activities
        </h2>
        <p>While using WotchGotcha, you agree not to:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Violate any applicable laws or regulations</li>
          <li>Impersonate another person or entity</li>
          <li>Upload viruses, malware, or other harmful code</li>
          <li>Harass, threaten, or abuse other users</li>
          <li>Use bots, scrapers, or similar tools for data extraction</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">5. Privacy</h2>
        <p>
          Your use of the platform is also governed by our{" "}
          <a href="#" className="text-blue-600 underline">
            Privacy Policy
          </a>
          , which outlines how we collect, use, and safeguard your data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          6. Intellectual Property
        </h2>
        <p>
          All content, features, and functionality on WotchGotcha (excluding
          user content) are owned by us or our licensors and protected by
          copyright and trademark laws.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">7. Termination</h2>
        <p>
          We may suspend or terminate your account at any time for violations of
          these Terms or any applicable laws, with or without prior notice.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          8. Limitation of Liability
        </h2>
        <p>
          WotchGotcha is provided "as-is" and "as-available." We are not liable
          for any damages resulting from:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Your use or inability to use the platform</li>
          <li>Content posted by users or third parties</li>
          <li>Any technical issues or errors on the platform</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          9. Modifications to the Terms
        </h2>
        <p>
          We may update these Terms periodically. Continued use of the platform
          after changes implies your acceptance of the updated Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          10. Governing Law
        </h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of [Insert Country/State].
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">11. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact:</p>
        <p>
          <span className="font-semibold">Email:</span> support@wotchgotcha.com
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
