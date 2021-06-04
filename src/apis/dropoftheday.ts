import axios from './axios'
import { readCookie } from './cookie'

export const getHistory = () => {
	return axios.get(`/api/public/home/dropOfTheDay/history?startAt=0&endAt=18209419139675565254`)
}
