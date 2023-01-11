import Header from "components/Headers/Header.js";
import {
    Button,
} from "reactstrap";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import * as config from '../../config';
import "../../assets/css/ImageUploadForm.css";
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
        alert("이미지 업로드가 완료 되었습니다.\n저장 버튼을 눌러서 저장 해주세요.");
    };

    return (
        <>
            <div  id="uploadDiv">
                <div className={"selectBox"}>
                    <input
                        id="fileAdd"
                        type="file"
                        onChange={onChange}
                    />
                </div>
                <div className={"uploadBox"}>
                    <Button color = "primary" onClick={onSubmit}>이미지 업로드</Button>
                </div>

            </div>
        </>
    );
};
export default ImgUploadForm;