// Client-side Mock & Demo Lead Dataset for Static Deployments (GitHub Pages)

export const INITIAL_DEMO_LEADS = [
  {
    _id: 'demo_lead_001',
    businessName: "Gold's Gym Greater Noida",
    category: 'Gym',
    address: 'Block B, Alpha 1 Commercial Belt, Greater Noida, UP',
    city: 'Greater Noida',
    phone: '+91 98101 23456',
    rating: 4.4,
    reviewCount: 342,
    website: 'https://goldsgym.in/gyms/greater-noida',
    websiteStatus: 'STRONG',
    score: 65,
    scoreClassification: 'WARM',
    stage: 'ENGAGED',
    qualificationSummary: 'Established gym brand with high review volume. Website active but lacks WhatsApp direct booking CTA and membership pricing calculator.',
    aiPersonalizedPitch: 'Hi Gold\'s Gym team, we noticed your Alpha 1 branch has great reviews (4.4★ from 340+ members) but prospective members cannot instantly start a trial on WhatsApp. We can add a high-converting automated enquiry bot to your existing site.',
    digitalPresenceAudit: {
      hasWebsite: true,
      isBroken: false,
      isHttps: true,
      hasMobileViewport: true,
      hasContactForm: true,
      hasWhatsAppCta: false,
      socialLinks: { instagram: 'https://instagram.com/goldsgym', facebook: 'https://facebook.com/goldsgym' }
    }
  },
  {
    _id: 'demo_lead_002',
    businessName: 'Anytime Fitness Alpha 2',
    category: 'Gym',
    address: 'Commercial Plaza, Alpha 2, Greater Noida, UP',
    city: 'Greater Noida',
    phone: '+91 98112 34567',
    rating: 4.6,
    reviewCount: 198,
    website: 'http://anytimefitness-alpha2.temp-portal.in',
    websiteStatus: 'BROKEN',
    score: 85,
    scoreClassification: 'HOT',
    stage: 'CONTACTED',
    qualificationSummary: 'High 4.6★ rating with 198 reviews. Current website link is broken and returning SSL certificate errors. Significant traffic leak.',
    aiPersonalizedPitch: 'Hello Anytime Fitness Alpha 2, your Google listing website button currently leads to an expired domain warning. We can deploy a modern fast landing page to capture walk-in trials within 48 hours.',
    digitalPresenceAudit: {
      hasWebsite: true,
      isBroken: true,
      isHttps: false,
      hasMobileViewport: false,
      hasContactForm: false,
      hasWhatsAppCta: false,
      socialLinks: { instagram: 'https://instagram.com/anytimefitness_alpha2' }
    }
  },
  {
    _id: 'demo_lead_003',
    businessName: 'Spartan Strength Studio',
    category: 'Gym',
    address: 'Shop 14-16, Jagat Farm Market, Gamma 1, Greater Noida, UP',
    city: 'Greater Noida',
    phone: '+91 98730 45678',
    rating: 4.5,
    reviewCount: 112,
    website: '',
    websiteStatus: 'NO_WEBSITE',
    score: 92,
    scoreClassification: 'HOT',
    stage: 'DISCOVERED',
    qualificationSummary: 'High-rated fitness club with zero website presence. Relying solely on Google listing and walk-ins. Prime candidate for a web starter kit.',
    aiPersonalizedPitch: 'Hi Spartan Strength team, you have a solid 4.5★ rating in Jagat Farm, but you don\'t have a website listed on Google. Adding a simple schedule & pricing page will allow student members from Sharda & Galgotias to sign up online.',
    digitalPresenceAudit: {
      hasWebsite: false,
      isBroken: false,
      isHttps: false,
      hasMobileViewport: false,
      hasContactForm: false,
      hasWhatsAppCta: false,
      socialLinks: {}
    }
  },
  {
    _id: 'demo_lead_004',
    businessName: 'SMILE CARE Dental Clinic',
    category: 'Clinic',
    address: 'Shop no. 6, Ghanshyam Plaza, Block A, Ansal Golf Links 1, Greater Noida, UP 201315',
    city: 'Greater Noida',
    phone: '+91 98730 54053',
    rating: 4.6,
    reviewCount: 125,
    website: '',
    websiteStatus: 'NO_WEBSITE',
    score: 88,
    scoreClassification: 'HOT',
    stage: 'MEETING_SCHEDULED',
    qualificationSummary: 'Established 4.6★ dental clinic led by Dr. Bhupendra Singh (16 yrs exp, ex-faculty ITS Dental College). Genuine no-website clinic with high patient volume.',
    aiPersonalizedPitch: 'Dear Dr. Bhupendra Singh, your SMILE CARE Dental clinic in Ansal Golf Links 1 has an exceptional 4.6★ reputation across Greater Noida. However, prospective patients searching online cannot book appointments or view services on a website. We can deploy a dedicated patient appointment booking portal for your clinic.',
    digitalPresenceAudit: {
      hasWebsite: false,
      isBroken: false,
      isHttps: false,
      hasMobileViewport: false,
      hasContactForm: false,
      hasWhatsAppCta: false,
      socialLinks: {}
    }
  },
  {
    _id: 'demo_lead_005',
    businessName: 'Max Care Physiotherapy & Spine Clinic',
    category: 'Clinic',
    address: 'Sector Delta 1, Near Metro Station, Greater Noida, UP',
    city: 'Greater Noida',
    phone: '+91 98188 65432',
    rating: 4.7,
    reviewCount: 88,
    website: 'http://maxcarephysio.in',
    websiteStatus: 'BROKEN',
    score: 88,
    scoreClassification: 'HOT',
    stage: 'CONTACTED',
    qualificationSummary: 'Strong local presence, but website link gives a DNS resolution failure. Missing SSL and mobile responsiveness.',
    aiPersonalizedPitch: 'Hello Max Care team, patients searching for spine & physiotherapy near Delta 1 find your Google listing, but clicking your website results in a blank page. We can fix your website and enable WhatsApp patient consultation.',
    digitalPresenceAudit: {
      hasWebsite: true,
      isBroken: true,
      isHttps: false,
      hasMobileViewport: false,
      hasContactForm: false,
      hasWhatsAppCta: false,
      socialLinks: {}
    }
  },
  {
    _id: 'demo_lead_006',
    businessName: 'Derma Glow Skin & Laser Center',
    category: 'Clinic',
    address: 'Ansal Plaza, Sector Pari Chowk, Greater Noida, UP',
    city: 'Greater Noida',
    phone: '+91 98210 98765',
    rating: 4.8,
    reviewCount: 310,
    website: 'https://dermaglowclinic.com',
    websiteStatus: 'STRONG',
    score: 62,
    scoreClassification: 'WARM',
    stage: 'ENGAGED',
    qualificationSummary: 'Has existing website with SSL, but no online payment or instant dermatologist slot scheduling. Active Instagram presence.',
    aiPersonalizedPitch: 'Hi Derma Glow clinic, we loved your Instagram skin care tips! We can integrate an instant procedure booking calendar into your website so clients don\'t have to call back and forth.',
    digitalPresenceAudit: {
      hasWebsite: true,
      isBroken: false,
      isHttps: true,
      hasMobileViewport: true,
      hasContactForm: true,
      hasWhatsAppCta: true,
      socialLinks: { instagram: 'https://instagram.com/dermaglow_noida' }
    }
  },
  {
    _id: 'demo_lead_007',
    businessName: 'The Urban Spice Bistro',
    category: 'Restaurant',
    address: 'City Center Mall, Sector Gamma 2, Greater Noida, UP',
    city: 'Greater Noida',
    phone: '+91 98115 11223',
    rating: 4.4,
    reviewCount: 420,
    website: '',
    websiteStatus: 'NO_WEBSITE',
    score: 90,
    scoreClassification: 'HOT',
    stage: 'DISCOVERED',
    qualificationSummary: 'Popular dining spot with 420+ reviews. Paying heavy commissions to food aggregators without their own direct ordering or table reservation page.',
    aiPersonalizedPitch: 'Hello Urban Spice Bistro, with 400+ great reviews on Google, you are losing direct customer revenue to food aggregators. We can build a zero-commission digital menu & table reservation web app for you.',
    digitalPresenceAudit: {
      hasWebsite: false,
      isBroken: false,
      isHttps: false,
      hasMobileViewport: false,
      hasContactForm: false,
      hasWhatsAppCta: false,
      socialLinks: {}
    }
  },
  {
    _id: 'demo_lead_008',
    businessName: 'Caffeine & Co. Artisan Bakery',
    category: 'Restaurant',
    address: 'Main Market, Beta 1, Greater Noida, UP',
    city: 'Greater Noida',
    phone: '+91 99100 88776',
    rating: 4.6,
    reviewCount: 260,
    website: 'http://caffeine-and-co.business.site',
    websiteStatus: 'BROKEN',
    score: 86,
    scoreClassification: 'HOT',
    stage: 'CONTACTED',
    qualificationSummary: 'Google Business Site deprecated by Google in 2024. Link currently redirects to Google Maps. Needs independent domain and website.',
    aiPersonalizedPitch: 'Hi Caffeine & Co team, since Google shut down .business.site websites this year, your website button on Google Maps is inactive. We can launch a sleek digital menu showcase on your own custom domain.',
    digitalPresenceAudit: {
      hasWebsite: true,
      isBroken: true,
      isHttps: false,
      hasMobileViewport: false,
      hasContactForm: false,
      hasWhatsAppCta: false,
      socialLinks: { instagram: 'https://instagram.com/caffeine_co' }
    }
  },
  {
    _id: 'demo_lead_009',
    businessName: 'Iron Core Crossfit Club',
    category: 'Gym',
    address: 'Sector Omega 1, Greater Noida, UP',
    city: 'Greater Noida',
    phone: '+91 97111 22334',
    rating: 4.7,
    reviewCount: 84,
    website: '',
    websiteStatus: 'NO_WEBSITE',
    score: 89,
    scoreClassification: 'HOT',
    stage: 'DISCOVERED',
    qualificationSummary: 'Niche CrossFit box with loyal community. No website to display class schedules or coach credentials.',
    aiPersonalizedPitch: 'Hey Iron Core Crossfit, great energy in your gym! We can put together a high-converting class timetable & workout tracker landing page to onboard new members easily.',
    digitalPresenceAudit: {
      hasWebsite: false,
      isBroken: false,
      isHttps: false,
      hasMobileViewport: false,
      hasContactForm: false,
      hasWhatsAppCta: false,
      socialLinks: {}
    }
  },
  {
    _id: 'demo_lead_010',
    businessName: 'Flavors of Awadh Fine Dine',
    category: 'Restaurant',
    address: 'Near Knowledge Park II, Greater Noida, UP',
    city: 'Greater Noida',
    phone: '+91 98110 55443',
    rating: 4.5,
    reviewCount: 380,
    website: 'https://flavorsofawadh.in',
    websiteStatus: 'STRONG',
    score: 64,
    scoreClassification: 'WARM',
    stage: 'DISCOVERED',
    qualificationSummary: 'Has existing website but lacks modern mobile UX and Google Event tracking for banquets/parties.',
    aiPersonalizedPitch: 'Hello Flavors of Awadh, your catering and banquet business could generate 3x more bookings with an interactive party cost estimator on your website.',
    digitalPresenceAudit: {
      hasWebsite: true,
      isBroken: false,
      isHttps: true,
      hasMobileViewport: true,
      hasContactForm: true,
      hasWhatsAppCta: false,
      socialLinks: { facebook: 'https://facebook.com/flavorsofawadh' }
    }
  }
];

