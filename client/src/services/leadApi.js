import api from './api';
import { getLocalDemoLeads, saveLocalDemoLeads } from './mockData';

export const leadApi = {
  getLeads: async (params) => {
    try {
      return await api.get('/leads', { params });
    } catch (err) {
      console.warn('[LeadAPI] Backend unavailable, falling back to local demo leads');
      const allLeads = getLocalDemoLeads();
      let filtered = [...allLeads];

      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(l => 
          l.businessName?.toLowerCase().includes(q) || 
          l.address?.toLowerCase().includes(q) ||
          l.category?.toLowerCase().includes(q)
        );
      }
      if (params?.category && params.category !== 'ALL') {
        filtered = filtered.filter(l => l.category === params.category);
      }
      if (params?.websiteStatus && params.websiteStatus !== 'ALL') {
        filtered = filtered.filter(l => l.websiteStatus === params.websiteStatus);
      }
      if (params?.scoreClassification && params.scoreClassification !== 'ALL') {
        filtered = filtered.filter(l => l.scoreClassification === params.scoreClassification);
      }
      if (params?.stage && params.stage !== 'ALL') {
        filtered = filtered.filter(l => l.stage === params.stage);
      }

      return {
        data: {
          success: true,
          leads: filtered,
          totalLeads: filtered.length,
          pages: 1,
          currentPage: 1,
          isOfflineDemo: true
        }
      };
    }
  },

  getLeadById: async (id) => {
    try {
      return await api.get(`/leads/${id}`);
    } catch (err) {
      const allLeads = getLocalDemoLeads();
      const lead = allLeads.find(l => l._id === id) || allLeads[0];
      return { data: { success: true, lead, isOfflineDemo: true } };
    }
  },

  updateLead: async (id, data) => {
    try {
      return await api.patch(`/leads/${id}`, data);
    } catch (err) {
      const allLeads = getLocalDemoLeads();
      const updated = allLeads.map(l => l._id === id ? { ...l, ...data } : l);
      saveLocalDemoLeads(updated);
      const lead = updated.find(l => l._id === id);
      return { data: { success: true, lead, isOfflineDemo: true } };
    }
  },

  addNote: async (id, text) => {
    try {
      return await api.post(`/leads/${id}/notes`, { text });
    } catch (err) {
      return { data: { success: true, isOfflineDemo: true } };
    }
  },

  analyzeLead: async (id, data = {}) => {
    try {
      return await api.post(`/leads/${id}/analyze`, data);
    } catch (err) {
      return { data: { success: true, isOfflineDemo: true } };
    }
  },

  generatePitch: async (id) => {
    try {
      return await api.post(`/leads/${id}/generate-pitch`);
    } catch (err) {
      const allLeads = getLocalDemoLeads();
      const lead = allLeads.find(l => l._id === id);
      return {
        data: {
          success: true,
          pitch: lead?.aiPersonalizedPitch || 'Hi! We noticed key conversion gaps in your online presence and can help you increase walk-in leads.',
          isOfflineDemo: true
        }
      };
    }
  },

  bulkUpdateStage: async (leadIds, stage) => {
    try {
      return await api.post('/leads/bulk-stage', { leadIds, stage });
    } catch (err) {
      const allLeads = getLocalDemoLeads();
      const updated = allLeads.map(l => leadIds.includes(l._id) ? { ...l, stage } : l);
      saveLocalDemoLeads(updated);
      return { data: { success: true, modifiedCount: leadIds.length, isOfflineDemo: true } };
    }
  },

  deleteLead: async (id) => {
    try {
      return await api.delete(`/leads/${id}`);
    } catch (err) {
      const allLeads = getLocalDemoLeads();
      const filtered = allLeads.filter(l => l._id !== id);
      saveLocalDemoLeads(filtered);
      return { data: { success: true, isOfflineDemo: true } };
    }
  },

  exportLeads: async (params) => {
    try {
      return await api.get('/leads/export', { params, responseType: 'blob' });
    } catch (err) {
      // Create client-side CSV export
      const leads = getLocalDemoLeads();
      const headers = ['Business Name', 'Category', 'Address', 'Phone', 'Rating', 'Reviews', 'Website', 'Website Status', 'PDC Score', 'Stage'];
      const rows = leads.map(l => [
        `"${l.businessName || ''}"`,
        `"${l.category || ''}"`,
        `"${l.address || ''}"`,
        `"${l.phone || ''}"`,
        l.rating || '',
        l.reviewCount || '',
        `"${l.website || ''}"`,
        l.websiteStatus || '',
        l.score || '',
        l.stage || ''
      ]);
      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      return { data: blob, isOfflineDemo: true };
    }
  }
};
