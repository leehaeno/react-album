import { CardDTO } from '@/types/index';
import styles from './Card.module.scss';

interface Props {
    prop: CardDTO;
    onClick: () => void;
}

function Card({ prop, onClick }: Props) {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.card__imageBox}>
                <img
                    src={prop.urls.small}
                    alt={prop.alt_description || '이미지'}
                    className={styles.card__imageBox__image}
                />
            </div>
            <div className={styles.card__infoBox}>
                <div className={styles.card__infoBox__row}>
                    <span className={styles.label}>작성자</span>
                    <span className={styles.value}>{prop.user.name}</span>
                </div>
                <div className={styles.card__infoBox__row}>
                    <span className={styles.label}>이미지 크기</span>
                    <span className={styles.value}>
                        {prop.width} X {prop.height}
                    </span>
                </div>
                <div className={styles.card__infoBox__row}>
                    <span className={styles.label}>업로드 날짜</span>
                    <span className={styles.value}>{prop.created_at.split('T')[0]}</span>
                </div>
                <div className={styles.card__infoBox__row}>
                    <span className={styles.label}>마지막 업데이트</span>
                    <span className={styles.value}>{prop.updated_at.split('T')[0]}</span>
                </div>
                <div className={styles.card__infoBox__row}>
                    <span className={styles.label}>다운로드 수</span>
                    <span className={styles.value}>{prop.likes}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;
