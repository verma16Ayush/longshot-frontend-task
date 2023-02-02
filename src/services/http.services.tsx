import { API_URLS, BASEURL, HTTP_METHODS } from "../const";
import { IGetDataRes } from "../types/getdatares";

export async function fetchData() : Promise<IGetDataRes> {
  const URL = `${BASEURL}${API_URLS.getdata}`
  const headers = new Headers();
  const requestOptions = {
    method: HTTP_METHODS.GET,
    headers: headers
  }

  const response = await fetch(URL, requestOptions);
  return await response.json();
}