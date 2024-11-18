export default async function makeCall(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data : ${response.status} ${response.statusText}`);
        }
        let json = await response.json();
        return json;
    }
    catch (e) {
        console.log(e);
    }
}
