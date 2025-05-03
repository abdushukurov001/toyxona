import { StaffMember, ServiceType, PricePackage, NewsItem, CalendarEvent } from '../types';

export const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: 'Ahmedov Bobur',
    role: 'Direktor',
    image: 'https://images.pexels.com/photos/5953526/pexels-photo-5953526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    salary: 0,
    salaryType: 'monthly',
    startDate: '',
    workingHours: ''
  },
  {
    id: 2,
    name: 'Mirsaidova Malika',
    role: 'Tadbirlar bo‘yicha menejer',
    image: 'https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    salary: 0,
    salaryType: 'monthly',
    startDate: '',
    workingHours: ''
  },
  {
    id: 3,
    name: 'Karimov Akbar',
    role: 'Bosh oshpaz',
    image: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    salary: 0,
    salaryType: 'monthly',
    startDate: '',
    workingHours: ''
  },
  {
    id: 4,
    name: 'Zokirova Nigina',
    role: 'Bezash bo‘yicha mutaxassis',
    image: 'https://images.pexels.com/photos/4064834/pexels-photo-4064834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    salary: 0,
    salaryType: 'monthly',
    startDate: '',
    workingHours: ''
  },
  {
    id: 5,
    name: 'Rahmatov Jasur',
    role: 'Yordamchi menejer',
    image: 'https://images.pexels.com/photos/8942567/pexels-photo-8942567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    salary: 0,
    salaryType: 'monthly',
    startDate: '',
    workingHours: ''
  }
];

export const serviceTypes: ServiceType[] = [
  {
    id: 1,
    title: 'To‘y marosimlari',
    description: 'Sizning maxsus kuningizni biz bilan unutilmas qiling – hashamatli zal va professional xizmatlar bilan.',
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    title: 'Tug‘ilgan kunlar',
    description: 'Tug‘ilgan kuningizni oila va do‘stlar bilan chiroyli bezatilgan joyda nishonlang.',
    image: 'https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    title: 'An’anaviy tantanalar',
    description: 'An’anaviy marosimlar va dasturxonlar uchun milliy taomlar va xizmatlar bilan xizmat qilamiz.',
    image: 'https://images.pexels.com/photos/5638748/pexels-photo-5638748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    title: 'Korporativ tadbirlar',
    description: 'Biznes uchrashuvlari, konferensiyalar va korporativ bayramlar uchun professional muhit.',
    image: 'https://images.pexels.com/photos/7682340/pexels-photo-7682340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const pricePackages: PricePackage[] = [
  {
    id: 1,
    title: 'Asosiy to‘plam',
    price: 180000,
    description: 'Kichik va o‘rtacha tadbirlar uchun asosiy to‘plam',
    features: [
      'Har bir kishi uchun ikki xil taom',
      'Gazsiz ichimliklar va suv',
      'Oddiy bezaklar',
      'Kelin-kuyov uchun maxsus stol',
      'Navbatchi xodimlar'
    ]
  },
  {
    id: 2,
    title: 'Premium to‘plam',
    price: 200000,
    description: 'Qo‘shimcha xizmatlar bilan kengaytirilgan to‘plam',
    features: [
      'Har bir kishi uchun ikki xil taom',
      'Gazsiz ichimliklar va suv',
      'Premium bezaklar',
      'Kelin-kuyov uchun maxsus stol',
      'Fotosurat xizmatlari',
      'Navbatchi xodimlar',
      'Kutib olish ichimliklari'
    ]
  },
  {
    id: 3,
    title: 'Lyuks to‘plam',
    price: 250000,
    description: 'Eng to‘liq xizmatlar bilan maxsus tadbirlar uchun to‘plam',
    features: [
      'Har bir kishi uchun uch xil taom',
      'Premium ichimliklar',
      'Hashamatli bezaklar',
      'Kelin-kuyov uchun maxsus stol',
      'Foto va video xizmatlari',
      'Jonli musiqa',
      'Navbatchi xodimlar',
      'Kutib olish ichimliklari va zakuskalar',
      'Buyurtma asosidagi tort'
    ]
  }
];


export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Yozgi to‘y aksiyasi',
    date: '2025-05-15',
    content: 'Yozgi to‘yingizga buyurtma bering va Premium to‘plamda 10% chegirmaga ega bo‘ling!',
    image: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    title: 'Yangi menyular taqdim etildi',
    date: '2025-04-20',
    content: 'Oshpazimiz mavsumiy mahsulotlar asosida yangi menyular tayyorladi.',
    image: 'https://images.pexels.com/photos/5779811/pexels-photo-5779811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    title: 'Zalni yangilash ishlari yakunlandi',
    date: '2025-03-10',
    content: 'Zalimiz yangilandi: yangi katta zal va bog‘ maydoni foydalanishga topshirildi.',
    image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const galleryImages = {
  toy: [
    'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3014825/pexels-photo-3014825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ],
  osh: [
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ],
  tugilganKun: [
    'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3870080/pexels-photo-3870080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ],
  korporativ: [
    'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/5779774/pexels-photo-5779774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ]
};

// Generate example events for the calendar
export const generateCalendarEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const eventTypes = ['wedding', 'birthday', 'feast', 'other'] as const;
  const images = {
    wedding: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    birthday: 'https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    feast: 'https://images.pexels.com/photos/5638748/pexels-photo-5638748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    other: 'https://images.pexels.com/photos/7682340/pexels-photo-7682340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  };

  // Belgilangan sanalar
  const fixedDates = [
    new Date('2025-05-01'),
    new Date('2025-05-10'),
    new Date('2025-06-15'),
    new Date('2025-07-20'),
    new Date('2025-08-01')
  ];

  fixedDates.forEach((date, index) => {
    const eventType = eventTypes[index % eventTypes.length];

    events.push({
      id: index + 1,
      title: `${eventType.charAt(0).toUpperCase() + eventType.slice(1)} Event #${index + 1}`,
      date: date,
      eventType: eventType,
      image: images[eventType],
      clientName: '',
      clientPhone: '',
      price: 0,
      guestCount: 0
    });
  });

  return events;
};

export const calendarEvents = generateCalendarEvents();
