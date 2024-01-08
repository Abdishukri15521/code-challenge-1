
document.addEventListener("DOMContentLoaded", () => {
  const characterDetailsContainer = document.getElementById("characterDetails");
  const voteCountSpan = document.getElementById("vote-count");
  const votesForm = document.getElementById("votes-form");
  const resetButton = document.getElementById("reset");

  let characters = [];

  // Fetch characters from the server
  fetch("http://localhost:3000/characters")
    .then((res) => res.json())
    .then((data) => {
      characters = data;

      // Function to display character details
      function displayCharacterDetails(character) {
        characterDetailsContainer.innerHTML = `
          <img src="${character.image}" alt="${character.name}" />
          <p>Name: ${character.name}</p>
          <p>Votes: ${character.votes}</p>
        `;
      }

      // Event listener for each button
      document.getElementById("btns").addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
          const characterName = event.target.textContent;
          const selectedCharacter = characters.find(
            (character) => character.name === characterName
          );

          // Display details of the selected character
          displayCharacterDetails(selectedCharacter);
        }
      });

      // Event listener for votes form submission
      votesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const votesInput = document.getElementById("votes");
        const votes = parseInt(votesInput.value, 10) || 0;

        // Update votes for the selected character
        const selectedCharacterName = characterDetailsContainer
          .querySelector("p:nth-child(2)")
          .textContent.split(":")[1]
          .trim();
        const selectedCharacter = characters.find(
          (character) => character.name === selectedCharacterName
        );

        selectedCharacter.votes += votes;
        voteCountSpan.textContent = selectedCharacter.votes;

        // Reset the form
        votesInput.value = "";
      });

      // Event listener for reset button
      resetButton.addEventListener("click", () => {
        // Reset votes for all characters
        characters.forEach((character) => {
          character.votes = 0;
        });

        // Display details for the first character
        displayCharacterDetails(characters[0]);

        // Update total votes
        const totalVotes = characters.reduce(
          (sum, character) => sum + character.votes,
          0
        );
        voteCountSpan.textContent = totalVotes;
      });

      // Display details for the first character initially
      displayCharacterDetails(characters[0]);

      // Update total votes initially
      const totalVotes = characters.reduce(
        (sum, character) => sum + character.votes,
        0
      );
      voteCountSpan.textContent = totalVotes;
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
});