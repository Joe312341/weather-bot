const express = require('express');
const multer = require('multer');
const upload = multer();

const chatRouter = express.Router();

chatRouter.post('/messages', upload.single(), (req, res) => {
  const user = req.body;
  const username = user.name;
  if(user.action === 'join'){
    const jsonResponse =  {
        "messages": [
            {
                "type": "text",
                "text": `Hey ${username}, what's up?`
            }
        ]
    }
    res.json(jsonResponse)
  }
})

module.exports = chatRouter;
