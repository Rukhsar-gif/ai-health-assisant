



import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/diet", async (req, res) => {

  try {

    const {
      age,
      weight,
      disease,
      goal,
      foodType,
    } = req.body;

    // VALIDATION
    if (
      !age ||
      !weight ||
      !disease ||
      !goal ||
      !foodType
    ) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    // AI PROMPT
    const prompt = `
Generate a personalized professional diet plan.

User Details:
- Age: ${age}
- Weight: ${weight} kg
- Disease: ${disease}
- Goal: ${goal}
- Food Preference: ${foodType}

Create:
1. Breakfast
2. Mid-Morning Snack
3. Lunch
4. Evening Snack
5. Dinner
6. Daily Water Intake
7. Foods To Avoid
8. Health Tips

Keep the response clean and easy to read.
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",

      {
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      result:
        response.data.choices[0].message.content,
    });

  } catch (err) {

    console.log(err.response?.data || err.message);

    res.status(500).json({
      message: "AI generation failed",
    });
  }
});

export default router;