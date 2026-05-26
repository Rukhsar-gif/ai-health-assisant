import api from "./api";

export const generateAIDiet = async (data) => {
  try {
    const res = await api.post("/ai/diet", data);

    return res.data.result;

  } catch (err) {
    console.error(err);

    return "AI generation failed ❌";
  }
};