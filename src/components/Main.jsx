import React, { memo } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Favorites } from '../pages/Favorites';
import { Slider } from '../components/Slider';
import { Purchases } from '../pages/Purchases';
import { AllSneakers } from '../pages/AllSneakers';

export const Main = memo(({
    sneakers,
    setCart,
    setFavorites,
    pagesCount,
    currPage,
    setCurrPage,
    searchValue,
    setSearchValue,
    navigate
}) => {

    return (
        <main className='app_main'>
            <div className="app_main_container">
                <Slider />
                <Routes>
                    {/* разница */}
                    <Route
                        path=''
                        element={<AllSneakers
                            sneakers={sneakers}
                            setCart={setCart}
                            pagesCount={pagesCount}
                            currPage={currPage}
                            setCurrPage={setCurrPage}
                            setFavorites={setFavorites}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                        />}
                    />
                    <Route
                        path='favorites'
                        element={<Favorites
                            setCart={setCart}
                            setFavorites={setFavorites}
                            navigate={navigate}
                        />}
                    />
                    <Route
                        path='purchases'
                        element={<Purchases navigate={navigate} />}
                    />
                    <Route path="*" element={<Navigate to="" replace />} />
                </Routes>
            </div>
        </main >
    );
});
