import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiClock } from 'react-icons/fi';

export const LiveTime: React.FC = () => {
  const { i18n } = useTranslation();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      
      const hours = istTime.getHours().toString().padStart(2, '0');
      const minutes = istTime.getMinutes().toString().padStart(2, '0');
      const seconds = istTime.getSeconds().toString().padStart(2, '0');
      const locale = i18n.language === 'fa' ? 'fa-IR' : 'en-US';
      const timezoneLabel = new Intl.DateTimeFormat(locale, {
        timeZoneName: 'short',
        timeZone: 'Asia/Kolkata',
      })
        .formatToParts(now)
        .find((part) => part.type === 'timeZoneName')?.value ?? 'IST';
      
      setTime(`${hours}:${minutes}:${seconds} ${timezoneLabel}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [i18n.language]);

  if (!time) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-text-secondary dark:text-dark-text-secondary">
      <FiClock className="w-4 h-4 text-accent-green" />
      <span>{time}</span>
    </div>
  );
};
