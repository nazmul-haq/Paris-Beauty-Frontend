import axios from "axios";
import { parseCookies } from "nookies";
import {hostname} from "./config";


export default async function request(url, token = null) {
  const cookies = parseCookies();

  const config = {
    headers: { Authorization: `${token ? token||'' : cookies?.token||''}` },
    timeout: 10000, // 10 second timeout
  };

  try {
    const res = await axios.get(`${hostname}/api/landing/${url}`, config);
    return res.data;
  } catch (error) {
    console.error(`API Error for ${url}:`, error.message);
    // Return null instead of undefined to prevent crashes
    return null;
  }
}
