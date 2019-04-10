
// dependencies
const express = require('express');
const request = require('request');
const path = require('path');
const http = require('http');

// instantiate express app
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static
app.use(express.static(path.join(__dirname, 'public')));

// signup route
app.post('/signup', (req, res) => {
  const { name, email } = req.body;

  // validate fields are filled
  if (!name || !email) {
    res.redirect('/failure.html');
    return;
  }

  // construct request data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: name
        }
      }
    ]
  }

  const postData = JSON.stringify(data);

  const options = {
    url: 'https://us7.api.mailchimp.com/3.0/lists/7b32c9efd1',
    method: 'POST',
    headers: {
      Authorization: 'auth 674de983b8b10f63970a364c0dd8e4f2-us7'
    },
    body: postData
  }

  request(options, (err, response, body) => {
    if (err) {
      res.redirect('/failure.html');
      console.log(err);
    } else {
      if (response.statusCode === 200) {
        res.redirect('http://trckapp.com/551g9w55/nikommercelp');
      } else {
        res.redirect('/failure.html');
        console.log(err);
      }
    }
  });
});

// Ping Heroku App every 5 minutes (300000 milliseconds)

setInterval(() => {
    http.get('http://pure-badlands-95180.herokuapp.com/');
}, 300000); 

// assign port
const port = process.env.PORT || 5000;

// listener
app.listen(port, console.log(`Server running on ${port}`));