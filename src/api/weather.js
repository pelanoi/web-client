import { get } from "./http";
import { parseISO, format } from "date-fns";

export async function getLatest() {
  const response = await get("/last");
  response.time = parseISO(response.time);
  return response;
}

export async function getInterval() {
  return get("/interval/1h").then(function (response) {
    const result = {
      time: [],
      humidity: [],
      rain: [],
      temp: [],
      windspeed: [],
    };

    response.forEach(function (item) {
      const time = format(parseISO(item.time), "HH:mm");
      result.time.push(time);

      Object.keys(result).forEach(function (key) {
        if (key === "time") {
          return;
        }
        result[key].push(item[key]);
      });
    });

    return result;
  });
}
