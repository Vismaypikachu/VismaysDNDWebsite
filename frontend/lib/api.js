import axios from "axios";
import { auth } from "./firebase";

export const postApi = async (
    url = "",
    data = {},
    { headers, ...conf } = {}
) => {
    let response, error, status;
    const user = auth.currentUser;
    await axios
        .post("/api/" + url, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + (await user.getIdToken()),
                ...headers,
            },
            ...conf,
        })
        .then((resp) => {
            error = false;
            response = resp;
            status = "Successful";
        })
        .catch((err) => {
            if (err.response) {
                error = true;
                status = "Oops, api failed.";
                response = err.response;
            } else if (err.request) {
                error = true;
                status = "Oops, could not make request.";
            } else {
                error = true;
                status = "Oops, something went wrong!";
            }
        });

    return { response, error, status };
};
