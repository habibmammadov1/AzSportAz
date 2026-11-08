"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, otherCategory, otherNav, socials, isOtherSubcategory } from "@/lib/navigation";
import {
  ChevronDown,
  ChevronRight,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  SocialIcon,
} from "./Icons";

const languages = ["AZ", "EN", "RU"] as const;

// Browsers ship inconsistent "az" locale data, so the date is formatted by hand.
const AZ_MONTHS = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr",
];
const AZ_DAYS = ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"];

function useToday() {
  const [today, setToday] = useState("");
  useEffect(() => {
    const d = new Date();
    setToday(`${d.getDate()} ${AZ_MONTHS[d.getMonth()]} ${d.getFullYear()}, ${AZ_DAYS[d.getDay()]}`);
  }, []);
  return today;
}

export default function Header() {
  const pathname = usePathname();
  const today = useToday();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOtherOpen, setMobileOtherOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const otherActive =
    pathname === otherCategory.href ||
    isOtherSubcategory(pathname.replace("/category/", "").split("/")[0]);

  // Shadow + compact state once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close every overlay on navigation
  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Escape + outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setDrawerOpen(false);
        setSearchOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock page scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const hoverOpenedAt = useRef(0);
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (!megaOpen) hoverOpenedAt.current = Date.now();
    setMegaOpen(true);
  };
  // A click right after hover-open shouldn't immediately close the menu.
  const toggleMega = () => {
    if (megaOpen && Date.now() - hoverOpenedAt.current < 400) return;
    setMegaOpen((v) => !v);
  };
  const scheduleCloseMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
  };

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        {/* Utility bar — scrolls away, main bar stays sticky */}
        <div className="topbar">
          <div className="container topbar__inner">
            <span className="topbar__date">{today || " "}</span>
            <div className="topbar__right">
              <ul className="socials" aria-label="Sosial şəbəkələr">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                      <SocialIcon name={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="lang" role="group" aria-label="Dil seçimi">
                {languages.map((l) => (
                  <button
                    key={l}
                    type="button"
                    className={l === "AZ" ? "is-active" : ""}
                    aria-pressed={l === "AZ"}
                    disabled={l !== "AZ"}
                    title={l === "AZ" ? "Azərbaycan dili" : "Tezliklə"}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mainbar">
          <div className="container mainbar__inner">
            <Link href="/" className="brand" aria-label="ASport — Ana səhifə">
              <Image src="/logo.png" alt="ASport" width={500} height={109} priority className="brand__img" />
            </Link>

            <nav className="nav" aria-label="Əsas menyu">
              <ul className="nav__list">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav__link${isActive(item.href) ? " is-active" : ""}`}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li
                  ref={megaRef}
                  className="nav__mega-host"
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleCloseMega}
                >
                  <button
                    type="button"
                    className={`nav__link nav__trigger${otherActive ? " is-active" : ""}${megaOpen ? " is-open" : ""}`}
                    aria-expanded={megaOpen}
                    aria-controls="mega-diger"
                    onClick={toggleMega}
                  >
                    {otherCategory.label}
                    <ChevronDown className="nav__chev" width={16} height={16} />
                  </button>

                  <div id="mega-diger" className={`mega${megaOpen ? " is-open" : ""}`}>
                    <div className="mega__inner">
                      <div className="mega__head">
                        <p className="mega__title">Digər idman növləri</p>
                        <Link href={otherCategory.href} className="mega__all">
                          Hamısına bax <ChevronRight width={15} height={15} />
                        </Link>
                      </div>
                      <ul className="mega__grid">
                        {otherNav.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={`mega__link${isActive(item.href) ? " is-active" : ""}`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>

            <div className="mainbar__actions">
              <button
                type="button"
                className={`icon-btn${searchOpen ? " is-active" : ""}`}
                aria-label={searchOpen ? "Axtarışı bağla" : "Axtarış"}
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen((v) => !v)}
              >
                {searchOpen ? <CloseIcon /> : <SearchIcon />}
              </button>
              <button
                type="button"
                className="icon-btn burger"
                aria-label="Menyunu aç"
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>

        <div className={`searchbar${searchOpen ? " is-open" : ""}`}>
          <form className="container searchbar__form" action="/axtaris" role="search">
            <SearchIcon className="searchbar__icon" />
            <input
              ref={searchInputRef}
              type="search"
              name="q"
              placeholder="Xəbər, komanda və ya oyunçu axtar…"
              aria-label="Axtarış"
              tabIndex={searchOpen ? 0 : -1}
            />
            <button type="submit" className="btn btn--primary" tabIndex={searchOpen ? 0 : -1}>
              Axtar
            </button>
          </form>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`drawer-backdrop${drawerOpen ? " is-open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden
      />
      <aside
        id="mobile-drawer"
        className={`drawer${drawerOpen ? " is-open" : ""}`}
        aria-label="Mobil menyu"
        aria-hidden={!drawerOpen}
        inert={!drawerOpen}
      >
        <div className="drawer__head">
          <Image src="/logo.png" alt="ASport" width={500} height={109} className="drawer__logo" />
          <button type="button" className="icon-btn" aria-label="Menyunu bağla" onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        <form className="drawer__search" action="/axtaris" role="search">
          <SearchIcon />
          <input type="search" name="q" placeholder="Axtar…" aria-label="Axtarış" />
        </form>

        <nav className="drawer__nav" aria-label="Mobil əsas menyu">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`drawer__link${isActive(item.href) ? " is-active" : ""}`}>
                  {item.label}
                  <ChevronRight className="drawer__arrow" width={16} height={16} />
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className={`drawer__link drawer__toggle${otherActive ? " is-active" : ""}`}
                aria-expanded={mobileOtherOpen}
                onClick={() => setMobileOtherOpen((v) => !v)}
              >
                {otherCategory.label}
                <ChevronDown className={`drawer__arrow${mobileOtherOpen ? " is-flipped" : ""}`} width={16} height={16} />
              </button>
              <div className={`drawer__sub${mobileOtherOpen ? " is-open" : ""}`}>
                <div>
                  <ul className="drawer__subgrid">
                    <li>
                      <Link href={otherCategory.href} className="drawer__sublink drawer__sublink--all">
                        Hamısı
                      </Link>
                    </li>
                    {otherNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`drawer__sublink${isActive(item.href) ? " is-active" : ""}`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        <div className="drawer__foot">
          <ul className="socials socials--dark">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
