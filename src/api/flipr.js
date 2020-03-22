import {flipr} from './axios';

export const register = async (name, email, password) => {
    const response = await flipr.post('register/',{
        name: name,
        email: email,
        password: password
    })
    return response;
} 

export const login = async (email, password) => {
    const response = await flipr.post('login/', {
        email: email,
        password: password
    })

    return response
}

export const getPersonalBoards = async (email) => {
    const response = await flipr.get('personal_boards/',{
        params: {
            email: email
        }
    })

    return response;
}
export const createNewPersonalBoard = async (name, email) => {
    const response = await flipr.post('personal_boards/',{
        name: name,
        email: email
    })

    return response
}

export const deletePersonalBoard = async (id) => {
    const response = await flipr.delete('personal_boards/',{
        data: {
            id: id
        }
    })

    return response;
}

export const getTeamBoards = async (email) => {
    const response = await flipr.get('team_boards/',{
        params: {
            email: email
        }
    })

    return response;
}

export const createNewTeamBoard = async (name, members,  email) => {
    const response = await flipr.post('team_boards/',{
        name,
        members,
        email
    })

    return response
}

export const deleteTeamBoard = async (id, email) => {
    const response = await flipr.delete('team_boards/',{
        data: {
            id,
            email
        }
    })

    return response;
}

export const getAllLists = async (id) => {
    const response = await flipr.get('lists/', {
        params: {
            id: id
        }
    })

    return response
}

export const createNewList = async (name, boardId) => {
    const response = await flipr.post('lists/',{
        name: name,
        boardId: boardId
    })

    return response;
}

export const deleteList = async (id) => {
    const response = await flipr.delete('lists/',{
        data: {
            id: id
        }
    })
    return response
}

export const getCardsPerList = async (id) => {
    const response = await flipr.get('cards/', {
        params: {
            id: id
        }
    })

    return response;
}

export const createNewCard = async (id, name, description, completed, due_date, due_time) => {
    const response = await flipr.post('cards/', {
        id,
        name,
        description,
        completed,
        due_date,
        due_time
    })
    return response;
}

export const deleteCard = async (id) => {
    const response = await flipr.delete('cards/',{
        data: {
            id: id
        }
    })
    return response
}

export const updateCard = async (id, archived=false, requestObj) => {
    const response = await flipr.put('cards/', {
        id,
        archived,
        ...requestObj
    })
    return response
}

export const addAttachment = async (...data) => {

    const response = await flipr.post('attachment/',{
        ...data
    })
    return response;
}

export const getAttachments = async (id) => {
    const response = await flipr.get('attachment/',{
        params: {
            id: id
        }
    })

    return response;
}

export const downloadAttachments = async (item) => {
    const response = await flipr.get('downloadAttachment/', {
        params: {
            id: item.id,
            name: item.name
        },
        responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', item.name);
    document.body.appendChild(link);
    link.click();
}

// export const downloadFile = async (filename) => {
//     const response = await spyder.get('send/download-invalid-excel/', {
//           params: {
//                 filename: filename
//           },
//           responseType: 'blob'
//     });
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', filename);
//     document.body.appendChild(link);
//     link.click();
// }
