import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiPlus, FiGlobe, FiZap, FiActivity } from 'react-icons/fi';

export const TopNav = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
        {/* System Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          backgroundColor: '#0F1017',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '9999px',
          fontSize: '11px',
          color: '#E2E8F0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            boxShadow: '0 0 10px #10B981'
          }} />
          <span style={{ fontWeight: '700', color: '#F8FAFC' }}>Scraper Engine</span>
          <span style={{ color: '#4B5563' }}>•</span>
          <span style={{ color: '#94A3B8' }}>Google & AI Ready</span>
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
