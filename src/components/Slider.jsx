import React, { memo } from 'react';
import { BASE_URL } from '../common/constants';

export const Slider = memo(() => {
    return (
        <section className="slider">
            <div className="slider_content">
                <img width={100} height={40} src={`img/slider-logo.png`} className="slider_logo" alt='Slider Logo' />
                <div className="slider_content_wrapper">
                    <span className="slider_title">
                        Stan Smith
                        <span className='slider_subtitle'>
                            ,<br />Forever!
                        </span>
                    </span>
                    <button className='slider_btn'>Купить</button>
                </div>
            </div>
            <img src={`img/slider1.png`} alt="Slider Image" className="slider_img" />
            <div className="slider_next">
                <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_60_240)">
                        <rect x="43" y="39" width="35" height="35" rx="17.5" transform="rotate(-180 43 39)" fill="white" />
                    </g>
                    <path d="M24 17L29 22L24 27" stroke="#C8C8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                        <filter id="filter0_d_60_240" x="0" y="0" width="51" height="51" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="4" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_60_240" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_60_240" result="shape" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </section>
    );
});