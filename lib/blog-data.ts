export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  authorRole: string
  publishDate: string
  category: string
  image: string
  readTime: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Neighborhoods in Nairobi for Young Professionals",
    excerpt:
      "Discover the best areas in Nairobi that offer the perfect blend of affordability, convenience, and lifestyle for young professionals.",
    content:
      "Nairobi offers a diverse range of neighborhoods, each with its unique character and amenities. For young professionals, finding the right area can make all the difference in work-life balance...",
    author: "Sarah Kimani",
    authorRole: "Real Estate Expert",
    publishDate: "2025-01-05",
    category: "Property Trends",
    image: "/nairobi-skyline-neighborhoods.jpg",
    readTime: "5 min read",
    tags: ["Nairobi", "Young Professionals", "Neighborhoods"],
  },
  {
    id: "2",
    title: "Understanding Kenya's Real Estate Market in 2025",
    excerpt:
      "An in-depth analysis of current market trends, property values, and investment opportunities in Kenya's real estate sector.",
    content:
      "The Kenyan real estate market has shown remarkable resilience and growth over the past year. With increasing urbanization and infrastructure development...",
    author: "David Mwangi",
    authorRole: "Market Analyst",
    publishDate: "2025-01-03",
    category: "Market Analysis",
    image: "/kenya-real-estate-market-trends.jpg",
    readTime: "8 min read",
    tags: ["Market Trends", "Investment", "Kenya"],
  },
  {
    id: "3",
    title: "First-Time Renter's Guide: What to Look For",
    excerpt:
      "Essential tips and checklist for first-time renters to ensure they find the perfect property and avoid common pitfalls.",
    content:
      "Renting your first property can be both exciting and overwhelming. This comprehensive guide will walk you through everything you need to know...",
    author: "Grace Njeri",
    authorRole: "Property Consultant",
    publishDate: "2025-01-01",
    category: "Home Tips",
    image: "/first-time-renter-guide-checklist.jpg",
    readTime: "6 min read",
    tags: ["Renting", "First-Time", "Tips"],
  },
  {
    id: "4",
    title: "How to Negotiate Rent in Kenya: Expert Tips",
    excerpt: "Learn proven strategies to negotiate better rental terms and save money on your next property lease.",
    content:
      "Negotiating rent can feel intimidating, but with the right approach and knowledge, you can secure better terms. Here are expert strategies...",
    author: "Peter Omondi",
    authorRole: "Negotiation Specialist",
    publishDate: "2024-12-28",
    category: "Home Tips",
    image: "/rent-negotiation-tips-kenya.jpg",
    readTime: "7 min read",
    tags: ["Negotiation", "Renting", "Money Saving"],
  },
  {
    id: "5",
    title: "Coastal Living: Best Properties in Mombasa",
    excerpt: "Explore the most desirable beachfront and coastal properties in Mombasa and surrounding areas.",
    content:
      "Mombasa offers a unique lifestyle with its beautiful beaches, warm climate, and vibrant culture. Here's a guide to the best coastal properties...",
    author: "Fatuma Ali",
    authorRole: "Coastal Property Expert",
    publishDate: "2024-12-25",
    category: "Property Trends",
    image: "/mombasa-coastal-properties-beachfront.jpg",
    readTime: "6 min read",
    tags: ["Mombasa", "Coastal", "Beachfront"],
  },
  {
    id: "6",
    title: "Home Security Tips for Kenyan Renters",
    excerpt: "Essential security measures and tips to keep your rental property safe and secure.",
    content:
      "Security is a top priority for renters in Kenya. This guide covers practical steps you can take to enhance your home security...",
    author: "John Kariuki",
    authorRole: "Security Consultant",
    publishDate: "2024-12-22",
    category: "Home Tips",
    image: "/home-security-tips-kenya-renters.jpg",
    readTime: "5 min read",
    tags: ["Security", "Safety", "Home Tips"],
  },
]
