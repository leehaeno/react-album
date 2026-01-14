import { selector } from "recoil";
import { searchState } from "../atoms/searchState";
import { pageState } from "../atoms/pageState";

import axios from "axios";

const API_URL = import.meta.env.VITE_UNSPLASH_API_URL;
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const PER_PAGE = 30

export const imageData = selector({
    key: 'imageData',
    get: async ({ get }) => {
        const searchValue = get(searchState);
        const pageValue = get(pageState);
        

        if (!API_KEY) {
            throw new Error("Unsplash API Key가 없습니다.");
        }

        //API 호출
        try{
            const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`);
            const data = res.data;
    
            if (data.results.length === 0) {
                return {
                    ...data,
                    total_pages: pageValue - 1,  // 이전 페이지로 조정
                    has_more: false
                };
            }
            
            return data;
        }catch(error){
            console.log(error);
        }
    }
});