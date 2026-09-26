import React from 'react';

export const MetricCard = ({ title, value, icon: Icon, subtitle, accentColor = '#3B82F6', onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#111219',
        background: `linear-gradient(180deg, ${accentColor}0D 0%, rgba(17, 18, 25, 0.95) 100%)`,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.borderColor = `${accentColor}55`;
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = `0 10px 25px rgba(0, 0, 0, 0.4), 0 0 20px ${accentColor}22`;
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
      }}
    >
      {/* Top Accent Indicator Strip */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}66 100%)`,
        boxShadow: `0 0 10px ${accentColor}88`
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {title}
        </span>
        {Icon && (
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            backgroundColor: `${accentColor}1A`,
            border: `1px solid ${accentColor}33`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accentColor,
            fontSize: '16px'
          }}>
            <Icon />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '28px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.02em', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {typeof value === 'number' ? value.toLocaleString() : (value ?? 0)}
        </span>
      </div>

      {subtitle && (
        <div style={{ marginTop: '10px', fontSize: '11px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};
