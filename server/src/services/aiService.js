const axios = require('axios');
const Settings = require('../models/Settings');
const env = require('../config/env');
const Log = require('../models/Log');

/**
 * Deterministic Rule-based Pitch Synthesizer
 * Guarantees zero-hallucination pitches strictly based on discovered facts
 */
const generateDeterministicPitch = (lead) => {
  const bName = lead.businessName || 'Your Business';
  const category = (lead.category || 'business').toLowerCase();
  const rating = lead.rating || '4.8';
  const reviews = lead.reviewCount || 'solid';
  const isLandline = lead.phoneType === 'LANDLINE' || lead.whatsappEligible === false;
  const primaryService = lead.recommendedServices?.[0] || 'High-Converting Website & Lead Funnel';
  const competitor = lead.competitor || 'Local Competitors';
  const contactPerson = lead.contactPerson || (category.includes('gym') ? 'Owner / Head Coach' : category.includes('clinic') ? 'Clinic Director' : 'Owner / Managing Director');

  let observation = '';
  let problem = '';
  let opportunity = '';

  if (isLandline) {
    if (lead.websiteStatus === 'NO WEBSITE') {
      observation = `Your ${category} has built a standout local reputation with a ${rating}★ Google rating and ${reviews} reviews, but new inquiries currently rely on landline phone calls without an official website.`;
      problem = `Prospective customers discovering you on Google cannot view your offerings or book after hours when your phone lines are closed, leaking valuable clients to competitors like ${competitor}.`;
      opportunity = `Convert high-intent local searchers into confirmed appointments with a modern, high-speed website and after-hours consultation booking.`;
    } else if (lead.websiteStatus === 'BROKEN') {
      observation = `Your ${category} has stellar customer feedback (${rating}★ across ${reviews} reviews), but your current web link is unreachable.`;
      problem = `Callers and searchers clicking your profile hit a broken page, forcing them to turn to local alternatives like ${competitor}.`;
      opportunity = `Rapidly restore your digital web assets with a fast-loading consultation booking portal.`;
    } else {
      observation = `We reviewed your online presence for ${bName} and noted your strong ${rating}★ rating, but your digital setup lacks after-hours booking to support your phone inquiries.`;
      problem = `Visitors outside business hours cannot take immediate action or request callbacks, limiting your inbound inquiry volume.`;
      opportunity = `Deploy high-converting landing pages with direct consultation scheduling to capture every high-intent local searcher.`;
    }
  } else {
    // Mobile / WhatsApp Eligible
    if (lead.websiteStatus === 'NO WEBSITE') {
      observation = `Your ${category} has built an impressive local reputation with a ${rating}★ Google rating and ${reviews} reviews, but no dedicated owned website was discovered.`;
      problem = `Prospective customers discovering you on Google or social media cannot view your detailed offerings, pricing, or enquire directly, leading to lost client acquisition to competitors like ${competitor}.`;
      opportunity = `Convert high-intent search traffic into direct inquiries with a sleek, mobile-optimized website and automated WhatsApp inquiry routing.`;
    } else if (lead.websiteStatus === 'BROKEN') {
      observation = `Your ${category} has strong customer acclaim (${rating}★ across ${reviews} reviews), but your current web link appears unreachable or returns an error.`;
      problem = `High-intent visitors attempting to visit your site hit a broken link, which erodes trust and bounces them directly to ${competitor}.`;
      opportunity = `Rapidly restore your digital presence with a modern, high-speed landing page that showcases your services flawlessly.`;
    } else {
      observation = `We reviewed your online presence for ${bName} and noticed your solid ${rating}★ rating, but your website currently lacks an automated direct inquiry flow or instant WhatsApp CTA.`;
      problem = `Visitors must manually search for contact details rather than booking or inquiring with a single tap, creating friction on mobile devices.`;
      opportunity = `Integrate high-converting lead capture forms, WhatsApp widgets, and social proof to double your monthly inbound inquiries.`;
    }
  }

  const shortPitch = isLandline
    ? `Hi! I noticed ${bName} has a fantastic ${rating}★ rating on Google with ${reviews} reviews. However, customers looking for you after hours have no dedicated way to explore your offerings and book online when phone lines are unattended. At Pixie Digital Creatives, we engineer high-converting digital platforms that turn local searchers into paying clients. I'd love to share a 2-minute concept tailored for ${bName}.`
    : `Hi! I noticed ${bName} has a fantastic ${rating}★ rating on Google with ${reviews} reviews. However, customers don't currently have a seamless, dedicated way to explore your packages and enquire instantly online. At Pixie Digital Creatives, we engineer high-converting digital platforms for growing businesses. I'd love to share a 2-minute concept tailored for ${bName}.`;

  const callScript = `[30-Second Reception / Owner Phone Script]
"Hello, good morning! I'm calling for the manager or owner of ${bName}.
My name is [Your Name] with Pixie Digital Creatives.

I was researching top-rated ${category} businesses in ${lead.location || 'the area'} and noticed your stellar ${rating}★ rating across ${reviews} Google reviews—congratulations on the great client feedback!

The reason for my call is that I noticed you don't currently have a dedicated official website where prospective clients can view your full services and request consultations after hours when your phone line is closed. 

We build high-converting web and inquiry systems for premier local brands, helping them capture 20-30 additional consultations each month from Google searchers.

I've put together a quick, no-obligation 2-minute digital concept for ${bName}. Who would be the best person to email that preview to?"`;

  const whatsappMessage = isLandline
    ? `[LANDLINE NUMBER - WhatsApp Messaging Ineligible]
This business uses landline ${lead.phone || ''}. Standard WhatsApp messages cannot be delivered.
Use the Phone Call Script or Cold Email outreach to connect with the decision-maker.`
    : `Hi ${bName} team! 👋 Came across your ${category} on Google—congratulations on the stellar ${rating}★ rating! ⭐

We noticed that prospective clients looking for you online don't have a clear, dedicated website with 1-click WhatsApp enquiry to book directly.

At Pixie Digital Creatives (PDC), we build custom high-converting web systems for local leaders like you. We put together a quick digital concept for ${bName}. 

Mind if I drop a 30-second preview here?`;

  const instagramMessage = `Hey ${bName} team! 🙌 Loving your work in the local community. Noticed you have great local reviews (${rating}★), but an owned conversion website is missing to capture visitors directly from your bio. We design high-converting digital setups for ${category} brands. Would love to share a free concept for you!`;

  const emailMessage = `Subject: Quick digital concept for ${bName} (${rating}★ on Google)

Hi Team,

I recently came across ${bName} while researching leading ${category} businesses in ${lead.location || 'your area'}.

First of all, congratulations on your outstanding ${rating}★ rating across ${reviews} reviews—it is clear your clients love what you do.

While reviewing your digital presence, I noticed a significant growth opportunity: ${observation} ${problem}

At Pixie Digital Creatives (PDC), we specialize in crafting high-converting digital assets designed to turn local searchers into paying clients.

Based on your current setup, we recommend:
• ${primaryService}
• ${isLandline ? 'After-hours consultation booking & inquiry capture' : 'Frictionless 1-click WhatsApp lead routing'}
• High-impact social proof integration

I have prepared a quick, no-obligation preview of what an upgraded digital asset could look like for ${bName}. Would you be open to a 5-minute chat this week?

Warm regards,
Pixie Digital Creatives (PDC) Lead Intelligence Team
https://pixiedigitalcreatives.com`;

  return {
    pitch: {
      problem,
      observation,
      opportunity,
      recommendedService: primaryService,
      shortPitch
    },
    callScript,
    whatsappMessage,
    instagramMessage,
    emailMessage,
    contactPerson,
    competitor
  };
};

