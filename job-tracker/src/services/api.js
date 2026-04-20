import axios from 'axios';

export const fetchMockJobs = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    const products = response.data.products;

    // Map dummy products to mock job applications
    return products.slice(0, 10).map((p) => ({
      id: p.id.toString(),
      company: p.brand || "TechCorp",
      role: p.title,
      location: "Remote",
      salary: p.price * 1000,
      platform: "LinkedIn",
      status: "Applied",
      appliedDate: new Date().toISOString().split('T')[0],
      interviewDate: "",
      notes: p.description,
      bookmarked: false
    }));
  } catch (error) {
    console.error("Failed to fetch mock jobs", error);
    return [];
  }
};
