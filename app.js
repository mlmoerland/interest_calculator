// Listen for submit
document.querySelector("#loan-form").addEventListener("submit", function(e) {
  // Hide results
  document.querySelector("#results").style.display = "none";

  // Show loader
  document.querySelector("#loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults(e) {
  //UI Vars
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalnterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalnterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Show results
    document.querySelector("#results").style.display = "block";

    // Remove loader
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

function showError(error) {
  // Show results
  document.querySelector("#results").style.display = "none";

  // Remove loader
  document.querySelector("#loading").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add Class
  errorDiv.className = "alert alert-danger";

  // Create textnode and append to dive
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
