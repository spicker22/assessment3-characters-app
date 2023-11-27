import characters from './db.json' assert {type: 'json'}        //'characters' is calling what we want, './db.json' is where its coming from
let globalId = 4                                                // A global variable that is a number that starts at 4. 

const handlerFunctions = {                                      // Variable that is an object w/ key value pairs. Function name -> property name, Value -> callback
    sayHello: (req, res) => {
        res.send('hello there characters!')
    },
    allCharacters: (req, res) => {                                  // allCharacters function. Retrieves all drinks in db.json data file
        res.send(characters)
    },
    oneCharacter: (req, res) => {                                   // oneCharacter function. Retrieves 1 character in db.json data file
        console.log('the req.params are', req.params)
        res.send(characters[req.params.index])
    },

    addCharacter: (req, res) => {
                                                                 // addCharacter function. Adds 1 character to the list of characters. Retrieves a new list of all the characters. 
        // pass in the values from the request
        // add that object to the characters array
        console.log(req.body)
        const {characterName, characterPic, characterAge, characterCatchphrase} = req.body                  // Destructuring assignment syntax. Extracting properties from the object and binding them to variables w/ same name.

        let newObj = {                                           // Create an object template with the 4 properties (id, name, picture, catchphrase, age, votes)
            id: globalId,
            name: characterName,
            picture: characterPic,
            catchphrase: characterCatchphrase,
            age: characterAge,
            votes: 0
        }

        characters.push(newObj)                                     // Adds the additional input (the new character object: 'newObj') to the characters array(which is a collection of character objects)
        globalId++                                              // Increments the code by 1. In this case, the globalID will be 5 (4 + 1 = 5)
        res.send(characters)                                        // Sends the new 'characters' array of object to the sender
    },

    deleteCharacter: (req, res) => {                                // deleteDrinks function that deletes 1 drink from the list.
        const {id} = req.params   
        for(let i = 0; i < characters.length; i++){
            console.log(characters[i].id)
            if(characters[i].id === +req.params.id){                // find the character object with the matching id
                characters.splice(i, 1)                             // remove object from array
                break
            }
        }
        res.send(characters)
    },

    updateCharacter: (req, res) => {
        const index = characters.findIndex((el) => el.id === +req.params.id)
        const {type} = req.body

        if(type === 'upvote'){
            characters[index].votes++
        }else if(type === 'downvote'){
            characters[index].votes--
        }
        res.send(characters)
    }
}

export default handlerFunctions                                 // Exports the above defined functions to the index.js file