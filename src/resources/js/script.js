/* +===== AJAX =====+ */

//GET audio
//Note: If the API returns more than one result, 
//render the first result. If any of the data points 
//do not have the expected data, 
//label those field values as '-' or 'Link unavailable'
function submitAudio(){
    var form = document.getElementById("audioForm");
    var submission = document.getElementById("audioSelection").value;
    var button = document.getElementById("audioSubmit");
    console.log(submission);
    var url = `https://cors-anywhere.herokuapp.com/https://theaudiodb.com/api/v1/json/2/search.php?s=${submission}`
    console.log("Attempting to retrieve submitted audio");
    $.ajax({
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        url: url,
        cors: true,
        crossDomain: true,
        contentType: "application/json",
        dataType: 'json',
        type: 'GET',
    }).then(data => {
        console.log("Ajax called")
        console.log(data);

        //Grab Data from API
        var nameAlt = data.artists[0].strArtistAlternate;
        var genre = data.artists[0].strGenre;
        var country = data.artists[0].strCountry;
        var bio = data.artists[0].strBiographyEN;
        var label = data.artists[0].strLabel;

        //Print to Page
        document.getElementById("li1").innerHTML = nameAlt;
        document.getElementById("li2").innerHTML = genre;
        document.getElementById("li3").innerHTML = country;
        document.getElementById("li4").innerHTML = bio;
        document.getElementById("li5").innerHTML = label;
        document.getElementById("modalSubmission").innerHTML = submission;
    })
    .catch(err =>{
        console.log(err);
    })
}

//SAVE audio
function saveAudio(){
    console.log("Attempting to Save Audio");
    //Grab Data from Front End
    const submission = document.getElementById("modalSubmission").innerHTML;
    const nameAlt = document.getElementById("li1").innerHTML;
    const genre = document.getElementById("li2").innerHTML;
    const country = document.getElementById("li3").innerHTML;
    const bio = document.getElementById("li4").innerHTML;
    const label = document.getElementById("li5").innerHTML;

    var dbData = {submission: submission, nameAlt: nameAlt, genre: genre, country: country, bio: bio, label: label};
    console.log(dbData);
    $.ajax({
        url: "/searches",
        type: 'POST',
        //dataType:"json",
        data: dbData,
    }).then(data => {
        alert("Submission Saved to Search History!");
    }).catch(err =>{
        console.log(err);
    });
}
 
function retrieveAudio(){
    var query = `SELECT * FROM savedAudio`;
}
/* +===== MODAL =====+ */
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')    
})

