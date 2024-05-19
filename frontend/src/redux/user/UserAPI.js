


// userAPI.js
export const loginUser = async (credentials) => {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const signupUser = async (userDetails) => {
    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });
       
        
        if (!response.ok && response.status===409) {
            // let err = response.json();
            // console.log(err)
            throw new Error('User Already Exist');
        }
        const data = await response.json();
        
        return data;
    } catch (error) {
        
        throw error;
    }
};

export const logoutUser = async(token)=>{

        if(!token)
            {
                throw new Error('Unauthorized');
            }

    try {
        let response= await fetch('http://localhost:3000/logout',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(token)
    });

    let data = response.json();
    
    return data;
    } 
    catch (error) {
        throw error;
    }



}
