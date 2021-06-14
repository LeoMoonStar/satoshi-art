import axios from './axios'
import { readCookie } from './cookie'

export const getHistory = () => {
	return axios.get(`${process.env.REACT_APP_API}/api/public/home/dropOfTheDay/history?startAt=0&endAt=18209419139675565254`)
}

export const getCelebrityList = () =>{
	return axios.get(`${process.env.REACT_APP_API}/api/public/home/dropOfTheDay/homepage-celebrity?pageSize=8&page=1`)
}