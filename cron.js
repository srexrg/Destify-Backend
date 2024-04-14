import cron from 'cron';

const backendUrl = "https://destify-backend.vercel.app/generate";

const job = new cron.CronJob('*/14 * * * *', async () => {
  try {
    console.log('Sending request to backend server');
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        preferences: "mountains",
        budget: "200",
        numTravelers: "2",
        month: "July"
      })
    });

    if (response.ok) {
      console.log("Server Restarted");
    } else {
      console.error("Failed to restart server. Status code:", response.status);
    }
  } catch (error) {
    console.error("Error during server restart:", error.message);
  }
});

export default job;
