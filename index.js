

document.addEventListener('DOMContentLoaded', function () {
    function getAlbums(url) {
         return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    if (res.status == 404) {
                        throw new Error("albums not found")
                    }
                }
                return res.json()
            })
            .then(json => {
                resolve(json)
            })
            .catch(err => {
                reject(err)
                console.log(err)
            })
    })
}
        

getAlbums('https://lit-fortress-6467.herokuapp.com/object')
    .then(albums => {
        getThreeAlbums(albums)
        getallAlbums(albums)
    })
    .catch(err => {
        console.log(err)
    })



function getThreeAlbums(albums) {
    for(let i = 0; i < 3; i++){
        let max = Math.floor(albums.results.length);
        let num = Math.floor(Math.random() * max);

       var t = document.getElementById("over")
       var d = document.createElement('DIV');
       var x = document.createElement('IMG')

       x.setAttribute("src", "../images/" + albums.results[num].cover_art);
       x.setAttribute("width", "200");
       x.setAttribute("height", "200");
       

       d.append(x)
       t.append(d)
    }
}

function getallAlbums(albums){
    for (let i = 0; i < albums.results.length; i++) {
        var t = document.getElementById("albumList")
        var d = document.createElement('DIV');
        var x = document.createElement('IMG')

        x.setAttribute("src", "../images/" + albums.results[i].cover_art);
        x.setAttribute("width", "200");
        x.setAttribute("height", "200");


        d.append(x)
        t.append(d)
    }
}

})


