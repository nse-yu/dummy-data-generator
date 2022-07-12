import { css } from "@emotion/react";

/**RadioForm.jsx */
const contents = css`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`
const submit_btn = css`
    width:50%;
    background-color: green;
    padding: 1rem;
    margin: 0 auto;
    border-radius: 1rem;
    button{
        color: white;
        font-size: 1.5rem;
        width:100%;
    }
`
const preview_cols = css`
    position:fixed;
    top:0;
    left:0;
    right:0;
    background-color:#555252c9;
    width: 100vw;
    padding:1rem;
`

const preview_cols__items = css`
    display:flex;
    justify-content:center;
    align-items:center;
    list-style: none;
    gap:1rem;
    li{
        box-shadow:1px 2px 5px black;
        padding:0.4rem;
        background-color:white;
        border-radius:5px;
    }
`
const form__desc = css`
    display:flex;
    justify-content:space-between;
`
const desc__rows = css`
    border:4px solid black;
    border-radius:10px;
    padding: 0.5rem;
    height: fit-content;
    width:20%;
    height:10%;
    input{
        text-align:center;
        height:100%;
        width:100%;
        font-size:2rem;
    }
    input::-webkit-inner-spin-button{
        -webkit-appearance:none;
    }
    input::-weblit-outer-spin-button{
        -webkit-appearance:none;
    }
`

/**content.jsx */
const radio_content__wrapper = css`
    box-shadow: 2px 3px 5px gray; 
    margin: 1rem;
    padding: 1rem;
`
const content__title = css`
    border-bottom: 1px solid #0000000f;
    width:90%;
`

const content_select__wrapper = css`
    margin: 0.5rem;
    select{
        border: 2px solid black;
        padding: 5px;
        background-color: white;
        border-radius: 10px;
        text-align:center;
        &:hover{
            opacity:0.7;
        }
    }
`
const content_select__digit = css`
    input{
        text-align: center;
        border: 3px solid #00000029;
        width: 100%;
        background-color: #f0f8ff;
    }
    input::-webkit-inner-spin-button{
        -webkit-appearance:none;
    }
    input::-weblit-outer-spin-button{
        -webkit-appearance:none;
    }
`

const content__colname = css`
    border: 3px solid black;
    border-radius: 10px;
    padding: 0.3rem 0.7rem;
    margin: 0.5rem;
    background-color: white;
`

/**inner_content.jsx */
const add_btn = css`
    padding:0.5rem;
    display:flex;
    justify-content:center;
    align-items:center;
`
const additional__wrapper = css`
    display:flex;
    justify-content:center;
    align-items:center;
`


export const formSet = {
    radio_content__wrapper,
    contents,
    content_select__wrapper,
    content__title,
    content__colname,
    content_select__digit,
    submit_btn,
    preview_cols,
    preview_cols__items,
    form__desc,
    desc__rows,
    add_btn,
    additional__wrapper
}