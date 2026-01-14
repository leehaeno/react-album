
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
// 페이지 컴포넌트
import MainPges from "@pages/index/index";
import BookmarkPage from "@pages/bookmark/index";

function App() {
    return (    
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<MainPges/>}></Route>
                    <Route path='/search/:id' element={<MainPges />}></Route>
                    <Route path='/bookmark' element={<BookmarkPage />}/>
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    )
}

export default App;