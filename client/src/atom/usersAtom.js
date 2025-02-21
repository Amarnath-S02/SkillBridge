import { atom, selector } from "recoil";
import axios from "axios";

export const usersAtom = atom({
  key: "usersAtom",
  default: [],
});

export const usersSelector = selector({
  key: "usersSelector",
  get: async ({ get }) => {
    try {
      const token = localStorage.getItem("token"); // Ensure token is stored after login
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${token}` }, // Add token
      });

      console.log("Fetched Users:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
      return [];
    }
  },
});
