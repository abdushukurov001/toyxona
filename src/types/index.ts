export interface StaffMember {
  id: number;
  name: string;
  role: string;
  image: string;
  salary: number;
  salaryType: 'monthly' | 'daily';
  startDate: string;
  workingHours: string;
}

export interface ServiceType {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface PricePackage {
  id: number;
  title: string;
  price: number;
  description: string;
  features: string[];
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
  image: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  eventType: 'wedding' | 'birthday' | 'feast' | 'other';
  image: string;
  clientName: string;
  clientPhone: string;
  price: number;
  guestCount: number;
  notes?: string;
}

export interface AuthUser {
  username: string;
  isAuthenticated: boolean;
}

export interface Message {
  id: number;
  name: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

export interface DashboardStats {
  totalStaff: number;
  totalEvents: number;
  totalRevenue: number;
  messageCount: number;
  upcomingEvents: CalendarEvent[];
  recentMessages: Message[];
  eventTypeStats: {
    type: string;
    count: number;
    percentage: number;
  }[];
}