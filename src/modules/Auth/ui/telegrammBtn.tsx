import React, { useRef, useEffect } from 'react';

export interface TelegramUser {
   id: number;
   first_name: string;
   username: string;
   photo_url: string;
   auth_date: number;
   hash: string;
}

// interface Props {
//   botName: string;
//   usePic?: boolean;
//   className?: string;
//   cornerRadius?: number;
//   requestAccess?: boolean;
//   dataAuthUrl?: string;
//   dataOnauth?: (user: TelegramUser) => void;
//   buttonSize?: "large" | "medium" | "small";
//   wrapperProps?: React.HTMLProps<HTMLDivElement>;
// }

declare global {
   interface Window {
      TelegramLoginWidget: {
         dataOnauth: (user: TelegramUser) => void;
      };
   }
}

const TelegramLoginButton: React.FC<TelegramLoginButtonType> = ({
   wrapperProps,
   dataAuthUrl,
   usePic = false,
   botName,
   className,
   buttonSize = 'large',
   dataOnauth,
   cornerRadius,
   requestAccess = true,
}) => {
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (ref.current === null) return;

      if (typeof dataOnauth === 'undefined' && typeof dataAuthUrl === 'undefined') {
         throw new Error(
            'One of this props should be defined: dataAuthUrl (redirect URL), dataOnauth (callback fn) should be defined.',
         );
      }

      if (typeof dataOnauth === 'function') {
         window.TelegramLoginWidget = {
            dataOnauth: (user: TelegramUser) => dataOnauth(user),
         };
      }

      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', botName);
      script.setAttribute('data-size', buttonSize);

      if (cornerRadius !== undefined) {
         script.setAttribute('data-radius', cornerRadius.toString());
      }

      if (requestAccess) {
         script.setAttribute('data-request-access', 'write');
      }

      script.setAttribute('data-userpic', usePic.toString());

      if (typeof dataAuthUrl === 'string') {
         script.setAttribute('data-auth-url', dataAuthUrl);
      } else {
         script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
      }

      script.async = true;

      ref.current.appendChild(script);
   }, [botName, buttonSize, cornerRadius, dataOnauth, requestAccess, usePic, ref, dataAuthUrl]);

   return <div ref={ref} className={className} {...wrapperProps} />;
};

interface TelegramLoginButtonType {
   botName: string;
   usePic: boolean;
   className?: string;
   cornerRadius?: number;
   requestAccess?: boolean;
   wrapperProps?: any;
   dataOnauth?: (res: any) => void;
   dataAuthUrl?: string;
   buttonSize: 'large' | 'medium' | 'small';
}

export default TelegramLoginButton;
