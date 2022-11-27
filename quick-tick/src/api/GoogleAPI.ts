import axios, {AxiosPromise} from "axios";
import {
    GOOGLE_API_ACTIONS,
    TASK_API_ACTIONS,
    TaskList,
    Task,
    UserInfoResponse,
    TaskListResponse,
    TaskResponse, TokenResponse, GOOGLE_API_OAUTH, QuickTickCredential
} from "./Types";

export class GoogleAPI {
    public static getUserInfo(
        credential: QuickTickCredential,
        onSuccess: (info: UserInfoResponse) => void,
        onFailure: (error: string) => void
    ): void {
        axios(GOOGLE_API_ACTIONS.BASE_URL + GOOGLE_API_ACTIONS.USER_INFO, {
            headers: {
                Authorization: `Bearer ${credential.access_token}`,
            },
        })
            .then((response) => onSuccess(response.data))
            .catch((error) => onFailure(error.message));
    }

    public static getTaskLists(
        credential: QuickTickCredential,
        onSuccess: (response: TaskListResponse) => void,
        onFailure: (error: string) => void
    ): void {
        axios(TASK_API_ACTIONS.TASK_URL + TASK_API_ACTIONS.TASKLISTS, {
            headers: {
                Authorization: `Bearer ${credential.access_token}`,
            },
        })
            .then((response) => onSuccess(response.data))
            .catch((error) => onFailure(error.message));
    }

    public static getTasks(
        credential: QuickTickCredential,
        taskListId: string,
        onSuccess: (response: TaskResponse) => void,
        onFailure: (error: string) => void
    ): void {
        axios(TASK_API_ACTIONS.TASK_URL + TASK_API_ACTIONS.TASKLIST + taskListId + "/tasks", {
            headers: {
                Authorization: `Bearer ${credential.access_token}`,
            },
        })
            .then((response) => onSuccess(response.data))
            .catch((error) => onFailure(error.message));
    }

    public static getTokens(
        oauthCode: string,
        onSuccess: (response: TokenResponse) => void,
        onFailure: (error: string) => void
    ): void {
        axios.post(GOOGLE_API_OAUTH.BASE_URL + GOOGLE_API_OAUTH.TOKEN,
            {
                client_id: import.meta.env.VITE_GC_CLIENT_ID,
                client_secret: import.meta.env.VITE_GC_CLIENT_SECRET,
                code: oauthCode,
                grant_type: "authorization_code",
                redirect_uri: window.location.protocol + "//" + window.location.host
            }
        ).then((response) => onSuccess(response.data))
         .catch((error) => onFailure(error.message));
    }

    public static refreshToken(
        credentials: QuickTickCredential,
        onSuccess: (response: TokenResponse) => void,
        onFailure: (error: string) => void
    ): void {
        axios.post(GOOGLE_API_OAUTH.BASE_URL + GOOGLE_API_OAUTH.TOKEN,
            {
                client_id: import.meta.env.VITE_GC_CLIENT_ID,
                client_secret: import.meta.env.VITE_GC_CLIENT_SECRET,
                refresh_token: credentials.refresh_token,
                grant_type: "refresh_token",
            }
        ).then((response) => onSuccess(response.data))
            .catch((error) => onFailure(error.message));
    }
}