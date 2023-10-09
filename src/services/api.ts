const BASE_URL = "http://localhost:3000/api";
export const sendConeData = async (data: any) => {
  try {
    const response = await fetch(`${BASE_URL}/computeTriangulation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
