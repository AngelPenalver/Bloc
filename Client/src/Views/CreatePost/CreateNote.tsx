    import React, { useState } from "react";
    import IconsBack from "../../assets/iconsBack";
    import { Editor } from '@tinymce/tinymce-react';
    import styles from "./CreateNote.module.css";
import { NavLink } from "react-router-dom";

    const CreateNote: React.FC = () => {
        const [change, setChange ]= useState('');

        const changeEditorChange = (content: string) => {
            setChange(content)
        }
    
        console.log(change);
        
        
    return (
        <div className={styles.container}>
        <div className={styles.banner}>
            <NavLink to={'/dashboard'}>

            <IconsBack />
            </NavLink>
            <div className={styles.input}>
            <input type="text" placeholder=" " />
            <label htmlFor="">Titulo</label>
            </div>
        </div>
        <form>
            <Editor id={styles.form}
            value={change}
            
            onEditorChange={changeEditorChange}
            apiKey = 'i6pmefk1m4b4f2xyp815zamd01vq49g9k0pg13gfvah05n15' 
            init={{
                height: 559,
                width:1365,  
                menubar: false,
                plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "code"
                ],
                placeholder: 'Escribe una nota',
                content_css: './CreateNote.module.css',
                toolbar:
                "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help | code",
            }}
            />
        </form>
        </div>
    );
    };
    export default CreateNote;
