/*
 HTTP client to send HTTP requests to web servers and retrieve or send data using fetch API.
 */

const SendRequest = async (url, params) => {
    try {
        let response = await fetch(url, params);
        return response.ok ? response.json() : undefined;
    }
    catch {
        return undefined;
    }
}

const GET = async (url, apiKey) => {
    let params = { method: "GET" };
    if (apiKey) {
        params.headers = getAutorizationHeader(apiKey);
    }

    return await SendRequest(url, params);
}

const POST = async (url, body) => {
    return await SendRequest(url, postParams(body));
}

const getAutorizationHeader = (apiKey) => {
    return { 'Authorization': apiKey };
}

const postParams = (body) => ({
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
});

