const BASE_API_URL = "https://api.data.gov.sg/v1/environment/rainfall";

async function getWeather() {
    const response = await axios.get(`${BASE_API_URL}`);
    console.log(response.data);
    return response.data;
}