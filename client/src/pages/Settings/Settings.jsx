import React, { useState, useEffect } from 'react';
import { settingsApi } from '../../services/serviceIndex';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import {
  FiSettings,
  FiKey,
  FiCpu,
  FiSliders,
  FiSave,
  FiDatabase,
  FiCheckCircle,
  FiAlertCircle,
  FiShield,
  FiServer,
  FiWifi,
  FiRefreshCw
} from 'react-icons/fi';
import { getApiBaseUrl, setApiBaseUrl, checkHealth } from '../../services/api';

export const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // Backend API URL Configuration
  const [apiUrl, setApiUrl] = useState(getApiBaseUrl());
  const [testingApi, setTestingApi] = useState(false);
  const [apiTestStatus, setApiTestStatus] = useState(null);

  // Form states
  const [googleApiKey, setGoogleApiKey] = useState('');
  const [aiProvider, setAiProvider] = useState('rule-engine');
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiModel, setAiModel] = useState('gpt-4o-mini');
  const [leadScoreRules, setLeadScoreRules] = useState({});
  const [defaultMinRating, setDefaultMinRating] = useState(4.0);
  const [defaultMinReviews, setDefaultMinReviews] = useState(20);

  const { addToast } = useToast();
  const { isAdmin } = useAuth();

  const handleTestApi = async () => {
    setTestingApi(true);
    setApiTestStatus(null);
    try {
      setApiBaseUrl(apiUrl);
      const health = await checkHealth();
      if (health.isOnline) {
        setApiTestStatus({ success: true, message: `Connected! (${health.service})` });
        addToast('Backend API connected successfully!', 'success');
      } else {
        setApiTestStatus({ success: false, message: `Offline: Cannot reach ${apiUrl || '/api'}. Check URL or CORS.` });
        addToast('Could not connect to backend server', 'error');
      }
    } finally {
      setTestingApi(false);
    }
  };

  const handleSaveApiUrl = (e) => {
    e?.preventDefault();
    setApiBaseUrl(apiUrl);
    addToast(`Backend API URL saved: ${apiUrl || '/api'}`, 'success');
    handleTestApi();
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await settingsApi.getSettings();
        if (res.data?.success) {
          const s = res.data.settings;
          setSettings(s);
          setAiProvider(s.aiProvider || 'rule-engine');
          setAiModel(s.aiModel || 'gpt-4o-mini');
          setLeadScoreRules(s.leadScoreRules || {});
          setDefaultMinRating(s.defaultMinRating || 4.0);
          setDefaultMinReviews(s.defaultMinReviews || 20);
        }
      } catch (err) {
        addToast('Failed to load settings', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [addToast]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        aiProvider,
        aiModel,
        leadScoreRules,
        defaultMinRating: Number(defaultMinRating),
        defaultMinReviews: Number(defaultMinReviews)
      };

      if (googleApiKey.trim()) payload.googleApiKey = googleApiKey.trim();
      if (aiApiKey.trim()) payload.aiApiKey = aiApiKey.trim();

      await settingsApi.updateSettings(payload);
      addToast('System settings saved successfully!', 'success');
      setGoogleApiKey('');
      setAiApiKey('');
      
      // Refresh
      const ref = await settingsApi.getSettings();
      if (ref.data?.success) setSettings(ref.data.settings);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleTriggerSeed = async () => {
    setSeeding(true);
    try {
      const res = await settingsApi.triggerSeed();
      addToast(res.data?.result?.message || 'Database test leads initialized!', 'success');
    } catch (err) {
      addToast('Failed to execute test seed', 'error');
    } finally {
      setSeeding(false);
    }
  };

  const updateRuleWeight = (key, val) => {
    setLeadScoreRules(prev => ({ ...prev, [key]: Number(val) }));
  };

  if (loading) {
    return <div className="skeleton" style={{ height: '400px', borderRadius: '12px' }} />;
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#60A5FA', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
          <FiSettings /> SYSTEM CONFIGURATION
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#FFFFFF', marginTop: '2px' }}>
          Platform Settings
        </h1>
        <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>
          Manage API keys, scoring engine weights, discovery defaults, and testing datasets.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* SECTION 0: BACKEND API CONNECTION */}
        <div className="card" style={{ border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiServer style={{ color: '#60A5FA' }} /> BACKEND API SERVER CONNECTION
            </h3>
            {apiTestStatus && (
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: apiTestStatus.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: apiTestStatus.success ? '#34D399' : '#F87171'
              }}>
                {apiTestStatus.message}
              </span>
            )}
          </div>
          <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '0 0 16px 0' }}>
            When running on static hosts (like GitHub Pages), enter the live URL of your deployed Express backend (e.g. Render, Railway, or ngrok tunnel). If running locally with Vite, leave empty or set to <code>/api</code>.
          </p>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: '1', minWidth: '280px', margin: 0 }}>
              <label>Backend API Base URL</label>
              <input
                type="text"
                className="input-control"
                placeholder="e.g. https://your-backend.onrender.com/api or /api"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleTestApi}
              disabled={testingApi}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <FiWifi /> {testingApi ? 'Testing...' : 'Test Connection'}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveApiUrl}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <FiSave /> Save API URL
            </button>
          </div>
        </div>

        {/* SECTION 1: API CREDENTIALS & PROVIDERS */}
        <div className="card">
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiKey style={{ color: '#3B82F6' }} /> EXTERNAL APIS & AI PROVIDER CONFIGURATION
          </h3>

          <div className="grid-2">
            {/* Google Places API Key */}
            <div className="form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label>Google Places API Key</label>
                <span style={{ fontSize: '11px', color: settings?.googleApiKeyConfigured ? '#34D399' : '#F59E0B', fontWeight: '600' }}>
                  {settings?.googleApiKeyConfigured ? `Configured (${settings.googleApiKeyMasked})` : 'Offline / Permitted Mode'}
                </span>
              </div>
              <input
                type="password"
                className="input-control"
                placeholder={settings?.googleApiKeyConfigured ? 'Enter new key to replace' : 'AIzaSy...'}
                value={googleApiKey}
                onChange={(e) => setGoogleApiKey(e.target.value)}
              />
              <span style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
                When left empty, the engine uses permitted local discovery without failing.
              </span>
            </div>

            {/* AI Provider */}
            <div className="form-group">
              <label>AI Intelligence Provider</label>
              <select
                className="select-control"
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value)}
              >
                <option value="rule-engine">PDC Rule Engine (Deterministic, Zero-Hallucination, Free)</option>
                <option value="openai">OpenAI (GPT-4o-mini / Custom)</option>
                <option value="gemini">Google Gemini 1.5</option>
                <option value="anthropic">Anthropic Claude 3.5</option>
                <option value="custom">Custom Endpoint</option>
              </select>
              <span style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
                Rule Engine operates locally without requiring paid third-party API tokens.
              </span>
            </div>
          </div>

          {aiProvider !== 'rule-engine' && (
            <div className="grid-2" style={{ marginTop: '12px' }}>
              <div className="form-group">
                <label>AI API Key</label>
                <input
                  type="password"
                  className="input-control"
                  placeholder={settings?.aiApiKeyConfigured ? 'Enter new key to replace' : 'sk-...'}
                  value={aiApiKey}
                  onChange={(e) => setAiApiKey(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Model Name</label>
                <input
                  type="text"
                  className="input-control"
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                  placeholder="gpt-4o-mini"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: CONFIGURABLE LEAD SCORING RULES */}
        <div className="card">
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiSliders style={{ color: '#F59E0B' }} /> PDC QUALIFICATION SCORING ENGINE (INTERNAL RULES)
          </h3>
          <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '18px' }}>
            Adjust points awarded or deducted based on discovered digital signals. Hot leads qualify at 80+, Warm leads at 60-79.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div className="form-group">
              <label>No Website (+Pts)</label>
              <input
                type="number"
                className="input-control"
                value={leadScoreRules.noWebsite ?? 30}
                onChange={(e) => updateRuleWeight('noWebsite', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Broken Website (+Pts)</label>
              <input
                type="number"
                className="input-control"
                value={leadScoreRules.brokenWebsite ?? 25}
                onChange={(e) => updateRuleWeight('brokenWebsite', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Active Instagram (+Pts)</label>
              <input
                type="number"
                className="input-control"
                value={leadScoreRules.activeInstagram ?? 15}
                onChange={(e) => updateRuleWeight('activeInstagram', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>High Reviews (+Pts)</label>
              <input
                type="number"
                className="input-control"
                value={leadScoreRules.highReviewCount ?? 10}
                onChange={(e) => updateRuleWeight('highReviewCount', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Strong Rating (+Pts)</label>
              <input
                type="number"
                className="input-control"
                value={leadScoreRules.strongGoogleRating ?? 10}
                onChange={(e) => updateRuleWeight('strongGoogleRating', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Missing Enquiry CTA (+Pts)</label>
              <input
                type="number"
                className="input-control"
                value={leadScoreRules.noEnquiryCta ?? 10}
                onChange={(e) => updateRuleWeight('noEnquiryCta', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Missing Pricing (+Pts)</label>
              <input
                type="number"
                className="input-control"
                value={leadScoreRules.noPricingOrMembership ?? 5}
                onChange={(e) => updateRuleWeight('noPricingOrMembership', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Missing WhatsApp (+Pts)</label>
              <input
                type="number"
                className="input-control"
                value={leadScoreRules.noWhatsAppCta ?? 5}
                onChange={(e) => updateRuleWeight('noWhatsAppCta', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Strong Website (-Pts)</label>
              <input
                type="number"
                className="input-control"
                value={leadScoreRules.strongExistingWebsite ?? -30}
                onChange={(e) => updateRuleWeight('strongExistingWebsite', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Hot Threshold (Pts)</label>
              <input
                type="number"
                className="input-control"
                value={leadScoreRules.thresholdHot ?? 80}
                onChange={(e) => updateRuleWeight('thresholdHot', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: CAMPAIGN DEFAULTS */}
        <div className="card">
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF', marginBottom: '14px' }}>
            CAMPAIGN DISCOVERY DEFAULTS
          </h3>

          <div className="grid-2">
            <div className="form-group">
              <label>Default Minimum Google Rating (★)</label>
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="5.0"
                className="input-control"
                value={defaultMinRating}
                onChange={(e) => setDefaultMinRating(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Default Minimum Reviews Count</label>
              <input
                type="number"
                min="0"
                className="input-control"
                value={defaultMinReviews}
                onChange={(e) => setDefaultMinReviews(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
            <FiSave /> {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>

      {/* SECTION 4: TESTING & DATASET SEED RUNNER */}
      <div className="card" style={{ border: '1px solid #292938' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
              <FiDatabase /> DEMO & TESTING UTILITY
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', marginTop: '2px', margin: 0 }}>
              Re-seed 15 Comprehensive Test Leads
            </h3>
            <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0, marginTop: '2px' }}>
              Populates 5 Gyms, 5 Restaurants, and 5 Clinics testing all gap scenarios (No website, broken link, strong web, missing IG, missing phone).
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleTriggerSeed}
            disabled={seeding}
          >
            <FiDatabase /> {seeding ? 'Seeding...' : 'Run Test Seed'}
          </button>
        </div>
      </div>
    </div>
  );
};
