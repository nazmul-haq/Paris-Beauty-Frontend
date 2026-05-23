import { useEffect, useState } from 'react';

const FontLoader = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Check if font is already loaded
    if (document.fonts && document.fonts.check) {
      const checkFont = () => {
        if (document.fonts.check('16px "Hind Siliguri"')) {
          setFontLoaded(true);
        } else {
          // Fallback: set loaded after a timeout
          setTimeout(() => setFontLoaded(true), 1000);
        }
      };

      // Check immediately
      checkFont();

      // Also listen for font loading events
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          setFontLoaded(true);
        });
      }
    } else {
      // Fallback for older browsers
      setFontLoaded(true);
    }
  }, []);

  return (
    <div className={fontLoaded ? 'font-hind' : 'font-sans'}>
      {children}
    </div>
  );
};

export default FontLoader;
