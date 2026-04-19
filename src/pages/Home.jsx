import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import home2 from "../assets/images/home2.png";
import rose from "../assets/products/premadebouquet/crimsonpassion.jpeg";
import lavenderplant from "../assets/images/lavenderpl.jpg";
import candleSet from "../assets/products/candleset/desertbloom1.jpeg";
import toolSet from "../assets/products/gardenset/starterset1.jpeg";
import story from "../assets/images/story.jpg";
import home1 from "../assets/images/home1.png";
import home3 from "../assets/products/premadebouquet/blushserenity.jpeg";
/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */
// FAQ items use translation keys - will be translated in the component
const faqKeys = [
  { questionKey: "faqDeliver", answerKey: "faqDeliverAns" },
  { questionKey: "faqCustomize", answerKey: "faqCustomizeAns" },
  { questionKey: "faqFlowerLast", answerKey: "faqFlowerLastAns" },
  { questionKey: "faqCareFlowers", answerKey: "faqCareFlowersAns" },
  { questionKey: "faqCarePlants", answerKey: "faqCarePlantsAns" },
  { questionKey: "faqCorporate", answerKey: "faqCorporateAns" },
  { questionKey: "faqHappy", answerKey: "faqHappyAns" },
  { questionKey: "faqPayment", answerKey: "faqPaymentAns" },
  { questionKey: "faqSchedule", answerKey: "faqScheduleAns" },
  { questionKey: "faqCareInstructions", answerKey: "faqCareInstructionsAns" },
];

const reviews = [
  { name: "Sara A.",     location: "Dubai",     text: "The bouquet was absolutely stunning — fresher than anything I've ever ordered online. Will be a regular customer!", stars: 5, image: "" },
  { name: "Mohammed K.", location: "Abu Dhabi", text: "Ordered a custom arrangement for my wife's birthday. She cried happy tears. Thank you LaFiore!", stars: 5, image: "" },
  { name: "Priya R.",    location: "Sharjah",   text: "The plant finder tool is genius. Got exactly the right plant for my apartment. Delivery was fast and well-packaged.", stars: 5, image: "" },
  { name: "Layla H.",    location: "Dubai",     text: "I've ordered three times now and every single time the quality has been perfect. My go-to flower shop.", stars: 5, image: "" },
];

const products = [
  { name: "Crimson Passion", price: "AED 290.00", tag: "Bestseller", image: rose, link: "/shop?category=Bouquets&productId=251" },
  { name: "The Desert Bloom Collection", price: "AED 180.00", tag: "New", image: candleSet, link: "/shop?category=Candle Sets&productId=265" },
  { name: "Lavender Plant",      price: "AED 95.00",  tag: null, image: lavenderplant, link: "/shop?category=Plants&productId=17" },
  { name: "Starter Set",     price: "AED 350.00",  tag: null, image: toolSet, link: "/shop?category=Garden Sets&productId=262" },
];

