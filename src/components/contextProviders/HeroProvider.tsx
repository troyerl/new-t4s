import { createContext, useContext, useState, type ReactNode } from "react";

interface IHeroContext {
  isLoading: boolean;
  mainColoredText: string;
  baseTitleText: string;
  subText: ReactNode;
  onSetIsLoading: (isLoadingValue: boolean) => void;
  onSetMainColoredText: (text: string) => void;
  onSetHeroMainText: (
    coloredText: string,
    titleText: string,
    heroSubText?: ReactNode,
  ) => void;
  onSetSubText: (heroSubText: ReactNode) => void;
}

const HeroContext = createContext<IHeroContext>({
  isLoading: false,
  mainColoredText: "",
  baseTitleText: "",
  subText: undefined,
  onSetIsLoading: (_isLoadingValue: boolean) => {},
  onSetMainColoredText: (_text: string) => {},
  onSetHeroMainText: (
    _coloredText: string,
    _titleText: string,
    _heroSubText: ReactNode,
  ) => {},
  onSetSubText: (_heroSubText: ReactNode) => {},
});

export const useHeroContext = () => useContext(HeroContext);

const HeroContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mainColoredText, setMainColoredText] = useState<string>("");
  const [baseTitleText, setBaseTitleText] = useState<string>("");
  const [subText, setSubText] = useState<ReactNode>();

  const onSetIsLoading = (isLoadingValue: boolean) => {
    setIsLoading(isLoadingValue);
  };

  const onSetMainColoredText = (text: string) => {
    setMainColoredText(text);
  };

  const onSetHeroMainText = (
    coloredText: string,
    titleText: string,
    heroSubText?: ReactNode,
  ) => {
    setMainColoredText(coloredText);
    setBaseTitleText(titleText);
    if (heroSubText) {
      setSubText(heroSubText);
    }
  };

  const onSetSubText = (heroSubText: ReactNode) => {
    setSubText(heroSubText);
  };

  return (
    <HeroContext.Provider
      value={{
        isLoading,
        mainColoredText,
        baseTitleText,
        subText,
        onSetIsLoading,
        onSetMainColoredText,
        onSetHeroMainText,
        onSetSubText,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};

export default HeroContextProvider;
