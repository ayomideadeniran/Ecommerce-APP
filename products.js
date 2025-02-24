const products = [
  {
    id: 1,
    name: "Solar Panel Kit",
    price: 499,
    discount: 10, // 10% discount
    stock: 100, // 100 kits left in stock
    image: "https://i.ebayimg.com/images/g/GRcAAOSwAvlijHFE/s-l960.jpg",
    description: "High-efficiency solar panel kit for home and commercial use.",
    specifications: {
      powerOutput: "300W",
      efficiency: "20%",
      warranty: "25 years",
      features: ["Weatherproof", "Easy Installation", "High Efficiency"],
    },
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Lithium-Ion Battery",
    price: 299,
    discount: 5, // 5% discount
    stock: 75, // 75 units left in stock
    image: "https://d3f7dpm96o8eu9.cloudfront.net/media/wysiwyg/Blog/59936115_2372813869407905_6412893490170036224_o.jpg",
    description: "Long-lasting lithium-ion battery for solar storage.",
    specifications: {
      capacity: "5kWh",
      cycles: "5000+",
      weight: "25kg",
      features: ["Smart Monitoring", "Compact Design", "Deep Discharge"],
    },
    date: "2023-12-10",
  },
  {
    id: 3,
    name: "Pure Sine Wave Inverter",
    price: 399,
    discount: 15, // 15% discount
    stock: 50, // 50 units left in stock
    image: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/42/4072104/1.jpg?9929",
    description: "High-quality pure sine wave inverter for seamless power conversion.",
    specifications: {
      powerRating: "3000W",
      efficiency: "95%",
      cooling: "Fan-based",
      features: ["Quiet Operation", "Overload Protection", "Surge Protection"],
    },
    date: "2024-02-01",
  },
  {
    id: 4,
    name: "Portable Solar Generator",
    price: 699,
    discount: 0, // No discount
    stock: 30, // 30 units left in stock
    image: "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/Q/H/75657_1525936663.jpg",
    description: "Compact solar generator for camping and outdoor adventures.",
    specifications: {
      capacity: "1000Wh",
      inputPower: "150W",
      outputPower: "800W",
      features: ["USB Ports", "AC Outlets", "LED Lighting"],
    },
    date: "2024-01-22",
  },
  {
    id: 5,
    name: "Solar Water Heater",
    price: 799,
    discount: 20, // 20% discount
    stock: 25, // 25 units left in stock
    image: "https://powersolutionmall.com/storage/2022/06/100-Lter-Solar-water-heater.jpg",
    description: "Energy-efficient solar water heater for residential use.",
    specifications: {
      capacity: "200L",
      material: "Stainless Steel",
      insulation: "Polyurethane Foam",
      features: ["Anti-freeze", "Durable", "Low Maintenance"],
    },
    date: "2024-02-05",
  },
  {
    id: 6,
    name: "Solar Street Light",
    price: 449,
    discount: 10, // 10% discount
    stock: 60, // 60 units left in stock
    image: "https://i.ebayimg.com/images/g/DJEAAOSwEUtnGRoM/s-l960.jpg",
    description: "Solar-powered street light with motion detection.",
    specifications: {
      brightness: "5000 Lumens",
      batteryLife: "12 hours",
      connectivity: "Motion Sensor",
      features: ["Auto On/Off", "Remote Control", "Waterproof"],
    },
    date: "2024-01-30",
  },
  {
    id: 7,
    name: "Home Energy Storage System",
    price: 1299,
    discount: 5, // 5% discount
    stock: 15, // 15 units left in stock
    image: "https://www.lithium-battery-factory.com/wp-content/uploads/2023/05/home-energy-storage-system.jpg",
    description: "Advanced energy storage system for homes.",
    specifications: {
      capacity: "10kWh",
      chargeTime: "4 hours",
      compatibility: "Solar Panels",
      features: ["Smart App Control", "Backup Power", "Expandable"],
    },
    date: "2024-02-03",
  },
  {
    id: 8,
    name: "Solar-Powered Fan",
    price: 149,
    discount: 0, // No discount
    stock: 100, // 100 units left in stock
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjjfFp-Hlw9_EzHiBPTsjVaDwgQimgEhDNWg&s",
    description: "Eco-friendly solar-powered fan for indoor and outdoor use.",
    specifications: {
      size: "12-inch",
      powerSource: "Solar Panel",
      features: ["Adjustable Speed", "Noiseless Operation", "Rechargeable Battery"],
    },
    date: "2024-01-29",
  },
  { 
    id: 9,
    name: "Solar Phone Charger",
    price: 59,
    discount: 15, // 15% discount
    
    stock: 200, // 200 units left in stock
    image: "https://images-cdn.ubuy.co.in/65cc3cb75b8e111e043a698a-bigblue-10w-etfe-solar-panel-charger.jpg",
    description: "Compact solar phone charger for on-the-go charging.",
    specifications: {
      capacity: "5000mAh",
      inputPower: "2W",
      features: ["USB Output", "Lightweight", "Waterproof"],
    },
    date: "2024-01-17",
  },
  {
    id: 10,
    name: "Hybrid Inverter",
    price: 899,
    discount: 10, // 10% discount
    stock: 40, // 40 units left in stock
    image: "https://cdn.prod.website-files.com/62d9fdb180261014e2020876/62da526c754c765220afc272_SOLAR_NXG%2B1500VA2.png",
    description: "Hybrid inverter for solar and grid integration.",
    specifications: {
      powerRating: "5000W",
      efficiency: "96%",
      modes: ["Solar Mode", "Grid Mode", "Battery Mode"],
      features: ["MPPT Technology", "Real-time Monitoring", "Grid Support"],
    },
    date: "2024-01-12",
  },
];

export default products;


