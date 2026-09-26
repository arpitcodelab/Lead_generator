import api from './api';
import { leadApi } from './leadApi';
import { campaignApi } from './campaignApi';
import { getDemoDashboardStats, getLocalDemoLeads } from './mockData';

export const auditApi = {
  auditUrl: async (url) => {
    try {
      return await api.post('/audit', { url });
    } catch (err) {
      console.warn('[AuditAPI] Backend offline, generating simulated client-side audit for:', url);
      const isHttps = url.toLowerCase().startsWith('https');
      const isGoogleSite = url.includes('business.site');
      const isLocalHost = url.includes('localhost') || url.includes('.test');
      
      const status = isGoogleSite ? 'BROKEN' : (isLocalHost ? 'BROKEN' : 'STRONG');
      return {
        data: {
          success: true,
          url,
          status,
          isOfflineDemo: true,
          audit: {
            url,
            status,
            reachable: !isGoogleSite && !isLocalHost,
            statusCode: isGoogleSite ? 404 : 200,
            hasSsl: isHttps,
            mobileFriendly: true,
            hasContactForm: true,
            hasWhatsAppCta: false,
            socialLinks: {
              instagram: 'https://instagram.com/sample_business',
              facebook: 'https://facebook.com/sample_business'
            },
            conversionGaps: isGoogleSite ? [
              'Domain was deprecated by Google Business Sites in 2024',
              'Missing custom branded domain',
              'Missing online lead capture CTA'
            ] : [
              'No instant WhatsApp booking CTA',
              'Missing pricing / service menu transparency',
              'Lacks customer testimonial video integration'
            ],
            recommendedPitches: [
              'Highlighting conversion loss from lack of direct WhatsApp inquiry bot',
              'Offer rapid 48-hour mobile-optimized landing page deployment'
            ]
          }
        }
      };
    }
  }
};

export const outreachApi = {
  getOutreaches: async (params) => {
    try {
      return await api.get('/outreach', { params });
    } catch (err) {
      return {
        data: {
          success: true,
          outreaches: [
            {
              _id: 'outreach_1',
              channel: 'WHATSAPP',
              status: 'SENT',
              recipient: '+91 98112 34567',
              businessName: 'Anytime Fitness Alpha 2',
              messageText: 'Hello Anytime Fitness Alpha 2! We noticed your website link on Google has a connection error. We can fix this within 48h.',
              sentAt: new Date(Date.now() - 3600000).toISOString()
            },
            {
              _id: 'outreach_2',
              channel: 'INSTAGRAM_DM',
              status: 'REPLIED',
              recipient: '@smilecraft_dental',
              businessName: 'Smile Craft Multispeciality Dental',
              messageText: 'Dear Smile Craft team, we love your reviews! We can help connect an online appointment booker directly.',
              sentAt: new Date(Date.now() - 7200000).toISOString()
            }
          ],
          isOfflineDemo: true
        }
      };
    }
  },
  createOutreach: (data) => api.post('/outreach', data),
  updateOutreach: (id, data) => api.patch(`/outreach/${id}`, data)
};

export const dashboardApi = {
  getStats: async () => {
    try {
      return await api.get('/dashboard/stats');
    } catch (err) {
      console.warn('[DashboardAPI] Backend offline, returning local demo stats');
      const stats = getDemoDashboardStats();
      return {
        data: {
          success: true,
          stats,
          charts: stats.charts,
          isOfflineDemo: true
        }
      };
    }
  }
};

export const settingsApi = {
  getSettings: async () => {
    try {
      return await api.get('/settings');
    } catch (err) {
      return {
        data: {
          success: true,
          isOfflineDemo: true,
          settings: {
            googleApiKeyConfigured: false,
            aiApiKeyConfigured: false,
            aiProvider: 'rule-engine',
            aiModel: 'gpt-4o-mini',
            defaultMinRating: 4.0,
            defaultMinReviews: 20,
            leadScoreRules: {
              noWebsite: 30,
              brokenWebsite: 25,
              activeInstagram: 15,
              highReviewCount: 10,
              strongGoogleRating: 10,
              noEnquiryCta: 10,
              noPricingOrMembership: 5,
              noWhatsAppCta: 5,
              strongExistingWebsite: -30,
              thresholdHot: 80
            }
          }
        }
      };
    }
  },
  updateSettings: (data) => api.patch('/settings', data),
  triggerSeed: async () => {
    try {
      return await api.post('/settings/seed');
    } catch (err) {
      localStorage.removeItem('pdc_demo_leads');
      getLocalDemoLeads();
      return {
        data: {
          success: true,
          result: { message: 'Reset and re-initialized 10 offline demo leads successfully!' },
          isOfflineDemo: true
        }
      };
    }
  }
};

export const logsApi = {
  getLogs: async (params) => {
    try {
      return await api.get('/logs', { params });
    } catch (err) {
      return {
        data: {
          success: true,
          logs: [
            { _id: 'log_1', type: 'CAMPAIGN', action: 'DISCOVERY_COMPLETED', message: 'Demo campaign populated 5 leads in Greater Noida', createdAt: new Date().toISOString() },
            { _id: 'log_2', type: 'SYSTEM', action: 'STATIC_HOST_DETECTED', message: 'Running on GitHub Pages static deployment mode', createdAt: new Date().toISOString() }
          ],
          isOfflineDemo: true
        }
      };
    }
  },
  clearLogs: () => api.delete('/logs')
};

export { leadApi, campaignApi };
