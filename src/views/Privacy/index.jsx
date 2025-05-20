import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6 md:p-12 font-sans text-gray-800 space-y-6">
      <h1 className="text-3xl font-bold text-black">
        {t("privacyPolicyTitle-P")}
      </h1>

      <p>{t("introParagraph-P")}</p>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section1Title-P")}
        </h2>

        <div>
          <h3 className="text-xl font-semibold text-black mt-4">
            {t("section1aTitle-P")}
          </h3>
          <p>{t("section1aContent-P")}</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            {t("section1aList-P", { returnObjects: true }).map(
              (item, index) => (
                <li key={`1a-${index}`}>{item}</li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-black mt-4">
            {t("section1bTitle-P")}
          </h3>
          <p>{t("section1bContent-P")}</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            {t("section1bList-P", { returnObjects: true }).map(
              (item, index) => (
                <li key={`1b-${index}`}>{item}</li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-black mt-4">
            {t("section1cTitle-P")}
          </h3>
          <p>{t("section1cContent-P")}</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            {t("section1cList-P", { returnObjects: true }).map(
              (item, index) => (
                <li key={`1c-${index}`}>{item}</li>
              )
            )}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section2Title-P")}
        </h2>
        <ul className="list-disc list-inside ml-4 space-y-1">
          {t("section2List-P", { returnObjects: true }).map((item, index) => (
            <li key={`2-${index}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section3Title-P")}
        </h2>
        <p>{t("section3Intro-P")}</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          {t("section3List-P", { returnObjects: true }).map((item, index) => (
            <li key={`3-${index}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section4Title-P")}
        </h2>
        <p>{t("section4Intro-P")}</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          {t("section4List-P", { returnObjects: true }).map((item, index) => (
            <li key={`4-${index}`}>{item}</li>
          ))}
        </ul>
        <p className="mt-2">{t("section4Note-P")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section5Title-P")}
        </h2>
        <p>{t("section5Intro-P")}</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          {t("section5List-P", { returnObjects: true }).map((item, index) => (
            <li key={`5-${index}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section6Title-P")}
        </h2>
        <p>{t("section6Intro-P")}</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          {t("section6List-P", { returnObjects: true }).map((item, index) => (
            <li key={`6-${index}`}>{item}</li>
          ))}
        </ul>
        <p className="mt-2">{t("section6Note-P")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section7Title-P")}
        </h2>
        <p>{t("section7Content-P")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section8Title-P")}
        </h2>
        <p>{t("section8Intro-P")}</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          {t("section8List-P", { returnObjects: true }).map((item, index) => (
            <li key={`8-${index}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-black mt-8">
          {t("section9Title-P")}
        </h2>
        <p>{t("section9Intro-P")}</p>
        <p>
          <span className="font-semibold">{t("contactEmailLabel-P")}</span>{" "}
          {t("contactEmail-P")}
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
