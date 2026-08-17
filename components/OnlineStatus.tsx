import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const OnlineStatus: React.FC = () => {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkOnlineStatus = () => {
      const now = new Date();
      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      
      const hour = istTime.getHours();
      const online = hour >= 6 && hour < 23;
      setIsOnline(online);
    };

    checkOnlineStatus();
    const interval = setInterval(checkOnlineStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
        isOnline 
          ? 'bg-accent-green animate-pulse' 
          : 'bg-red-500'
      }`}
      title={isOnline ? t('common.online') : t('common.offline')}
    ></span>
  );
};
