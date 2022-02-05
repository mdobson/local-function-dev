exports.listGoogleAPIs = async (req, res) => {
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += 1;
  }

  res.send({sum});
};

exports.helloPubSub = data => {
  console.log(data);

  const calc = Math.floor(Math.random() * 100);

  console.log(`Hello! ${calc}`);
};
