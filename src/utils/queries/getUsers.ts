import { API_URL, INITIAL_RESULTS_PER_PAGE } from "../mock";
import delay from "../delay";
import axios from "axios";

export interface UserItem {
  gender: "female" | "male";
  login: {
    username: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    medium: string;
    large: string;
  };
  dob: {
    date: string;
  };
  registered: {
    date: string;
  };
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
}

interface GetUserItemsResponse {
  results: UserItem[];
  info: unknown;
}
export async function getUsers({
  searchParams = { page: "1", results: INITIAL_RESULTS_PER_PAGE + "" },
}: {
  searchParams?: Record<string, string>;
}) {
  const requestUrl = new URL(API_URL);

  // Setting up search parameters
  Object.keys(searchParams).forEach((key) => {
    requestUrl.searchParams.append(key, searchParams[key]);
  });

  try {
    const response = await axios.get<GetUserItemsResponse>(
      requestUrl.toString()
    );
    await delay(500);

    return response.data.results || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
