console.log("Chart code reached");
const ctx = document.getElementById("myChart");

window.myChart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: ["Income", "Expense", "Savings"],
        datasets: [{
            data: [50, 30, 20],
            backgroundColor: [
                "#22C55E",
                "#EF4444",
                "#FACC15"
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});