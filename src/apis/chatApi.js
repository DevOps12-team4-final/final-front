import axios from "axios";

const searverUrl ="http://localhost:9090/room"
const webSocketUrl ="http://localhost:9090/ws/api"

export const getRooms = async () =>{
   try {
    const response = await axios.get(`${searverUrl}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                "Content-Type": "multipart/form-data"
            }
        }
    )
    return response
   } catch (error) {
        console.log(error)
   }
}

export const createRoom = async (roomData) =>{
    try {
     const response = await axios.post(`${searverUrl}/create`, roomData, {
             headers: {
                 Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                 "Content-Type": "multipart/form-data"
             }
         }
     )
     return response
    } catch (error) {
         console.log(error)
    }
 }

 export const enterRoom = async (roomId, userId) => {
    try {
        const response = await axios.get(`${searverUrl}/enter/${roomId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
            params: {
                user_id: userId
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

 export const sendFileToRoom = async (roomId,formData) =>{
    try {
     const response = await axios.post(`${searverUrl}/sendFile/${roomId}`, formData, {
             headers: {
                 //Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                 "Content-Type": "multipart/form-data"
             }
         }
     )
     return response
    } catch (error) {
         console.log(error)
    }
 }

 
 // Function to get alarms for a user
export const getAlarm = async (userId) => {
    try {
        const response = await axios.get(`${searverUrl}/alarm/${userId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching alarms:', error.response || error);
    }
};

// Function to mark alarms as read for a user
export const readAlarm = async (userId) => {
    try {
        const response = await axios.patch(`${searverUrl}/alarm/${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error reading alarm:', error.response || error);
    }
};



 

