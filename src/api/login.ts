import { instancePostRequests } from "./axiosAuth";

export const loginFunc = async (values: any) => {
    return await instancePostRequests('/login', {
        username: values.username,
        password: values.password,
        expiresInMins: 30, // optional, defaults to 60
    });
}