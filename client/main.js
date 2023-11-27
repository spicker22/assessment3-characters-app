// Console log to test connectivity
console.log('JS is connected!')

// Defining the base URL link
const baseUrl = 'http://localhost:8000'

// Create variables 'characterDisplay' and 'characterForm' via querySelector
const characterDisplay = document.querySelector('#characterDisplay')
const characterForm = document.querySelector('form')

// Build a function to create the character card
const createCharacterCard = (characterObject) => {

    const newCharacterCard = document.createElement('section')                                  // Create section within the HTML and set equal to variable 'newCharacterCard'
    newCharacterCard.className = 'character-card'                                               // Create a class

    // Create the inner HTML to be able to insert data for each character card
    newCharacterCard.innerHTML = `                                                              
        <img src=${characterObject.picture} alt='character picture'/>
        <p>${characterObject.name}</p>
        <p>${characterObject.catchphrase}</p>
        <p>${characterObject.age}</p>

        <section>
            <button onclick="updateCharacter(${characterObject.id}, 'downvote')">-</button>
            Popularity: ${characterObject.votes}
            <button onclick="updateCharacter(${characterObject.id}, 'upvote')">+</button>
        </section>

        <br/>
        <button onclick="deleteCharacter(${characterObject.id})" >Delete Me</button>
        <br/>


    `
    // Add the new character card to the others (the display)
    characterDisplay.appendChild(newCharacterCard)
}

// Function to display all the character cards in the HTML
const displayAllCharacters = (arr) => {
    for(let i = 0; i < arr.length; i++){
        console.log(arr[i])
        createCharacterCard(arr[i])
    }
}

// Function to get all the defined characters in the object array (either existing or added)
const getAllCharacters = () => {
    axios.get('http://localhost:8000/characters')                                                   
        .then((response) => {
            console.log(response.data)
            displayAllCharacters(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
}


const handleSubmit = (e) => {
    e.preventDefault()

    characterDisplay.innerHTML = ''

    // Creating variables to define the charcter name, picture, catchphrase and age. 
    let name = document.querySelector('#characterName')
    let characterPicture = document.querySelector('#characterPicture')
    let characterCatchphrase = document.querySelector('#characterCatchPhrase')
    let characterA = document.querySelector('#characterAge')

    // Object variable to contain the character name, picture, catchphrase, and age. 
    let bodyObj = {
        characterName: name.value,
        characterPic: characterPicture.value,
        characterCatchphrase: characterCatchphrase.value,
        characterAge: characterA.value

    }

    axios.post(`${baseUrl}/character`, bodyObj)
        .then((response) => {
            console.log(response.data)
            displayAllCharacters(response.data)                                             // Invoking the 'displayAllCharacters' function with the character data
        })
        .catch((err) => {
            console.log(err)
        })
}

// Function to delete a character
const deleteCharacter = (id) => {

    axios.delete(`${baseUrl}/character/${id}`)
        .then((res) => {
            console.log(res.data)
            characterDisplay.innerHTML = ''
            displayAllCharacters(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

// Function to update a character
const updateCharacter = (id, type) => {

    let bodyObj = {
        type: type
    }

    axios.put(`${baseUrl}/character/${id}`, bodyObj)
        .then((res) => {
            console.log(res.data)
            characterDisplay.innerHTML = ''
            displayAllCharacters(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

// Event listener to add character when the 'submit' button is clicked
characterForm.addEventListener('submit', handleSubmit)

// Function to invoke the 'getAllCharacters' function and display all the character card data in the HTML
getAllCharacters()