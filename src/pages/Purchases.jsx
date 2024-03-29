import React, { memo, useContext } from 'react';
import { Sneaker } from '../components/Sneakers/Sneaker';
import { SneakerLoader } from '../components/UI/SneakerLoader';
import { AppContext } from '../context';
import { EmptyPage } from '../components/EmptyPage';

export const Purchases = memo(({ navigate }) => {

    const { purchases, isAllLoading, sneakersError, allError } = useContext(AppContext);

    return (
        <section className='purchases'>
            <div className="sneakersState_header">
                <svg width="35" height="35" viewBox="0 0 35 35" className='returnBtn'
                    onClick={() => navigate(-1)} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group 91">
                        <rect id="Rectangle 22" x="0.5" y="0.5" width="34" height="34" rx="7.5" fill="white" stroke="#ebebeb" />
                        <path id="Vector 217" d="M19 22L14 17L19 12" stroke="#C8C8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </svg>
                <h3 className="sneakersState_title">
                    Мои покупки
                </h3>
            </div>
            {sneakersError || allError
                ? <>O Kurwaa!</>
                : isAllLoading
                    ? <div className="sneakers">{
                        [...Array(4)].map((a, i) => {
                            return <div key={i} className="sneaker">
                                <SneakerLoader />
                            </div>
                        })
                    }</div>
                    : purchases.length
                        ? purchases.map((elem, i) => {
                            return <div key={i} className="purchase">
                                <p className="purchase_title">Покупки от {elem.date} на сумму {elem.totalPrice} руб.</p>
                                <div className="sneakers --justify-start">
                                    {elem.items.map((item) => {
                                        return <Sneaker
                                            key={item.id}
                                            info={item}
                                            isDisabled={true}
                                        />
                                    })
                                    }
                                </div>
                            </div>
                        })
                        : <EmptyPage
                            content={
                                {
                                    smile: 'img/smiles/sad-1.png',
                                    title: 'У вас нет заказов',
                                    text: 'Оформите хотя бы один заказ.'
                                }
                            }
                            navigate={navigate}
                        />
            }
        </section>
    );
});