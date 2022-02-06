const http = require('http');
const {PubSub} = require('@google-cloud/pubsub');
const projectId = process.env.GCP_PROJECT;

http
  .createServer(async (req, res) => {
    const apiEndpoint = 'localhost:8085';
    const pubsub = new PubSub({
      apiEndpoint, // Pub/Sub emulator endpoint
      projectId,
    });

    console.log('publish!');
    const topic = await pubsub.topic('test-1');
    const data = Buffer.from('Hello, world!');
    await topic.publishMessage({data});
    console.log(`${req.headers['host']}${req.url} host header!`);
    res.end('hello!');
  })
  .listen(process.env.PORT || 3001);
