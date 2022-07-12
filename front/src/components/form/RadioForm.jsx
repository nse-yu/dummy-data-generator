/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { useReducer, useRef, useState } from "react"
import cols_tag from "../../cols_tag.json"
import RadioContent from "./content"
import { formSet } from "./form_css"
import {motion,LayoutGroup} from "framer-motion"

export default function RadioForm() {
    //=================REFS=================//
    const dl_ref = useRef()
    const ul_ref = useRef()
    
    //===============METHODS================//
    const getKeysDistFromJson = (json) => {
        let x = {}
        json.forEach(entry => {
            x[entry.id] = {...entry,colname:"",use:false}
        })
        return x
    }
    const onAttributeChanged = (info) => {
        setForm({...info})
    }
    const onSubmitClicked = e => {
        e.preventDefault()
        
        /**フォームデータを追加*/
        const data = new FormData()
        data.append("json_form",JSON.stringify(sortByOffset(form)))
        data.append("limit",nrows)
        
        fetch("http://localhost:5002/csv/create",{
            method: "POST",
            mode: "cors",
            body: data
        })
        .then(res => {
            if(!res.ok) return
            return res.blob()
        })
        .then(blob => {
            let url = window.URL.createObjectURL(blob)
            dl_ref.current.download = "output.csv"
            dl_ref.current.href = url
            dl_ref.current.click()
        })
        .catch(err => console.error(err))
    }
    const anyMatchUseTrue = form => {
        return Object.keys(form).map(k => form[k].use).filter(b => b===true).length > 0
    }
    const sortByOffset = form => {
        let list_of_dict = [...ul_ref.current.childNodes]
            .map(el => [el.dataset.id,el.getBoundingClientRect().x])
            .sort((a, b) => a[1] - b[1])
            .map(li => li[0])
            .map(i => 
                {
                    let key = Object.keys(form).filter(key => form[key].id === parseInt(i))
                    return form[key]
                }
            )
        let dict_of_dict = {}
        list_of_dict.forEach((entry,idx) => {
            dict_of_dict[idx+1] = entry
        })
        return dict_of_dict
    }
    const onChangeNrows = e => {
        setNrows(() => e.target.value)
    }
    const delFormEntry = id => {
        delete form[id]
        onAttributeChanged(form)
    } 

    //===============STATES=================//
    const [form,setForm] = useReducer(
        (form,latest) => ({...form,...latest}),{...getKeysDistFromJson(cols_tag)}
    )
    const [nrows,setNrows] = useState(10)

    return (
        <div className="form__wrapper">
            <div className="form__desc" css={formSet.form__desc}>
                <div className="desc__text">
                    <ol>
                        <li>使用したい列のウインドウをクリックしてください。(選択されたウィンドウは緑になります)</li>
                        <li>ウインドウが展開するので、属性を入力してください。</li>
                        <li>必要に応じて、上に表示されるプレビューで出力順を並び変えてください。（ドラッグで並び替え）</li>
                        <li>すべての作業が完了したら、最下部の「作成」ボタンを押下してください。</li>
                        <li>csv形式でファイルのダウンロードが始まります。</li>
                    </ol>
                    <ul>
                        <li><strong>[注意事項１]</strong> <u>列名が入力されていない場合、デフォルトの名前が使用されます。</u></li>
                        <li><strong>[注意事項２]</strong> <u>ウィンドウの色が白のままの場合、その列は選択されておらず、csvに出力されません。</u></li>
                        <li><strong>[注意事項３]</strong> <u>出力レコード数は、1以上5000以下としてください。</u></li>
                        <li><strong>[注意事項４]</strong> <u>必ず１つ以上項目を選択してください。</u></li>
                    </ul>
                </div>
                <div className="desc__rows" css={formSet.desc__rows}>
                    <p>出力レコード数</p>
                    <input type="number" onChange={onChangeNrows} value={nrows} placeholder="n rows" max={1000} min={1}/>
                </div>
            </div>
            <form>
                <div className="contents" css={formSet.contents}>
                    <LayoutGroup>
                        {
                            cols_tag.map(entry => (
                                <RadioContent
                                    key={entry.id}
                                    content={entry}
                                    onAttrChanged={onAttributeChanged}
                                    delFormEntry={delFormEntry}
                                    form_values={form[entry.id]}
                                />
                            ))
                        }
                    </LayoutGroup>
                </div>
                <motion.div className="submit_btn"
                    css={[formSet.submit_btn]}
                    whileHover={{opacity: 0.4,scale: 1.06}}
                >
                    <button onClick={onSubmitClicked} css={{padding:"0.3rem"}}>作成</button>
                </motion.div>
            </form>
            {
                anyMatchUseTrue(form) &&    
                <aside className="preview-cols" css={formSet.preview_cols}>
                    <ul className="preview-cols__items" 
                        css={formSet.preview_cols__items}
                        ref={ul_ref}
                    >
                        {
                            Object.keys(form).map(key => (
                                form[key].use && 
                                <motion.li 
                                    key={form[key].id}
                                    data-id={form[key].id}
                                    drag="x"
                                    dragMomentum={false}
                                >
                                    {form[key].name_jp} {form[key].colname && "["+form[key].colname+"]"}
                                </motion.li>
                            )
                            )
                        }
                    </ul>
                </aside>
            }
            <a ref={dl_ref} href="http://" download="output.csv" css={{visibility:"hidden"}}>content</a>
        </div>
    )
}