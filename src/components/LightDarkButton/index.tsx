import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useEffect, useState } from 'react';
import { ButtonMode } from './styles';

function LightDarkButton() {
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    const storedTheme =
      localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setIsLightMode(storedTheme === 'light');
  }, []);

  const handleChangeModeColor = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = 'light';

    if (currentTheme === 'light') {
      targetTheme = 'dark';
    }

    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);

    setIsLightMode((_iisLightMode) => !_iisLightMode);
  };

  return (
    <>
      <ButtonMode onClick={handleChangeModeColor}>{isLightMode ? <WbSunnyIcon /> : <NightlightIcon />}</ButtonMode>
    </>
  );
}

export default LightDarkButton;
