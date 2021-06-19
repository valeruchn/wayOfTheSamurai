import React from 'react'
import Classes from './FormControls.module.css'


/* HOC для отрисовки форм с подключенными css стилями при валидации ошибок */
export const Element = Element => ({ input, meta, ...props }) => {
    /* деструктурирующий оператор, ...props будет содержать все, кроме input и meta */
    const hasError = meta.touched && meta.error

    return (
        <div className={Classes.formControl + ' ' + (hasError ? Classes.error : '')}>
            <div>
                <Element {...input} {...props} />
            </div>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}