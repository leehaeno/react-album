import { useState, useEffect, useCallback } from 'react';
import toast, { toastConfig } from 'react-simple-toasts';
import { CardDTO } from '@/types/index';

import 'react-simple-toasts/dist/theme/dark.css';

toastConfig({ theme: 'dark'})

export function useBookmark(itemId?: string) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    // 북마크 상태 확인
    useEffect(() => {
        if (!itemId) return;

        const bookmarks = JSON.parse(localStorage.getItem('bookmark') || '[]');
        const exists = bookmarks.some((item: CardDTO) => item.id === itemId);
        setIsBookmarked(exists);
    }, [itemId]);

    // 북마크 토글
    const toggleBookmark = useCallback((item: CardDTO) => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmark') || '[]');
        const index = bookmarks.findIndex((bookmark: CardDTO) => bookmark.id === item.id);
        if (index > -1) {
            // 북마크 제거
            bookmarks.splice(index, 1);
            setIsBookmarked(false);
            toast('북마크에서 제거되었습니다. ❌');
        } else {
            // 북마크 추가
            bookmarks.push(item);
            setIsBookmarked(true);
            toast('해당 이미지를 북마크에 저장하였습니다. 😄');
        }

        localStorage.setItem('bookmark', JSON.stringify(bookmarks));
    }, []);

    // 모든 북마크 가져오기
    const getBookmarks = useCallback((): CardDTO[] => {
        return JSON.parse(localStorage.getItem('bookmark') || '[]');
    }, []);

    // 북마크 전체 삭제
    const clearBookmarks = useCallback(() => {
        if(!localStorage.getItem('bookmark')) return;
        localStorage.removeItem('bookmark');
        setIsBookmarked(false);
        toast('모든 북마크가 삭제되었습니다.');
    }, []);

    return {
        isBookmarked,
        toggleBookmark,
        getBookmarks,
        clearBookmarks,
    };
}
