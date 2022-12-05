const ProfileDormitoryName = (dormitoryName) =>{
    return(
        <div className="h5 font-weight-300">
            {/*푸름 1동, 410호*/}
            <h1 className={"display-4"}>
                {dormitoryName.dormitoryName}
            </h1>
        </div>
        );
}

export default ProfileDormitoryName;