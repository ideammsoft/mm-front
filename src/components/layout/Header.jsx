import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import MainNavigation from './MainNavigation';
import LoginPanel from '../auth/LoginPanel';
import styles from './Header.module.css';
import clsx from 'clsx';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={clsx(styles.header, scrolled && styles.scrolled)}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.logo}>
            <img src="/manymen_mark.png" className={styles.logoIcon} alt="manymen" />
            엠엠소프트
          </Link>

          <MainNavigation mobileOpen={mobileMenuOpen} onCloseMobile={closeMobileMenu} />

          <div className={styles.headerActions}>
            <button
              className={styles.loginButton}
              onClick={() => setLoginOpen(true)}
            >
              로그인
            </button>

            <button
              className={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
              aria-label="메뉴"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {loginOpen && <LoginPanel onClose={() => setLoginOpen(false)} />}
    </>
  );
}

export default Header;
