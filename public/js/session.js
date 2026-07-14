const countdown = document.getElementById("countdown");

if (countdown) {
  let seconds = 60;

  countdown.innerHTML = seconds;

  const timer = setInterval(() => {
    seconds--;

    countdown.innerHTML = seconds;

    if (seconds <= 0) {
      clearInterval(timer);

      alert("Session Expired!");

      window.location.href = "/logout";
    }
  }, 1000);
}
