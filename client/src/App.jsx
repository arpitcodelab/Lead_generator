import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Sidebar } from './components/Layout/Sidebar';
import { TopNav } from './components/Layout/TopNav';

// Pages
import { Dashboard } from './pages/Dashboard/Dashboard';
import { GenerateLeads } from './pages/GenerateLeads/GenerateLeads';
import { LeadDatabase } from './pages/LeadDatabase/LeadDatabase';
import { Pipeline } from './pages/Pipeline/Pipeline';
import { Campaigns } from './pages/Campaigns/Campaigns';
import { WebsiteAudit } from './pages/WebsiteAudit/WebsiteAudit';
import { Analytics } from './pages/Analytics/Analytics';
import { OutreachTracker } from './pages/OutreachTracker/OutreachTracker';
import { Settings } from './pages/Settings/Settings';
import { Logs } from './pages/Logs/Logs';

// App Layout wrapper
const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Determine page title
  const pathTitles = {
    '/': { title: 'Intelligence Dashboard', sub: 'Real-time overview of business leads, digital presence gaps, and outreach funnels' },
    '/generate': { title: 'Generate Leads', sub: 'Automated multi-stage business discovery, website verification & qualification' },
    '/leads': { title: 'Lead Database', sub: 'High-opportunity verified leads data grid, dynamic filters, and CSV/Excel exports' },
    '/pipeline': { title: 'Pipeline CRM Kanban', sub: 'Multi-stage sales pipeline tracking from discovery to closed deals' },
    '/campaigns': { title: 'Market Campaigns', sub: 'Historical campaign runs, performance metrics, and batch re-runs' },
    '/audit': { title: 'Live Website Audit', sub: 'On-demand technical, conversion, and social presence audit engine' },
    '/analytics': { title: 'Analytics & Funnels', sub: 'Conversion rates, digital gap heatmaps, and local market intelligence' },
    '/outreach': { title: 'Outreach Tracker', sub: 'Direct messaging logs across WhatsApp, Instagram, and Email' },
    '/settings': { title: 'System Settings', sub: 'API credentials, scoring engine weights, and demo dataset runner' },
    '/logs': { title: 'Activity Logs', sub: 'Internal audit trails, discovery events, and system monitor' }
  };

  const currentMeta = pathTitles[location.pathname] || { title: 'PDC Lead Intelligence', sub: '' };

  return (
    <div className="app-container">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        <TopNav title={currentMeta.title} subtitle={currentMeta.sub} />
        <main className="page-body">
          {children}
        </main>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
            <Route path="/generate" element={<AppLayout><GenerateLeads /></AppLayout>} />
            <Route path="/leads" element={<AppLayout><LeadDatabase /></AppLayout>} />
            <Route path="/pipeline" element={<AppLayout><Pipeline /></AppLayout>} />
            <Route path="/campaigns" element={<AppLayout><Campaigns /></AppLayout>} />
            <Route path="/audit" element={<AppLayout><WebsiteAudit /></AppLayout>} />
            <Route path="/analytics" element={<AppLayout><Analytics /></AppLayout>} />
            <Route path="/outreach" element={<AppLayout><OutreachTracker /></AppLayout>} />
            <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
            <Route path="/logs" element={<AppLayout><Logs /></AppLayout>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
