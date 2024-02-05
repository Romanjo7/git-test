import React, { useState, useEffect, useContext, memo, useCallback, useMemo } from 'react';
import { CartFilled } from './CartFilled';
import { CartSecondaryStates } from './CartSecondaryStates';
import { AppContext } from '../../context';

export const Cart = memo(({
    displayCart,
    setCart,
    totalPrice,
    setPurchases
}) => {

    const [isEmpty, setIsEmpty] = useState(true)
    const [isEmptyBlock, setIsEmptyBlock] = useState(true)

    const { cart } = useContext(AppContext);

    const orderNumber = 18;

    useEffect(() => {
        setIsEmpty(!cart.length)
    }, [cart]);

    const setEmptyCart = useCallback(() => {
        displayCart()
        setTimeout(() => {
            setIsEmpty(true)
            setIsEmptyBlock(true)
        }, 300);
    })

    return (
        <div className="overlay" onClick={isEmpty ? setEmptyCart : displayCart}>
            <div className="cart" onClick={(e) => e.stopPropagation()}>
                <h4 className="cart_title">
                    Корзина
                </h4>
                <div className="cart_content">
                    {isEmpty
                        ? <CartSecondaryStates
                            content={{
                                img: `${isEmptyBlock
                                    ? 'img/empty-cart.jpg'
                                    : 'img/complete-order.jpg'}`,
                                title: `${isEmptyBlock
                                    ? 'Корзина пустая'
                                    : 'Заказ оформлен!'}`,
                                text: `${isEmptyBlock
                                    ? 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                                    : `Ваш заказ #${orderNumber} скоро будет передан курьерской доставке`}`
                            }}
                            setIsEmpty={setIsEmpty}
                            setIsEmptyBlock={setIsEmptyBlock}
                            isEmptyBlock={isEmptyBlock}
                            setEmptyCart={setEmptyCart}
                        />
                        : <CartFilled
                            setCart={setCart}
                            setIsEmpty={setIsEmpty}
                            setIsEmptyBlock={setIsEmptyBlock}
                            _totalPrice={totalPrice}
                            setPurchases={setPurchases}
                        />
                    }
                </div>
            </div>
        </div>
    );
});