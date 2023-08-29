const router = require('express').Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const baseURL = 'https://www.freetogame.com/api/games'

// Get all games

router.get('/', function(req, res) {
    const url = baseURL;
  
    fetch(url)
    .then((res) => res.json(),
    console.log(res.json()))
    // .then((data) => {
    //   res.send({ data });
    // })
    .catch(({message}) => {
      res.status(500).json({message});
    });
  
  });

  // Get one game by id

  router.get('/:id', function(req, res) {
    const gameID = req.params.id || '';
    const url = `https://www.freetogame.com/api/game?id=${gameID}`;
  
    fetch(url)
    .then((res) => res.status(200).json())
    .then((data) => {
      res.send({ data });
    })
    .catch(({message}) => {
      res.status(500).json({message});
    });
  
  });

  // Games by category
  router.get('/:category', function(req, res) {
    const gameCategory = req.params.category || '';
    const url = `${baseURL}?category=${gameCategory}`;
  
    fetch(url)
    .then((res) => res.status(200).json())
    .then((data) => {
      res.send({ data });
    })
    .catch(({message}) => {
      res.status(500).json({message});
    });
  
  });

  // Sorting games

  router.get('/:sort', function(req, res) {
    const gameSort = req.params.sort || '';
    const url = `${baseURL}?sort-by=${gameSort}`;
  
    fetch(url)
    .then((res) => res.status(200).json())
    .then((data) => {
      res.send({ data });
    })
    .catch(({message}) => {
      res.status(500).json({message});
    });
  
  });

  // Games by platform

  router.get('/:platform', function(req, res) {
    const gamePlatform = req.params.platform || '';
    const url = `${baseURL}?platform=${gamePlatform}`;
  
    fetch(url)
    .then((res) => res.status(200).json())
    .then((data) => {
      res.send({ data });
    })
    .catch(({message}) => {
      res.status(500).json({message});
    });
  
  });

module.exports = router;