import { useTranslation } from "react-i18next";
import { SupportedLanguages } from "../i18n";
import { ComboboxField } from "./form/ComboboxField";

export default () => {
  const { i18n } = useTranslation();
  return (
    <div className="max-w-50">
      <ComboboxField
        options={Object.entries(SupportedLanguages).map(([label, value]) => ({
          label,
          value,
        }))}
        value={i18n.language}
        label="Language"
        id="language-selector"
        onChange={(e) => {
          i18n.changeLanguage(e.value);
        }}
      />
    </div>
  );
};
