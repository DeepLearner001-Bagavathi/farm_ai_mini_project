export const content = {
  en: {
    header: {
      title: "TN Agri Mitra",
      navLinks: [
        { href: "/", label: "Home" },
        { href: "/weather", label: "Weather" },
        { href: "/market-prices", label: "Market Prices" },
        { href: "/schemes", label: "Schemes" },
        { href: "/contact", label: "Contact" },
      ],
      mobileMenu: {
        open: "Open menu",
      }
    },
    footer: {
      copyright: "TN Agri Mitra. All rights reserved.",
    },
    homePage: {
      hero: {
        title: "Welcome to TN Agri Mitra",
        subtitle: "Your AI-powered companion for smart and sustainable farming in Tamil Nadu.",
        cta: "Check Weather",
      },
      featuresTitle: "Our Features",
      featuresSubtitle: "Everything you need for modern farming.",
      learnMore: "Learn More",
      features: [
        {
          id: "weather",
          icon: "CloudSun",
          title: "Weather Forecast",
          description: "Stay ahead with accurate, real-time weather forecasts for your location.",
          href: "/weather",
        },
        {
          id: "market",
          icon: "BarChart",
          title: "Market Prices",
          description: "Track live market prices for your produce and maximize your profits.",
          href: "/market-prices",
        },
        {
          id: "schemes",
          icon: "ScrollText",
          title: "Government Schemes",
          description: "Discover and apply for beneficial government schemes and subsidies.",
          href: "/schemes",
        },
      ],
    },
    weatherPage: {
        title: "Weather Forecast",
        subtitle: "5-day forecast for Tamil Nadu (sample data).",
        weatherData: [
            { day: "Today", temp: "32°C", condition: "Sunny", iconId: "sunny" },
            { day: "Tomorrow", temp: "31°C", condition: "Partly Cloudy", iconId: "cloudy" },
            { day: "Fri, 28", temp: "29°C", condition: "Rain", iconId: "rain" },
            { day: "Sat, 29", temp: "30°C", condition: "Thunderstorm", iconId: "thunder" },
            { day: "Sun, 30", temp: "33°C", condition: "Sunny", iconId: "sunny" },
        ]
    },
    marketPricesPage: {
        title: "Market Prices",
        subtitle: "Latest prices of agricultural commodities from markets in Tamil Nadu (sample data).",
        tableHeaders: {
            crop: "Crop",
            market: "Market",
            price: "Price",
            lastUpdated: "Last Updated"
        },
        marketData: [
            { crop: "Paddy", market: "Thanjavur", price: "₹2,183 / Quintal", date: "2024-07-26" },
            { crop: "Turmeric", market: "Erode", price: "₹17,500 / Quintal", date: "2024-07-26" },
            { crop: "Coconut", market: "Pollachi", price: "₹28 / Kg", date: "2024-07-25" },
            { crop: "Onion", market: "Dindigul", price: "₹3,500 / Quintal", date: "2024-07-26" },
            { crop: "Tomato", market: "Coimbatore", price: "₹2,200 / Quintal", date: "2024-07-26" },
            { crop: "Sugarcane", market: "Viluppuram", price: "₹2,950 / Tonne", date: "2024-07-25" },
            { crop: "Cotton", market: "Salem", price: "₹6,800 / Quintal", date: "2024-07-25" },
        ]
    },
    schemesPage: {
        title: "Government Schemes",
        subtitle: "Information on agricultural schemes for farmers in Tamil Nadu.",
        schemesData: [
            {
              title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
              content: "An income support scheme for all landholding farmer families. Under this scheme, ₹6,000 per year is provided in three equal installments of ₹2,000 each. This central sector scheme is 100% funded by the Government of India.",
            },
            {
              title: "Kalaignarin All Village Integrated Agricultural Development Programme",
              content: "Aims to make all villages in Tamil Nadu self-sufficient in agriculture within five years. It focuses on water conservation, crop diversification, promoting modern agricultural techniques, and improving necessary infrastructure in all 12,525 village panchayats.",
            },
            {
              title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
              content: "A crop insurance scheme to provide comprehensive insurance coverage and financial support to farmers in the event of any failure of notified crops as a result of natural calamities, pests, and diseases.",
            },
            {
              title: "National Agriculture Market (e-NAM)",
              content: "A pan-India electronic trading portal that networks the existing APMC mandis to create a unified national market for agricultural commodities. It provides better price discovery through a transparent auction process.",
            },
            {
              title: "Tamil Nadu Chief Minister's Farmer Protection Scheme",
              content: "A social security scheme for farmers and agricultural laborers. It provides financial assistance for education, marriage, maternity, and natural death.",
            }
        ]
    },
    contactPage: {
        title: "Contact & Support",
        subtitle: "Get in touch with us for any help or queries.",
        contactOptions: [
            {
                id: "phone",
                title: "Call Uzhavan Helpline",
                content: "For immediate assistance, call our toll-free number.",
                contact: "1800-425-1551",
            },
            {
                id: "email",
                title: "Email Support",
                content: "Send your queries to our support team.",
                contact: "support@agri.tn.gov.in",
            },
            {
                id: "help",
                title: "Help Center & FAQs",
                content: "Find answers to frequently asked questions on the TN Agriculture portal.",
                contact: "Visit agrisnet.tn.gov.in",
            },
        ]
    },
    chatbot: {
      title: "AI Assistant",
      placeholder: "Ask anything about farming in Tamil Nadu...",
      send: "Send",
      open: "Open AI Chat",
      error: "Sorry, an error occurred. Please try again."
    }
  },
  ta: {
    header: {
      title: "TN Agri Mitra",
      navLinks: [
        { href: "/", label: "முகப்பு" },
        { href: "/weather", label: "வானிலை" },
        { href: "/market-prices", label: "சந்தை விலைகள்" },
        { href: "/schemes", label: "திட்டங்கள்" },
        { href: "/contact", label: "தொடர்புக்கு" },
      ],
      mobileMenu: {
        open: "மெனுவைத் திற",
      }
    },
    footer: {
      copyright: "TN Agri Mitra. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    },
    homePage: {
      hero: {
        title: "TN Agri Mitra-க்கு வரவேற்கிறோம்",
        subtitle: "தமிழ்நாட்டில் έξυπனான மற்றும் நிலையான விவசாயத்திற்கான உங்கள் AI-இயங்கும் துணை.",
        cta: "வானிலை சரிபார்க்கவும்",
      },
      featuresTitle: "எங்கள் அம்சங்கள்",
      featuresSubtitle: "நவீன விவசாயத்திற்கு தேவையான அனைத்தும்.",
      learnMore: "மேலும் அறிக",
      features: [
        {
          id: "weather",
          icon: "CloudSun",
          title: "வானிலை முன்னறிவிப்பு",
          description: "உங்கள் பகுதிக்கான துல்லியமான, நிகழ்நேர வானிலை முன்னறிவிப்புகளுடன் முன்னேிருங்கள்.",
          href: "/weather",
        },
        {
          id: "market",
          icon: "BarChart",
          title: "சந்தை விலைகள்",
          description: "உங்கள் விளைபொருட்களின் நேரடி சந்தை விலைகளைக் கண்காணித்து உங்கள் லாபத்தை அதிகரிக்கவும்.",
          href: "/market-prices",
        },
        {
          id: "schemes",
          icon: "ScrollText",
          title: "அரசு திட்டங்கள்",
          description: "பயனுள்ள அரசாங்க திட்டங்கள் மற்றும் மானியங்களைக் கண்டறிந்து விண்ணப்பிக்கவும்.",
          href: "/schemes",
        },
      ],
    },
    weatherPage: {
        title: "வானிலை முன்னறிவிப்பு",
        subtitle: "தமிழ்நாட்டிற்கான 5-நாள் முன்னறிவிப்பு (தற்காலிக தரவு).",
        weatherData: [
            { day: "இன்று", temp: "32°C", condition: "வெயில்", iconId: "sunny" },
            { day: "நாளை", temp: "31°C", condition: "பகுதி மேகமூட்டம்", iconId: "cloudy" },
            { day: "வெள்ளி, 28", temp: "29°C", condition: "மழை", iconId: "rain" },
            { day: "சனி, 29", temp: "30°C", condition: "இடியுடன் கூடிய மழை", iconId: "thunder" },
            { day: "ஞாயிறு, 30", temp: "33°C", condition: "வெயில்", iconId: "sunny" },
        ]
    },
    marketPricesPage: {
        title: "சந்தை விலைகள்",
        subtitle: "தமிழ்நாட்டில் உள்ள சந்தைகளில் இருந்து சமீபத்திய விவசாயப் பொருட்களின் விலைகள் (தற்காலிக தரவு).",
        tableHeaders: {
            crop: "பயிர்",
            market: "சந்தை",
            price: "விலை",
            lastUpdated: "கடைசியாகப் புதுப்பித்தது"
        },
        marketData: [
            { crop: "நெல்", market: "தஞ்சாவூர்", price: "₹2,183 / குவிண்டால்", date: "2024-07-26" },
            { crop: "மஞ்சள்", market: "ஈரோடு", price: "₹17,500 / குவிண்டால்", date: "2024-07-26" },
            { crop: "தேங்காய்", market: "பொள்ளாச்சி", price: "₹28 / கிலோ", date: "2024-07-25" },
            { crop: "வெங்காயம்", market: "திண்டுக்கல்", price: "₹3,500 / குவிண்டால்", date: "2024-07-26" },
            { crop: "தக்காளி", market: "கோயம்புத்தூர்", price: "₹2,200 / குவிண்டால்", date: "2024-07-26" },
            { crop: "கரும்பு", market: "விழுப்புரம்", price: "₹2,950 / டன்", date: "2024-07-25" },
            { crop: "பருத்தி", market: "சேலம்", price: "₹6,800 / குவிண்டால்", date: "2024-07-25" },
        ]
    },
    schemesPage: {
        title: "அரசு திட்டங்கள்",
        subtitle: "தமிழ்நாட்டில் உள்ள விவசாயிகளுக்கான விவசாயத் திட்டங்கள் பற்றிய தகவல்கள்.",
        schemesData: [
            {
              title: "பிரதம மந்திரி கிசான் சம்மன் நிதி (PM-KISAN)",
              content: "அனைத்து நில உரிமையாளர் விவசாயி குடும்பங்களுக்கும் வருமான ஆதரவு திட்டம். இத்திட்டத்தின் கீழ், ஒவ்வொரு ஆண்டும் ₹6,000 மூன்று சம தவணைகளில் தலா ₹2,000 வீதம் வழங்கப்படுகிறது. இந்த மத்திய துறை திட்டம் 100% இந்திய அரசால் நிதியளிக்கப்படுகிறது.",
            },
            {
              title: "கலைஞரின் அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சித் திட்டம்",
              content: "தமிழ்நாட்டில் உள்ள அனைத்து கிராமங்களையும் ஐந்து ஆண்டுகளில் விவசாயத்தில் தன்னிறைவு அடையச் செய்வதை நோக்கமாகக் கொண்டது. அனைத்து 12,525 கிராம ஊராட்சிகளிலும் நீர் சேமிப்பு, பயிர் பல்வகைப்படுத்தல், நவீன விவசாய நுட்பங்களை ஊக்குவித்தல் மற்றும் தேவையான உள்கட்டமைப்பை மேம்படுத்துதல் ஆகியவற்றில் கவனம் செலுத்துகிறது.",
            },
            {
              title: "பிரதம மந்திரி ஃபசல் பீமா யோஜனா (PMFBY)",
              content: "இயற்கை சீற்றங்கள், பூச்சிகள் மற்றும் நோய்களின் விளைவாக அறிவிக்கப்பட்ட பயிர்களில் ஏதேனும் தோல்வியுற்றால் விவசாயிகளுக்கு விரிவான காப்பீட்டுத் தொகை மற்றும் நிதி உதவியை வழங்குவதற்கான பயிர் காப்பீட்டுத் திட்டம்.",
            },
            {
              title: "தேசிய வேளாண் சந்தை (e-NAM)",
              content: "வேளாண் பொருட்களுக்கான ஒருங்கிணைந்த தேசிய சந்தையை உருவாக்க தற்போதுள்ள APMC மண்டிகளை இணைக்கும் ஒரு பான்-இந்தியா மின்னணு வர்த்தக போர்டல். இது ஒரு வெளிப்படையான ஏல செயல்முறை மூலம் சிறந்த விலை கண்டுபிடிப்பை வழங்குகிறது.",
            },
            {
              title: "தமிழ்நாடு முதலமைச்சரின் உழவர் பாதுகாப்புத் திட்டம்",
              content: "விவசாயிகள் மற்றும் விவசாயத் தொழிலாளர்களுக்கான ஒரு சமூகப் பாதுகாப்புத் திட்டம். இது கல்வி, திருமணம், மகப்பேறு மற்றும் இயற்கை மரணத்திற்கு நிதி உதவி வழங்குகிறது.",
            }
        ]
    },
    contactPage: {
        title: "தொடர்பு & ஆதரவு",
        subtitle: "எந்தவொரு உதவி அல்லது கேள்விகளுக்கும் எங்களைத் தொடர்பு கொள்ளுங்கள்.",
        contactOptions: [
            {
                id: "phone",
                title: "உழவன் உதவி மையத்தை அழைக்கவும்",
                content: "உடனடி உதவிக்கு, கட்டணமில்லா எண்ணை அழைக்கவும்.",
                contact: "1800-425-1551",
            },
            {
                id: "email",
                title: "மின்னஞ்சல் ஆதரவு",
                content: "உங்கள் கேள்விகளை எங்கள் ஆதரவுக் குழுவிற்கு அனுப்பவும்.",
                contact: "support@agri.tn.gov.in",
            },
            {
                id: "help",
                title: "உதவி மையம் & அடிக்கடி கேட்கப்படும் கேள்விகள்",
                content: "TN வேளாண்மை போர்ட்டலில் அடிக்கடி கேட்கப்படும் கேள்விகளுக்கான பதில்களைக் கண்டறியவும்.",
                contact: "agrisnet.tn.gov.in ஐப் பார்வையிடவும்",
            },
        ]
    },
    chatbot: {
      title: "AI உதவியாளர்",
      placeholder: "தமிழ்நாட்டில் விவசாயம் பற்றி எதையும் கேளுங்கள்...",
      send: "அனுப்பு",
      open: "AI அரட்டையைத் திற",
      error: "மன்னிக்கவும், ஒரு பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
    }
  },
};
