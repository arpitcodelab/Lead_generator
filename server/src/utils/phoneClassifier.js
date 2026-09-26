/**
 * Indian & International Phone Number Classifier
 * Distinguishes Landlines (STD codes) from Mobile numbers (WhatsApp-eligible)
 */

// Major Indian Landline STD Codes
const INDIAN_STD_CODES = [
  '0120', '120',  // Noida / Greater Noida / Ghaziabad
  '011',  '11',   // Delhi
  '022',  '22',   // Mumbai
  '080',  '80',   // Bengaluru
  '044',  '44',   // Chennai
  '033',  '33',   // Kolkata
  '040',  '40',   // Hyderabad
  '020',  '20',   // Pune
  '079',  '79',   // Ahmedabad
  '0141', '141',  // Jaipur
  '0522', '522',  // Lucknow
  '0172', '172',  // Chandigarh
  '0731', '731',  // Indore
  '0755', '755',  // Bhopal
  '0612', '612',  // Patna
  '0265', '265',  // Vadodara
  '0261', '261',  // Surat
  '0891', '891',  // Visakhapatnam
  '0484', '484',  // Kochi
  '0471', '471',  // Thiruvananthapuram
  '0135', '135'   // Dehradun
];

/**
 * Classifies a phone number string
 * @param {string} rawPhone 
 * @returns {object} { phoneType, isLandline, isMobile, whatsappEligible, formattedPhone, stdCode }
 */
const classifyPhone = (rawPhone) => {
  if (!rawPhone || rawPhone === 'NOT FOUND' || rawPhone.trim() === '') {
    return {
      phoneType: 'UNKNOWN',
      isLandline: false,
      isMobile: false,
      whatsappEligible: false,
      formattedPhone: 'NOT FOUND',
      stdCode: null
    };
  }

  const clean = rawPhone.replace(/\s+/g, ' ').trim();
  const digitsOnly = rawPhone.replace(/\D/g, '');

  // 1. Check explicit STD code formats (e.g. 0120 438 5784, +91 120 438 5784, 01204385784)
  for (const std of INDIAN_STD_CODES) {
    // Check if starts with STD with leading 0 or +91
    const pattern0 = new RegExp(`^0${std}\\D*(\\d{6,8})$`);
    const pattern91 = new RegExp(`^91${std}\\D*(\\d{6,8})$`);
    const patternStd = new RegExp(`^${std}\\D*(\\d{6,8})$`);

    if (
      clean.startsWith(`0${std} `) ||
      clean.startsWith(`0${std}-`) ||
      clean.startsWith(`+91 ${std}`) ||
      clean.startsWith(`+91-${std}`) ||
      clean.startsWith(`(${std})`) ||
      pattern0.test(digitsOnly) ||
      pattern91.test(digitsOnly)
    ) {
      return {
        phoneType: 'LANDLINE',
        isLandline: true,
        isMobile: false,
        whatsappEligible: false,
        formattedPhone: clean,
        stdCode: std.startsWith('0') ? std : `0${std}`
      };
    }
  }

  // 2. Normalize 10-digit Indian Mobile Numbers
  // Standard Indian mobile: 10 digits starting with 6, 7, 8, or 9
  // Allowed prefixes: +91, 91, 0, or raw 10 digits
  let tenDigit = '';
  if (digitsOnly.length === 10) {
    tenDigit = digitsOnly;
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    tenDigit = digitsOnly.slice(1);
  } else if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    tenDigit = digitsOnly.slice(2);
  }

  if (tenDigit.length === 10) {
    const firstDigit = tenDigit.charAt(0);
    if (['6', '7', '8', '9'].includes(firstDigit)) {
      return {
        phoneType: 'MOBILE',
        isLandline: false,
        isMobile: true,
        whatsappEligible: true,
        formattedPhone: `+91 ${tenDigit.slice(0, 5)} ${tenDigit.slice(5)}`,
        stdCode: null
      };
    } else {
      // 10 digits starting with 1, 2, 3, 4, 5 in India is a Landline (e.g. 1204385784)
      return {
        phoneType: 'LANDLINE',
        isLandline: true,
        isMobile: false,
        whatsappEligible: false,
        formattedPhone: clean,
        stdCode: digitsOnly.slice(0, 3)
      };
    }
  }

  // 3. Toll-free numbers (1800..., 1860...)
  if (digitsOnly.startsWith('1800') || digitsOnly.startsWith('1860')) {
    return {
      phoneType: 'LANDLINE',
      isLandline: true,
      isMobile: false,
      whatsappEligible: false,
      formattedPhone: clean,
      stdCode: null
    };
  }

  // 4. Fallback check: if contains fewer than 10 digits or starts with 0
  if (digitsOnly.length < 10 || (digitsOnly.startsWith('0') && !['6', '7', '8', '9'].includes(digitsOnly.charAt(1)))) {
    return {
      phoneType: 'LANDLINE',
      isLandline: true,
      isMobile: false,
      whatsappEligible: false,
      formattedPhone: clean,
      stdCode: null
    };
  }

  return {
    phoneType: 'MOBILE',
    isLandline: false,
    isMobile: true,
    whatsappEligible: true,
    formattedPhone: clean,
    stdCode: null
  };
};

module.exports = {
  classifyPhone,
  INDIAN_STD_CODES
};
