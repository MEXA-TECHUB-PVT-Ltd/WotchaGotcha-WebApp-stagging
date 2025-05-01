import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-6 md:p-12 font-sans text-gray-800 space-y-6">
      <h1 className="text-3xl font-bold text-black">Privacy Policy</h1>

      <p>
        WotchGotcha ("we", "our", or "us") respects your privacy and is
        committed to protecting the personal information you provide through our
        platform. This Privacy Policy explains how we collect, use, disclose,
        and safeguard your information when you use our web application.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          1. Information We Collect
        </h2>

        <div>
          <h3 className="text-xl font-semibold text-black mt-4">
            a. Personal Information
          </h3>
          <p>
            We may collect personal details you provide directly, including:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Name, email address, phone number, and address</li>
            <li>
              Uploaded profile images, signatures, and content (e.g., videos,
              photos, open letters)
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-black mt-4">
            b. Usage Data
          </h3>
          <p>Automatically collected information may include:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>IP address, browser type, device type</li>
            <li>Pages visited, access time, referring websites</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-black mt-4">
            c. Content Data
          </h3>
          <p>Information you upload or submit including:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Videos, images, comments, likes, open letters</li>
            <li>Categories and tags associated with your content</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>To create and manage user accounts</li>
          <li>To personalize user experience and content display</li>
          <li>
            To enable user-generated content sharing, liking, and commenting
          </li>
          <li>To improve our platform’s functionality and performance</li>
          <li>
            To communicate with you regarding updates, support, and changes
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          3. Sharing Your Information
        </h2>
        <p>
          We do not sell or rent your personal information. However, we may
          share your data with:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Service providers assisting in operations and analytics</li>
          <li>Legal authorities, if required by law</li>
          <li>Other users, only to the extent you publicly share content</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">4. Data Security</h2>
        <p>We take reasonable steps to protect your information using:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Secure servers and encrypted transmissions</li>
          <li>Regular security audits and restricted access</li>
        </ul>
        <p className="mt-2">
          However, no method of transmission is 100% secure, and we cannot
          guarantee absolute security.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">5. User Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Access and review your personal data</li>
          <li>Update or delete your account information</li>
          <li>Request the removal of any uploaded content</li>
          <li>Opt-out of marketing or notification emails</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          6. Cookies and Tracking
        </h2>
        <p>We may use cookies or similar technologies to:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Enhance user experience</li>
          <li>Analyze usage patterns</li>
          <li>Remember user preferences</li>
        </ul>
        <p className="mt-2">
          You may disable cookies through your browser settings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          7. Children’s Privacy
        </h2>
        <p>
          Our platform is not intended for users under the age of 13. We do not
          knowingly collect personal information from children.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          8. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy at any time. Changes will be
          notified via:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Email (if registered)</li>
          <li>Notification on the platform</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">9. Contact Us</h2>
        <p>For any questions regarding this Privacy Policy, please contact:</p>
        <p>
          <span className="font-semibold">Email:</span> support@wotchgotcha.com
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
