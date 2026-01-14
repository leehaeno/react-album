import { useEffect, useState } from 'react';
import CommonHeader from '@/components/common/header/CommonHeader';
import Card from './components/Card';
import DetailDialog from '@/components/common/dialog/DetailDialog';
import { useBookmark } from '@/hooks/useBookmark';
import styles from './styles/index.module.scss';
import { CardDTO } from '@/types/index';

function Index() {
    const { isBookmarked, getBookmarks, clearBookmarks } = useBookmark();
    const [bookmarks, setBookmarks] = useState<CardDTO[]>([]);
    const [selectedCard, setSelectedCard] = useState<CardDTO | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // 북마크 데이터 불러오기
    const loadBookmarks = () => {
        const data = getBookmarks();
        setBookmarks(data);
    };

    // 카드 클릭 핸들러
    const handleCardClick = (card: CardDTO) => {
        setSelectedCard(card);
        setIsDialogOpen(true);
    };

    const handleClearClick = () => {
        clearBookmarks();
        loadBookmarks();
    }

    // 다이얼로그 닫기 핸들러
    const handleDialogClose = () => {
        setIsDialogOpen(false);
        // 다이얼로그 닫을 때 북마크 목록 새로고침 (북마크 제거했을 수 있으므로)
        if(!isBookmarked) {
            loadBookmarks();
            setSelectedCard(null);
            // 약간의 딜레이 후 선택된 카드 초기화
            //setTimeout(() => setSelectedCard(null), 300);
        }
        
    };

    useEffect(() => {
        loadBookmarks();
    }, []);

    return (
        <>
            <div className={styles.page}>
                <CommonHeader />
                <main className={styles.page__contents}>
                    {bookmarks.length === 0 ? (
                        <div className={styles.page__contents__noData}>
                            <div>
                                조회 가능한 데이터가 없습니다.
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button className={styles.page__contents__clearBtn} onClick={()=> handleClearClick()}>전체 삭제</button>
                            <div className={styles.page__contents__getData}>
                                {bookmarks.map((item: CardDTO) => (
                                    <Card
                                        key={item.id}
                                        prop={item}
                                        onClick={() => handleCardClick(item)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {isDialogOpen && selectedCard && (
                <DetailDialog
                    data={selectedCard}
                    handleDialog={handleDialogClose}
                />
            )}
        </>
    );
}

export default Index;
