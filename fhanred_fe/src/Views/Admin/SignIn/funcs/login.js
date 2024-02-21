export const login = async (userData, dispatch, credentials, userInfo) => {    
    const { email, password } = userData;
    try {
        const emailCapital = email.toUpperCase()
        const infoUser = { email: emailCapital, password }
        dispatch(userInfo(infoUser));
        const data = credentials.data;
        if(!data){
            console.log(credentials)
        }
        if(data){
            console.log('data: ', data)
            return data;
        }
    } catch (error) {
        console.error('se produjo un error: ', error)
    }
}