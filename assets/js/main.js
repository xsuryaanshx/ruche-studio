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

  // --- 3. Portfolio Project Data, Filter & Instagram Mobile Carousel ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const portfolioGrid = document.querySelector('.portfolio-editorial-grid');
  const carouselDotsWrap = document.getElementById('portfolioCarouselDots');
  const carouselPrevBtn = document.getElementById('portfolioCarouselPrev');
  const carouselNextBtn = document.getElementById('portfolioCarouselNext');

  const getVisibleProjectCards = () => {
    return projectCards.filter(card => card.style.display !== 'none');
  };

  const updateCarouselDotsAndBadges = () => {
    if (!carouselDotsWrap || !portfolioGrid) return;
    const visibleCards = getVisibleProjectCards();
    const total = visibleCards.length;

    // Update Instagram Slide Badges (e.g., 1 / 6)
    visibleCards.forEach((card, idx) => {
      const badge = card.querySelector('.insta-counter-badge');
      if (badge) {
        badge.innerHTML = `<span>${idx + 1}</span> / <span>${total}</span>`;
      }
    });

    // Rebuild pagination dots
    carouselDotsWrap.innerHTML = '';
    visibleCards.forEach((card, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('type', 'button');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to property ${idx + 1} of ${total}`);
      dot.addEventListener('click', () => {
        const targetLeft = card.offsetLeft - portfolioGrid.offsetLeft;
        portfolioGrid.scrollTo({ left: targetLeft, behavior: 'smooth' });
      });
      carouselDotsWrap.appendChild(dot);
    });
  };

  // Real-time scroll listener for snapping and dot active state
  let scrollTicking = false;
  const onCarouselScroll = () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const visibleCards = getVisibleProjectCards();
        if (visibleCards.length && portfolioGrid && carouselDotsWrap) {
          const scrollLeft = portfolioGrid.scrollLeft;
          let closestIdx = 0;
          let minDiff = Infinity;

          visibleCards.forEach((card, idx) => {
            const offset = card.offsetLeft - portfolioGrid.offsetLeft;
            const diff = Math.abs(offset - scrollLeft);
            if (diff < minDiff) {
              minDiff = diff;
              closestIdx = idx;
            }
          });

          const dots = carouselDotsWrap.querySelectorAll('.carousel-dot');
          dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === closestIdx);
          });
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };

  if (portfolioGrid) {
    portfolioGrid.addEventListener('scroll', onCarouselScroll, { passive: true });
  }

  // Prev / Next Navigation Arrows
  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', () => {
      const visibleCards = getVisibleProjectCards();
      if (!visibleCards.length || !portfolioGrid) return;
      const scrollLeft = portfolioGrid.scrollLeft;
      let currentIdx = 0;
      let minDiff = Infinity;

      visibleCards.forEach((card, idx) => {
        const offset = card.offsetLeft - portfolioGrid.offsetLeft;
        const diff = Math.abs(offset - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          currentIdx = idx;
        }
      });

      const prevIdx = Math.max(0, currentIdx - 1);
      const targetLeft = visibleCards[prevIdx].offsetLeft - portfolioGrid.offsetLeft;
      portfolioGrid.scrollTo({ left: targetLeft, behavior: 'smooth' });
    });
  }

  if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', () => {
      const visibleCards = getVisibleProjectCards();
      if (!visibleCards.length || !portfolioGrid) return;
      const scrollLeft = portfolioGrid.scrollLeft;
      let currentIdx = 0;
      let minDiff = Infinity;

      visibleCards.forEach((card, idx) => {
        const offset = card.offsetLeft - portfolioGrid.offsetLeft;
        const diff = Math.abs(offset - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          currentIdx = idx;
        }
      });

      const nextIdx = Math.min(visibleCards.length - 1, currentIdx + 1);
      const targetLeft = visibleCards[nextIdx].offsetLeft - portfolioGrid.offsetLeft;
      portfolioGrid.scrollTo({ left: targetLeft, behavior: 'smooth' });
    });
  }

  // Portfolio Filter Implementation
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

      // Rewind carousel and update dynamic dots
      if (portfolioGrid) {
        portfolioGrid.scrollTo({ left: 0, behavior: 'smooth' });
      }
      setTimeout(updateCarouselDotsAndBadges, 270);
    });
  });

  // Initial setup of dots
  updateCarouselDotsAndBadges();

  // --- 4. Project Modal Handler & Touch-Safe Gestures ---
  let isDraggingCarousel = false;
  let dragStartX = 0;
  let dragStartY = 0;

  if (portfolioGrid) {
    portfolioGrid.addEventListener('touchstart', (e) => {
      isDraggingCarousel = false;
      if (e.touches && e.touches[0]) {
        dragStartX = e.touches[0].clientX;
        dragStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    portfolioGrid.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        const dx = Math.abs(e.touches[0].clientX - dragStartX);
        const dy = Math.abs(e.touches[0].clientY - dragStartY);
        if (dx > 10 || dy > 10) {
          isDraggingCarousel = true;
        }
      }
    }, { passive: true });

    portfolioGrid.addEventListener('mousedown', (e) => {
      isDraggingCarousel = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    });

    portfolioGrid.addEventListener('mousemove', (e) => {
      const dx = Math.abs(e.clientX - dragStartX);
      const dy = Math.abs(e.clientY - dragStartY);
      if (dx > 10 || dy > 10) {
        isDraggingCarousel = true;
      }
    });
  }

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

  // Attach click listener to project cards (preventing false clicks on swipe)
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      if (isDraggingCarousel) return;
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

  // --- 8. Live Spatial Transformation & Staging Studio ---
  const stagingData = {
    sofa: {
      id: 'sofa',
      title: 'The Pierre Curved Bouclé Sectional',
      category: 'Atelier Furniture',
      maker: 'RUCHÉ Atelier Commission',
      materials: 'Belgian Wool Bouclé • White Oak Frame',
      leadTime: 'Bespoke Scale • 6 Weeks',
      thumb: 'assets/images/staging/thumb-sofa.jpg',
      desc: 'Sculpted with low-slung European proportions, anchoring acoustic warmth and tactile comfort in the central gathering volume.',
      waText: 'Hello RUCHÉ Studio, I am inquiring about the Pierre Curved Bouclé Sectional from your Live Staging Studio.'
    },
    shelving: {
      id: 'shelving',
      title: 'Recessed White Oak Shelving Niche',
      category: 'Architectural Joinery',
      maker: 'Master Millwork Atelier',
      materials: 'European White Oak • Natural Matte Oil',
      leadTime: 'Integrated Turnkey',
      thumb: 'assets/images/staging/thumb-shelving.jpg',
      desc: 'Integrated recessed niches providing seamless architectural rhythm, framed by soft Venetian plaster and curated bespoke ceramics.',
      waText: 'Hello RUCHÉ Studio, I am inquiring about the Recessed White Oak Shelving Niche joinery from your Live Staging Studio.'
    },
    art: {
      id: 'art',
      title: 'Textured Ochre & Bone Canvas',
      category: 'Commissioned Artwork',
      maker: 'Studio Art Curation',
      materials: 'Mineral Pigments on Raw Linen',
      leadTime: 'Original Commission',
      thumb: 'assets/images/staging/thumb-art.jpg',
      desc: 'Large-scale textured abstract work capturing the warm, tactile materiality of travertine and raw clay under changing ambient sunlight.',
      waText: 'Hello RUCHÉ Studio, I am inquiring about the Textured Ochre & Bone Canvas art curation from your Live Staging Studio.'
    },
    credenza: {
      id: 'credenza',
      title: 'Fluted Ebonized Oak Credenza',
      category: 'Bespoke Millwork',
      maker: 'RUCHÉ Atelier Craft',
      materials: 'Fluted Charcoal Oak • Nero Plinth',
      leadTime: 'Custom Dimensioned',
      thumb: 'assets/images/staging/thumb-credenza.jpg',
      desc: 'Tactile vertical fluting with hidden soft-close push latches, grounding the central wall plane with quiet textural depth.',
      waText: 'Hello RUCHÉ Studio, I am inquiring about the Fluted Ebonized Oak Credenza from your Live Staging Studio.'
    },
    table: {
      id: 'table',
      title: 'European White Oak Low Plinth Table',
      category: 'Artisanal Table',
      maker: 'Custom Woodcraft',
      materials: 'Solid Quarter-Sawn White Oak',
      leadTime: 'Handmade to Order',
      thumb: 'assets/images/staging/thumb-table.jpg',
      desc: 'Monolithic low-profile coffee table with chamfered slab joinery, serving as the central organic gathering hearth.',
      waText: 'Hello RUCHÉ Studio, I am inquiring about the European White Oak Low Plinth Table from your Live Staging Studio.'
    },
    lamp: {
      id: 'lamp',
      title: 'Tripod Luminaire in Patinated Brass',
      category: 'Sculptural Lighting',
      maker: 'Architectural Lighting Spec',
      materials: 'Patinated Brass • Belgian Oatmeal Linen',
      leadTime: 'Atelier Edition',
      thumb: 'assets/images/staging/thumb-lamp.jpg',
      desc: 'Sculptural tripod floor luminaire diffusing warm 2400K architectural ambient light across evening living conversations.',
      waText: 'Hello RUCHÉ Studio, I am inquiring about the Tripod Luminaire in Patinated Brass from your Live Staging Studio.'
    },
    glazing: {
      id: 'glazing',
      title: 'Steel French Crittall Glazing',
      category: 'Architectural Enclosure',
      maker: 'Engineered Precision',
      materials: 'Thermally-Broken Steel • Low-E Glass',
      leadTime: 'Turnkey Architectural',
      thumb: 'assets/images/staging/thumb-glazing.jpg',
      desc: 'Floor-to-ceiling slender steel multi-pane glazing connecting the interior sanctuary with the dappled outdoor private terrace.',
      waText: 'Hello RUCHÉ Studio, I am inquiring about the Steel French Crittall Glazing specification from your Live Staging Studio.'
    }
  };

  const stagingFrame = document.getElementById('stagingDeviceFrame');
  const stagingViewport = document.getElementById('stagingViewport');
  const stagingBeforeLayer = document.getElementById('stagingBeforeLayer');
  const stagingBeforeImg = document.getElementById('stagingBeforeImg');
  const stagingSliderDivider = document.getElementById('stagingSliderDivider');
  const stagingSliderHandle = document.getElementById('stagingSliderHandle');
  const btnModeHotspots = document.getElementById('btnModeHotspots');
  const btnModeCompare = document.getElementById('btnModeCompare');
  const dockToggleCompare = document.getElementById('dockToggleCompare');
  const dockToggleText = document.getElementById('dockToggleText');
  const dockHintText = document.getElementById('dockHintText');
  const popoverCard = document.getElementById('stagingPopoverCard');
  const popoverCloseBtn = document.getElementById('popoverCloseBtn');
  const popoverThumb = document.getElementById('popoverThumb');
  const popoverCategory = document.getElementById('popoverCategory');
  const popoverMaker = document.getElementById('popoverMaker');
  const popoverTitle = document.getElementById('popoverTitle');
  const popoverMaterials = document.getElementById('popoverMaterials');
  const popoverLeadTime = document.getElementById('popoverLeadTime');
  const popoverDesc = document.getElementById('popoverDesc');
  const popoverWaBtn = document.getElementById('popoverWaBtn');
  const popoverSaveBtn = document.getElementById('popoverSaveBtn');
  const popoverSaveText = document.getElementById('popoverSaveText');
  const dockPaletteBtn = document.getElementById('dockPaletteBtn');
  const paletteCountBadge = document.getElementById('paletteCount');
  const paletteDrawerModal = document.getElementById('paletteDrawerModal');
  const paletteDrawerClose = document.getElementById('paletteDrawerClose');
  const paletteDrawerBackdrop = document.getElementById('paletteDrawerBackdrop');
  const paletteDrawerItems = document.getElementById('paletteDrawerItems');
  const paletteDrawerWaBtn = document.getElementById('paletteDrawerWaBtn');
  const presetButtons = document.querySelectorAll('.preset-btn, .staging-state-badge');
  const hotspots = document.querySelectorAll('.staging-hotspot');

  let currentMode = 'hotspots'; // 'hotspots' | 'compare'
  let sliderPosition = 50; // percentage
  let isDragging = false;
  let activeHotspotId = null;
  const savedPaletteIds = new Set();

  // Set default initial frame mode class
  stagingFrame?.classList.add('mode-hotspots');

  // Synchronize before image full width to prevent distortion inside clipped container
  const syncImageDimensions = () => {
    if (stagingViewport && stagingBeforeImg) {
      const vpWidth = stagingViewport.clientWidth;
      stagingBeforeImg.style.width = `${vpWidth}px`;
    }
  };
  window.addEventListener('resize', syncImageDimensions, { passive: true });
  setTimeout(syncImageDimensions, 100);

  // Set slider percentage position
  const setSliderPosition = (pct, animate = false) => {
    sliderPosition = Math.max(0, Math.min(100, pct));
    if (stagingBeforeLayer && stagingSliderDivider) {
      if (animate) {
        stagingBeforeLayer.style.transition = 'width 0.35s cubic-bezier(0.22, 1, 0.36, 1)';
        stagingSliderDivider.style.transition = 'left 0.35s cubic-bezier(0.22, 1, 0.36, 1)';
        setTimeout(() => {
          stagingBeforeLayer.style.transition = '';
          stagingSliderDivider.style.transition = '';
        }, 360);
      }
      stagingBeforeLayer.style.width = `${sliderPosition}%`;
      stagingSliderDivider.style.left = `${sliderPosition}%`;
      stagingSliderHandle?.setAttribute('aria-valuenow', Math.round(sliderPosition));
    }

    // Update active preset button
    presetButtons.forEach(btn => {
      const pVal = parseInt(btn.getAttribute('data-preset'), 10);
      if (Math.abs(pVal - sliderPosition) < 6) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  };

  // Switch between Hotspot Mode and Compare Mode
  const setStagingMode = (mode) => {
    currentMode = mode;
    closePopover();

    if (mode === 'compare') {
      stagingFrame?.classList.remove('mode-hotspots');
      stagingFrame?.classList.add('mode-compare');
      btnModeCompare?.classList.add('active');
      btnModeCompare?.setAttribute('aria-selected', 'true');
      btnModeHotspots?.classList.remove('active');
      btnModeHotspots?.setAttribute('aria-selected', 'false');

      if (dockToggleText) dockToggleText.textContent = 'Exit Compare';
      const iconCompare = dockToggleCompare?.querySelector('.dock-toggle-icon-compare');
      const iconExit = dockToggleCompare?.querySelector('.dock-toggle-icon-exit');
      if (iconCompare) iconCompare.style.display = 'none';
      if (iconExit) iconExit.style.display = 'inline-block';

      if (dockHintText) dockHintText.textContent = 'Drag central divider to reveal spatial transformation';
      syncImageDimensions();
      setSliderPosition(50, true);
    } else {
      stagingFrame?.classList.remove('mode-compare');
      stagingFrame?.classList.add('mode-hotspots');
      btnModeHotspots?.classList.add('active');
      btnModeHotspots?.setAttribute('aria-selected', 'true');
      btnModeCompare?.classList.remove('active');
      btnModeCompare?.setAttribute('aria-selected', 'false');

      if (dockToggleText) dockToggleText.textContent = 'Compare Images';
      const iconCompare = dockToggleCompare?.querySelector('.dock-toggle-icon-compare');
      const iconExit = dockToggleCompare?.querySelector('.dock-toggle-icon-exit');
      if (iconCompare) iconCompare.style.display = 'inline-block';
      if (iconExit) iconExit.style.display = 'none';

      if (dockHintText) dockHintText.textContent = 'Click any element pin to inspect architectural materiality';
    }
  };

  btnModeHotspots?.addEventListener('click', () => setStagingMode('hotspots'));
  btnModeCompare?.addEventListener('click', () => setStagingMode('compare'));
  dockToggleCompare?.addEventListener('click', () => {
    setStagingMode(currentMode === 'hotspots' ? 'compare' : 'hotspots');
  });

  // Slider Dragging Logic
  const handleDrag = (clientX) => {
    if (!stagingViewport) return;
    const rect = stagingViewport.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setSliderPosition(pct);
  };

  const startDrag = (e) => {
    if (currentMode !== 'compare') return;
    isDragging = true;
    stagingSliderHandle?.classList.add('is-dragging');
    document.body.style.userSelect = 'none';
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    handleDrag(clientX);
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    handleDrag(clientX);
  };

  const stopDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    stagingSliderHandle?.classList.remove('is-dragging');
    document.body.style.userSelect = '';
  };

  stagingSliderHandle?.addEventListener('mousedown', startDrag);
  stagingSliderHandle?.addEventListener('touchstart', startDrag, { passive: true });

  stagingViewport?.addEventListener('mousedown', (e) => {
    if (currentMode === 'compare' && !e.target.closest('.staging-dock-bar')) {
      startDrag(e);
    }
  });
  stagingViewport?.addEventListener('touchstart', (e) => {
    if (currentMode === 'compare' && !e.target.closest('.staging-dock-bar')) {
      startDrag(e);
    }
  }, { passive: true });

  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('touchmove', onDragMove, { passive: true });
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchend', stopDrag);

  // Keyboard navigation for slider handle
  stagingSliderHandle?.addEventListener('keydown', (e) => {
    if (currentMode !== 'compare') return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition(sliderPosition - 5, true);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition(sliderPosition + 5, true);
    }
  });

  // Preset buttons & Interactive Badges
  presetButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentMode !== 'compare') {
        setStagingMode('compare');
      }
      const preset = parseInt(btn.getAttribute('data-preset'), 10);
      if (!isNaN(preset)) {
        setSliderPosition(preset, true);
      }
    });
  });

  // Hotspot Popover Logic
  const openPopover = (hotspotEl, id) => {
    const item = stagingData[id];
    if (!item || !popoverCard || !stagingViewport) return;

    activeHotspotId = id;
    hotspots.forEach(h => h.classList.remove('is-active'));
    hotspotEl.classList.add('is-active');

    // Populate data
    if (popoverThumb) popoverThumb.src = item.thumb;
    if (popoverCategory) popoverCategory.textContent = item.category;
    if (popoverMaker) popoverMaker.textContent = item.maker;
    if (popoverTitle) popoverTitle.textContent = item.title;
    if (popoverMaterials) popoverMaterials.textContent = item.materials;
    if (popoverLeadTime) popoverLeadTime.textContent = item.leadTime;
    if (popoverDesc) popoverDesc.textContent = item.desc;
    if (popoverWaBtn) {
      popoverWaBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(item.waText)}`;
    }

    // Update Save button state
    updatePopoverSaveButton(id);

    // Dynamic positioning relative to viewport
    const vpRect = stagingViewport.getBoundingClientRect();
    const hsRect = hotspotEl.getBoundingClientRect();
    const hsX = hsRect.left - vpRect.left + hsRect.width / 2;
    const hsY = hsRect.top - vpRect.top + hsRect.height / 2;

    const isRightHalf = hsX > vpRect.width * 0.52;
    const isBottomHalf = hsY > vpRect.height * 0.65;

    // Reset styles
    popoverCard.style.left = '';
    popoverCard.style.right = '';
    popoverCard.style.top = '';
    popoverCard.style.bottom = '';

    if (window.innerWidth > 640) {
      if (isRightHalf) {
        popoverCard.style.right = `${vpRect.width - hsX + 16}px`;
      } else {
        popoverCard.style.left = `${hsX + 16}px`;
      }

      if (isBottomHalf) {
        popoverCard.style.bottom = `${Math.max(16, vpRect.height - hsY - 20)}px`;
      } else {
        popoverCard.style.top = `${Math.max(16, hsY - 40)}px`;
      }
    }

    popoverCard.classList.add('is-visible');
    popoverCard.setAttribute('aria-hidden', 'false');
  };

  const closePopover = () => {
    popoverCard?.classList.remove('is-visible');
    popoverCard?.setAttribute('aria-hidden', 'true');
    hotspots.forEach(h => h.classList.remove('is-active'));
    activeHotspotId = null;
  };

  popoverCloseBtn?.addEventListener('click', closePopover);

  hotspots.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (activeHotspotId === id && popoverCard?.classList.contains('is-visible')) {
        closePopover();
      } else {
        openPopover(btn, id);
      }
    });
  });

  // Close popover when clicking outside
  document.addEventListener('click', (e) => {
    if (popoverCard?.classList.contains('is-visible') && 
        !e.target.closest('#stagingPopoverCard') && 
        !e.target.closest('.staging-hotspot')) {
      closePopover();
    }
  });

  // Palette Save Feature
  const updatePaletteBadge = () => {
    if (paletteCountBadge) {
      paletteCountBadge.textContent = savedPaletteIds.size;
    }
  };

  const updatePopoverSaveButton = (id) => {
    if (!popoverSaveBtn || !popoverSaveText) return;
    if (savedPaletteIds.has(id)) {
      popoverSaveBtn.classList.add('btn-primary');
      popoverSaveBtn.classList.remove('btn-outline');
      popoverSaveText.textContent = 'Saved in Palette ✓';
    } else {
      popoverSaveBtn.classList.remove('btn-primary');
      popoverSaveBtn.classList.add('btn-outline');
      popoverSaveText.textContent = 'Save to Palette';
    }
  };

  popoverSaveBtn?.addEventListener('click', () => {
    if (!activeHotspotId) return;
    if (savedPaletteIds.has(activeHotspotId)) {
      savedPaletteIds.delete(activeHotspotId);
    } else {
      savedPaletteIds.add(activeHotspotId);
    }
    updatePopoverSaveButton(activeHotspotId);
    updatePaletteBadge();
    renderPaletteDrawer();
  });

  // Curated Palette Drawer Modal
  const renderPaletteDrawer = () => {
    if (!paletteDrawerItems) return;
    if (savedPaletteIds.size === 0) {
      paletteDrawerItems.innerHTML = `
        <div class="palette-empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p style="font-weight: 500; font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--color-primary);">No specifications collected yet</p>
          <p style="font-size: 0.88rem;">Click on any interactive hotspot in the Staging Studio and tap "Save to Palette" to assemble your custom curation.</p>
        </div>
      `;
      if (paletteDrawerWaBtn) {
        paletteDrawerWaBtn.style.display = 'none';
      }
      return;
    }

    let itemsHtml = '';
    const itemTitles = [];
    savedPaletteIds.forEach(id => {
      const item = stagingData[id];
      if (item) {
        itemTitles.push(`• ${item.title} (${item.materials})`);
        itemsHtml += `
          <div class="palette-item-row" data-id="${item.id}">
            <div class="palette-item-info">
              <img src="${item.thumb}" alt="${item.title}" class="palette-item-img">
              <div>
                <div class="palette-item-title">${item.title}</div>
                <div class="palette-item-meta">${item.category} • ${item.materials}</div>
              </div>
            </div>
            <button type="button" class="palette-item-remove" data-remove-id="${item.id}" aria-label="Remove item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        `;
      }
    });

    paletteDrawerItems.innerHTML = itemsHtml;

    // Attach remove handlers
    const removeButtons = paletteDrawerItems.querySelectorAll('[data-remove-id]');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const idToRemove = btn.getAttribute('data-remove-id');
        savedPaletteIds.delete(idToRemove);
        updatePaletteBadge();
        if (activeHotspotId === idToRemove) {
          updatePopoverSaveButton(idToRemove);
        }
        renderPaletteDrawer();
      });
    });

    if (paletteDrawerWaBtn) {
      paletteDrawerWaBtn.style.display = 'inline-flex';
      const msg = `Hello RUCHÉ Studio, I've curated the following specifications from the Interactive Staging Studio:\n\n${itemTitles.join('\n')}\n\nI would love to inquire about integrating these into my residence.`;
      paletteDrawerWaBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    }
  };

  const togglePaletteDrawer = (open) => {
    const shouldOpen = open !== undefined ? open : !paletteDrawerModal?.classList.contains('is-active');
    if (shouldOpen) {
      renderPaletteDrawer();
      paletteDrawerModal?.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    } else {
      paletteDrawerModal?.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  };

  dockPaletteBtn?.addEventListener('click', () => togglePaletteDrawer(true));
  paletteDrawerClose?.addEventListener('click', () => togglePaletteDrawer(false));
  paletteDrawerBackdrop?.addEventListener('click', () => togglePaletteDrawer(false));
});

