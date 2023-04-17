document.addEventListener("DOMContentLoaded", function() {
  const toggleButton = document.getElementById("toggle-button");
  const wrapper_toggle = document.getElementById("wrapper_toggle");
  const startTimeInput = document.querySelector('input[name="start_time"][type="hidden"]');
  const elapsedTimeInput = document.querySelector('input[name="elapsed_time"][type="hidden"]');
  const countdown = document.getElementById("countdown");
  let startTime;
  let elapsedTime = 0;
  let timerId;

  toggleButton.addEventListener("click", function () {
    if (wrapper_toggle.style.display === "none") {
      wrapper_toggle.style.display = "flex";
      startTime = new Date().getTime();
      startTimeInput.value = startTime;
      timerId = setInterval(function() {
        elapsedTime++;
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        countdown.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }, 1000);
    } else {
      wrapper_toggle.style.display = "none";
      clearInterval(timerId);
      elapsedTimeInput.value = elapsedTime;
    }
  });

  const submitButton = document.querySelector('button[type="submit"]');
  submitButton.addEventListener("click", function() {
    if (startTime) {
        const endTime = new Date().getTime();
        elapsedTime = Math.floor((endTime - startTime) / 1000);
        const elapsedTimeInput = document.querySelector('input[name="elapsed_time"][type="hidden"]');
        elapsedTimeInput.value = elapsedTime;

        countdown.innerText = '';

        fetch('/save_elapsed_time', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                elapsed_time: String(elapsedTime)
            }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }
});

});
