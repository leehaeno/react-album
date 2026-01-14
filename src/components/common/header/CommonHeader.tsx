import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { pageState } from '@/recoil/atoms/pageState';
import { searchState } from '@/recoil/atoms/searchState';

// css
import styles from './CommonHeader.module.scss';

function CommonHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const [, setPage] = useRecoilState(pageState);
    const [, setSearch] = useRecoilState(searchState);

    useEffect(() => {
        if ('/' === location.pathname) {
            setSearch('seoul');
            setPage(1);
        }
    }, [location.pathname]);
    
    //페이지로 이동
    const moveToPage = (filter: string) =>{
        if(filter == 'main') navigate('/');
        if(filter == 'bookmark') navigate('/bookmark');
    }

    return (
        <header className={styles.header}>
            <Link to={'/'} onClick={() => moveToPage('main')} className={styles.header__logoBox}>
                <img src="/images/image-logo.png" alt="logo" className={styles.header__logoBox__logo} />
                <span className={styles.header__logoBox__title}>PhotoSplash</span>
            </Link>
            <div className={styles.header__profileBox}>
                <button className={styles.header__profileBox__button} onClick={() => moveToPage('bookmark')}>북마크</button>
            </div>    
        </header> 
    )
}

export default CommonHeader ;