// Helper to get local demo leads stored in localStorage
export const getLocalDemoLeads = () => {
  try {
    const raw = localStorage.getItem('pdc_demo_leads');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  // Initialize with default
  localStorage.setItem('pdc_demo_leads', JSON.stringify(INITIAL_DEMO_LEADS));
  return INITIAL_DEMO_LEADS;
};

// Helper to save local demo leads
export const saveLocalDemoLeads = (leads) => {
  localStorage.setItem('pdc_demo_leads', JSON.stringify(leads));
};

// Compute dynamic stats from demo leads
export const getDemoDashboardStats = (leads = getLocalDemoLeads()) => {
  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.scoreClassification === 'HOT' || l.score >= 80).length;
  const warmLeads = leads.filter(l => l.scoreClassification === 'WARM' || (l.score >= 60 && l.score < 80)).length;
  const coldLeads = leads.filter(l => l.scoreClassification === 'COLD' || l.score < 60).length;
  const noWebsiteCount = leads.filter(l => l.websiteStatus === 'NO_WEBSITE' || !l.website).length;
  const brokenWebsiteCount = leads.filter(l => l.websiteStatus === 'BROKEN').length;
  const totalOutreach = leads.filter(l => l.stage !== 'DISCOVERED').length;

  return {
    totalLeads,
    hotLeads,
    warmLeads,
    coldLeads,
    noWebsiteCount,
    brokenWebsiteCount,
    totalOutreach,
    leadsGeneratedToday: 5,
    qualificationRate: totalLeads > 0 ? Math.round(((hotLeads + warmLeads) / totalLeads) * 100) : 0,
    outreachSentCount: totalOutreach,
    repliedCount: Math.round(totalOutreach * 0.4),
    meetingBookedCount: 2,
    closedWonCount: 1,
    charts: {
      categoryBreakdown: [
        { label: 'Gyms', count: leads.filter(l => l.category === 'Gym').length },
        { label: 'Clinics', count: leads.filter(l => l.category === 'Clinic').length },
        { label: 'Restaurants', count: leads.filter(l => l.category === 'Restaurant').length }
      ],
      stageBreakdown: [
        { label: 'Discovered', count: leads.filter(l => l.stage === 'DISCOVERED').length },
        { label: 'Contacted', count: leads.filter(l => l.stage === 'CONTACTED').length },
        { label: 'Engaged', count: leads.filter(l => l.stage === 'ENGAGED').length },
        { label: 'Meeting Scheduled', count: leads.filter(l => l.stage === 'MEETING_SCHEDULED').length },
        { label: 'Won', count: leads.filter(l => l.stage === 'CLOSED_WON').length }
      ],
      scoreDistribution: [
        { range: '80-100 (Hot)', count: hotLeads },
        { range: '60-79 (Warm)', count: warmLeads },
        { range: '0-59 (Cold)', count: coldLeads }
      ]
    }
  };
};

