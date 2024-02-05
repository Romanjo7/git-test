import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import { CartItem } from './CartItem';
import { AppContext } from '../../context';
import { sneakersConnect } from '../../API/sneakersConnect';

export const CartFilled = memo(({
    setIsEmpty,
    setIsEmptyBlock,
    setCart,
    _totalPrice,
    setPurchases
}) => {

    const [isDisabled, setIsDisabled] = useState(false)

    const { cart, purchases } = useContext(AppContext);
    
    const setOrder = useCallback(async () => {
        try {
            setIsDisabled(true)
            const date = new Date();
            const newPurchase = {
                date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
                items: cart,
                totalPrice: `${(_totalPrice + _totalPrice * 0.05).toFixed(2)}`
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }
            await sneakersConnect.putPurchases(purchases, newPurchase)
            await sneakersConnect.removeCartItem([]);
            setPurchases(prev => [...prev, newPurchase])
            setIsEmpty(true)
            setIsEmptyBlock(false)
            setIsDisabled(false)
            setCart([])
        } catch (e) {
            console.log('Ошибка при покупке!' + e.message);
        }
    }, [cart])

    return (
        <>
            <div className="cart_items">
                {cart.map((item) => {
                    return <CartItem
                        key={item.id}
                        info={item}
                        setCart={setCart}
                    />
                })}
            </div>

            <div className="cart_price">
                <div className="cart_price_result">
                    <p className='cart_price_title'>
                        Итого:&nbsp;
                    </p>
                    <div className='dash'></div>
                    <p className='cart_price_text'>
                        &nbsp;{`${(_totalPrice + _totalPrice * 0.05).toFixed(2)} руб.`
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                    </p>
                </div>
                <div className="cart_price_tax">
                    <p className='cart_price_title'>
                        Налог 5%:&nbsp;
                    </p>
                    <div className='dash'></div>
                    <p className='cart_price_text'>
                        &nbsp;{`${(_totalPrice * 0.05).toFixed(2)} руб.`
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                    </p>
                </div>
            </div>

            <button className='main_btn cart_orderBtn' disabled={isDisabled ? true : false} onClick={setOrder}>
                <p className="main_btn_text">
                    Оформить заказ
                </p>
                <div className="main_btn_arrow cart_orderBtn_arrow">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </button>
        </>
    );
});