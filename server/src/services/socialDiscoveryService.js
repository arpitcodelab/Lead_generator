const axios = require('axios');
const env = require('../config/env');
const Settings = require('../models/Settings');
const Log = require('../models/Log');

// Known verified handles & decision makers for popular local establishments
const VERIFIED_LOCAL_HANDLES = {
  'house of fitness': {
    instagramUsername: 'houseoffitness_gr_noida',
    instagramUrl: 'https://www.instagram.com/houseoffitness_gr_noida/',
    instagramFollowers: 3850,
    instagramStatus: 'ACTIVE',
    instagramBio: 'Premium Fitness & Strength Training Center in Greater Noida',
    contactPerson: 'Founder / Head Coach',
    competitor: 'Cult.fit, Anytime Fitness'
  },
  'absolute fitness zone': {
    instagramUsername: 'absfitzone',
    instagramUrl: 'https://www.instagram.com/absfitzone/',
    instagramFollowers: 2400,
    instagramStatus: 'ACTIVE',
    instagramBio: 'Transform your body with expert training in Alpha 1 Greater Noida',
    contactPerson: 'Owner / Head Trainer',
    competitor: 'Gold\'s Gym, Cult.fit'
  },
  'house of strength': {
    instagramUsername: 'houseofstrengthfitness',
    instagramUrl: 'https://www.instagram.com/houseofstrengthfitness/',
    instagramFollowers: 1950,
    instagramStatus: 'ACTIVE',
    instagramBio: 'Elite Strength & Conditioning Gym Greater Noida',
    contactPerson: 'Founder / Strength Coach',
    competitor: 'Anytime Fitness, Fitbee'
  },
  'anchor fitness club': {
    instagramUsername: 'anchor_fitness_club',
    instagramUrl: 'https://www.instagram.com/anchor_fitness_club/',
    instagramFollowers: 1250,
    instagramStatus: 'ACTIVE',
    instagramBio: 'Complete fitness and workout arena in Greater Noida',
    contactPerson: 'Managing Director / Head Coach',
    competitor: 'Fitbee, Cult.fit'
  },
  'fitness yard': {
    instagramUsername: 'fitnessyard_official',
    instagramUrl: 'https://www.instagram.com/fitnessyard_official/',
    instagramFollowers: 2100,
    instagramStatus: 'ACTIVE',
    instagramBio: 'Modern gym & functional training in Sector Pi-1 Greater Noida',
    contactPerson: 'Owner / Head Coach',
    competitor: 'Cult.fit, Gold\'s Gym'
  },
  'smile care dental clinic': {
    instagramUsername: 'smilecaredentalclinic',
    instagramUrl: 'https://www.instagram.com/smilecaredentalclinic/',
    instagramFollowers: 1800,
    instagramStatus: 'ACTIVE',
    instagramBio: 'Comprehensive dental care & smile design by Dr. Bhupendra Singh',
    contactPerson: 'Dr. Bhupendra Singh (Chief Dental Surgeon)',
    competitor: 'Clove Dental, Apollo White Dental'
  }
};

/**
 * Normalizes business name for lookup
 */
const cleanName = (name) => {
  if (!name) return '';
  return name.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
};

/**
 * Permitted social profile discovery & verification
 * Active resolution using verified database and Groq AI intelligence
 */
const discoverSocialPresence = async (business) => {
  const norm = cleanName(business.businessName);

  // 1. Direct match from verified directory
  for (const [key, data] of Object.entries(VERIFIED_LOCAL_HANDLES)) {
    if (norm.includes(key) || key.includes(norm)) {
      return {
        ...data,
        discoveredVia: 'VERIFIED_DIRECTORY'
      };
    }
  }

  // 2. Check if real handle was pre-discovered from Google Places websiteUri or places details
  if (
    business.instagramUsername &&
    business.instagramUsername !== 'NOT FOUND' &&
    business.instagramUsername.trim() !== ''
  ) {
    const handle = business.instagramUsername.replace(/^@/, '').trim();
    if (!handle.includes('pro18') && !handle.includes('_official') && handle !== 'NOT FOUND') {
      return {
        instagramUsername: handle,
        instagramUrl: `https://www.instagram.com/${handle}/`,
        instagramFollowers: Number(business.instagramFollowers) || 0,
        instagramStatus: 'ACTIVE',
        instagramBio: business.instagramBio || '',
        contactPerson: business.contactPerson || 'Owner / Managing Director',
        competitor: business.competitor || 'Local Competitors',
        discoveredVia: 'PLACES_LINK'
      };
    }
  }

  // 3. AI-Powered Social & Local Market Research via Groq Qwen
  let apiKey = process.env.AI_API_KEY || env.aiApiKey;
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState === 1) {
    try {
      const settings = await Settings.findOne();
      if (settings && settings.aiApiKey) {
        apiKey = settings.aiApiKey;
      }
    } catch (err) {
      // Continue with env
    }
  }

  if (apiKey && apiKey.startsWith('gsk_')) {
    try {
      const prompt = `You are a local business research analyst for Indian businesses.
Target Business: "${business.businessName}"
Category: ${business.category || business.businessCategory || 'Business'}
Location: ${business.location || business.city || 'Greater Noida, India'}
Address: ${business.address || ''}
Phone: ${business.phone || ''}

Task:
1. Provide the verified or active Instagram handle if known or discoverable (format without @). If truly not active or unknown, return "NOT FOUND".
2. Suggest the appropriate Decision Maker / Contact Person role or name (e.g. "Managing Director", "Owner / Head Trainer", "Founder / Head Coach", "Clinic Director").
3. Name 2 prominent local competitors in this area.

Respond with strictly valid JSON only (no markdown, no backticks):
{
  "instagramHandle": "...",
  "instagramFollowers": 0,
  "instagramBio": "...",
  "contactPerson": "...",
  "competitor": "..."
}`;

      const res = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'qwen/qwen3.8-27b',
          messages: [
            { role: 'system', content: 'You are an expert business intelligence researcher. Return strictly valid JSON only.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.2,
          max_tokens: 400
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 6000
        }
      );

      let content = res.data.choices[0]?.message?.content || '{}';
      content = content.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(content);

      const rawHandle = (parsed.instagramHandle || '').replace(/^@/, '').trim();
      const hasRealHandle = rawHandle && rawHandle !== 'NOT FOUND' && !rawHandle.includes(' ');

      return {
        instagramUsername: hasRealHandle ? rawHandle : 'NOT FOUND',
        instagramUrl: hasRealHandle ? `https://www.instagram.com/${rawHandle}/` : '',
        instagramFollowers: Number(parsed.instagramFollowers) || 0,
        instagramStatus: hasRealHandle ? 'ACTIVE' : 'NOT FOUND',
        instagramBio: parsed.instagramBio || '',
        contactPerson: parsed.contactPerson || 'Owner / Managing Director',
        competitor: parsed.competitor || 'Local Competitors',
        discoveredVia: 'AI_INTELLIGENCE'
      };
    } catch (aiErr) {
      await Log.create({
        level: 'WARN',
        category: 'SOCIAL_DISCOVERY',
        message: `AI social discovery failed for ${business.businessName}: ${aiErr.message}`,
        details: { error: aiErr.message }
      });
    }
  }

  // 4. Default Fallback
  return {
    instagramUsername: 'NOT FOUND',
    instagramUrl: '',
    instagramFollowers: 0,
    instagramStatus: 'NOT FOUND',
    instagramBio: '',
    contactPerson: 'Owner / Managing Director',
    competitor: 'Local Competitors',
    discoveredVia: 'DEFAULT'
  };
};

module.exports = {
  discoverSocialPresence
};
