/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import RadioForm from "../form/RadioForm";
import Header from "../header/header";
import { topSet } from "./top_css";

export default function Top() {
    return (
        <>
            <Header/>
            <main className="top_main__wrapper" 
                css={[
                    topSet.top_main__wrapper
                ]}    
            >
                <RadioForm/>
            </main>
        </>
    )
}