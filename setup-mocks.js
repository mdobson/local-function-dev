const {PubSub} = require('@google-cloud/pubsub');
const projectId = process.env.GCP_PROJECT;

async function main() {
  const topics = [
    {port: '8081', topic: 'test-1'},
    {port: '8082', topic: 'test-2'},
  ];
  const apiEndpoint = 'localhost:8085';
  console.log(`Listening to the Pub/Sub emulator event at: ${apiEndpoint}`);
  const pubsub = new PubSub({
    apiEndpoint, // Pub/Sub emulator endpoint
    projectId,
  });

  for (let index = 0; index < topics.length; index++) {
    const element = topics[index];

    console.log(`Get topic ${element.topic}`);
    const topic = await pubsub.topic(element.topic);
    const [topicExists] = await topic.exists();
    if (!topicExists) {
      await topic.create();
    }

    const createSubscriptionResponse = await topic.createSubscription(
      `${element.topic}_${element.port}_sub`,
      {
        pushEndpoint: `http://localhost:${element.port}/projects/myproject/topics/${element.topic}`,
      }
    );

    console.log(`Subscription Created ${createSubscriptionResponse[0].name}`);
  }
}

main();
