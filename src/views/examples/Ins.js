import React, {useState} from 'react'


const Ins = () => {
    const [state, setState] = useState();
    const handleChange = (e) => {
        setState({
            [e.target.name]: e.target.value,
        });
    };
    const submitId = (e)=>{
        const post ={
            postDormitoryName : state.dormitoryName,
        };

        fetch("http://\"+config.HOST.toString()+\"/idplz", {
            method : "post",
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify(post),
        })
            .then((res)=>res.json())
            .then((json)=>{
                setState({
                    dormitoryName : json.text,
                });
            });
    };
        return (
            <div>
                <input name ="dormitoryName"  onChange={handleChange}/>
                <button onClick = {submitId}>Submit</button>
            </div>
        )
}
export default Ins;