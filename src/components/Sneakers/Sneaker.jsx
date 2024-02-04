import React, { useEffect, useState, useContext, memo } from 'react';
import { sneakersConnect } from '../../API/sneakersConnect';
import { AppContext } from '../../context';

export const Sneaker = memo(({ info, setCart, setFavorites, isDisabled }) => {

    const [isFoundInFavorites, setIsFoundInFavorites] = useState(false)
    const [isFoundInCart, setIsFoundInCart] = useState(false)
    const { cart, favorites } = useContext(AppContext);

    useEffect(() => {
        if (isDisabled) {
            setIsFoundInFavorites(false)
            setIsFoundInCart(false)
        } else {
            setIsFoundInFavorites(isAddedToFavorites)
            setIsFoundInCart(isAddedToCart)
        }
    }, [cart, favorites])

    const isAddedToFavorites = () => {
        let res = false;
        favorites.forEach(elem => {
            if (info.id === elem.id) {
                res = true
            }
        });
        return res;
    }

    const isAddedToCart = () => {
        let res = false;
        cart.forEach(elem => {
            if (info.id === elem.id) {
                res = true
            }
        });
        return res;
    }

    const addToFavorites = async () => {
        try {
            if (!isFoundInFavorites) {
                setIsFoundInFavorites(prev => !prev)
                await sneakersConnect.putFavoritesItem(favorites, info);
                setFavorites(prev => [...prev, info])
            } else {
                setIsFoundInFavorites(prev => !prev)
                const curFavorites = favorites.filter(elem => elem.id !== info.id);
                await sneakersConnect.removeFavoritesItem(curFavorites);
                setFavorites([...curFavorites]);
            }
        } catch (e) {
            setIsFoundInFavorites(prev => !prev)
            console.log('Ошибка при добавлении/удалении в закладки ' + e.message);
            alert('Произошла ошибка сервера! Пожалуйста перезагрузите страницу.')
        }
    }

    const addToCart = async () => {
        try {
            if (!isFoundInCart) {
                setIsFoundInCart(prev => !prev)
                await sneakersConnect.putCartItem(cart, info);
                setCart(prev => [...prev, info])
            } else {
                setIsFoundInCart(prev => !prev)
                const curCart = cart.filter(elem => elem.id !== info.id);
                await sneakersConnect.removeCartItem(curCart);
                setCart([...curCart]);
            }
        } catch (e) {
            setIsFoundInCart(prev => !prev)
            console.log('Ошибка при добавлении/удалении в корзину ' + e.message);
            alert('Произошла ошибка сервера! Пожалуйста перезагрузите страницу.')
        }
    }

    return (
        <div className="sneaker">
            <div className='sneaker_top'>
                <button
                    disabled={isDisabled}
                    className={isFoundInFavorites ? 'favorite_btn liked' : 'favorite_btn'}
                    onClick={addToFavorites}
                >
                    {isFoundInFavorites
                        ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5849 3.22311C14.3615 2.7098 14.0394 2.24464 13.6365 1.85368C13.2333 1.46155 12.758 1.14993 12.2363 0.935761C11.6954 0.712803 11.1152 0.59868 10.5295 0.600018C9.70772 0.600018 8.90596 0.823295 8.20921 1.24504C8.04253 1.34593 7.88418 1.45674 7.73416 1.57748C7.58414 1.45674 7.42579 1.34593 7.2591 1.24504C6.56236 0.823295 5.7606 0.600018 4.93884 0.600018C4.3471 0.600018 3.7737 0.712483 3.23198 0.935761C2.70858 1.15077 2.23686 1.46005 1.83181 1.85368C1.42843 2.2442 1.10619 2.70947 0.883373 3.22311C0.65168 3.75732 0.533333 4.32461 0.533333 4.90844C0.533333 5.45919 0.646679 6.0331 0.871705 6.61693C1.06006 7.10483 1.33009 7.61092 1.67513 8.12198C2.22186 8.93074 2.97361 9.77423 3.90705 10.6293C5.4539 12.0467 6.98574 13.0258 7.05075 13.0655L7.44579 13.3169C7.62081 13.4277 7.84584 13.4277 8.02086 13.3169L8.4159 13.0655C8.48091 13.0242 10.0111 12.0467 11.5596 10.6293C12.493 9.77423 13.2448 8.93074 13.7915 8.12198C14.1366 7.61092 14.4083 7.10483 14.5949 6.61693C14.82 6.0331 14.9333 5.45919 14.9333 4.90844C14.935 4.32461 14.8166 3.75732 14.5849 3.22311Z" fill="#FF8585" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.8609 3.07455C13.5204 2.73389 13.1161 2.46365 12.6711 2.27927C12.2261 2.0949 11.7492 2 11.2675 2C10.7859 2 10.3089 2.0949 9.86396 2.27927C9.41898 2.46365 9.0147 2.73389 8.67419 3.07455L7.96753 3.78122L7.26086 3.07455C6.57307 2.38676 5.64022 2.00036 4.66753 2.00036C3.69484 2.00036 2.76199 2.38676 2.07419 3.07455C1.3864 3.76235 1 4.69519 1 5.66788C1 6.64057 1.3864 7.57342 2.07419 8.26122L2.78086 8.96788L7.96753 14.1546L13.1542 8.96788L13.8609 8.26122C14.2015 7.92071 14.4718 7.51643 14.6561 7.07145C14.8405 6.62648 14.9354 6.14954 14.9354 5.66788C14.9354 5.18623 14.8405 4.70929 14.6561 4.26431C14.4718 3.81934 14.2015 3.41505 13.8609 3.07455Z" stroke="#e2e2e2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                </button>
                <img width={133} height={112} src={info.img} alt="Sneaker" />
                <p className="sneaker_title">
                    {info.title}
                </p>
            </div>
            <div className="sneaker_price">
                <p className="sneaker_price_title">
                    Цена:
                </p>
                <p className="sneaker_price_value">
                    {info.price} руб.
                </p>
                <button disabled={isDisabled} className={isFoundInCart ? 'add_btn checked' : 'add_btn'} onClick={addToCart}>
                    {isFoundInCart
                        ? <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="8" fill="url(#paint0_linear)" />
                            <g clipPath="url(#clip0)">
                                <g filter="url(#filter0_d)">
                                    <path d="M19.6567 11.6207C19.8394 11.4363 20.0876 11.3318 20.3471 11.3299C20.6066 11.3279 20.8563 11.4288 21.0416 11.6105C21.227 11.7921 21.3329 12.0398 21.3362 12.2993C21.3395 12.5588 21.24 12.809 21.0594 12.9954L15.8327 19.5294C15.7429 19.626 15.6346 19.7036 15.5141 19.7575C15.3937 19.8114 15.2636 19.8404 15.1317 19.8429C14.9998 19.8454 14.8687 19.8213 14.7463 19.772C14.6239 19.7227 14.5127 19.6492 14.4194 19.556L10.954 16.092C10.7699 15.9078 10.6665 15.6579 10.6665 15.3975C10.6666 15.137 10.7701 14.8872 10.9544 14.703C11.1386 14.5189 11.3885 14.4155 11.6489 14.4155C11.9094 14.4156 12.1592 14.5191 12.3434 14.7034L15.084 17.4447L19.6307 11.6514C19.639 11.6408 19.6479 11.6308 19.6574 11.6214L19.6567 11.6207Z" fill="white" />
                                </g>
                            </g>
                            <defs>
                                <filter id="filter0_d" x="10.6665" y="11.3298" width="10.6698" height="10.5132" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                    <feOffset dy="2" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                </filter>
                                <linearGradient id="paint0_linear" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#89F09C" />
                                    <stop offset="1" stopColor="#3CC755" />
                                </linearGradient>
                                <clipPath id="clip0">
                                    <rect width="10.6667" height="10.6667" fill="white" transform="translate(10.6667 10.6667)" />
                                </clipPath>
                            </defs>
                        </svg>
                        : <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#ebebeb" />
                            <path d="M20.6653 15.1312H17.2021V11.6682C17.2021 10.3328 15.1311 10.3328 15.1311 11.6682V15.1312H11.668C10.3329 15.1312 10.3329 17.2022 11.668 17.2022H15.1311V20.6652C15.1311 22.0005 17.2021 22.0005 17.2021 20.6652V17.2022H20.6653C22.0005 17.2022 22.0005 15.1312 20.6653 15.1312Z" fill="#D3D3D3" />
                        </svg>
                    }
                </button>
            </div>
        </div>
    );
});