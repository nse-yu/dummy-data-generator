/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { utilSet } from "../utils/uti_css"
import { headerSet } from "./header_css"

export default function Header() {
    return (
        <>
            <header className="header-all" 
                css={[
                    headerSet.header_all,
                    utilSet.horizon]}
            >
                <div className="header__wrapper" 
                    css={[
                        headerSet.header__wrapper
                    ]}
                >
                    <h1>Dummy Data Generator</h1>    
                </div>
            </header>
        </>
    )
}