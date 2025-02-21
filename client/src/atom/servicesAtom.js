import { atom, selector } from "recoil";
import axios from "axios";

export const servicesAtom = atom({
  key: "servicesAtom",
  default: [],
});

export const servicesSelector = selector({
  key: "servicesSelector",
  get: async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/gigs");
      console.log("Fetched Services:", response.data); // ✅ Debugging
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  },
});
