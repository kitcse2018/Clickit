import Header from "components/Headers/Header.js";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import * as config from '../../config';
const ImgUploadForm = ({setPostImage}) => {

    const [content, setContent] = useState("");
    const [uploadedImg, setUploadedImg] = useState({
        fileName: "",
        fillPath: ""
    });

    // const fileAdd = () => {
    //     let file = document.getElementById('fileAdd');
    //     file.click();
    // }

    const onChange = (e) => {
        setContent(e.target.files[0]);

    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("img", content);

        Axios
            .post("http://"+config.HOST.toString()+"/upload", formData)
            .then(res => {
                const { fileName } = res.data;
                console.log(fileName);
                setUploadedImg({ fileName });
                setPostImage(fileName)
            })
            .catch(err => {
                console.error(err);
            });


    };

    return (
        <>
            <div  id="uploadDiv">
                <input
                    id="fileAdd"
                    type="file"
                    onChange={onChange}
                />
                <button onClick={onSubmit}>Upload</button>
            </div>
        </>
    );
};
export default ImgUploadForm;