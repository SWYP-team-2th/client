interface Window {
  Kakao: {
    Share: {
      sendDefault: (options: {
        objectType: string;
        text: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
        imageUrl: string;
      }) => void;
    };
    init: (key: string) => void;
    isInitialized: () => boolean;
  };
}
