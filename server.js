
// dependencies
const express = require('express');
const request = require('request');
const path = require('path');

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
    } else {
      if (response.statusCode === 200) {
        res.redirect('/success.html');
      } else {
        res.redirect('/failure.html');
      }
    }
  });
});

// assign port
const port = process.env.PORT || 5000;

// listener
app.listen(port, console.log(`Server running on ${port}`));