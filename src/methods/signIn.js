const users = [
    {
        id : "20200000",
        password : "abc1234",
        type : "오름1동",
        authenticated :"student"
    },
    {
        id : "20230000",
        password : "abc1234",
        type : "푸름1동",
        authenticated :"admin"
    }
]

export function signIn({id, password}){
    const user = users.find(
        (user) => user.id === id && user.password === password
    );
    if(user === undefined) throw new Error();
    return user;
}