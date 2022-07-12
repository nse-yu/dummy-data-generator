import { css } from "@emotion/react";

const header_all = css`
    width: 100%;
    z-index:2;
    padding: 2rem;
`

const header__wrapper = css`
    background: repeating-linear-gradient(#afeeee, white 20%);
    box-shadow: 0px 0px 11px black;
    width: 40%;
    text-align: center;
`

export const headerSet = {
    header_all,
    header__wrapper
}