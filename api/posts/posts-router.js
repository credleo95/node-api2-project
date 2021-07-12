// implement your posts router here
const express = require('express');

const Posts = require('./posts-model'); 

const router = express.Router(); 

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "The posts information could not be retrieved" });
    });
}); 

router.get('/:id', (req, res) => {
    Posts.findByID(req.params.id)
    .then(post => {
       if(post){
        res.status(200).json(post)
       } else {
           res.status(404).json({ message: "The post with the specified ID does not exist" });
       }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "The post information could not be retrieved" });
    });
}); 

router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        if(!req.body.title || !req.body.contents){
            res.status(400).json({message:"Please provide title and contens for the post"}); 
        }
        else{
            res.status(201).json(post); 
        }
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({message: "There was an error while saving the post to the databse"}); 

    })
});

router.put('/:id', (req, res) => {
    const id= req.params.id
    const changes = req.body
    Posts.update(id,changes )
    .then(post => {
        if(post){
            res.status(200).json(post);
        } else if (!req.body.title || !req.body.contents) {
            res.status(400).json({message: "Please provide title and contents for the post"})
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: "The post information could not be modified"});
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Posts.remove(id)
    .then(post => {
        if(post){
            res.status(204).json({post})
        } else{
            res.status(404).json({message:"The post with the specified ID does not exist" });
        }
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({message:"The post could not be removed"});
    });
});

module.exports = router; 