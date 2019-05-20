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
            getallAlbums(albums)
        })
        .catch(err => {
            console.log(err)
        })

    function getallAlbums(albums) {
        for (let i = 0; i < albums.results.length; i++) {
            var t = document.getElementById("albumList")
            var d = document.createElement('DIV');
            var x = document.createElement('IMG')

            x.setAttribute("src", "../images/" + albums.results[i].cover_art);
            x.setAttribute("width", "100");
            x.setAttribute("height", "100");
            x.setAttribute("id", [i])


            d.append(x)
            t.append(d)
        }
    }

    let data = [];

     document.getElementById("albumList").addEventListener("click", function (e) {

         if (e.target && e.target.nodeName == "IMG") {
             console.log(e.target.id + " was clicked")

               getAlbums('https://lit-fortress-6467.herokuapp.com/object')
                   .then(albums => {
                        let a = document.getElementById('selectedAlbums')
                        let p = document.createElement('P')

                        p.textContent = albums.results[e.target.id].artist + ": " + albums.results[e.target.id].title
                        a.append(p)
                        //console.log(albums.results[e.target.id])
                        data.push(albums.results[e.target.id])
                        console.log(data)
                       
                   })
                   .catch(err => {
                       console.log(err)
                   })

            
         }
     })

     document.getElementById("clearTracks").addEventListener("click", function (e) {
         let a = document.getElementById('selectedAlbums')
         a.innerHTML = ""
         data = []

     })

     document.getElementById("postTracks").addEventListener("click", function (e) {
        e.preventDefault();

        fetch('https://lit-fortress-6467.herokuapp.com/post', {
                method: 'POST',
                data: JSON.stringify(data)
            })
            .then(function (response) {
                let a = document.getElementById('selectedAlbums')
                a.innerHTML = ""
            })
            .catch(function (result) {
                alert("please try again")
            })

     })




     

    //  fetch("/post/data/here", {
    //      method: "POST",
    //      body: JSON.stringify(data)
    //  }).then(res => {
    //      console.log("Request complete! response:", res);
    //  });

    






})

   
