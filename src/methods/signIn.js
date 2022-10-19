const users = [
    {
        id : 20200000,
        password : "abc1234",
        type : "오름1동"
    },
    {
        id : 20210000,
        password : "abc1234",
        type : "오름2동"
    },
    {
        id : 20220000,
        password : "abc1234",
        type : "오름3동"
    },
    {
        id : 20230000,
        password : "abc1234",
        type : "푸름1동"
    }
]

export function signIn({id, password}){
    const user = users.find(
        (user) => user.id === id && user.password === password
    );
    if(user === undefined) throw new Error();
    return user;
}