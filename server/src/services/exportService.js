const ExcelJS = require('exceljs');

/**
 * Exports leads to an Excel (.xlsx) workbook strictly matching the PDC Lead Intelligence format
 */
const exportLeadsToExcel = async (leads, campaignName = 'PDC_Leads') => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Pixie Digital Creatives (PDC)';
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet('Lead Intelligence', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  const snapshotDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  // PDC Exact 16 Columns (Includes Phone Type)
  worksheet.columns = [
    { header: 'Business Name', key: 'businessName', width: 28 },
    { header: 'Business Category', key: 'businessCategory', width: 20 },
    { header: 'Website Available?', key: 'websiteAvailable', width: 18 },
    { header: 'Website Link', key: 'websiteLink', width: 32 },
    { header: 'Ratings & Reviews', key: 'ratings', width: 20 },
    { header: 'Competitor Benchmark', key: 'competitor', width: 26 },
    { header: 'Instagram ID', key: 'instagramId', width: 24 },
    { header: 'Followers', key: 'followers', width: 16 },
    { header: 'Phone / Contact Number', key: 'phone', width: 24 },
    { header: 'Phone Line Type', key: 'phoneType', width: 16 },
    { header: 'Pipeline Stage', key: 'stage', width: 16 },
    { header: 'What We Can Pitch', key: 'pitch', width: 38 },
    { header: 'Contact Person / Role', key: 'contactPerson', width: 24 },
    { header: 'Email Address', key: 'email', width: 26 },
    { header: 'Inbound Source', key: 'source', width: 20 },
    { header: 'Lead Intelligence & Notes', key: 'notes', width: 42 }
  ];

  // Header Styling - PDC Metallic Dark
  const headerRow = worksheet.getRow(1);
  headerRow.height = 28;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF121216' }
    };
    cell.font = {
      name: 'Segoe UI',
      size: 11,
      bold: true,
      color: { argb: 'FFFFFFFF' }
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF33333E' } },
      left: { style: 'thin', color: { argb: 'FF33333E' } },
      bottom: { style: 'medium', color: { argb: 'FF3B82F6' } }, // Electric blue accent line
      right: { style: 'thin', color: { argb: 'FF33333E' } }
    };
  });

  // Populate Lead Rows
  leads.forEach((lead) => {
    const hasWeb = lead.website && lead.websiteStatus !== 'NO WEBSITE';
    const webStatusLabel = hasWeb ? `YES (${lead.websiteStatus})` : 'NO';
    const ratingStr = `${lead.rating || 0}★ (${lead.reviewCount || 0} reviews)`;
    
    // Follower formatting with zero NaN guarantee
    let followersStr = '0';
    if (typeof lead.instagramFollowers === 'number' && !isNaN(lead.instagramFollowers) && lead.instagramFollowers > 0) {
      followersStr = lead.instagramFollowers.toLocaleString();
    } else if (lead.instagramStatus === 'ACTIVE') {
      followersStr = 'Active Profile';
    }

    // Phone formatting with Landline vs Mobile indicator
    const isLandline = lead.phoneType === 'LANDLINE' || lead.whatsappEligible === false;
    let phoneDisplay = lead.phone || 'NOT FOUND';
    if (phoneDisplay !== 'NOT FOUND') {
      phoneDisplay = isLandline ? `${phoneDisplay} [Landline]` : `${phoneDisplay} [Mobile - WhatsApp]`;
    }

    // Services to pitch: strictly filter out WhatsApp bot if landline
    let pitchServices = lead.recommendedServices || [];
    if (isLandline) {
      pitchServices = pitchServices.filter(s => !s.toLowerCase().includes('whatsapp'));
      if (pitchServices.length === 0) {
        pitchServices = ['High-Converting Website', 'Inbound Call-to-Web Consultation Funnel'];
      }
    }
    const whatWeCanPitch = pitchServices.length > 0 
      ? pitchServices.join(', ')
      : (lead.pitch?.recommendedService || 'Custom Web & Lead Funnel');

    // Contact Person fallback
    const contactPerson = lead.contactPerson && lead.contactPerson !== 'NOT FOUND'
      ? lead.contactPerson
      : 'Owner / Managing Director';

    // Email Address fallback
    const emailAddress = lead.email && lead.email !== 'NOT FOUND'
      ? lead.email
      : 'Not Publicly Listed (Call Direct)';

    // Competitor fallback
    const competitor = lead.competitor && lead.competitor !== 'N/A'
      ? lead.competitor
      : 'Local Competitors';

    const notesSummary = [
      `[Snapshot: ${snapshotDate}]`,
      lead.reasonToContact,
      lead.score ? `[PDC Score: ${lead.score}/100 - ${lead.scoreClassification}]` : '',
      lead.notes?.map(n => n.text).join('; ')
    ].filter(Boolean).join(' | ');

    const row = worksheet.addRow({
      businessName: lead.businessName,
      businessCategory: lead.category || lead.businessCategory,
      websiteAvailable: webStatusLabel,
      websiteLink: lead.website || 'N/A',
      ratings: ratingStr,
      competitor: competitor,
      instagramId: lead.instagramUsername !== 'NOT FOUND' ? `@${lead.instagramUsername}` : 'NOT FOUND',
      followers: followersStr,
      phone: phoneDisplay,
      phoneType: isLandline ? 'LANDLINE' : 'MOBILE',
      stage: lead.stage || 'NEW',
      pitch: whatWeCanPitch,
      contactPerson: contactPerson,
      email: emailAddress,
      source: lead.source || 'Google Places (Verified)',
      notes: notesSummary
    });

    row.height = 24;
    row.eachCell((cell, colNumber) => {
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.alignment = { vertical: 'middle' };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        right: { style: 'thin', color: { argb: 'FFE5E7EB' } }
      };

      // Center align specific columns (Website Avail, Ratings, Followers, Phone Type, Stage)
      if ([3, 5, 8, 10, 11, 15].includes(colNumber)) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
  });

  // Secondary Worksheet: Dedicated Outreach & Phone Call Scripts
  const scriptSheet = workbook.addWorksheet('Outreach & Phone Scripts', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  scriptSheet.columns = [
    { header: 'Business Name', key: 'businessName', width: 28 },
    { header: 'Phone Number', key: 'phone', width: 22 },
    { header: 'Line Type', key: 'phoneType', width: 14 },
    { header: 'Contact Person / Role', key: 'contactPerson', width: 24 },
    { header: 'Best Outreach Channel', key: 'bestChannel', width: 22 },
    { header: 'Cold Outreach / Phone Script', key: 'script', width: 65 }
  ];

  const scriptHeader = scriptSheet.getRow(1);
  scriptHeader.height = 28;
  scriptHeader.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1E293B' }
    };
    cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  leads.forEach((lead) => {
    const isLandline = lead.phoneType === 'LANDLINE' || lead.whatsappEligible === false;
    const bestChannel = isLandline ? 'Direct Phone Call' : 'WhatsApp Outreach';
    const script = isLandline
      ? (lead.callScript || lead.pitch?.shortPitch || 'Phone Call Pitch')
      : (lead.whatsappMessage || lead.pitch?.shortPitch || 'WhatsApp Pitch');

    const sRow = scriptSheet.addRow({
      businessName: lead.businessName,
      phone: lead.phone,
      phoneType: isLandline ? 'LANDLINE' : 'MOBILE',
      contactPerson: lead.contactPerson || 'Owner / Manager',
      bestChannel: bestChannel,
      script: script
    });

    sRow.height = 36;
    sRow.eachCell((cell, colNumber) => {
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.alignment = { vertical: 'middle', wrapText: colNumber === 6 };
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

/**
 * Exports leads to CSV format
 */
const exportLeadsToCsv = (leads) => {
  const snapshotDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const headers = [
    'Business Name',
    'Business Category',
    'Location',
    'Address',
    'Phone',
    'Phone Type',
    'Email',
    'Website Available',
    'Website Link',
    'Website Status',
    'Ratings & Reviews',
    'Competitor Benchmark',
    'Instagram ID',
    'Followers',
    'Pipeline Stage',
    'PDC Lead Score',
    'Classification',
    'What We Can Pitch',
    'Contact Person',
    'Inbound Source',
    'Snapshot Date'
  ];

  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = leads.map(lead => {
    const hasWeb = lead.website && lead.websiteStatus !== 'NO WEBSITE';
    const webAvailable = hasWeb ? 'YES' : 'NO';
    const isLandline = lead.phoneType === 'LANDLINE' || lead.whatsappEligible === false;

    let pitchServices = lead.recommendedServices || [];
    if (isLandline) {
      pitchServices = pitchServices.filter(s => !s.toLowerCase().includes('whatsapp'));
    }
    const whatWeCanPitch = pitchServices.length > 0 
      ? pitchServices.join(', ')
      : (lead.pitch?.recommendedService || 'Custom Web & Lead Funnel');

    let followers = '0';
    if (typeof lead.instagramFollowers === 'number' && !isNaN(lead.instagramFollowers) && lead.instagramFollowers > 0) {
      followers = String(lead.instagramFollowers);
    } else if (lead.instagramStatus === 'ACTIVE') {
      followers = 'Active';
    }

    return [
      escapeCsv(lead.businessName),
      escapeCsv(lead.category || lead.businessCategory),
      escapeCsv(lead.location),
      escapeCsv(lead.address),
      escapeCsv(lead.phone),
      escapeCsv(isLandline ? 'LANDLINE' : 'MOBILE'),
      escapeCsv(lead.email && lead.email !== 'NOT FOUND' ? lead.email : 'Not Publicly Listed'),
      escapeCsv(webAvailable),
      escapeCsv(lead.website),
      escapeCsv(lead.websiteStatus),
      escapeCsv(`${lead.rating || 0}★ (${lead.reviewCount || 0} reviews)`),
      escapeCsv(lead.competitor || 'Local Competitors'),
      escapeCsv(lead.instagramUsername !== 'NOT FOUND' ? `@${lead.instagramUsername}` : 'NOT FOUND'),
      escapeCsv(followers),
      escapeCsv(lead.stage || 'NEW'),
      escapeCsv(lead.score || 0),
      escapeCsv(lead.scoreClassification || 'LOW'),
      escapeCsv(whatWeCanPitch),
      escapeCsv(lead.contactPerson || 'Owner / Managing Director'),
      escapeCsv(lead.source || 'Google Places'),
      escapeCsv(snapshotDate)
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\r\n');
};

module.exports = {
  exportLeadsToExcel,
  exportLeadsToCsv
};
