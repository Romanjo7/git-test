import React, { memo } from 'react';
import { GoBackButton } from './UI/GoBackButton';
import { BASE_URL } from '../common/constants';

export const EmptyPage = memo(({ content, navigate }) => {
    return (
        <div className="emptyPage">
            <div className="emptyPage_content">
                <img width={70} height={70} src={content.smile} alt="sad smile" />
                <div className="emptyPage_content_title">
                    {content.title}
                </div>
                <div className="emptyPage_content_text">
                    {content.text}
                </div>
                <GoBackButton onClick={() => navigate(`${BASE_URL}/`, { replace: true })} />
            </div>
        </div>
    );
});