/* ─────────────────────────────────────
   HERO CANVAS
   Side trees + petals 
───────────────────────────────────── */
function HeroCanvas() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero   = canvas.parentElement;
    const ctx    = canvas.getContext("2d");
    let W, H;

    /* seeded rng — consistent tree shape */
    let _s = 0x9e3779b9;
    const rng = () => { _s ^= _s << 13; _s ^= _s >> 17; _s ^= _s << 5; return (_s >>> 0) / 4294967296; };

    function resize() {
      W = canvas.width  = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }

    /* bezier point helper */
    const bzPt = (x1,y1,ax,ay,bx,by,x2,y2,t) => {
      const m = 1 - t;
      return {
        x: m*m*m*x1 + 3*m*m*t*ax + 3*m*t*t*bx + t*t*t*x2,
        y: m*m*m*y1 + 3*m*m*t*ay + 3*m*t*t*by + t*t*t*y2,
      };
    };

    /* ── build one tree ── */
    function buildTree(baseX, heightFrac, depth) {
      const branches = [], tips = [];
      function gen(x1, y1, a, l, d, gs) {
        if (d < 0 || l < 4) return;
        const x2 = x1 + Math.cos(a) * l;
        const y2 = y1 + Math.sin(a) * l;
        const bd = (rng() - 0.5) * 0.28;
        const cpx1 = x1 + Math.cos(a + bd * 0.4) * l * 0.36 + (rng() - 0.5) * 9;
        const cpy1 = y1 + Math.sin(a + bd * 0.4) * l * 0.36 + (rng() - 0.5) * 6;
        const cpx2 = x1 + Math.cos(a + bd * 0.8) * l * 0.73 + (rng() - 0.5) * 7;
        const cpy2 = y1 + Math.sin(a + bd * 0.8) * l * 0.73 + (rng() - 0.5) * 5;
        const th   = Math.max(0.4, Math.pow(d / depth, 1.7) * 9);
        const ge   = gs + 0.09 + rng() * 0.04;
        branches.push({ x1, y1, x2, y2, cpx1, cpy1, cpx2, cpy2, th, d, gs, ge });

        /* blossoms scattered all along every branch */
        const count = d <= 1 ? 4 : d <= 2 ? 3 : d <= 3 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          const m = bzPt(x1, y1, cpx1, cpy1, cpx2, cpy2, x2, y2, rng());
          tips.push({ x: m.x + (rng() - 0.5) * 5, y: m.y + (rng() - 0.5) * 5, d });
        }
        if (d === 0) return;
        const sp = 0.25 + rng() * 0.13;
        const ln = (rng() - 0.5) * 0.09;
        const cs = ge - 0.04 + rng() * 0.02;
        gen(x2, y2, a - sp + ln, l * (0.65 + rng() * 0.07), d - 1, cs);
        gen(x2, y2, a + sp + ln, l * (0.62 + rng() * 0.07), d - 1, cs + rng() * 0.02);
        if (d > 1 && rng() < 0.5)
          gen(x2, y2, a + ln * 0.4, l * (0.69 + rng() * 0.05), d - 1, cs + 0.01);
      }
      gen(baseX, H + 10, -Math.PI / 2, H * heightFrac, depth, 0);
      const maxG = branches.length ? Math.max(...branches.map(b => b.ge)) : 1;
      return { branches, tips, maxG };
    }

    /* ── draw branch ── */
    function drawBranch(b, p) {
      if (p <= 0) return;
      const t = Math.min(1, p);
      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      const steps = Math.max(6, t * 16 | 0);
      for (let i = 1; i <= steps; i++) {
        const pt = bzPt(b.x1, b.y1, b.cpx1, b.cpy1, b.cpx2, b.cpy2, b.x2, b.y2, (i / steps) * t);
        ctx.lineTo(pt.x, pt.y);
      }
      const rv = (68 + b.d * 3) | 0;
      const gv = (78 + b.d * 12) | 0;
      const bv = (40 + b.d * 4) | 0;
      const av = 0.28 + b.d * 0.07;
      ctx.strokeStyle = `rgba(${rv},${gv},${bv},${av})`;
      ctx.lineWidth   = b.th;
      ctx.lineCap     = "round";
      ctx.stroke();
    }

    /* ── draw blossom ── */
    function drawBlossom(tx, ty, r, op, dry, al = 1) {
      op  = Math.max(0, Math.min(1, op));
      if (op < 0.02) return;
      dry = Math.max(0, Math.min(1, dry || 0));
      const R = Math.min(255, (215 + op * 28 - dry * 108) | 0);
      const G = Math.min(255, (82  + op * 32 - dry * 42)  | 0);
      const B = Math.min(255, (102 + op * 28 - dry * 74)  | 0);
      const rr = r * 0.42 * op;
      const ry = r * 0.68 * op;

      if (op > 0.25 && dry < 0.55) {
        const glow = ctx.createRadialGradient(tx, ty, 0, tx, ty, r * 2);
        glow.addColorStop(0, `rgba(${R+30},${G+20},${B+20},${0.18 * op * al * (1 - dry)})`);
        glow.addColorStop(1, "rgba(255,200,210,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(tx - r * 2.2, ty - r * 2.2, r * 4.4, r * 4.4);
      }

      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        ctx.save();
        ctx.translate(tx, ty);
        ctx.rotate(a + (rng() - 0.5) * 0.22);
        ctx.translate(0, -r * 0.26 * op);
        ctx.scale(op, op);
        const pg = ctx.createRadialGradient(0, -ry * 0.28, 0, 0, ry * 0.18, ry * 1.4);
        pg.addColorStop(0, `rgba(${Math.min(255,R+45)},${Math.min(255,G+35)},${Math.min(255,B+40)},${0.96 * al})`);
        pg.addColorStop(0.55, `rgba(${R},${G},${B},${0.82 * al})`);
        pg.addColorStop(1, `rgba(${Math.max(0,R-35)},${Math.max(0,G-28)},${Math.max(0,B-25)},${0.42 * al})`);
        ctx.beginPath();
        ctx.moveTo(0, ry * 0.38);
        ctx.bezierCurveTo(-rr * 1.12, -ry * 0.1, -rr * 0.88, -ry * 0.82, 0, -ry);
        ctx.bezierCurveTo(rr * 0.88, -ry * 0.82, rr * 1.12, -ry * 0.1, 0, ry * 0.38);
        ctx.fillStyle = pg;
        ctx.fill();
        ctx.restore();
      }

      if (op > 0.3 && dry < 0.92) {
        const cg = ctx.createRadialGradient(tx, ty, 0, tx, ty, r * 0.28 * op);
        cg.addColorStop(0, `rgba(${(255 - dry * 110) | 0},${(235 - dry * 130) | 0},${(155 - dry * 100) | 0},${0.96 * al})`);
        cg.addColorStop(1, `rgba(${(218 - dry * 88) | 0},${(175 - dry * 98) | 0},${(92 - dry * 62) | 0},${0.5 * al})`);
        ctx.beginPath();
        ctx.arc(tx, ty, r * 0.28 * op, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();
      }
    }

    /* ── falling petal ── */
    class Petal {
      constructor(x, y, scattered = false) {
        this.reset(x, y, scattered);
      }
      reset(x, y, scattered = false) {
        this.x   = x !== undefined ? x : rng() * W;
        this.y   = scattered ? rng() * H : -10;
        this.w   = 3 + rng() * 7;
        this.h   = this.w * (0.32 + rng() * 0.35);
        this.vx  = (rng() - 0.5) * 2.2;
        this.vy  = -(rng() * 1.6 + 0.2);
        this.rot = rng() * Math.PI * 2;
        this.vr  = (rng() - 0.5) * 0.06;
        this.sT  = rng() * 100; this.sS = 0.005 + rng() * 0.013; this.sA = 0.5 + rng() * 1.4;
        this.fT  = rng() * 100; this.fS = 0.015 + rng() * 0.02;
        this.g   = 0.009 + rng() * 0.012;
        this.dr  = 0.993;
        this.al  = 0.5 + rng() * 0.4;
        this.isGreen = rng() < 0.3;
        this.dead = false;
      }
      update() {
        this.sT += this.sS; this.fT += this.fS;
        this.vx += Math.sin(this.sT) * 0.028;
        this.vy += this.g;
        this.vx *= this.dr; this.vy *= this.dr;
        this.x  += this.vx + Math.sin(this.sT) * this.sA;
        this.y  += this.vy;
        this.rot += this.vr;
        if (this.y > H + 40) this.dead = true;
      }
      draw() {
        const fl = Math.cos(this.fT);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.scale(fl, 1);
        ctx.globalAlpha = this.al * (0.18 + Math.abs(fl) * 0.82);
        const hw = this.w, hh = this.h;
        ctx.beginPath();
        ctx.moveTo(0, hh * 0.42);
        ctx.bezierCurveTo(-hw * 1.15, -hh * 0.08, -hw * 0.88, -hh * 0.82, 0, -hh);
        ctx.bezierCurveTo(hw * 0.88, -hh * 0.82, hw * 1.15, -hh * 0.08, 0, hh * 0.42);
        ctx.fillStyle = this.isGreen ? "rgba(95,138,72,0.72)" : "rgba(208,125,150,0.88)";
        ctx.fill();
        ctx.restore();
      }
    }

    /* ── state ── */
    let trees = [], blossoms = [], petals = [];
    let growT = 1, bloomT = 0, lastTs = null;

    function initScene() {
      _s = 0x9e3779b9; // reset seed
      trees = []; blossoms = [];

      /* two trees left side, two right side — rooted at canvas bottom */
      trees.push(buildTree(W * 0.04, 0.62, 6));
      trees.push(buildTree(W * 0.18, 0.50, 5));
      trees.push(buildTree(W * 0.82, 0.50, 5));
      trees.push(buildTree(W * 0.96, 0.62, 6));

      /* blossoms from tips */
      for (const tree of trees) {
        for (const tp of tree.tips) {
          const r = (tp.d <= 1 ? 8 : tp.d <= 2 ? 6 : 4) + rng() * 4;
          blossoms.push({ x: tp.x, y: tp.y, r, dl: rng() * 0.22 });
        }
      }

      /* petals — start scattered so it looks alive immediately */
      petals = Array.from({ length: 65 }, () => new Petal(undefined, undefined, true));
    }

    function animate(ts) {
      if (!lastTs) lastTs = ts;
      const dt = Math.min(ts - lastTs, 32);
      lastTs = ts;

      if (growT  < 1) growT  = Math.min(1, growT  + dt / 2800);
      if (bloomT < 1) bloomT = Math.min(1, bloomT + dt / 2500);

      ctx.clearRect(0, 0, W, H);

      /* branches */
      for (const tree of trees) {
        const gp = growT * (tree.maxG + 0.06);
        for (const b of tree.branches) {
          if (gp < b.gs) continue;
          drawBranch(b, (gp - b.gs) / (b.ge - b.gs));
        }
      }

      /* blossoms */
      for (const bl of blossoms) {
        const op = Math.max(0, (bloomT - bl.dl) / (1 - bl.dl + 0.01));
        drawBlossom(bl.x, bl.y, bl.r, Math.min(1, op * 1.35), 0);
      }

      /* petals */
      for (const p of petals) {
        p.update();
        p.draw();
        if (p.dead) p.reset(rng() * W, -10, false);
      }

      /* centre vignette — keeps text readable */
      const vg = ctx.createRadialGradient(W / 2, H * 0.45, H * 0.05, W / 2, H * 0.45, W * 0.72);
      vg.addColorStop(0, "rgba(246,240,230,0)");
      vg.addColorStop(1, "rgba(246,240,230,0.28)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(animate);
    }

    function init() {
      resize();
      initScene();
      animate(performance.now());
    }

    const handleResize = () => { resize(); initScene(); };
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(init, 80);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}

/* ─────────────────────────────────────
   FAQ ITEM
───────────────────────────────────── */
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "faq-open" : ""}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <span className="faq-icon">{open ? "−" : "+"}</span>
      </button>
      <div className={`faq-answer-wrap ${open ? "open" : ""}`}>
        <p className="faq-answer">{answer}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────────────────────────────────
   HOME PAGE
