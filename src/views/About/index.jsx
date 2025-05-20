import React from "react";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6 md:p-12 bg-white font-sans text-gray-700 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-black mb-6 border-b pb-2">
        {t("aboutUs")}
      </h1>
      <p className="text-lg leading-relaxed mb-4">
        <span className="font-semibold text-black">{t("wotchGotcha")} </span>
        {t("description1")}
      </p>
      <p className="text-lg leading-relaxed mb-4">
        {t("description2")}{" "}
        <span className="font-medium text-black">{t("videoMania")}</span>,{" "}
        {t("description3")}{" "}
        <span className="font-medium text-black">{t("picTour")}</span>,{" "}
        {t("description4")}{" "}
        <span className="font-medium text-black">{t("openLetter")}</span>,{" "}
        {t("description5")}{" "}
        <span className="font-medium text-black">{t("gebc")}</span>,{" "}
        <span className="font-medium text-black">{t("fanStars")}</span>,{" "}
        <span className="font-medium text-black">{t("tvProgMax")}</span>,{" "}
        {t("description6")}
      </p>
      <p className="text-lg leading-relaxed mb-4">{t("mission1")}</p>
      <p className="text-lg leading-relaxed mb-4">{t("mission2")}</p>
      <p className="text-lg leading-relaxed">
        {t("mission3")}{" "}
        <span className="font-semibold text-black">{t("wotchGotcha2")}</span>{" "}
        {t("mission4")}
      </p>
    </div>
  );
};

export default AboutUs;
