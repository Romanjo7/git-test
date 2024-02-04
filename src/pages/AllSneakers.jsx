import React, { memo, useContext } from 'react';
import { AllSneakersHeader } from '../components/AllSneakersHeader';
import { SneakersPages } from '../components/Sneakers/SneakersPages';
import { Sneakers } from '../components/Sneakers/Sneakers';
import { AppContext } from '../context';

export const AllSneakers = memo(({
    sneakers,
    pagesCount,
    currPage,
    setCurrPage,
    setCart,
    setFavorites,
    searchValue,
    setSearchValue
}) => {

    const { isSneakersLoading, isAllLoading, sneakersError, allError } = useContext(AppContext)

    return (
        <section className="allSneakers_container">
            <AllSneakersHeader
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setCurrPage={setCurrPage}
            />
            <Sneakers
                sneakers={sneakers}
                isSneakersLoading={isSneakersLoading}
                setCart={setCart}
                setFavorites={setFavorites}
                searchValue={searchValue}
                currPage={currPage}
            />
            {sneakersError || allError
                ? <></>
                : isAllLoading
                    ? <></>
                    : <SneakersPages
                        pagesCount={pagesCount}
                        currPage={currPage}
                        setCurrPage={setCurrPage}
                        sneakers={sneakers}
                    />
            }
        </section>
    );
});