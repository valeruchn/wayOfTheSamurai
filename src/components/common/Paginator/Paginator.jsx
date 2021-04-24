import React, { useState } from 'react'
import Classes from './Paginator.module.css'

const Paginator = (props) => {
    // Считаем сколько страниц, делим количество пользователей на лимит на странице
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize) 
    // Создаем массив со страницами
    let pages = [...Array(pagesCount).keys()].map((_, i) => i + 1)
    // Делим страницы на порции, добавляем кнопки для переключения
    const portionCount = Math.ceil(pagesCount / props.portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionNumber = (portionNumber - 1) * props.portionSize + 1
    const rightPortionNumber = portionNumber * props.portionSize

    return (
        <div className={Classes.paginator}>
            
            { portionNumber > 1 &&
                <button onClick={() => setPortionNumber(portionNumber - 1)}>Назад</button>
            }

            {pages.filter(page => page >= leftPortionNumber && page <= rightPortionNumber)
               .map(page => {
                return (
                <span className={
                    props.currentPage === page
                    && Classes.selectedPage}  key={page.toString()}
                    onClick={() => { props.onPageChanged(page)}}>{page}</span>
                    )
            })}

            { portionCount >= portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>Вперед</button>
            }
    
        </div>
    )
}

export default Paginator