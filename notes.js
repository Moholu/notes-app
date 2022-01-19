const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'Your notes...'


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        
        saveNotes(notes)
        console.log(chalk.blue.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('Note title taken'))
    }
}


const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed: ' + title))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found'))
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }    
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('These are your notes: '))
    notes.forEach(note => console.log(chalk.bold.blue(note.title)));
}

const readNotes = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find(note => note.title === title)

    if (noteToRead === undefined) {
        console.log(chalk.bold.red('No note found!'))
    } else {
        console.log(chalk.grey.inverse(noteToRead.title))
        console.log(noteToRead.body)
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}