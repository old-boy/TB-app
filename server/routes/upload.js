var express = require('express')
var uploadRouter = express.Router()

var Upload = require('../app/models/upload')
const fs = require("fs");


uploadRouter.route(`/add`)
		  .post((req, res) => {
			const file = req.file;
			Upload.findOne({name:file.filename}).then((doc) => {
				if(doc){
					res.status(400).json({ message: "巳存在" }).send(doc)
				}else{
					const name = file.filename;
					const type = file.mimetype.split("/")[1];
					const url = '/upload/files/' + file.filename;
					const size = (file.size / (1024 * 1024)).toFixed(2) + "Mb";

					console.log('upload  +++' + name)
					let newFile = {
						name,
						type,
						url,
						size
					  };
					  let fileEntity = new Upload(newFile)
					  fileEntity.save().then(data => res.json(data)).catch(err => console.log(err));
				}
			})
		  })


                

module.exports = uploadRouter