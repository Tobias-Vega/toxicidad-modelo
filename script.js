const textInput = document.getElementById("text-input");
const button = document.getElementById("button");
const resultsContainer = document.getElementById("results-container");
const results = document.getElementById("results");
const phrases = document.getElementById("phrase");

const threshold = 0.5;

button.addEventListener("click", () => {

  if (textInput.value.trim() === "") {
    alert("Por favor, ingrese una frase para analizarla.");
    return;
  }

  toxicity.load(threshold).then((model) => {
    const sentence = [textInput.value];
  
    model.classify(sentence).then((predictions) => {
      resultsContainer.style.display = "block";
      
      results.innerHTML = "";

      predictions.forEach((prediction) => {
        const label = prediction.label;
        const resultsDiv = document.createElement("div");
        resultsDiv.className = "result-item";
        resultsDiv.innerHTML = `<strong>${label}</strong>: ${prediction.results[0].match}`;
        
        if (prediction.results[0].match) {
          resultsDiv.style.color = "green";
        } else {
          resultsDiv.style.color = "red";
        }
        phrases.innerHTML = `Frase: ${textInput.value}`;
        results.appendChild(resultsDiv);
      });
    });
  });
});