import React, { memo } from 'react';
import { GoBackButton } from '../UI/GoBackButton';

export const CartSecondaryStates = memo(({
    content,
    isEmptyBlock,
    setEmptyCart
}) => {

    return (
        <>
            <img
                width={isEmptyBlock ? 120 : 83}
                height={120}
                src={content.img}
                alt={isEmptyBlock ? "EmptyCart image" : "SuccessOrder image"}
            />
            <p className={isEmptyBlock
                ? "cartMessage_title"
                : "cartMessage_title cartMessage_title-green"}>
                {content.title}
            </p>
            <p className="cartMessage_text">{content.text}</p>
            <GoBackButton
                onClick={setEmptyCart}
            />
        </>
    );
});