───────────────────────────────────── */
function Home() {
  const { t } = useLanguage();
  const [featRef, featIn]      = useInView();
  const [shopRef, shopIn]      = useInView();
  const [aboutRef, aboutIn]    = useInView();
  const [consultRef, consultIn] = useInView();
  const [faqRef, faqIn]        = useInView();
  const [revRef, revIn]        = useInView();

  return (
    <div className="lf-root">
      <Navbar />

      <main className="home-page">

        {/* ── HERO ── */}
        <section className="hero-section">
          <HeroCanvas />
          <div className="hero-content">
            <div className="hero-eyebrow">— {t("estDubaiUAE")} —</div>
            <h1 className="hero-title">
              <span className="hero-line">{t("growBeauty")}</span>
              <span className="hero-line accent">{t("oneBloom")}</span>
              <span className="hero-line">{t("atATime")}</span>
            </h1>
            <p className="hero-subtitle">
              {t("premiumPlants")}
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn-primary">{t("shopNow")}</Link>
              <div className="hero-secondary-btns">
                <Link to="/plantfinder" className="btn-ghost">{t("tryPlantFinder")}</Link>
                <Link to="/customize" className="btn-ghost">{t("customizeBouquets")}</Link>
                <Link to="/birth-month" className="btn-ghost">{t("birthMonthFlowers")}</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-strip" aria-hidden="true">
          <div className="marquee-track">
            {[t("freshDaily"),t("handCrafted"),t("uaeWideDelivery"),t("customBouquets"),t("plantFinder"),t("sameDayDubai")].map((item,i) => (
              <span key={i} className="marquee-item">{item} <span className="marquee-dot">✦</span></span>
            ))}
            {[t("freshDaily"),t("handCrafted"),t("uaeWideDelivery"),t("customBouquets"),t("plantFinder"),t("sameDayDubai")].map((item,i) => (
              <span key={`b${i}`} className="marquee-item">{item} <span className="marquee-dot">✦</span></span>
            ))}
          </div>
        </div>

        {/* ── FEATURE CARDS ── */}
        <section ref={featRef} className={`feature-section ${featIn ? "visible" : ""}`}>
          <div className="section-header">
            <p className="section-eyebrow">{t("whatWeOffer")}</p>
            <h2 className="section-title">{t("craftedEveryMoment")}</h2>
          </div>
          <div className="feature-grid">
            {[
              {
                title: t("exquisiteBouquets"),
                desc: t("expertlyCraftedBouquets"),
                price: "AED 180",
                link: "/shop?category=Bouquets",
                image: home3
              },
              {
                title: t("findPerfectPlant"),
                desc: t("answerQuestions"),
                price: "AED 155",
                link: "/plantfinder",
                image: home2
              },
              {
                title: t("customArrangements"),
                desc: t("createBespokeBouquet"),
                price: "AED 170",
                link: "/customize",
                image: home1
              },
            ].map((card, i) => (
              <div key={i} className="feature-card" style={{ "--delay": `${i * 0.12}s` }}>
                <div className="feature-card-image">
                  <img src={card.image} alt={card.title} className="feature-img" />
                  <div className="feature-icon">{card.icon}</div>
                </div>
                <div className="feature-card-body">
                  <h3 className="feature-card-title">{card.title}</h3>
                  <p className="feature-card-desc">{card.desc}</p>
                  <Link to={card.link} className="feature-card-btn">
                    <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SHOP ── */}
        <section ref={shopRef} className={`shop-section ${shopIn ? "visible" : ""}`}>
          <div className="shop-header">
            <div>
              <p className="section-eyebrow">{t("ourProducts")}</p>
              <h2 className="section-title">{t("shopCollection")}</h2>
            </div>
            <p className="shop-header-sub">{t("exploreRange")}</p>
          </div>
          <div className="shop-grid">
            {products.map((p, i) => (
              <Link to={p.link} key={i} style={{ textDecoration: "none" }}>
                <div className="product-card" style={{ "--delay": `${i * 0.1}s` }}>
                  {p.tag && <span className="product-tag">{p.tag}</span>}
                  <div className="product-image">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="product-img" />
                    ) : (
                      <div className="product-img-placeholder">🌸</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{p.name}</h3>
                    <div className="product-btn">
                      {p.price} <span className="btn-arrow">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section ref={aboutRef} className={`about-section ${aboutIn ? "visible" : ""}`}>
          <div className="about-image-col">
            <div className="about-img-main">
              <img src={story} alt="LaFiore Story" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div className="about-text-col">
            <p className="section-eyebrow">{t("ourStory")}</p>
            <h2 className="about-title">{t("rootedPassion")}</h2>
            <p className="about-body">{t("laFioreStory1")}</p>
            <p className="about-body">{t("laFioreStory2")}</p>
          </div>
        </section>

        {/* ── CONSULTATION ── */}
        <section ref={consultRef} className={`consultation-section ${consultIn ? "visible" : ""}`}>
          <div className="consult-bg" />
          <div className="consult-content">
            <p className="consult-eyebrow">{t("needHelpChoosing")}</p>
            <h2 className="consult-title">{t("createSomethingBeautiful")}</h2>
            <p className="consult-body">{t("floralExpertsGuide")}</p>
            <Link to="/consultation" className="btn-primary light">{t("bookFreeConsultation")}</Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section ref={faqRef} className={`faq-section ${faqIn ? "visible" : ""}`}>
          <div className="faq-header">
            <p className="section-eyebrow">{t("gotQuestions")}</p>
            <h2 className="section-title">{t("frequentlyAsked")}</h2>
          </div>
          <div className="faq-list">
            {faqKeys.map((faq, i) => (
              <FAQItem
                key={i}
                question={t(faq.questionKey)}
                answer={t(faq.answerKey)}
              />
            ))}
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section ref={revRef} className={`reviews-section ${revIn ? "visible" : ""}`}>
          <div className="section-header centered">
            <p className="section-eyebrow">{t("testimonials")}</p>
            <h2 className="section-title">{t("whatCustomersSay")}</h2>
          </div>
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-image">
                  {r.image ? (
                    <img src={r.image} alt={r.name} className="reviewer-img" />
                  ) : (
                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "var(--pink)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>👤</div>
                  )}
                </div>
                <div className="review-stars">{"★".repeat(r.stars)}</div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-author">
                  <span className="review-name">{r.name}</span>
                  <span className="review-location">{r.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER SEPARATOR ── */}
        <div className="footer-separator"></div>

        <Footer />

      </main>
    </div>
  );
}

export default Home;