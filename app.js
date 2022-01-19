const notes = require('./notes.js')
const yargs = require('yargs')
const { removeNote, listNotes, readNotes } = require('./notes.js')

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'This is the body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})


//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        removeNote(argv.title)
    }
})

//command to list notes 
yargs.command({
    command: 'list',
    describe: 'Listing all notes',
    handler() {
        listNotes()
    }
})

//command to read notes
yargs.command({
    command: 'read',
    describe: 'Reading all notes',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        readNotes(argv.title)
    }
})

yargs.parse()