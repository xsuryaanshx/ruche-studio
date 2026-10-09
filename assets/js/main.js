/**
 * RUCHÉ STUDIO — LUXURY INTERIOR ARCHITECTURE & DESIGN
 * Core Interactive Logic & WhatsApp Concierge Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PHONE = '919685415433';
  const DEFAULT_WA_MESSAGE = 'Hello RUCHÉ Studio, I would love to discuss an interior design project.';

  // --- 1. Header Elevation on Scroll ---
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. Mobile Menu Drawer ---
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const toggleDrawer = (open) => {
    const shouldOpen = open !== undefined ? open : !mobileDrawer?.classList.contains('is-open');
    if (shouldOpen) {
      mobileDrawer?.classList.add('is-open');
      menuToggle?.classList.add('is-active');
      menuToggle?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer?.classList.remove('is-open');
      menuToggle?.classList.remove('is-active');
      menuToggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  menuToggle?.addEventListener('click', () => toggleDrawer());
  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) toggleDrawer(false);
  });
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleDrawer(false);
      closeModal();
    }
  });

  // --- 3. Portfolio Project Data & Filter ---
  const projectsData = [
    {
      id: 'travertine-penthouse',
      title: 'The Travertine Penthouse',
      category: 'residential',
      categoryLabel: 'Residential Sanctuary',
      location: 'Koregaon Park, Pune (Maharashtra)',
      area: '5,600 sq.ft',
      duration: '7 Months',
      materials: 'Honed Travertine, Smoked White Oak, Raw Belgian Linen',
      year: '2025',
      image: 'assets/images/projects/project-1-alabaster.jpg',
      headline: 'A double-height architectural sanctuary embracing tranquil daylight and fluted limestone volumes.',
      narrative: 'Rooted in spatial restraint, The Travertine Penthouse balances architectural rigor with sensory calm. Double-height glazing fills the living salon with dappled canopy light, anchored by a monolithic travertine hearth and quarter-sawn European oak joinery. Hidden storage conceals technology, creating a pure gallery for contemporary sculpture and quiet family living.'
    },
    {
      id: 'earthen-sanctuary',
      title: 'The Earthen Sanctuary',
      category: 'villas',
      categoryLabel: 'Turnkey Villa',
      location: 'Tarabai Park, Kolhapur (Maharashtra)',
      area: '7,800 sq.ft',
      duration: '10 Months',
      materials: 'Handcrafted Terracotta, Lime Plaster, Aged Bronze',
      year: '2025',
      image: 'assets/images/projects/project-2-villa-earthen.jpg',
      headline: 'A rooted courtyard estate celebrating regional earthen textures with razor-sharp European detailing.',
      narrative: 'Conceived as a dialogue between earth, air, and shade. Internal courtyards invite natural breezes through terracotta louvers, while micro-cement floors connect intimate family salons with landscaped stone verandas. Custom bronze ironmongery and tactile lime-wash walls age gracefully, creating an enduring sanctuary in Kolhapur.'
    },
    {
      id: 'sea-face-atelier',
      title: 'The Sea Face Atelier',
      category: 'commercial',
      categoryLabel: 'Commercial Atelier',
      location: 'Worli Sea Face, Mumbai (Maharashtra)',
      area: '4,500 sq.ft',
      duration: '5 Months',
      materials: 'Smoked European Walnut, Fluted Glass, Honed Basalt',
      year: '2024',
      image: 'assets/images/projects/project-3-monolith-mumbai.jpg',
      headline: 'A confidential executive salon overlooking the Arabian Sea, curated like a private collector’s gallery.',
      narrative: 'Departing from standard corporate interiors, this boutique atelier adopts the quiet dignity of a European library salon. Acoustic smoked walnut paneling ensures speech privacy, complemented by bespoke basalt tables, fluted glass partitions, and gallery-grade lighting.'
    },
    {
      id: 'residence-ecrin',
      title: 'Residence L\'Écrin',
      category: 'residential',
      categoryLabel: 'Residential Sanctuary',
      location: 'Kalyani Nagar, Pune (Maharashtra)',
      area: '3,900 sq.ft',
      duration: '4 Months',
      materials: 'Smoked Oak, Calacatta Viola Marble, Tactile Bouclé',
      year: '2025',
      image: 'assets/images/projects/project-4-residence-ecrin.jpg',
      headline: 'An intimate, sculpted private suite composed in rich shadowed woods and tactile natural textiles.',
      narrative: 'L\'Écrin is an exploration in restorative stillness. Low-profile platform seating framed in raw linen, acoustic wall padding, and an en-suite dressing salon clad in Calacatta Viola marble create an uncompromising sanctuary for evening unwinding.'
    },
    {
      id: 'coastal-veranda',
      title: 'The Coastal Veranda',
      category: 'villas',
      categoryLabel: 'Turnkey Coastal Villa',
      location: 'Alibaug Coast, Maharashtra',
      area: '8,400 sq.ft',
      duration: '9 Months',
      materials: 'Dhrangadhra Sandstone, Weathered Teak, Terrazzo',
      year: '2024',
      image: 'assets/images/projects/project-5-alibaug-villa.jpg',
      headline: 'A climate-sensitive seaside estate where the boundaries between interior living and tropical landscape dissolve.',
      narrative: 'Deep cantilevered overhangs frame floor-to-ceiling sliding glass portals opening to seaside breezes. Honed riverstone hearths and seamless terrazzo flooring deliver enduring barefoot luxury along the Maharashtra coastline.'
    },
    {
      id: 'quartzite-salon',
      title: 'The Quartzite Salon',
      category: 'kitchens',
      categoryLabel: 'Bespoke Culinary Space',
      location: 'Prabhat Road, Pune (Maharashtra)',
      area: '920 sq.ft',
      duration: '2.5 Months',
      materials: 'Taj Mahal Quartzite, Matte Charcoal Lacquer, Brushed Brass',
      year: '2025',
      image: 'assets/images/projects/project-6-quartzite-salon.jpg',
      headline: 'An architectural culinary space engineered for gourmet living and effortless entertaining.',
      narrative: 'A 4-meter monolithic island of Taj Mahal Quartzite serves as the spatial anchor, integrating flush induction surfaces, concealed prep zones, and whisper-quiet motorized joinery tailored for Indian and European cuisine.'
    }
  ];

  // Portfolio Filter Implementation
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --- 4. Project Modal Handler ---
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');

  const openProjectModal = (projectId) => {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !projectModal) return;

    document.getElementById('modalCategory').textContent = project.categoryLabel;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalHeadline').textContent = project.headline;
    document.getElementById('modalNarrative').textContent = project.narrative;
    document.getElementById('modalLocation').textContent = project.location;
    document.getElementById('modalArea').textContent = project.area;
    document.getElementById('modalDuration').textContent = project.duration;
    document.getElementById('modalMaterials').textContent = project.materials;
    
    const banner = document.getElementById('modalBanner');
    if (banner) {
      banner.src = project.image;
      banner.alt = project.title;
    }

    // Direct WhatsApp Project Inquire Link
    const waInquireBtn = document.getElementById('modalWaInquire');
    if (waInquireBtn) {
      const msg = encodeURIComponent(`Hello RUCHÉ Studio, I saw "${project.title}" (${project.location}) in your portfolio and would like to discuss a similar project.`);
      waInquireBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
    }

    projectModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    projectModal?.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  modalClose?.addEventListener('click', closeModal);
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });

  // Attach click listener to project cards
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-id');
      if (projectId) openProjectModal(projectId);
    });
  });

  // --- 5. Interactive Project Vision Estimator ---
  let selectedType = 'Bespoke Private Villa';
  let selectedScale = '4,000 - 8,000 sq.ft';
  let selectedStyle = 'Warm Minimalist & Natural Travertine';

  const typeButtons = document.querySelectorAll('[data-estimator="type"]');
  const scaleButtons = document.querySelectorAll('[data-estimator="scale"]');
  const styleButtons = document.querySelectorAll('[data-estimator="style"]');
  const estimatorSummary = document.getElementById('estimatorSummaryText');
  const estimatorWaBtn = document.getElementById('estimatorWaBtn');

  const updateEstimator = () => {
    if (estimatorSummary) {
      estimatorSummary.textContent = `${selectedType} • ${selectedScale} • ${selectedStyle}`;
    }
    if (estimatorWaBtn) {
      const message = `Hello RUCHÉ Studio, I've outlined my project vision:\n\n• Type: ${selectedType}\n• Scale: ${selectedScale}\n• Aesthetic: ${selectedStyle}\n\nI would love to arrange an initial architectural consultation.`;
      estimatorWaBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    }
  };

  const setupChoiceGroup = (buttons, onSelect) => {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        onSelect(btn.getAttribute('data-value'));
        updateEstimator();
      });
    });
  };

  setupChoiceGroup(typeButtons, val => { selectedType = val; });
  setupChoiceGroup(scaleButtons, val => { selectedScale = val; });
  setupChoiceGroup(styleButtons, val => { selectedStyle = val; });
  updateEstimator();

  // --- 6. Direct WhatsApp Link Verification ---
  // Ensure all WhatsApp links use the exact required international number
  const allWaLinks = document.querySelectorAll('a[href*="wa.me"]');
  allWaLinks.forEach(link => {
    const currentHref = link.getAttribute('href');
    if (!currentHref.includes(WHATSAPP_PHONE)) {
      link.setAttribute('href', `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_WA_MESSAGE)}`);
    }
  });

  // --- 7. Contact Form Direct Submission ---
  const contactForm = document.getElementById('contactForm');
  const formSuccessBanner = document.getElementById('formSuccessBanner');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value || 'Client';
    const phone = document.getElementById('contactPhone')?.value || '';
    const scope = document.getElementById('contactScope')?.value || 'Interior Design';
    const message = document.getElementById('contactMessage')?.value || '';

    // Create tailored WhatsApp redirect URL
    const fullMessage = `Hello RUCHÉ Studio,\n\nName: ${name}\nPhone: ${phone}\nScope: ${scope}\nMessage: ${message}`;
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(fullMessage)}`;

    if (formSuccessBanner) {
      formSuccessBanner.style.display = 'block';
      formSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Open WhatsApp in new tab after brief visual feedback
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  });
});
