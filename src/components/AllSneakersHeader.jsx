import React, { memo } from 'react';
import { Input } from './UI/Input';

export const AllSneakersHeader = memo(({ searchValue, setSearchValue, setCurrPage }) => {

    const search = (e) => {
        setSearchValue(e.target.value)
        setCurrPage(1)
    }

    return (
        <div className="allSneakers_header">
            <h3 className="sneakersState_title">
                Все кроссовки
            </h3>
            <div className="allSneakers_search_container">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#e2e2e2" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <Input
                    className="sneakers_search"
                    placeholder='Поиск...'
                    onChange={(e) => search(e)}
                    value={searchValue}
                />
            </div>
        </div>
    );
});