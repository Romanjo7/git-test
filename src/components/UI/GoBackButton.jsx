import React, { memo } from 'react';

export const GoBackButton = memo(({ onClick }) => {
    return (
        <button className="main_btn goBackBtn" onClick={onClick}>
            <div className="main_btn_arrow goBackBtn_arrow">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <p className="main_btn_text">
                Вернуться назад
            </p>
        </button>
    );
});