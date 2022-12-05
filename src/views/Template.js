import Header from "components/Headers/Header.js";
import React, {useState} from "react";
import Axios from "axios";

const Template = (props) => {

    const [content, setContent] = useState("");
    const [uploadedImg, setUploadedImg] = useState({
        fileName: "",
        fillPath: ""
    });

    const fileAdd = () => {
        let file = document.getElementById('fileAdd');
        file.click();
    }

    const onChange = (e) => {
        setContent(e.target.files[0]);
    };

    const onSubmit = (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append("img", content);

        Axios
            .post("http://localhost:3001/upload", formData)
            .then(res => {
                const { fileName } = res.data;
                console.log(fileName);
                setUploadedImg({ fileName });
                alert("The file is successfully uploaded");
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <>
            <Header/>
            <form onSubmit={onSubmit}>
                <div onClick={fileAdd} id="uploadDiv">
                    <input
                        id="fileAdd"
                        type="file"
                        onChange={onChange}
                    />
                </div>
                <button type="submit">Upload</button>
            </form>
        </>
    );
};
export default Template;
