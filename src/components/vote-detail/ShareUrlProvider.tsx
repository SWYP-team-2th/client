import { createContext, useContext } from 'react';

interface ShareUrlContextType {
  shareUrl: string;
}

const ShareUrlContext = createContext<ShareUrlContextType | undefined>(
  undefined,
);

export const useShareUrl = () => {
  const context = useContext(ShareUrlContext);
  if (!context) {
    throw new Error('err');
  }
  return context.shareUrl;
};

export const ShareUrlProvider = ({
  shareUrl,
  children,
}: {
  shareUrl: string;
  children: React.ReactNode;
}) => {
  return (
    <ShareUrlContext.Provider value={{ shareUrl }}>
      {children}
    </ShareUrlContext.Provider>
  );
};
