import React, { useState, useEffect, memo } from 'react';

export const SneakersPages = memo(({
    pagesCount,
    currPage,
    setCurrPage,
    sneakers
}) => {

    const [pagesArr, setPagesArr] = useState([])
    const [minPage, setMinPage] = useState(0)
    const [maxPage, setMaxPage] = useState(9)

    useEffect(() => {
        let pagesNumbersArr = []
        for (let i = 0; i < pagesCount; i++) {
            pagesNumbersArr[i] = i + 1
        }
        setPagesArr([...pagesNumbersArr])
    }, [pagesCount])

    const prevPage = () => {
        if (currPage === minPage + 1 && maxPage > 9) {
            setMinPage(prev => prev - 1)
            setMaxPage(prev => prev - 1)
        }

        setCurrPage(currPage > 1 ? currPage - 1 : currPage)
    }

    const nextPage = () => {

        if (currPage === maxPage + 1 && currPage < pagesCount) {
            setMinPage(prev => prev + 1)
            setMaxPage(prev => prev + 1)
        }

        setCurrPage(currPage < pagesCount ? currPage + 1 : currPage)
    }

    const selectPage = (e) => {
        setCurrPage(Number(e.target.textContent))
    }

    return (
        <ul className="sneakers_pages">
            {sneakers.length ? <li className="sneakers_page" onClick={prevPage}>&lt;</li> : <></>}
            {pagesArr.map((number, index) => {
                if (minPage <= index && index <= maxPage) {
                    return currPage === number
                        ? <li key={index} className="sneakers_page active">{number}</li>
                        : <li key={index} className="sneakers_page" onClick={selectPage}>{number}</li>
                }
            })
            }
            {sneakers.length ? <li className="sneakers_page" onClick={nextPage}>&gt;</li> : <></>}
        </ul>
    );
});