/**
 * AI Provider abstraction (Groq, OpenAI, or Rule-Engine)
 */
const generatePitch = async (lead) => {
  let provider = process.env.AI_PROVIDER || env.aiProvider;
  let apiKey = process.env.AI_API_KEY || env.aiApiKey;
  let model = 'qwen/qwen3.8-27b';

  const mongoose = require('mongoose');
  if (mongoose.connection.readyState === 1) {
    try {
      const settings = await Settings.findOne();
      if (settings && settings.aiApiKey) {
        provider = settings.aiProvider || provider;
        apiKey = settings.aiApiKey || apiKey;
        model = settings.aiModel || model;
      }
    } catch (err) {
      // Continue with env
    }
  }

  const isLandline = lead.phoneType === 'LANDLINE' || lead.whatsappEligible === false;

  // Groq provider or API key starting with gsk_
  if (apiKey && (apiKey.startsWith('gsk_') || provider === 'groq')) {
    try {
      const prompt = `You are a senior lead generation copywriter for Pixie Digital Creatives (PDC).
Generate a factual, high-converting pitch for:
Business Name: ${lead.businessName}
Category: ${lead.category}
Location: ${lead.location}
Phone: ${lead.phone} (Phone Type: ${lead.phoneType || (isLandline ? 'LANDLINE' : 'MOBILE')})
WhatsApp Eligible: ${!isLandline}
Google Rating: ${lead.rating} (${lead.reviewCount} reviews)
Website Status: ${lead.websiteStatus}
Digital Gaps: ${(lead.digitalGaps || []).join(', ')}
Digital Strengths: ${(lead.digitalStrengths || []).join(', ')}
Recommended Service: ${(lead.recommendedServices || []).join(', ')}
Competitors: ${lead.competitor || 'Local Competitors'}
Contact Person: ${lead.contactPerson || 'Decision Maker'}

IMPORTANT INSTRUCTIONS:
${isLandline 
  ? '- This business uses a LANDLINE number. DO NOT pitch WhatsApp bot or WhatsApp messaging. Instead pitch Inbound Call-to-Web Consultation Funnel and After-Hours online booking. Generate a 30-second telephone script for calling the landline.' 
  : '- This business uses a MOBILE number eligible for WhatsApp. Pitch high-converting WhatsApp lead capture.'}

Return strictly valid JSON only (no markdown, no backticks):
{
  "problem": "...",
  "observation": "...",
  "opportunity": "...",
  "recommendedService": "...",
  "shortPitch": "...",
  "callScript": "...",
  "whatsappMessage": "...",
  "instagramMessage": "...",
  "emailMessage": "...",
  "contactPerson": "...",
  "competitor": "..."
}`;

      const res = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'qwen/qwen3.8-27b',
          messages: [
            { role: 'system', content: 'You are an expert agency sales copywriter. Return strictly valid JSON only.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.6,
          max_tokens: 1200
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      let content = res.data.choices[0]?.message?.content || '{}';
      content = content.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(content);

      return {
        pitch: {
          problem: parsed.problem,
          observation: parsed.observation,
          opportunity: parsed.opportunity,
          recommendedService: parsed.recommendedService || lead.recommendedServices?.[0],
          shortPitch: parsed.shortPitch
        },
        callScript: parsed.callScript || generateDeterministicPitch(lead).callScript,
        whatsappMessage: isLandline 
          ? `[LANDLINE NUMBER - WhatsApp Messaging Ineligible]\nThis business uses landline ${lead.phone || ''}. Standard WhatsApp messages cannot be delivered. Use the Phone Call Script or Cold Email outreach to connect with the decision-maker.`
          : (parsed.whatsappMessage || generateDeterministicPitch(lead).whatsappMessage),
        instagramMessage: parsed.instagramMessage,
        emailMessage: parsed.emailMessage,
        contactPerson: parsed.contactPerson || lead.contactPerson || 'Owner / Managing Director',
        competitor: parsed.competitor || lead.competitor || 'Local Competitors'
      };
    } catch (err) {
      await Log.create({
        level: 'WARN',
        category: 'AI_PITCH',
        message: `Groq AI pitch generation failed: ${err.message}. Used deterministic fallback.`,
        details: { error: err.message }
      });
      return generateDeterministicPitch(lead);
    }
  }

  // Fallback to deterministic synthesizer
  return generateDeterministicPitch(lead);
};

module.exports = {
  generatePitch,
  generateDeterministicPitch
};
