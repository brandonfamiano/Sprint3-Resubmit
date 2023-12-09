const express = require('express');
const app = express();
const cors = require('cors');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router)

app.use(express.json());
app.use(cors());


app.get('/videos', async(req,res) =>{
    try {
        const data = res.data;
        if (!data){
            return res.status(404).json({error: 'No Videos Found'})
        }
        res.json(data)
    }catch (error){
        res.status(500).json({error:'Internal Server Error'})
    }
})
app.get('/videos/:id', async(req,res) =>{
    try {
        const data = res.data;
        if (!data){
            return res.status(404).json({error: 'No Videos Found'})
        }
        res.json(data)
    }catch (error){
        res.status(500).json({error:'Internal Server Error'})
    }
})
app.post("/videos/", async (req, res) => {
    try {
      const { title, channel, image, description, views, likes, duration, timestamp, comments } = req.body;
      const newVideo = await res({
        title,
        channel,
        image,
        description,
        views,
        likes,
        duration,
        timestamp,
        comments,
      });
      res.json(newVideo);
    } catch (error) {
      console.error("error adding video", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

server.listen(port);