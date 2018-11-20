// Core
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const getInitialState = () => Number(localStorage.getItem('count')) || 0;

const Parent = () => {                                          /* ↓ под капотом у React ↓ */
    const [ count1, setCount1 ] = useState(getInitialState);    /* (1) состояние: регистрация ячейки памяти [1] */
    const [ count2, setCount2 ] = useState(0);                  /* (2) состояние: регистрация ячейки памяти [1, 2] */

    const _increment1 = () => setCount1(count1 + 1);            /* (3) создание новой функции */
    const _reset1 = () => setCount1(0);                         /* (4) создание новой функции */
    const _decrement1 = () => setCount1(count1 - 1);            /* (5) создание новой функции */

    const _increment2 = () => setCount2(count2 + 1);            /* (6) создание новой функции */
    const _reset2 = () => setCount2(0);                         /* (7) создание новой функции */
    const _decrement2 = () => setCount2(count2 - 1);            /* (8) создание новой функции */

    /**
     * Как вариант, о useEffect можно думать,
     * как о componentDidMount + componentDidUpdate.
     */
    useEffect( //                                               /* (9) эффект (сайд): регистрация ячейки памяти [1, 2, 3] */
        () => {                                                 /* (10) тело эффекта выполняется после коммита в DOM */
            console.log('📦 Запись в localStorage');
            localStorage.setItem('count', count1);
        },
        [ count1 ], /** Выполняет useEffect только в том случае, если это значение изменилось. */
    );
    /**
     * Иными словами, второй аргумент useEffect — это способ
     * оптимизации производительности используемого эффекта.
     */

    return (
        <section className = 'example'>
            <h1>First count: {count1}</h1>
            <div>
                <button onClick = { _increment1 }>+</button>
                <button onClick = { _reset1 }>Reset</button>
                <button onClick = { _decrement1 }>-</button>
            </div>
            <h1>Second count: {count2}</h1>
            <div>
                <button onClick = { _increment2 }>+</button>
                <button onClick = { _reset2 }>Reset</button>
                <button onClick = { _decrement2 }>-</button>
            </div>
        </section>
    );
};

render(<Parent />, document.getElementById('app'));
