const {PubSub} = require('@google-cloud/pubsub');
const projectId = process.env.GCP_PROJECT;

exports.listGoogleAPIs = async (req, res) => {
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += 1;
  }

  res.send({sum});
};

exports.genNumber = async (req, res) => {
  const num = Math.floor(Math.random() * 100);
  res.send({num});
};

exports.publishTestTwo = async data => {
  const apiEndpoint = 'localhost:8085';
  const pubsub = new PubSub({
    apiEndpoint, // Pub/Sub emulator endpoint
    projectId,
  });

  console.log('publish from func 1!');
  const topic = await pubsub.topic('test-2');
  const dataNew = Buffer.from('Hello, world! func1');
  await topic.publishMessage({data: dataNew});
  console.log(data);

  const calc = Math.floor(Math.random() * 100);

  console.log(`Hello! I heard test one! ${calc}`);
};

exports.hearTestTwo = data => {
  console.log(data);

  const calc = Math.floor(Math.random() * 100);

  console.log(`Hello! I heard test two! ${calc}`);
};

exports.helloPubSub = data => {
  console.log(data);

  const calc = Math.floor(Math.random() * 100);

  console.log(`Hello! ${calc}`);
};
