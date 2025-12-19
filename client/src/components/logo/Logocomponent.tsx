import './logocomponent.css'
import { useNavigate } from 'react-router-dom';

// LogoComponent.tsx
interface LogoProps {
  onClick?: () => void;
}


export default function Logo({ onClick }: LogoProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    onClick?.();
  };

  return (
    <a
      href="/"
      className="kinstry-logo"
      aria-label="Kinstry Systems"
      onClick={handleClick}
    >
      <span className="kinstry-text">Kinstry</span>
      <span className="systems-text">SYSTEMS</span>
      <span className="logo-curve" />
    </a>
  );
}
