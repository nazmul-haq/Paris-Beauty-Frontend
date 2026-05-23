import axios from "axios";
import { parseCookies } from "nookies";
import hostname from "./config";

export default async function postRequest(
  url,
  data,
  token = null,
  isReseller = null
) {
  const cookies = parseCookies();

  const config = {
    headers: {
      Authorization: `Bearer ${token ? token || "" : cookies?.token || ""}`,
    },
  };
  let new_url = isReseller ? `reseller-${url}` : url;

  try {
    const res = await axios.post(
      `${hostname?.hostname}/${new_url}`,
      data,
      config
    );
    if (res.hasOwnProperty("data")) {
      return res?.data;
    } else {
    }
  } catch (error) {
    return error?.response?.data;
  }
}
