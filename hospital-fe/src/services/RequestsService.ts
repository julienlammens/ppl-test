import Axios, { AxiosInstance } from "axios";

export class RequestsService {
  ax: AxiosInstance;

  constructor(baseURL: string) {
    this.ax = Axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json ",
      },
    });
  }
}
