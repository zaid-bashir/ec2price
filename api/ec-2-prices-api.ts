export default async function fetchEC2Prices(payload: Record<string, unknown>) {
  const url = "https://dt-url.net/ec2prices";
  console.log(payload);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      return { data: [], types: [], metadata: [] };
    }
    return await response.json();
  } catch (error) {
    console.error("Error Fetching EC2 Prices:", error);
    return { data: [], types: [], metadata: [] };
  }
}
