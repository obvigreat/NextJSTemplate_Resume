import {useEffect, useState} from 'react';

export const useNavObserver = (selectors: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '-50px 0px -50px 0px',
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    selectors.forEach((selector) => {
      const element = document.getElementById(selector.replace('#', ''));
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [selectors]);

  return activeSection;
}; 