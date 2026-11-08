import Image from "next/image";
import Link from "next/link";
import { mainNav, otherCategory, otherNav, socials } from "@/lib/navigation";
import { ArrowUp, SocialIcon } from "./Icons";

const companyLinks = [
  { label: "Haqqımızda", href: "/haqqimizda" },
  { label: "Redaksiya", href: "/redaksiya" },
  { label: "Reklam", href: "/reklam" },
  { label: "Əlaqə", href: "/elaqe" },
  { label: "Məxfilik siyasəti", href: "/mexfilik" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const categories = mainNav.filter((i) => i.slug);

  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link href="/" aria-label="ASport — Ana səhifə">
            <Image src="/logo.png" alt="ASport" width={500} height={109} className="footer__logo" />
          </Link>
          <p className="footer__about">
            Azərbaycan və dünya futbolu, eləcə də digər idman növləri üzrə ən son xəbərlər, müsahibələr və
            analitika.
          </p>
          <ul className="socials socials--footer" aria-label="Sosial şəbəkələr">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Bölmələr</h2>
          <ul>
            {categories.map((c) => (
              <li key={c.href}>
                <Link href={c.href}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col footer__col--wide">
          <h2 className="footer__heading">
            <Link href={otherCategory.href}>Digər idman növləri</Link>
          </h2>
          <ul className="footer__twocol">
            {otherNav.map((c) => (
              <li key={c.href}>
                <Link href={c.href}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">ASport</h2>
          <ul>
            {companyLinks.map((c) => (
              <li key={c.href}>
                <Link href={c.href}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} ASport.az — Bütün hüquqlar qorunur.</p>
          <p className="footer__note">Materiallardan istifadə zamanı istinad mütləqdir.</p>
          <a href="#top" className="to-top" aria-label="Yuxarı qalx">
            <ArrowUp width={18} height={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
