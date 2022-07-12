/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import {motion} from "framer-motion"
import { AnimatePresence,useCycle } from "framer-motion"
import { useCallback, useEffect, useMemo, useReducer } from "react"
import { utilSet } from "../utils/uti_css"
import { formSet } from "./form_css"
import InnerContent from "./inner_content"

export default function RadioContent({content,onAttrChanged,delFormEntry,form_values}) {
    //===============STATES================//
    const [additional,setAdditional] = useReducer(
        (old,latest) => ({...old,...latest}),{}
    )
    const [isUse,toggleUse] = useCycle(false,true)

    //===============METHODS================//
    const contentAttrChanged = e => {
        console.log("form attr changed")
        form_values[e.target.name] = e.target.value
        onAttrChanged(form_values)
    }
    const addContent = e => {
        let offset = Object.keys(additional).length ? 
            Object.keys(additional)[Object.keys(additional).length-1]*10+form_values["id"]
            : 
            form_values["id"]*10+form_values["id"]
        let tmp = {}
        tmp[offset] = {...Object.assign(form_values)}
        tmp[offset].id = offset
        setAdditional(tmp)
        onAttrChanged(tmp)
    }
    const addContentAttrChanged = e => {
        additional[e.target.dataset.id][e.target.name] = e.target.value
        setAdditional({...additional})
        onAttrChanged(additional)
    }
    const delAdditionalContent = e => {
        let id = e.target.dataset.id
        delFormEntry(id)
        delete additional[id]
        setAdditional({...additional})
    }

    //==============EFFECTS===============//
    useEffect(() => {
        form_values["use"] = isUse 
        onAttrChanged(form_values)
    },[isUse])

    return (
        <motion.div className="content__wrapper"
            css={[
                formSet.radio_content__wrapper,
                isUse && {backgroundColor: "#bfff80"}
            ]}    
            whileHover={{x:!isUse ? 10 : 0}}
            layout
            transition={{layout:{duration:0.2}}}
        >
            <div className="content__header" css={[utilSet.horizon,{justifyContent:"space-between",padding:"0.5rem 0"}]}>
                <h3 className="content__title"
                    css={[formSet.content__title]}
                >
                    {content.name} ({content.name_jp})
                </h3>
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" 
                    fill="none" stroke="#000000" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    initial={{opacity:1}}
                    whileHover={{scale:!isUse ? 1.2 : 1,opacity:0.6,stroke:isUse ? "#ff0000" : "#4dff4d"}}
                    onClick={toggleUse}
                >
                    {isUse ? <>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                    :
                    <>
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </>
                    }
                </motion.svg>
            </div>
            <AnimatePresence>
                {isUse && 
                    <InnerContent 
                        addContent={addContent}
                        addContentAttrChanged={addContentAttrChanged}
                        form_values={form_values} 
                        content={content} 
                        contentAttrChanged={contentAttrChanged}
                        delContent={delAdditionalContent}
                        additional={additional}
                    />
                }
            </AnimatePresence>

        </motion.div>
    )
}