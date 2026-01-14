import { useMemo, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { imageData } from '@/recoil/selectors/imageSelector';
import CommonSearchBar from '@/components/common/searchBar/CommonSearchBar';
import CommonHeader from '@/components/common/header/CommonHeader';
import CommonNav from '@/components/common/navigation/CommonNav';
import CommonFooter from '@/components/common/footer/CommonFooter';
import Card from './components/Card';
import Loading from './components/Loading';
import DetailDialog from '@/components/common/dialog/DetailDialog';
import { CardDTO } from '@/types/index';

// CSS
import styles from './styles/index.module.scss';

function Index() {
    const imgSelector = useRecoilValueLoadable(imageData);
    const [imgData, setImgData] = useState<CardDTO | null>(null);
    const [open, setOpen] = useState<boolean>(false) // 이미지 상세 다이얼로그 발생(관리) State

    const CARD_LIST = useMemo(() => {
        // 로딩 상태
        if (imgSelector.state === 'loading') {
            return <Loading />;
        }
        
        // 에러 상태
        if (imgSelector.state === 'hasError') {
            return (
                <div className="text-center py-10">
                    <p className="text-red-500">이미지를 불러오는데 실패했습니다.</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        다시 시도
                    </button>
                </div>
            );
        }
        
        // 성공 상태
        if (imgSelector.state === 'hasValue') {
            const results = imgSelector.contents.results;
            
            if (!results || results.length === 0) {
                return (
                    <div className="text-center py-10">
                        <p className="text-gray-500">이미지가 없습니다.</p>
                    </div>
                );
            }
            
            return results.map((card: CardDTO) => (
                <Card 
                    data={card} 
                    key={card.id} 
                    handleDialog={setOpen} 
                    handleSetData={setImgData}
                />
            ));
        }
        
        return null;
    }, [imgSelector.state, imgSelector.contents]);

    const handleDialogClose = () => {
        setOpen(false);
        // 다이얼로그 닫을 때 데이터도 초기화 (선택사항)
        setImgData(null);
    };

    return (
        <div className={styles.page}>
            <CommonHeader />
            <CommonNav />
            
            <div className={styles.page__contents}>
                <div className={styles.page__contents__introBox}>
                    <div className={styles.wrapper}> 
                        <p className={styles.wrapper__title}>PhotoSplash</p>
                        <span className={styles.wrapper__desc}>
                            인터넷의 시각 자료 출처입니다.<br />
                            모든 지역에 있는 크리에이터들의 지원을 받습니다.
                        </span>
                        <CommonSearchBar />
                    </div>
                </div>
                
                <div className={styles.page__contents__imagesBox}>
                    {CARD_LIST}
                </div>
            </div>
            
            <CommonFooter />
            
            {open && imgData && (
                <DetailDialog 
                    data={imgData} 
                    handleDialog={handleDialogClose}
                />
            )}
        </div>
    );
}

export default Index;