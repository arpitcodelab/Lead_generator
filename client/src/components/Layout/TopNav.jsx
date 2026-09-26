import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { checkHealth, getApiBaseUrl } from '../../services/api';
import { FiPlus, FiGlobe, FiServer, FiSettings } from 'react-icons/fi';

export const TopNav = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [backendStatus, setBackendStatus] = useState({ online: false, checked: false });

  useEffect(() => {
    let mounted = true;
    const testStatus = async () => {
      const res = await checkHealth();
      if (mounted) {
        setBackendStatus({ online: res.isOnline, checked: true });
      }
    };
    testStatus();
    const interval = setInterval(testStatus, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');

  return (
    <header style={{
      height: '66px',
      backgroundColor: 'rgba(9, 10, 14, 0.82)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 36px',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Title & Dynamic Breadcrumb */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#60A5FA', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            WORKSPACE
          </span>
          <span style={{ color: '#4B5563', fontSize: '11px' }}>/</span>
          <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.01em', margin: 0 }}>
            {title || 'PDC Lead Intelligence'}
          </h2>
        </div>
        {subtitle && (
          <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0 0' }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Action Center */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Dynamic Backend Status Pill */}
        <div
          onClick={() => navigate('/settings')}
          title="Click to configure backend API endpoint in Settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            backgroundColor: '#0F1017',
            border: backendStatus.online ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '9999px',
            fontSize: '11px',
            color: '#E2E8F0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: backendStatus.online ? '#10B981' : '#F59E0B',
            boxShadow: backendStatus.online ? '0 0 10px #10B981' : '0 0 10px #F59E0B'
          }} />
          <span style={{ fontWeight: '700', color: '#F8FAFC' }}>
            {backendStatus.online ? 'Backend Connected' : (isGitHubPages ? 'Demo Mode' : 'Backend Offline')}
          </span>
          <span style={{ color: '#4B5563' }}>•</span>
          <span style={{ color: backendStatus.online ? '#34D399' : '#FBBF24' }}>
            {backendStatus.online ? 'API Live' : 'Static Host'}
          </span>
        </div>

        {/* Audit Tool Button */}
        {location.pathname !== '/audit' && (
          <button
            onClick={() => navigate('/audit')}
            className="btn btn-secondary btn-sm"
            style={{ padding: '7px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <FiGlobe /> Live Audit
          </button>
        )}

        {/* Quick Launch New Campaign Button */}
        {location.pathname !== '/generate' && (
          <button
            onClick={() => navigate('/generate')}
            className="btn btn-primary btn-sm"
            style={{ padding: '7px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <FiPlus /> New Campaign
          </button>
        )}
      </div>
    </header>
  );
};
export default TopNav;
