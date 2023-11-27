// Import packages and files
import express from 'express'
import session from 'express-session'
// // import ViteExpress from 'vite-express' --- THIS  IS FOR FUTURE PROJECTS
import cors from 'cors'
import characters from './db.json' assert {type: 'json'}                        // This is the data source that contains the arary with the objects. Titled
import handlerFunctions from './controller.js'

// Setup my express instance
const app = express()

// Setup Middleware
app.use(express.json())                                                         // Telling the server info goin back and forth will be in json format
app.use(cors())                                                                 // Cross org sharing. CORS help convince the computer its ok to share files. 
app.use(express.urlencoded({extended: false}))                                  // URLencoding: how data is transferred from URLs. 
app.use(express.static('client'))                                               // If server needs to access
app.use(session({                                                               // Fairly standard with these 3 objects in the session. 
    secret: 'Thisisasupersecret',
    saveUninitialized: true,
    resave: false
}))

// Routes go here
const {sayHello, allCharacters, oneCharacter, addCharacter, deleteCharacter, updateCharacter} = handlerFunctions                                                    // Object decontruction to extract fucntions from the handlerfunctions. Making the variables available. 

// Characters functions
app.get('/hello', sayHello)
app.get('/characters', allCharacters)
app.get('/oneCharacter/:index', oneCharacter)
app.post('/character', addCharacter)
app.delete('/character/:id', deleteCharacter)
app.put('/character/:id', updateCharacter)

// Start up server with app.listen
app.listen(8000, () => console.log('Avengers assemble on http://localhost:8000'))

// ViteExpress.listen(app, 8000, () => {
//     console.log('Avengers assemble at http://localhost:8000')
// })

