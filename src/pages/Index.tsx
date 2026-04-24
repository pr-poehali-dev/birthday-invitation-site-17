import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const CONFETTI_COLORS = [
  "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF",
  "#FF6FC8", "#FF9A3C", "#A78BFA", "#34D399",
];

const confettiPieces = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 4 + Math.random() * 5,
  size: 6 + Math.random() * 10,
  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  rotate: Math.random() * 360,
  shape: Math.random() > 0.5 ? "circle" : "rect",
}));

const GALLERY = [
  {
    src: "https://cdn.poehali.dev/projects/88ffe616-7663-43d4-8b76-d0729bfe1868/files/193ba646-3b32-441e-b92c-dd0bc2f5ca8e.jpg",
    caption: "Незабываемый вечер",
  },
  {
    src: "https://cdn.poehali.dev/projects/88ffe616-7663-43d4-8b76-d0729bfe1868/files/da5fc18e-5126-4e1d-a461-e741dfd1bc9a.jpg",
    caption: "Тёплые моменты",
  },
  {
    src: "https://cdn.poehali.dev/projects/88ffe616-7663-43d4-8b76-d0729bfe1868/files/d866de5e-2c06-47a0-b4f8-24f61f580952.jpg",
    caption: "Вместе веселее",
  },
];

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Галерея", href: "#gallery" },
  { label: "Контакты", href: "#contacts" },
];

const BALLOONS = [
  { left: "4%", color: "#FF6B6B", size: 80, delay: 0 },
  { left: "14%", color: "#FFD93D", size: 60, delay: 0.5 },
  { left: "78%", color: "#6BCB77", size: 90, delay: 1 },
  { left: "89%", color: "#4D96FF", size: 55, delay: 0.3 },
  { left: "68%", color: "#FF6FC8", size: 70, delay: 0.8 },
  { left: "24%", color: "#A78BFA", size: 50, delay: 1.2 },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", guests: "1" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg-main)", fontFamily: "var(--font-body)" }}>

      {/* Конфетти */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {confettiPieces.map((p) => (
          <div
            key={p.id}
            className="confetti-piece absolute"
            style={{
              left: `${p.left}%`,
              top: "-20px",
              width: p.shape === "circle" ? p.size : p.size * 0.7,
              height: p.shape === "circle" ? p.size : p.size * 1.4,
              borderRadius: p.shape === "circle" ? "50%" : "3px",
              background: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              transform: `rotate(${p.rotate}deg)`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border-soft)" }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--gold)", letterSpacing: "-0.02em" }}>
            🎉 Праздник
          </span>
          <div className="hidden md:flex gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className="nav-link"
                style={{ fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.04em" }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <button
            className="md:hidden p-2 rounded-xl"
            style={{ color: "var(--gold)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-5 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className="nav-link"
                style={{ fontWeight: 600, fontSize: "1rem" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 z-10">
        {/* Шары */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {BALLOONS.map((b, i) => (
            <div
              key={i}
              className="balloon absolute"
              style={{
                left: b.left,
                bottom: 0,
                width: b.size,
                height: b.size * 1.25,
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                background: `radial-gradient(circle at 35% 30%, ${b.color}bb, ${b.color})`,
                animationDelay: `${b.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div
            className="inline-block px-5 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: "var(--badge-bg)", color: "var(--badge-text)", border: "1px solid var(--border-soft)" }}
          >
            🎂 Приглашение на день рождения
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 12vw, 7rem)", lineHeight: 1, color: "var(--gold)", marginBottom: "1rem" }}>
            С Днём
            <br />
            <span style={{ color: "var(--fuchsia)" }}>Рождения меня!</span>
          </h1>

          <p style={{ fontSize: "1.1rem", color: "var(--text-soft)", maxWidth: "32rem", margin: "0 auto 2rem" }}>
            приглашаем вас на праздничный обед в честь меня 💘
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-10">
            {[
              { icon: "Calendar", text: "3 мая" },
              { icon: "Clock", text: "14:00" },
              { icon: "MapPin", text: "Степана Разина 140А" },
            ].map((item) => (
              <div
                key={item.icon}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: "var(--card-bg)", border: "1px solid var(--border-soft)", color: "var(--text-main)" }}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <a
            href="#contacts"
            onClick={(e) => handleNav(e as React.MouseEvent<HTMLAnchorElement>, "#contacts")}
            className="btn-main inline-block font-bold text-lg px-10 py-4 rounded-2xl"
          >
            🎁 Подтвердить приход
          </a>
        </div>
      </section>

      {/* Галерея */}
      <section id="gallery" className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 8vw, 4rem)", color: "var(--gold)", marginBottom: "0.75rem" }}>
              Моменты жизни
            </h2>
            <p style={{ color: "var(--text-soft)", fontSize: "1rem" }}>
              Фотографии, которые навсегда остались в сердце
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GALLERY.map((item, i) => (
              <div key={i} className="gallery-card" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover gallery-img"
                  />
                  <div className="gallery-overlay absolute inset-0 flex items-center justify-center" style={{ background: "rgba(255,107,107,0.3)", opacity: 0, transition: "opacity 0.3s" }}>
                    <Icon name="Heart" size={40} style={{ color: "white", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }} />
                  </div>
                </div>
                <div className="px-1 pt-3 pb-1">
                  <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-main)" }}>{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="relative z-10 py-20 px-6">
        <div className="max-w-lg mx-auto">
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{ background: "var(--card-bg)", border: "2px solid var(--border-soft)", boxShadow: "0 8px 60px rgba(255,107,200,0.12)" }}
          >
            <div className="text-center mb-10">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 7vw, 3rem)", color: "var(--gold)", marginBottom: "0.5rem" }}>
                Приду! 🎊
              </h2>
              <p style={{ color: "var(--text-soft)", fontSize: "0.95rem" }}>
                Оставь свои данные, и мы будем тебя ждать
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-10">
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--gold)", marginBottom: "0.5rem" }}>
                  Отлично!
                </h3>
                <p style={{ color: "var(--text-soft)" }}>
                  Мы тебя ждём. Готовься к незабываемому вечеру!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {[
                  { key: "name", label: "Твоё имя", type: "text", placeholder: "Введи своё имя" },
                  { key: "phone", label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__" },
                ].map((f) => (
                  <div key={f.key} className="flex flex-col gap-1.5">
                    <label style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-main)" }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="form-input"
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      required
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text-main)" }}>Количество гостей</label>
                  <select
                    className="form-input"
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  >
                    {["1", "2", "3", "4", "5+"].map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn-main font-bold text-base py-4 rounded-2xl mt-2">
                  🎈 Подтвердить участие
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 flex flex-col gap-3" style={{ borderTop: "1px solid var(--border-soft)" }}>
              {[
                { icon: "Phone", href: "tel:+79198522585", text: "+7 919 852-25-85" },
                { icon: "Mail", href: "mailto:party@example.com", text: "party@example.com" },
              ].map((c) => (
                <a key={c.icon} href={c.href} className="flex items-center gap-3 text-sm font-medium contact-link">
                  <Icon name={c.icon} size={17} />
                  <span>{c.text}</span>
                </a>
              ))}
              <div className="flex items-center gap-3 text-sm font-medium" style={{ color: "var(--text-soft)" }}>
                <Icon name="MapPin" size={17} />
                <span>ул. Праздничная, 1, зал «Торжество»</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-sm" style={{ color: "var(--text-soft)" }}>
        <p>С любовью и радостью 🎂</p>
      </footer>
    </div>
  );
}