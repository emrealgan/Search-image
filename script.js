const keyAccess = "tA1yDUuDDQKZTvfu4iFgyTyCjlnbir1ZnOPER2jvtyI";
const form = document.querySelector("form");
const searchInput = document.querySelector("form input");
const unorderedList = document.querySelector("ul");

const moreButton = document.querySelector("#more-btn");
moreButton.style.display = "none";

let page = 1;
let keyword = "";
let url = "";

async function getData(link)
{
    let responce = await fetch(link)
    let data = await responce.json();
    console.log(data.results);
    createImage(data.results);
}

form.addEventListener("submit", (e) =>
{   
    e.preventDefault();
    for (const beDeleted of document.querySelectorAll("li")) 
        beDeleted.remove(); 
    
    page = 1;
    keyword = searchInput.value;
    url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${keyAccess}`;
    getData(url);
    moreButton.style.display = "block";
})

function createImage(veri)
{
    veri.map((veri) => 
    {
        const image = document.createElement("img");
        image.src = veri.urls.regular;
        const listImage = document.createElement("li");
        const imageLink = document.createElement("a");
        imageLink.href = veri.links.html;
        imageLink.target = "_blank"
        
        imageLink.appendChild(image);
        listImage.appendChild(imageLink);
        unorderedList.appendChild(listImage);
    })     
}

moreButton.addEventListener("click", () =>
{   
    page ++;
    url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${keyAccess}`;
    getData(url);
})