// Simulate a realistic campaign generation locally
export const simulateDemoCampaign = async (formData, onProgress) => {
  const steps = [
    { percent: 15, message: `Querying local discovery engine for ${formData.industry || 'Businesses'} in ${formData.location || 'Local Area'}...` },
    { percent: 35, message: 'Extracted Google business profiles, verified phone numbers and coordinates...' },
    { percent: 60, message: 'Auditing prospective domains: SSL inspection, HTTP status & mobile responsiveness...' },
    { percent: 85, message: 'Running Groq AI qualification engine & formulating customized pitch angles...' },
    { percent: 100, message: 'Campaign completed! Leads saved into CRM database.' }
  ];

  for (const step of steps) {
    if (onProgress) onProgress(step);
    await new Promise(r => setTimeout(r, 650));
  }

  // Generate 5 realistic leads matching the search params
  const ind = formData.industry || 'Gym';
  const loc = formData.location || 'Greater Noida';
  const timestamp = Date.now();

  const generated = [
    {
      _id: `demo_${timestamp}_1`,
      businessName: `FitPro Performance ${ind}`,
      category: ind,
      address: `Block C, Sector 3, ${loc}`,
      city: loc,
      phone: '+91 98111 ' + Math.floor(10000 + Math.random() * 90000),
      rating: 4.6,
      reviewCount: 145,
      website: '',
      websiteStatus: 'NO_WEBSITE',
      score: 91,
      scoreClassification: 'HOT',
      stage: 'DISCOVERED',
      qualificationSummary: `High-performing ${ind} in ${loc} with 145 reviews and zero website. Prime prospect for digital lead generation.`,
      aiPersonalizedPitch: `Hi FitPro team, with a 4.6★ rating in ${loc}, prospective clients are finding you on Google but cannot view pricing or book trials online. We can deploy a dedicated booking site in 48 hours.`,
      digitalPresenceAudit: { hasWebsite: false, isBroken: false, isHttps: false, hasMobileViewport: false, hasContactForm: false, hasWhatsAppCta: false, socialLinks: {} }
    },
    {
      _id: `demo_${timestamp}_2`,
      businessName: `The Wellness ${ind} Hub`,
      category: ind,
      address: `Commercial Arcade, ${loc}`,
      city: loc,
      phone: '+91 98222 ' + Math.floor(10000 + Math.random() * 90000),
      rating: 4.7,
      reviewCount: 220,
      website: `http://wellness-${ind.toLowerCase()}-hub.broken-portal.in`,
      websiteStatus: 'BROKEN',
      score: 87,
      scoreClassification: 'HOT',
      stage: 'DISCOVERED',
      qualificationSummary: `Website link currently returning 404/SSL timeout. Losing valuable Google Search traffic daily.`,
      aiPersonalizedPitch: `Hello Wellness Hub, your Google Maps website link is currently returning a connection error. We can restore your web presence and connect a WhatsApp inquiry button.`,
      digitalPresenceAudit: { hasWebsite: true, isBroken: true, isHttps: false, hasMobileViewport: false, hasContactForm: false, hasWhatsAppCta: false, socialLinks: {} }
    },
    {
      _id: `demo_${timestamp}_3`,
      businessName: `Prime Elite ${ind}`,
      category: ind,
      address: `Near Metro Station, ${loc}`,
      city: loc,
      phone: '+91 98333 ' + Math.floor(10000 + Math.random() * 90000),
      rating: 4.8,
      reviewCount: 310,
      website: '',
      websiteStatus: 'NO_WEBSITE',
      score: 94,
      scoreClassification: 'HOT',
      stage: 'DISCOVERED',
      qualificationSummary: `Top-rated venue in ${loc} with 310 reviews. Completely missing a website. Urgent opportunity.`,
      aiPersonalizedPitch: `Hi Prime Elite, your 4.8★ rating makes you one of the highest-rated in ${loc}. Building an online inquiry system will let you capture direct clients without third-party fees.`,
      digitalPresenceAudit: { hasWebsite: false, isBroken: false, isHttps: false, hasMobileViewport: false, hasContactForm: false, hasWhatsAppCta: false, socialLinks: {} }
    },
    {
      _id: `demo_${timestamp}_4`,
      businessName: `Apex Care & ${ind}`,
      category: ind,
      address: `Main Road, Sector 12, ${loc}`,
      city: loc,
      phone: '+91 98444 ' + Math.floor(10000 + Math.random() * 90000),
      rating: 4.5,
      reviewCount: 88,
      website: `https://apex-${ind.toLowerCase()}.com`,
      websiteStatus: 'STRONG',
      score: 65,
      scoreClassification: 'WARM',
      stage: 'DISCOVERED',
      qualificationSummary: `Website is active and secure, but missing instant WhatsApp CTA and lead capture forms.`,
      aiPersonalizedPitch: `Hi Apex team, your website looks clean but lacks an interactive lead capture CTA. We can add a high-converting WhatsApp chat widget to double your inquiries.`,
      digitalPresenceAudit: { hasWebsite: true, isBroken: false, isHttps: true, hasMobileViewport: true, hasContactForm: false, hasWhatsAppCta: false, socialLinks: {} }
    },
    {
      _id: `demo_${timestamp}_5`,
      businessName: `Urban ${ind} Lounge`,
      category: ind,
      address: `Market Plaza, ${loc}`,
      city: loc,
      phone: '+91 98555 ' + Math.floor(10000 + Math.random() * 90000),
      rating: 4.4,
      reviewCount: 165,
      website: '',
      websiteStatus: 'NO_WEBSITE',
      score: 89,
      scoreClassification: 'HOT',
      stage: 'DISCOVERED',
      qualificationSummary: `Popular local business with no online booking or menu presence. Relies 100% on walk-ins.`,
      aiPersonalizedPitch: `Hello Urban ${ind}, we noticed you don't have a website on Google. We can set up an online presence with instant WhatsApp integration.`,
      digitalPresenceAudit: { hasWebsite: false, isBroken: false, isHttps: false, hasMobileViewport: false, hasContactForm: false, hasWhatsAppCta: false, socialLinks: {} }
    }
  ];

  // Save into demo storage
  const existing = getLocalDemoLeads();
  const merged = [...generated, ...existing];
  saveLocalDemoLeads(merged);

  return {
    campaign: {
      _id: `camp_${timestamp}`,
      name: `${ind} in ${loc}`,
      status: 'COMPLETED',
      targetCount: 5,
      stats: {
        totalFound: 5,
        qualifiedLeads: 5,
        hotLeads: 4,
        warmLeads: 1
      },
      leads: generated
    },
    newLeads: generated
  };
};
