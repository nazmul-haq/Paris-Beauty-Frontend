import axios from "axios";
import { parseCookies } from "nookies";
import hostname from "./config";

export default async function request(url, token = null, isReseller = null) {
  const cookies = parseCookies();

  const config = {
    headers: {
      Authorization: `Bearer ${token ? token || "" : cookies?.token || ""}`,
    },
  };
  let new_url = isReseller ? `reseller-${url}` : url;

  try {
    const res = await axios.get(`${hostname?.hostname}/${new_url}`, config);

    return res.data;
  } catch (error) {}
}
