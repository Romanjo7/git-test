import React, { memo, useContext } from 'react';
import { Sneaker } from './Sneaker';
import { SneakerLoader } from '../UI/SneakerLoader';
import { AppContext } from '../../context';

export const Sneakers = memo(({ sneakers, setCart, setFavorites }) => {

    const { isSneakersLoading, isAllLoading, sneakersError, allError } = useContext(AppContext)

    return (
        <div className="sneakers">
            {sneakersError || allError
                ? <>O Kurwaa!</>
                : isSneakersLoading || isAllLoading
                    ? [...Array(8)].map((a, i) => {
                        return <div key={i} className="sneaker">
                            <SneakerLoader />
                        </div>
                    })
                    : sneakers.length
                        ? sneakers.map((item) => {
                            return <Sneaker
                                key={item.id}
                                info={item}
                                setCart={setCart}
                                setFavorites={setFavorites}
                                isDisabled={false}
                            />
                        })
                        : <p className='allSneakersEmpty'>Совпадений не найдено</p>
            }
        </div>
    );
});