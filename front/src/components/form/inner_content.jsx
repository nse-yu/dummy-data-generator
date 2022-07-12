/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { formSet } from "./form_css";
import {motion} from "framer-motion"
import { utilSet } from "../utils/uti_css";

export default function InnerContent({
    addContent,
    addContentAttrChanged,
    additional,
    contentAttrChanged,
    content,
    form_values,
    delContent
}) {    
    //===============METHODS================//
    const parseId = (id,target) => {
        return [...id.toString()].map(c => parseInt(c) === target)
                                 .filter(b => b === true)
                                 .length === id.toString().length
            ?
            true:false            
    }

    return (
        <>
            <motion.div className="content_select__wrapper"
                transition={{duration: 0.2}}
            >
                { content.id === 1 &&
                    <div className="select__include_char" css={[formSet.content_select__wrapper]}>
                        <span>idに文字を含めますか</span>
                        <span> ⇒ </span>
                        <select name="include_char"
                            defaultValue={form_values.include_char}
                            onChange={contentAttrChanged}
                        >
                            <option value={true}>含める</option>
                            <option value={false}>含めない</option>
                        </select>
                    </div>
                }
                { content.id === 2 &&
                    <div className="select__separate_name" css={[formSet.content_select__wrapper]}>
                        <span>性と名を分けますか</span>
                        <span> ⇒ </span>
                        <select name="separate_name"
                            defaultValue={form_values.separate_name}
                            onChange={contentAttrChanged}
                        >
                            <option value={true}>分ける</option>
                            <option value={false}>分けない</option>
                        </select>
                    </div>
                }
                { content.id === 4 &&
                    <>
                        <div className="select__range_num" css={[formSet.content_select__wrapper]}>
                            <span>数値の範囲</span>
                            <span> ⇒ </span>
                            <div css={[utilSet.horizon,formSet.content_select__digit]}>
                                <input type="number" name="from" value={form_values.from}
                                    onChange={contentAttrChanged}
                                />
                                ～
                                <input type="number" name="to" value={form_values.to}
                                    onChange={contentAttrChanged}
                                />
                            </div>
                        </div>
                        <div className="select__isdecimal_num" css={[formSet.content_select__wrapper]}>
                            <span>少数にしますか？</span>
                            <span> ⇒ </span>
                            <select name="is_decimal"
                                defaultValue={form_values.is_decimal}
                                onChange={contentAttrChanged}
                            >
                                <option value={false}>NO</option>
                                <option value={true}>YES</option>
                            </select>
                        </div>
                    </>
                }
                { content.id === 7 &&
                    <div className="select__separate_address" css={[formSet.content_select__wrapper]}>
                        <span>県、市町村、その他で分けますか？</span>
                        <span> ⇒ </span>
                        <select name="separate_address"
                            defaultValue={form_values.separate_address}
                            onChange={contentAttrChanged}
                        >
                            <option value={true}>分ける</option>
                            <option value={false}>分けない</option>
                        </select>
                    </div>
                }
                { content.id === 9 &&
                    <div className="select__len_text" css={[formSet.content_select__wrapper]}>
                        <span>文字列長</span>
                        <span> ⇒ </span>
                        <div css={[utilSet.horizon,formSet.content_select__digit]}>
                            <input type="number" name="len" value={form_values.len}
                                onChange={contentAttrChanged}
                            />
                        </div>
                    </div>
                }
            </motion.div>
            <div className="content__colname" css={formSet.content__colname}>
                <input type="text"
                    name="colname"
                    placeholder="Please enter a column name"
                    style={{width: "100%"}}
                    value={form_values.colname}
                    onChange={contentAttrChanged}
                />
            </div>
            <div className="content__additional">
                { additional &&
                    Object.keys(additional).map(k => (
                        <div key={additional[k].id}>
                            <hr css={{marginTop:"0.5rem"}}></hr>
                            <section className="additional__wrapper"
                                css={[formSet.additional__wrapper]}
                            >
                                <h3 css={{fontSize:"0.8rem"}}>{additional[k].name}</h3>
                                <motion.div className="content_select__wrapper"
                                    transition={{duration: 0.2}}
                                >
                                    { parseId(additional[k].id,1) &&
                                        <div className="select__include_char" css={[formSet.content_select__wrapper]}>
                                            <select name="include_char"
                                                data-id={additional[k].id}
                                                defaultValue={additional[k].include_char}
                                                onChange={addContentAttrChanged}
                                            >
                                                <option value={true}>含める</option>
                                                <option value={false}>含めない</option>
                                            </select>
                                        </div>
                                    }
                                    { parseId(additional[k].id,2) &&
                                        <div className="select__separate_name" css={[formSet.content_select__wrapper]}>
                                            <select name="separate_name"
                                                data-id={additional[k].id}
                                                defaultValue={additional[k].separate_name}
                                                onChange={addContentAttrChanged}
                                            >
                                                <option value={true}>分ける</option>
                                                <option value={false}>分けない</option>
                                            </select>
                                        </div>
                                    }
                                    { parseId(additional[k].id,4) &&
                                        <>
                                            <div className="select__range_num" css={[formSet.content_select__wrapper]}>
                                                <div css={[utilSet.horizon,formSet.content_select__digit]}>
                                                    <input type="number" name="from" value={additional[k].from}
                                                        onChange={addContentAttrChanged}
                                                        data-id={additional[k].id}
                                                    />
                                                    ～
                                                    <input type="number" name="to" value={additional[k].to}
                                                        onChange={addContentAttrChanged}
                                                        data-id={additional[k].id}
                                                    />
                                                </div>
                                            </div>
                                            <div className="select__isdecimal_num" css={[formSet.content_select__wrapper]}>
                                                <select name="is_decimal"
                                                    defaultValue={additional[k].is_decimal}
                                                    onChange={addContentAttrChanged}
                                                    data-id={additional[k].id}
                                                >
                                                    <option value={false}>NO</option>
                                                    <option value={true}>YES</option>
                                                </select>
                                            </div>
                                        </>
                                    }
                                    { parseId(additional[k].id,7) &&
                                        <div className="select__separate_address" css={[formSet.content_select__wrapper]}>
                                            <select name="separate_address"
                                                defaultValue={additional[k].separate_address}
                                                onChange={addContentAttrChanged}
                                                data-id={additional[k].id}
                                            >
                                                <option value={true}>分ける</option>
                                                <option value={false}>分けない</option>
                                            </select>
                                        </div>
                                    }
                                    { parseId(additional[k].id,9) &&
                                        <div className="select__len_text" css={[formSet.content_select__wrapper]}>
                                            <div css={[utilSet.horizon,formSet.content_select__digit]}>
                                                <input type="number" name="len" value={additional[k].len}
                                                    onChange={addContentAttrChanged}
                                                    data-id={additional[k].id}
                                                />
                                            </div>
                                        </div>
                                    }
                                </motion.div>
                                <div className="content__colname" css={formSet.content__colname}>
                                    <input type="text"
                                        name="colname"
                                        data-id={additional[k].id}
                                        placeholder="Please enter a column name"
                                        style={{width: "100%"}}
                                        value={additional[k].colname}
                                        onChange={addContentAttrChanged}
                                    />
                                </div>
                                <motion.svg
                                    data-id={additional[k].id}
                                    xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" 
                                    fill="none" stroke="#000000" 
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    initial={{opacity:1}}
                                    whileHover={{scale: 1.2,opacity:0.6,stroke:"#ff0000"}}
                                    onClick={delContent}
                                >
                                    <>
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </>
                                </motion.svg>
                            </section>
                        </div>
                    ))
                }
            </div>
            <div className="btn add-btn" onClick={addContent} css={formSet.add_btn}>
                <motion.svg
                        xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" 
                        fill="white" stroke="#000000" 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        initial={{opacity:1}}
                        whileHover={{scale:1.01,stroke:"#4dff4d"}}
                >
                    <>
                        <path d="M3 3h18v18H3zM12 8v8m-4-4h8"/>
                    </>
                </motion.svg>
            </div>
        </>
    )
}