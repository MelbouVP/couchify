import { toast } from 'react-toastify';

export const removeMovie = (moviesArray, movieIdToBeRemoved) => {

    return moviesArray.filter( movie => movie.id !== movieIdToBeRemoved)
}

export const showNotification = (type, text) => {
    return toast.[type](text, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}