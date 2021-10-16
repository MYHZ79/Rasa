function jsonp(src) {
    var preloader = document.getElementById("preload").style.display = "block";
    var s = document.createElement('script');
    s.onload = function() {
        document.getElementById("preload").style.display = "none";
    }
    s.src = src;
    document.head.appendChild(s);
}
//////////////////////////////////////////// 
function callback(query) {
    return query.trim().replace(" ", "_").match(/[a-zA-Z0-9_]+/g).join("");
}
////////////////////////////////////////////   
function imdburl(query) {
    firstch = callback(query).charAt(0).toLowerCase();
    return baseurl + firstch + "/" + callback(query) + ".json";
}
/////////////////////////////////////////////
function shape(json) {
    document.getElementById("results").innerHTML = "";
    var obj = json.d;
    var res = "";
    for (key in obj) {
        var image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCABKADIDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYFAwj/xAAnEAACAgIBAwMEAwAAAAAAAAAAAQIDBAURBhIhEyIxB1FhcSMyQf/EABgBAQADAQAAAAAAAAAAAAAAAAACAwQH/8QAIxEAAgMAAAUFAQAAAAAAAAAAAAECAxEEIUFhkVGBocLR8P/aAAwDAQACEQMRAD8A9ZgA62cvAAAAAAAAAABqYGpx8zR7PZPImr8F1ONSj4cZS4bb/BCdka1svVLy8Jwg7Hke78LTLABMgAAAAAACl6NxbtnTuNNicSycvD/hg5KPfKM0+OX4+CaBVfW7YOKeP8eltNiqmpNav3kWkPpZ1JLVyuliKGerklju+v3Vcf2TT45T/PwcOsOkKum9dj2qD753ygrfVU/Uj2J+UvCcZdyJI74bwfVa2Eb3W1x3UySlF/fhr3frlfsyqniYzU52alzxRz7P+9jQ7eHcXCFeN9W9+qNXpXXazbW5uBnRsV8sWc8WcXwo2RXd5X++EYZR17vRaXX3U9P0ZdudlVuq3Ly4xh6cH8quEW+Ofu2ThdS5ynOb1ReZvy86JlVyhGEYrG1u58LuAAaTOAAAAAAAAAAAAAAAAAAAAAAAAf/Z";
        var actors = " - ";
        var year = " - ";
        if (types.indexOf(obj[key].q) > -1) {
            if (obj[key].i) {
                image = obj[key].i[0].replace("._V1_.jpg", "._V1._SX50_.jpg");
            }
            typefa = "";
            if (obj[key].q == "feature") typefa = "\u0641\u06CC\u0644\u0645";
            if (obj[key].q == "TV series" || obj[key].q == "TV mini-series") typefa = "\u0633\u0631\u06CC\u0627\u0644";
            if (obj[key].y) year = obj[key].y;
            if (obj[key].yr) year = obj[key].yr;
            var actors = obj[key].s;
            var title = typefa + ' <span dir="ltr">' + obj[key].l + " (" + year + ")</span>";
            var container = document.createElement("div");
            var linktag = document.createElement("a");
            var imagetag = document.createElement("img");
            var descriptiontag = document.createElement("ul");
            var titletag = document.createElement("li");
            var actorstag = document.createElement("li");
            titletag.innerHTML = title;
            actorstag.innerHTML = "\u0628\u0627\u0632\u06CC\u06AF\u0631\u0627\u0646: " + '<span dir=ltr>' + actors + '</span>';
            imagetag.src = image;
            linktag.href = domain + obj[key].id + "/";
            descriptiontag.appendChild(titletag);
            descriptiontag.appendChild(actorstag);
            linktag.appendChild(imagetag);
            linktag.appendChild(descriptiontag);
            container.appendChild(linktag);
            console.log(container);
            document.getElementById("results").appendChild(container);
        } else continue;
    }
}
/////////////////////////////////////////////
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
/////////////////////////////////////////// 
function search() {
    var query = document.getElementById("searchform").value;
    sleep(sleeptime).then(function() {
        if (query == document.getElementById("searchform").value) {
            call = "imdb$" + callback(query);
            window[call] = function(results) {
                shape(results);
            }
            jsonp(imdburl(query));
        }
    });
}
///////////////////////////////////////////    
function filter() {
    input = [];
    input.push(document.getElementById('search').value);
    for (z = 0; z < q.length; z++) {
        if (document.getElementById(q[z]).checked) input.push(q[z]);
    }
    for (i = 0; i < all.length; i++) {
        item = all[i];
        text = item.textContent || item.innerText;
        text = text.toLowerCase();
        display = null;
        for (x = 0; x < input.length; x++) {
            if (text.indexOf(input[x].toLowerCase()) == -1) {
                display = "none";
            }
        }
        all[i].style.display = display;
    }
}
