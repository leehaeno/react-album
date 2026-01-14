import { CardDTO } from '@/types';
import { useBookmark } from '@/hooks/useBookmark';
import { useDialog } from '@/hooks/useDialog';
import styles from './DetailDialog.module.scss';

interface Props{
    data: CardDTO
    handleDialog: (eventValue: boolean) => void
}

function DetailDialog({ data, handleDialog }: Props) {
    // 북마크 훅 사용
    const { isBookmarked, toggleBookmark } = useBookmark(data.id);

    // 다이얼로그 훅 사용
    const { dialogRef, handleClose } = useDialog({
        onClose: () => handleDialog(false),
    });

    return (
        <div className={styles.container} ref={dialogRef}>
            <div className={styles.container__dialog}>
                <div className={styles.container__dialog__header}>
                    <div className={styles.close}>
                        <button className={styles.close__button} onClick={handleClose}>
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: '28px' }}
                            >
                                close
                            </span>
                        </button>
                        <img
                            src={data.user.profile_image.small}
                            alt="사진작가 프로필 사진"
                            className={styles.close__authorImage}
                        />
                        <span className={styles.close__authorName}>{data.user.name}</span>
                    </div>
                    <div className={styles.bookmark}>
                        <button
                            className={styles.bookmark__button}
                            onClick={() => toggleBookmark(data)}
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{
                                    fontSize: '16px',
                                    color: isBookmarked ? 'red' : 'inherit',
                                }}
                            >
                                favorite
                            </span>
                            북마크
                        </button>
                    </div>
                </div>
                <div className={styles.container__dialog__body}>
                    <img
                        src={data.urls.small}
                        alt="상세이미지"
                        className={styles.image}
                    />
                </div>
                <div className={styles.container__dialog__footer}>
                    <div className={styles.infoBox}>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>이미지 크기</span>
                            <span className={styles.infoBox__item__value}>
                                {data.width} X {data.height}
                            </span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>업로드</span>
                            <span className={styles.infoBox__item__value}>
                                {data.created_at.split('T')[0]}
                            </span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>마지막 업데이트</span>
                            <span className={styles.infoBox__item__value}>
                                {data.updated_at.split('T')[0]}
                            </span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>다운로드</span>
                            <span className={styles.infoBox__item__value}>{data.likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailDialog