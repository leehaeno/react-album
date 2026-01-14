import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchState } from '@/recoil/atoms/searchState';
import { pageState } from '@/recoil/atoms/pageState';
import styles from './CommonSearchBar.module.scss';


function CommonSearchBar() {
    const [, setSearch] = useRecoilState(searchState);
    const [, setPage] = useRecoilState(pageState);
    const [text, setText] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const onSearch = () => {
        if(text==''){
            // input 태그 안에 빈값으로 검색을 하였을 때 => searching default value
            setSearch('seoul')
            setPage(1)
        }else{
            setSearch(text) // 작성한 input value 값 할당
            setPage(1)
        }
    }

    const heandleKeyDown = (event: React.KeyboardEvent) =>{
        if(event.key == 'Enter'){
            if(text==''){
                // input 태그 안에 빈값으로 검색을 하였을 때 => searching default value
                setSearch('seoul')
                setPage(1)
            }else{
                setSearch(text) // 작성한 input value 값 할당
                setPage(1)
            }
        }
    }

    return (
        <div className={styles.searchBar}>
            <div className={styles.searchBar__search}>
                <input id="search" type="text" placeholder="찾으실 이미지를 검색하세요." className={styles.searchBar__search__input} value={text} onChange={onChange} onKeyDown={heandleKeyDown}/>
                <img src="/images/icons/icon-search.svg" alt="검색"  onClick={onSearch}/>
            </div>
        </div>
    )
}

export default CommonSearchBar