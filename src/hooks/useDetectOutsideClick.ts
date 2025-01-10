import {RefObject, useEffect, useState} from 'react';

export default function useDetectOutsideClick(ref: RefObject<HTMLElement>, onOutsideClick: () => void) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
        setIsActive(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onOutsideClick]);

  return [isActive, setIsActive] as const;
} 