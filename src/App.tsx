import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Check, Instagram, Menu, X } from 'lucide-react';
import { bookingConfig, portfolio } from './booking-config';

const imageRoot = '/images/website-images/';
const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;
type Enquiry = { name: string; phone: string; date: string; time: string; location: string; service: string; inspiration: string; notes: string };
const initialEnquiry: Enquiry = { name: '', phone: '', date: '', time: '', location: '', service: '', inspiration: '', notes: '' };

function App() {
  const [filter, setFilter] = useState('All work');
  const [selected, setSelected] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [enquiry, setEnquiry] = useState(initialEnquiry);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const lightboxRef = useRef<HTMLDivElement>(null);
  const categories = ['All work', 'Portraits', 'Fashion', 'Editorial', 'Lifestyle'];
  const visiblePhotos = useMemo(() => portfolio.map((photo, index) => ({ ...photo, index })).filter((photo) => filter === 'All work' || photo.category === filter), [filter]);
  const current = selected === null ? null : portfolio[selected];

  useEffect(() => {
    if (selected === null) return;
    document.body.classList.add('lightbox-open');
    lightboxRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowRight') setSelected((value) => value === null ? null : (value + 1) % portfolio.length);
      if (event.key === 'ArrowLeft') setSelected((value) => value === null ? null : (value - 1 + portfolio.length) % portfolio.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.classList.remove('lightbox-open'); window.removeEventListener('keydown', handleKey); };
  }, [selected]);

  const setField = (field: keyof Enquiry, value: string) => setEnquiry((old) => ({ ...old, [field]: value }));
  const chosenService = bookingConfig.services.find((service) => service.name === enquiry.service);
  const message = [
    'Hello Boluwatife Photography, I would like to enquire about a shoot.',
    `Name: ${enquiry.name}`, `Contact: ${enquiry.phone}`, `Service: ${enquiry.service}`,
    `Preferred date: ${enquiry.date}`, `Preferred time: ${enquiry.time}`, `Location: ${enquiry.location}`,
    enquiry.inspiration ? `Inspiration: ${enquiry.inspiration}` : '',
    enquiry.notes ? `Notes: ${enquiry.notes}` : '',
    'I understand the date is subject to availability and this is an enquiry, not a confirmed booking.',
  ].filter(Boolean).join('\n');
  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    if (!enquiry.service) { setFormError('Choose a session before continuing.'); return; }
    if (!bookingConfig.whatsappNumber) {
      try {
        await navigator.clipboard.writeText(message);
        setCopied(true);
      } catch {
        setCopied(false);
      }
      setSubmitted(true);
      return;
    }
    window.open(`https://wa.me/${bookingConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };
  const resetEnquiry = () => { setSubmitted(false); setCopied(false); setEnquiry(initialEnquiry); };
  const scrollToBooking = () => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="grain min-h-[100dvh] overflow-hidden">
      <header className="site-header">
        <a href="#top" aria-label="Boluwatife Photography home" className="brand" data-testid="link-home">
          <img src="/brand-logo.png" alt="BP" />
          <span><b>BOLUWATIFE</b><small>PHOTOGRAPHY</small></span>
        </a>
        <nav className={`main-nav ${mobileMenu ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#work" onClick={() => setMobileMenu(false)} data-testid="link-nav-work">Selected work</a>
          <a href="#sessions" onClick={() => setMobileMenu(false)} data-testid="link-nav-sessions">Sessions</a>
          <a href="#about" onClick={() => setMobileMenu(false)} data-testid="link-nav-about">Approach</a>
          <a href="#policies" onClick={() => setMobileMenu(false)} data-testid="link-nav-policies">Details</a>
          <a href="#contact" onClick={() => setMobileMenu(false)} data-testid="link-nav-contact">Contact</a>
          <a href="#social" onClick={() => setMobileMenu(false)} data-testid="link-nav-social">Socials</a>
        </nav>
        <a className="nav-cta" href="#booking" data-testid="link-nav-enquire">Enquire <ArrowRight size={15} /></a>
        <button className="menu-toggle" type="button" aria-label={mobileMenu ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenu} onClick={() => setMobileMenu((value) => !value)} data-testid="button-mobile-menu">
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy reveal">
            <p className="eyebrow hero-label">Portraiture · Fashion · Story</p>
            <h1 className="serif">A little more<br />like <i>yourself.</i></h1>
            <p className="hero-intro">Portraits with presence. Images that feel like you, on your best day and every day after.</p>
            <div className="hero-actions">
              <a className="button-dark" href="#work" data-testid="link-hero-work">Explore the work <ArrowRight size={16} /></a>
              <span className="hero-note">Thoughtful portraits, made in Nigeria.</span>
            </div>
            <a className="scroll-cue" href="#work" aria-label="Scroll to selected work"><span>SCROLL TO SEE</span><ArrowDown size={15} /></a>
          </div>
          <div className="hero-image image-zoom">
            <img src={`${imageRoot}IMG_2802.jpg`} alt="Portrait of a woman in a botanical-inspired look in evening light" fetchPriority="high" />
            <div className="hero-image-caption"><span>01 / SELECTED STORY</span><span>GOLDEN HOUR STUDY</span></div>
            <div className="hero-index serif">BP<span>.</span></div>
          </div>
          <div className="hero-side-note">BOLUWATIFE PHOTOGRAPHY — PORTRAIT & FASHION</div>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading">
            <div><p className="eyebrow">A considered collection</p><h2 className="serif">The <i>work.</i></h2></div>
            <p className="heading-aside">People, presence and the details<br className="desktop-only" /> that make a photograph yours.</p>
          </div>
          <div className="filter-row" role="group" aria-label="Filter portfolio by category">
            {categories.map((category) => <button type="button" key={category} className={`filter-button ${filter === category ? 'active' : ''}`} onClick={() => setFilter(category)} aria-pressed={filter === category} data-testid={`filter-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}
            <span className="work-count" data-testid="text-work-count">{String(visiblePhotos.length).padStart(2, '0')} frames</span>
          </div>
          <div className="portfolio-grid" data-testid="portfolio-grid">
            {visiblePhotos.map((photo, idx) => <button className={`portfolio-tile ${photo.shape} tile-${idx % 5}`} type="button" key={photo.file} onClick={() => setSelected(photo.index)} aria-label={`View ${photo.category.toLowerCase()} photograph: ${photo.alt}`} data-testid={`button-open-photo-${photo.file.replace('.jpg', '')}`}>
              <div className="photo-frame image-zoom"><img src={`${imageRoot}${photo.file}`} alt={photo.alt} loading="lazy" decoding="async" /><span className="photo-open">View image <ArrowRight size={14} /></span></div>
              <span className="photo-meta"><span>{photo.category}</span><span>{String(photo.index + 1).padStart(2, '0')}</span></span>
            </button>)}
          </div>
          <div className="work-endnote"><span>01 — 11</span><p>Made with patience. Kept for a lifetime.</p><span>BP STUDIO</span></div>
        </section>

        <section className="interlude" id="about">
          <div className="interlude-image image-zoom"><img src={`${imageRoot}IMG_0339.jpg`} alt="Seated portrait of a woman in a burgundy lace dress" loading="lazy" /></div>
          <div className="interlude-copy">
            <p className="eyebrow">The way we see it</p>
            <h2 className="serif">Not a pose.<br /><i>A point of view.</i></h2>
            <p>Good portraiture is a conversation. We make space for you to settle in, find your rhythm and be met with a camera that is paying attention.</p>
            <p>From a quiet studio portrait to a frame shaped by the city outside, every session starts with who you are — not a template.</p>
            <a href="#booking" className="text-link" data-testid="link-approach-enquire">Let’s make something personal <ArrowRight size={16} /></a>
            <span className="signature serif">Boluwatife</span>
          </div>
          <span className="interlude-index">02 / THE APPROACH</span>
        </section>

        <section className="sessions-section section-wrap" id="sessions">
          <div className="section-heading services-heading">
            <div><p className="eyebrow">The session menu</p><h2 className="serif">Choose your <i>frame.</i></h2></div>
            <p className="heading-aside">Every session includes edited images<br className="desktop-only" /> selected from your gallery, where specified.</p>
          </div>
          <div className="services-layout">
            <div className="service-list">
              {bookingConfig.services.map((service, index) => <article className="service-row" key={service.name} data-testid={`service-${service.name.toLowerCase().replaceAll(' ', '-')}`}>
                <span className="service-number">0{index + 1}</span>
                <div className="service-main"><h3 className="serif">{service.name}</h3><p>{service.detail}</p></div>
                <div className="service-value"><b>{formatNaira(service.price)}</b>{service.images !== null && <span>{service.images} edited images</span>}</div>
                <button type="button" className="service-arrow" aria-label={`Enquire about ${service.name}`} onClick={() => { setField('service', service.name); scrollToBooking(); }} data-testid={`button-enquire-${service.name.toLowerCase().replaceAll(' ', '-')}`}><ArrowRight size={18} /></button>
              </article>)}
              <p className="service-footnote">Included image quantities are fixed by session. No additional image quantity is currently offered at checkout.</p>
            </div>
            <aside className="service-aside">
              <p className="eyebrow">A note on pace</p>
              <h3 className="serif">Good things<br /><i>take a moment.</i></h3>
              <p>After your session, you’ll select your favourites from a proof gallery. Your edited photographs follow within the stated turnaround.</p>
              <a href="#policies" className="text-link" data-testid="link-session-policies">Read session details <ArrowRight size={15} /></a>
              <div className="aside-mark"><img src="/brand-logo.png" alt="" /></div>
            </aside>
          </div>
        </section>

        <section className="booking-section" id="booking">
          <div className="booking-intro">
            <p className="eyebrow">The first step</p>
            <h2 className="serif">Tell me what<br />you’re <i>imagining.</i></h2>
            <p>A few details are enough to begin. I’ll follow up to talk through the idea, location and availability.</p>
            <div className="booking-aside-line"><span>ENQUIRY 01</span><span>NO COMMITMENT YET</span></div>
          </div>
          <div className="booking-form-wrap">
            {submitted ? <div className="confirmation" role="status" data-testid="status-enquiry-submitted">
              <div className="confirmation-icon"><Check size={22} /></div>
              <p className="eyebrow">Enquiry prepared</p>
              <h3 className="serif">{bookingConfig.whatsappNumber ? 'Your message is ready.' : copied ? 'Your message is copied.' : 'Your details are here.'}</h3>
              <p>{bookingConfig.whatsappNumber ? 'WhatsApp should open with your enquiry. The date remains subject to availability; this is not a confirmed booking.' : copied ? 'WhatsApp recipient setup is pending. Your booking message has been copied; please send it to Boluwatife through your preferred channel.' : 'WhatsApp recipient setup is pending and clipboard access was unavailable. Your details remain below; please copy your enquiry manually.'}</p>
              <div className="confirmation-summary"><b>{enquiry.service}</b><span>{enquiry.name} · {enquiry.date || 'Date to be discussed'}</span>{chosenService && <span>{formatNaira(chosenService.price)}{chosenService.images !== null ? ` · ${chosenService.images} edited images` : ''}</span>}</div>
              <button className="button-outline" type="button" onClick={resetEnquiry} data-testid="button-new-enquiry">Prepare another enquiry</button>
            </div> : <>
              <form className="booking-form" onSubmit={submitEnquiry} data-testid="form-booking">
                <div className="form-title"><span className="eyebrow">01 — YOUR DETAILS</span><span className="required-note">* Required</span></div>
                <div className="form-grid">
                  <label className="field"><span>Full name *</span><input required autoComplete="name" value={enquiry.name} onChange={(e) => setField('name', e.target.value)} placeholder="Your name" data-testid="input-full-name" /></label>
                  <label className="field"><span>Contact number *</span><input required type="tel" autoComplete="tel" value={enquiry.phone} onChange={(e) => setField('phone', e.target.value)} placeholder="+234 ..." data-testid="input-contact-number" /></label>
                  <label className="field"><span>Session *</span><select required value={enquiry.service} onChange={(e) => setField('service', e.target.value)} data-testid="select-session"><option value="">Choose a session</option>{bookingConfig.services.map((service) => <option key={service.name} value={service.name}>{service.name} — {formatNaira(service.price)}</option>)}</select></label>
                  <label className="field"><span>Preferred date *</span><input required type="date" min={new Date().toISOString().slice(0, 10)} value={enquiry.date} onChange={(e) => setField('date', e.target.value)} data-testid="input-preferred-date" /></label>
                  <label className="field"><span>Preferred time *</span><input required type="time" value={enquiry.time} onChange={(e) => setField('time', e.target.value)} data-testid="input-preferred-time" /></label>
                  <label className="field"><span>Location *</span><input required value={enquiry.location} onChange={(e) => setField('location', e.target.value)} placeholder="City or preferred location" data-testid="input-location" /></label>
                  <label className="field field-full"><span>Inspiration link <em>Optional</em></span><input type="url" value={enquiry.inspiration} onChange={(e) => setField('inspiration', e.target.value)} placeholder="https://" data-testid="input-inspiration-link" /></label>
                  <label className="field field-full"><span>Anything else? <em>Optional</em></span><textarea rows={3} value={enquiry.notes} onChange={(e) => setField('notes', e.target.value)} placeholder="A little about the idea you have in mind…" data-testid="input-notes" /></label>
                </div>
                <div className="summary-box" aria-live="polite" data-testid="booking-summary">
                  <span className="eyebrow">YOUR ENQUIRY SUMMARY</span>
                  {chosenService ? <div className="summary-line"><b>{chosenService.name}</b><span>{formatNaira(chosenService.price)}{chosenService.images !== null ? ` · ${chosenService.images} edited images` : ''}</span></div> : <p>Choose a session to see its price and included images.</p>}
                  <p className="summary-caveat">Your preferred date is subject to availability. Sending this enquiry does not confirm a booking.</p>
                </div>
                {formError && <p className="form-error" role="alert" data-testid="status-form-error">{formError}</p>}
                <button className="button-dark submit-button" type="submit" data-testid="button-submit-enquiry">Prepare enquiry <ArrowRight size={16} /></button>
                {!bookingConfig.whatsappNumber && <p className="whatsapp-notice" data-testid="status-whatsapp-pending">WhatsApp recipient setup is pending. On submit, your encoded enquiry is copied for you to send yourself.</p>}
              </form>
            </>}
          </div>
        </section>

        <section className="policy-section section-wrap" id="policies">
          <div className="policy-heading"><p className="eyebrow">Before we begin</p><h2 className="serif">The small<br /><i>print.</i></h2><p>Clear expectations make room for better photographs.</p></div>
          <div className="policy-content">
            <div className="policy-group"><div className="policy-group-title"><span>01</span><h3>Booking & payment</h3></div><ul>{bookingConfig.policies.slice(0, 2).map((policy) => <li key={policy}>{policy}</li>)}</ul></div>
            <div className="policy-group"><div className="policy-group-title"><span>02</span><h3>Editing & delivery</h3></div><ul>{bookingConfig.policies.slice(2, 6).map((policy) => <li key={policy}>{policy}</li>)}</ul></div>
            <div className="policy-group"><div className="policy-group-title"><span>03</span><h3>Late sessions</h3></div><ul><li>{bookingConfig.policies[6]}</li></ul></div>
            <div className="policy-callout"><span className="eyebrow">No surprises</span><p>Any optional charge will be discussed with you before confirmation. No extra fee is applied automatically.</p></div>
          </div>
        </section>

        <section className="closing-section" id="contact">
          <div className="closing-photo"><img src={`${imageRoot}IMG_6956.jpg`} alt="Full-length night portrait of a woman in a white gown" loading="lazy" /></div>
          <div className="closing-copy">
            <p className="eyebrow">A portrait, in your own time</p>
            <h2 className="serif">Ready when<br /><i>you are.</i></h2>
            <p>Start with a note. We’ll find the right light, the right place, and the version of you that feels most at home.</p>
            <a href="#booking" className="button-light" data-testid="link-contact-enquire">Start an enquiry <ArrowRight size={16} /></a>
            <div className="social-row">
              <div>
                <span className="eyebrow">FOLLOW ALONG</span>
                <a className="social-handle" href="https://www.instagram.com/boluwatifephotographyco/" target="_blank" rel="noopener noreferrer" aria-label="Instagram, Boluwatife Photography Co. (opens in a new tab)" data-testid="link-social-instagram"><Instagram size={15} aria-hidden="true" /> @boluwatifephotographyco</a>
                <a className="social-handle social-tiktok" href="https://www.tiktok.com/@boluwatife_photography" target="_blank" rel="noopener noreferrer" aria-label="TikTok, Boluwatife Photography (opens in a new tab)" data-testid="link-social-tiktok">TikTok&nbsp; · &nbsp;@boluwatife_photography</a>
                <a className="social-handle social-tiktok" href="https://x.com/CreativeBolu" target="_blank" rel="noopener noreferrer" aria-label="X, Creative Bolu (opens in a new tab)" data-testid="link-social-x">X&nbsp; · &nbsp;@CreativeBolu</a>
              </div>
              <span className="social-note">New work, portrait stories<br />and recent sessions.</span>
            </div>
          </div>
          <span className="closing-stamp serif">BP.</span>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#top" className="footer-brand" data-testid="link-footer-home"><img src="/brand-logo.png" alt="BP" /><span>Boluwatife Photography</span></a>
        <p>Portraits with presence.</p>
        <div className="footer-nav"><a href="#policies" data-testid="link-footer-policies">Session details</a><a href="#booking" data-testid="link-footer-enquire">Make an enquiry</a></div>
        <div className="footer-socials" id="social">
          <span className="footer-socials-title">FOLLOW BOLUWATIFE</span>
          <div className="footer-social-links">
            <a href="https://www.instagram.com/boluwatifephotographyco/" target="_blank" rel="noopener noreferrer" data-testid="link-footer-social-instagram">Instagram · @boluwatifephotographyco</a>
            <a href="https://www.tiktok.com/@boluwatife_photography" target="_blank" rel="noopener noreferrer" data-testid="link-footer-social-tiktok">TikTok · @boluwatife_photography</a>
            <a href="https://x.com/CreativeBolu" target="_blank" rel="noopener noreferrer" data-testid="link-footer-social-x">X · @CreativeBolu</a>
          </div>
        </div>
        <span className="copyright">© {new Date().getFullYear()} BOLUWATIFE PHOTOGRAPHY</span>
      </footer>

      {current && selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Portfolio image viewer" tabIndex={-1} ref={lightboxRef} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }} data-testid="dialog-lightbox">
        <button type="button" className="lightbox-close" aria-label="Close image viewer" onClick={() => setSelected(null)} data-testid="button-close-lightbox"><X /></button>
        <button type="button" className="lightbox-prev" aria-label="Previous photograph" onClick={() => setSelected((selected - 1 + portfolio.length) % portfolio.length)} data-testid="button-previous-photo"><ArrowLeft /></button>
        <figure><img src={`${imageRoot}${current.file}`} alt={current.alt} /><figcaption><span>{current.category} — {current.alt}</span><span>{String(selected + 1).padStart(2, '0')} / {String(portfolio.length).padStart(2, '0')}</span></figcaption></figure>
        <button type="button" className="lightbox-next" aria-label="Next photograph" onClick={() => setSelected((selected + 1) % portfolio.length)} data-testid="button-next-photo"><ArrowRight /></button>
      </div>}
    </div>
  );
}

export default App;
