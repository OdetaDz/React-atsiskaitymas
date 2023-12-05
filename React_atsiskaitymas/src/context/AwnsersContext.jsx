import { createContext, useEffect, useReducer } from "react";

const AwnsersContext = createContext();

const AwnsersActionTypes = {
    get_all: 'get all the awnsers from data',
    add: 'add a new one awnser',
    delete: 'remove one specific awnser',
    edit: 'edit one specific awnser'
};

const reducer = (state, action) => {
    switch(action.type){
        case AwnsersActionTypes.get_all:
            return action.data;
        case AwnsersActionTypes.add:
            fetch(`http://localhost:8081/awnsers`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(action.data)
            });
            return [...state, action.data];
        case AwnsersActionTypes.delete:
            fetch(`http://localhost:8081/awnsers/${action.id}`, {method: "DELETE"});
            return state.filter(el => el.id.toString() !== action.id.toString());
        case AwnsersActionTypes.edit:
            fetch(`http://localhost:8081/awnsers/${action.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(action.data)
            });
            return state.map(el => {
                if(el.id.toString() === action.id.toString()){
                    return {
                        id: action.id,
                        ...action.data
                    }
                } else {
                    return el;
                }
            });
        default:
            console.log("Error: action type not found", action.type);
            return state
    }
}

const AwnsersProvider = ({ children }) => {

    const [awnsers, setAwnsers] = useReducer(reducer, []);

    useEffect(() => {
        fetch(`http://localhost:8081/awnsers`)
            .then(res => res.json())
            .then(data => setAwnsers({
                type: AwnsersActionTypes.get_all,
                data: data
            }));
    }, []);

    return(

        <AwnsersContext.Provider
            value={{
                awnsers,
                setAwnsers,
                AwnsersActionTypes
            }}
        >
            { children }
        </AwnsersContext.Provider>
    );
}

export { AwnsersProvider };
export default AwnsersContext;