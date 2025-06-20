import axios from "axios";

export async function getCookies() {
    try {
        const res = await axios.get("/api/cookies");
        return res.data.cookies;
    } catch (error) {
        console.log("Error fetching cookies:", error);
        return undefined;
    }
}