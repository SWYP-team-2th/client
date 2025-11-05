interface Window {
  Kakao: {
    Share: {
      sendDefault: (options: {
        objectType: string;
        content: {
          description: string;
          imageUrl: string;
          link: {
            mobileWebUrl: string;
            webUrl: string;
          };
        };
      }) => void;
    };
    init: (key: string) => void;
    isInitialized: () => boolean;
  };

  gtag: (
    command: string,
    action: string,
    params?: {
      page_path?: string;
      page_title?: string;
    },
  ) => void;
}
