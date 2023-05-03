
const clientId = "170eae3cb9504f999d7b1e1ff3f08b07"; 
const params = new URLSearchParams(window.location.search);
const code = params.get("code");


if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    populateUI(profile);
}

async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "https://elliay.github.io/PUI_HW/final/final.html");
    params.append("scope", "user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "https://elliay.github.io/PUI_HW/final/final.html");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=0", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

function changeMusic(profile, index){
    const songId = profile.items[index].id;
    document.querySelector(".embed-track").src = `https://open.spotify.com/embed/track/${songId}?utm_source=generator`
}


function populateUI(profile) {
    console.log(profile);
    for (let i = 0; i < 12; i++){
        var temp, item;
        let topSongs = document.querySelector(".top-tracks");
        let li = document.createElement("li");

        temp = document.querySelector("template");
        item = temp.content.querySelector(".album-image");
        let album = document.importNode(item,true);

        let albumImage = album.querySelector(".image");
        albumImage.src = profile.items[i].album.images[0].url;
        albumImage.alt = `${profile.items[i].name}`;
        let text = document.createTextNode(`${profile.items[i].name} by ${profile.items[i].artists[0].name}`);
        li.appendChild(text);
        topSongs.appendChild(li);

        albumImage.onclick = function(){
            changeMusic(profile, i);
        }
        document.querySelector("#album-covers").appendChild(album);
    }
    
    const songId = profile.items[0].id;
    document.querySelector(".embed-track").src = `https://open.spotify.com/embed/track/${songId}?utm_source=generator`
}



