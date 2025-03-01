import { APP_COLOR } from "@/utils/constants";
import { useTranslation } from "react-i18next";

export const Introduction = () => {
  const { t } = useTranslation("home");

  return (
    <section className="py-20 text-center">
      <h1
        className="text-4xl font-bold tracking-tight mb-4"
        style={{ color: APP_COLOR }}
      >
        {t("introduction.title")}
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        {t("introduction.description")} {t("introduction.supportAuthor")}
      </p>
    </section>
  );
};
