// Task 1: Declare The Task Array and The Interval ID
let tasks = [];
let monitoringTaskId;
let monitoringComplete = false;

// Task 2: Add One-Time Task Function
function addOneTimeTask(func, delay) {
  tasks.push({
    task: func,
    delay: delay,
  });
}

// Task 3: Run One-Time Tasks Function
function runOneTimeTasks() {
  tasks.forEach((job) => setTimeout(job.task, job.delay));
}

// Task 4: Start Monitoring Function
function startMonitoring() {
  //Tracking of system values during monitoring
  let oxygenLevel = 0;
  let powerLevel = 0;
  let communicationCheck = "";

  console.log("Monitoring system parameters...");

  //Simulates system statuses and stops when systems reach stable conditions
  monitoringTaskId = setInterval(() => {
    if (oxygenLevel <= 100) {
      oxygenLevel += Math.random() * (100 - oxygenLevel);
    }

    if (powerLevel < 100) {
      powerLevel += Math.random() * (100 - powerLevel);
    }

    if (communicationCheck !== "Stable") {
      communicationCheck = Math.random() > 0.1 ? "Stable" : "Critical";
    }
    console.log(
      `Oxygen Level: ${oxygenLevel.toFixed(
        2
      )}% | Power Level: ${powerLevel.toFixed(
        2
      )}% | Communication Status: ${communicationCheck}`
    );

    if (
      oxygenLevel >= 99.9 &&
      powerLevel >= 99.9 &&
      communicationCheck === "Stable"
    ) {
      stopMonitoring();
      monitoringComplete = true;
    }
  }, 2000);
}

// Task 5: Stop Monitoring Function
function stopMonitoring() {
  clearInterval(monitoringTaskId);
  console.log(
    `Oxygen Level: 100% | Power Level: 100% | Communication Status: Stable`
  );
  console.log("Monitoring complete. Systems are stable.");
}

// Task 6: Start Countdown Function
function startCountdown(duration) {
  let countDown = duration;
  console.log(`Preparing for launch in T-minus ${countDown} seconds...`);

  //Decrements the countDown everysecond
  let intervalId = setInterval(() => {
    countDown--;
    console.log(`T-minus ${countDown} seconds`);
    if (countDown <= 0) {
      clearInterval(intervalId);
      console.log("Liftoff!");
    }
  }, 1000);
}

// Task 7: Schedule Pre-Launch Activities and Launch
function scheduleMission() {
  startMonitoring(); // begins monitoring

  let checkMonitoringInterval = setInterval(() => {
    if (monitoringComplete) {
      clearInterval(checkMonitoringInterval); // Stops checking for monitoring completion

      //Proceeds with adding tasks and running them
      addOneTimeTask(function () {
        console.log("Finalizing mission parameters...");
      }, 500);
      addOneTimeTask(function () {
        console.log("Checking food expiration dates...");
      }, 1500);
      addOneTimeTask(function () {
        console.log("Tying shoes....");
      }, 6000);
      addOneTimeTask(function () {
        console.log("Pre-launch checks completed!");
      }, 18000);

      addOneTimeTask(function () {
        startCountdown(10);
      }, 18001);

      runOneTimeTasks();
    }
  }, 1000); // Check every second if the monitoring is complete
}

scheduleMission(); // Starts the mission.
