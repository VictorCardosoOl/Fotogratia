export interface Photo {
  id: string;
  url: string;
  title: string;
  category: 'wedding' | 'portrait' | 'commercial' | 'editorial';
  description?: string;
}

export interface Service {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  image?: string;
}

export interface NavLink {
  label: string;
  path: string;
}