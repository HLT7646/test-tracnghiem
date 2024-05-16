export let setLocalStorage = (key: string, value:string)=>{
    if(value && typeof value === "string" && typeof window !== 'undefined'){
        localStorage.setItem(key,value);
    }else{
        localStorage.setItem(key, JSON.stringify(value));
    }
}
export let getLocalStorage = (key: string)=>{
    if(typeof window !== 'undefined') {
        return localStorage.getItem(key);
    }
}

export let removeLocalStorage = (key: string) => localStorage.removeItem(key);

export let setSessionStorage = (key: string, value:string)=>{
    if(value && typeof value === "string" && typeof window !== 'undefined'){
        sessionStorage.setItem(key,value);
    }else{
        sessionStorage.setItem(key, JSON.stringify(value));
    }
}
export let getSessionStorage = (key: string)=>{
    if(typeof window !== 'undefined') {
        return sessionStorage.getItem(key);
    }
}

export let removeSessionStorage = (key: string) => sessionStorage.removeItem(key);