var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const { createHash } = require('crypto');

var session = require('express-session')
app.use(session({
    secret: "string for authenticating sessions",
	resave: true,
    saveUninitialized:true,
    cookie: {},
	id: '',
}));

var pgp = require('pg-promise')();

const axios = require('axios');

const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'audio_db',
	user: 'postgres',
	password: 'Neverquit4405!'
}

var db = pgp(dbConfig);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));


/* +========= jQuery Function =========+ */
function sendAjaxReq(button, url){
    $(document).ready(function(){
        $("#audioSubmit").click(function(){
            $("#audioForm").submit();
        });
    });
    var clickedButton = button;
    $.ajax({
        type: "GET",
        url: url,
        data: {
            id: $(this).val(),
        },
        success: function(result){
            alert('SUCCESS');
        },
        error: function(result){
            alert('ERROR');
        }
    });
    e.preventDefault();
};
/* +========= AJAX CALLS =========+ */