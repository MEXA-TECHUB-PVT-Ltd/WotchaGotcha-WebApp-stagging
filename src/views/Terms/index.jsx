import React from "react";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6 md:p-12 font-sans text-gray-800 space-y-6">
      <h1 className="text-3xl font-bold text-black">
        {t("termsAndConditions")}
      </h1>

      <p>
        {t("welcomeText")}{" "}
        <span className="font-semibold">{t("platformName")}</span>.{" "}
        {t("termsIntro")}
      </p>
      <p>{t("termsDisagree")}</p>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section1Title")}
        </h2>
        <p>{t("section1Content")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section2Title")}
        </h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          {t("section2List", { returnObjects: true }).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section3Title")}
        </h2>
        <p>{t("section3Intro")}</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          {t("section3List", { returnObjects: true }).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <p className="mt-2">{t("section3License")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section4Title")}
        </h2>
        <p>{t("section4Intro")}</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          {t("section4List", { returnObjects: true }).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section5Title")}
        </h2>
        <p>
          {t("section5Content")}&nbsp;
          <a href="#" className="text-blue-600 underline">
            {t("privacyPolicy")}
          </a>
          , which outlines how we collect, use, and safeguard your data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section6Title")}
        </h2>
        <p>{t("section6Content")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section7Title")}
        </h2>
        <p>{t("section7Content")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section8Title")}
        </h2>
        <p>{t("section8Intro")}</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          {t("section8List", { returnObjects: true }).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section9Title")}
        </h2>
        <p>{t("section9Content")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section10Title")}
        </h2>
        <p>{t("section10Content")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section11Title")}
        </h2>
        <p>{t("section11Intro")}</p>
        <p>
          <span className="font-semibold">{t("contactEmailLabel")}</span>{" "}
          {t("contactEmail")}
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
