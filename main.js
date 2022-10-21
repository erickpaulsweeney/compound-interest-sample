const context = document.getElementById("data-set").getContext("2d");
let line = new Chart(context, {});
const intialAmount = document.getElementById("initialamount");
const years = document.getElementById("years");
const rates = document.getElementById("rates");
const compound = document.getElementById("compound");
const message = document.getElementById("message");
const button = document.querySelector(".input-group button");

const data = [];
const labels = [];

button.addEventListener("click", calculateGrowth);

function calculateGrowth(e) {
  e.preventDefault();
  data.length = 0;
  labels.length = 0;
  let growth = 0;
  try {
    const initial = parseInt(intialAmount.value);
    const period = parseInt(years.value);
    const interest = parseInt(rates.value);
    const comp = parseInt(compound.value);

    for (let i = 1; i <= period; i++) {
      const final = initial * Math.pow(1 + interest / 100 / comp, comp * i);
      data.push(toDecimal(final, 2));
      labels.push("Year " + i);
      growth = toDecimal(final, 2);
    }
    //
    message.innerText = `You will have this amount ${growth} after ${
      isNaN(period) ? 0 : period
    } years`;
    drawGraph();
  } catch (error) {
    console.error(error);
  }
}

function drawGraph() {
  line.destroy();
  line = new Chart(context, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Compound Interest",
          data,
          fill: true,
          backgroundColor: "rgba(12, 141, 0, 0.7)",
          borderWidth: 3,
        },
      ],
    },
  });
}

function toDecimal(value, decimals) {
  return +value.toFixed(decimals);
}
