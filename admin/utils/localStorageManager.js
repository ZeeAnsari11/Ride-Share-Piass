const setUser = (data) => {
    try {
        localStorage.setItem("ride:user", JSON.stringify(data));
    } catch (err) {
        console.log(err);
    }
}

const getUser = () => {
    try {
        let u = localStorage.getItem("ride:user");
        if (u) {
            return JSON.parse(u);
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}
const localStorageManager = {
    setUser,
    getUser
}
export default localStorageManager; 