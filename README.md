# in root folder project create config.json file

```javascript

{
    "apiEndpoint" : "put here link to your firebase project",
    "isFirebase" : "true"
}

```

# then in cervices folder create http.service.js file
## use axios.interceptors to config getting data from firebase
## /\/$/gi.test(config.url) regular expression removes ending / from url

```javascript

import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
    function (config) {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url)
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json"
        }
        return config
    },
    function (error) {
        return Promise.reject(error);
    }
);

```


# transform data from firebase
## axios.interceptors.response.use transform data from firebase

```javascript

function transformData(data) {
    return data ? Object.keys(data).map(key => ({
            ...data[key],
            })) : []
}

axios.interceptors.response.use(
    (res) => {
        if (configFile.isFirebase) {
            res.data = {content: transformData(res.data)}
        }
        return res
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log(error);
            toast.error("Somthing was wrong. Try later");
        }
        return Promise.reject(error);
    }
);

```

