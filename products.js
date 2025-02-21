const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99,
    discount: 10, // 10% discount
    stock: 50, // 50 items left in stock
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "High-quality wireless headphones with noise cancellation and deep bass.",
    specifications: {
      batteryLife: "30 hours",
      connectivity: "Bluetooth 5.0",
      weight: "250g",
      charging: "USB-C Fast Charging",
      features: ["Noise Cancellation", "Touch Controls", "Voice Assistant"],
    },
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Smartwatch",
    price: 149,
    discount: 15, // 15% discount
    stock: 30, // 30 items left in stock
    image: "https://images.unsplash.com/photo-1558126319-c9feecbf57ee",
    description: "A sleek and stylish smartwatch with health tracking and customizable watch faces.",
    specifications: {
      display: "1.4-inch AMOLED",
      batteryLife: "7 days",
      connectivity: "Bluetooth 5.1, GPS",
      waterResistance: "5 ATM",
      features: ["Heart Rate Monitoring", "Sleep Tracking", "Message Notifications"],
    },
    date: "2023-12-10",
  },
  {
    id: 3,
    name: "Laptop",
    price: 899,
    discount: 5, // 5% discount
    stock: 10, // 10 items left in stock
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    description: "A powerful laptop with a high-resolution display and long battery life.",
    specifications: {
      processor: "Intel Core i7",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      display: "15.6-inch 1080p",
      batteryLife: "10 hours",
      features: ["Backlit Keyboard", "Fingerprint Sensor", "Thunderbolt 4"],
    },
    date: "2024-02-01",
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    price: 79,
    discount: 20, // 20% discount
    stock: 75, // 75 items left in stock
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb",
    description: "Compact wireless earbuds with immersive sound and long battery life.",
    specifications: {
      batteryLife: "24 hours",
      connectivity: "Bluetooth 5.2",
      charging: "Wireless & USB-C",
      features: ["Waterproof", "Touch Controls", "Noise Reduction"],
    },
    date: "2024-01-22",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    price: 59,
    discount: 0, // No discount
    stock: 100, // 100 items left in stock
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
    description: "High-precision gaming mouse with customizable RGB lighting.",
    specifications: {
      dpi: "16,000",
      connectivity: "Wired / Wireless",
      weight: "85g",
      features: ["Adjustable Sensitivity", "Programmable Buttons", "RGB Lighting"],
    },
    date: "2024-02-05",
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: 129,
    discount: 10, // 10% discount
    stock: 40, // 40 items left in stock
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    description: "Tactile mechanical keyboard with customizable key switches.",
    specifications: {
      switchType: "Cherry MX Red",
      connectivity: "Wired / Wireless",
      backlight: "RGB",
      features: ["Hot-Swappable Keys", "Custom Macros", "Aluminum Body"],
    },
    date: "2024-01-30",
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    price: 89,
    discount: 5, // 5% discount
    stock: 60, // 60 items left in stock
    image: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90",
    description: "Waterproof portable Bluetooth speaker with deep bass.",
    specifications: {
      batteryLife: "20 hours",
      connectivity: "Bluetooth 5.0",
      waterResistance: "IPX7",
      features: ["360° Sound", "Party Mode", "USB-C Charging"],
    },
    date: "2024-02-03",
  },
  {
    id: 8,
    name: "4K Action Camera",
    price: 199,
    discount: 0, // No discount
    stock: 20, // 20 items left in stock
    image: "https://images.unsplash.com/photo-1607462109225-ea396b5faa5e",
    description: "Compact 4K action camera with image stabilization.",
    specifications: {
      resolution: "4K 60FPS",
      connectivity: "WiFi & Bluetooth",
      waterResistance: "30m",
      features: ["Slow Motion", "Voice Control", "Touchscreen"],
    },
    date: "2024-01-29",
  },
  {
    id: 9,
    name: "Smart Light Bulb",
    price: 25,
    discount: 15, // 15% discount
    stock: 150, // 150 items left in stock
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
    description: "WiFi-enabled smart light bulb with adjustable brightness and colors.",
    specifications: {
      wattage: "10W",
      connectivity: "WiFi, Bluetooth",
      features: ["Voice Control", "Dimmable", "App Control"],
    },
    date: "2024-01-17",
  },
  {
    id: 10,
    name: "Robot Vacuum Cleaner",
    price: 299,
    discount: 10, // 10% discount
    stock: 25, // 25 items left in stock
    image: "https://images.unsplash.com/photo-1603468620905-8de7d86b781e",
    description: "Smart robot vacuum with mapping and automatic dirt disposal.",
    specifications: {
      batteryLife: "120 min",
      connectivity: "WiFi, App Control",
      features: ["Self-Charging", "Carpet Detection", "Schedule Cleaning"],
    },
    date: "2024-01-12",
  },
  {
    id: 11,
    name: "Smart Doorbell",
    price: 149,
    discount: 0, // No discount
    stock: 45, // 45 items left in stock
    image: "https://images.unsplash.com/photo-1620325867502-221cfb5faa5e",
    description: "Wireless video doorbell with motion detection and two-way audio.",
    specifications: {
      resolution: "1080p HD",
      connectivity: "WiFi, Cloud Storage",
      features: ["Night Vision", "Live Streaming", "Motion Alerts"],
    },
    date: "2024-01-09",
  },
  {
    id: 12,
    name: "VR Headset",
    price: 399,
    discount: 25, // 25% discount
    stock: 15, // 15 items left in stock
    image: "https://images.unsplash.com/photo-1622737133809-dfeddd827859",
    description: "Virtual reality headset with immersive 3D experiences.",
    specifications: {
      display: "OLED 120Hz",
      connectivity: "Wireless & PC VR",
      features: ["6DOF Tracking", "Hand Controllers", "Built-in Audio"],
    },
    date: "2024-01-25",
  },
  {
    id: 13,
    name: "Smart Coffee Maker",
    price: 99,
    discount: 5, // 5% discount
    stock: 80, // 80 items left in stock
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc",
    description: "WiFi-enabled coffee maker with customizable brew settings.",
    specifications: {
      capacity: "12 cups",
      connectivity: "WiFi, App Control",
      features: ["Programmable Timer", "Voice Control", "Auto Shutoff"],
    },
    date: "2024-02-07",
  },
  {
    id: 14,
    name: "Electric Toothbrush",
    price: 59,
    discount: 10, // 10% discount
    stock: 120, // 120 items left in stock
    image: "https://images.unsplash.com/photo-1621607517184-9c1ff0a84a1a",
    description: "Rechargeable smart toothbrush with multiple cleaning modes.",
    specifications: {
      batteryLife: "14 days",
      connectivity: "Bluetooth App",
      features: ["Pressure Sensor", "Timer", "Replaceable Heads"],
    },
    date: "2024-01-20",
  },
  {
    id: 15,
    name: "Smart Thermostat",
    price: 179,
    discount: 0, // No discount
    stock: 35, // 35 items left in stock
    image: "https://images.unsplash.com/photo-1620325867502-221cfb5faa5e",
    description: "AI-powered smart thermostat with energy-saving features.",
    specifications: {
      connectivity: "WiFi, Smart Assistant",
      features: ["Auto Schedule", "Voice Control", "Remote Access"],
    },
    date: "2024-01-18",
  },
  {
    id: 16,
    name: "Wireless Charging Pad",
    price: 39,
    discount: 0, // No discount
    stock: 200, // 200 items left in stock
    image: "https://images.unsplash.com/photo-1604594849809-dfeddd827859",
    description: "Fast wireless charging pad for smartphones and accessories.",
    specifications: {
      chargingSpeed: "15W",
      compatibility: "Qi-enabled devices",
      features: ["Overheat Protection", "Slim Design", "LED Indicator"],
    },
    date: "2024-02-08",
  },
];

export default products;