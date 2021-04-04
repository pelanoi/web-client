import {http} from './http';
import {parseISO} from 'date-fns';

export async function getLatest() {
  const response = await http.get('/last');
  response.data.time = parseISO(response.data.time);
  return response.data;
}
