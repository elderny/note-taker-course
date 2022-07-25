const
    GenId = () => (Math.random() + 1).toString(36).substring(6),
    options = ['title', 'note'],
    alert = document.getElementById('alert'),
    addAudio = new Audio('add.wav'),
    deleteAudio = new Audio('delete.wav')

let values = { title: '', note: '', id: GenId() }

const addNoteHTML = (title, note, id) => {
    noteBody.innerHTML += `
    <div class="card mt-2 mx-2" style="width: 18rem;height:290px"> <div class="card-title d-flex justify-content-center note-title"> ${title} </div> <div class="card-body" style='overflow: auto;overflow-x: hidden;'> ${note} </div> <button class="btn btn-danger" onclick="deleteNote('${id}')"> Delete <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16"> <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" /> </svg> </button> </div>
    `
}

const getNotes = () => {
    noteBody.innerHTML = ''
    let arr = localStorage.notes ? JSON.parse(localStorage.notes) : []
    if (!arr.length) noteBody.innerHTML = '<h4 class="text-muted">No Notes to show</h4>'
    arr.forEach(e => addNoteHTML(e.title, e.note, e.id))
}
// Show notes on page load
getNotes()

const audioManager = type => {
    type ? addAudio.play() ? addAudio.currentTime = 0 : '' : deleteAudio.play() ? addAudio.currentTime = 0 : ''
}

const emptyVals = () => {
    values = { title: '', note: '', id: GenId() }
    options.forEach(e => document.getElementById(e).value = '')
}

const alertPush = (type, message) => {
    type = type ? 'success' : 'danger'
    alert.classList.remove('none')
    alert.classList.add('alert-' + type)
    alert.innerText = message
    setTimeout(() => {
        alert.classList.add('none')
        alert.classList.remove('alert-' + type)
        alert.innerText = ''
    }, 3000);
}

const validateForm = (success, error) => {
    let valid = true
    Object.keys(values).forEach(e => {
        if (values[e].length < 3) {
            valid = false
            return error(0, `${e} is not valid`)
        }
    })
    if (valid) return success()
}

const inputHandler = e => {
    const { name, value } = e.target
    values = { ...values, [name]: value }
}

const addNote = () => {
    let arr = localStorage.notes ? JSON.parse(localStorage.notes) : []
    arr.push(values)
    localStorage.setItem('notes', JSON.stringify(arr))
    addNoteHTML(values.title, values.note, values.id)
    alertPush(1, `Note with title: ${values.title} has been added`)
    emptyVals()
    audioManager(true)
}

const deleteNote = id => {
    let arr = localStorage.notes ? JSON.parse(localStorage.notes) : []
    arr = arr.filter(e => e.id !== id)
    localStorage.setItem('notes', JSON.stringify(arr))
    getNotes()
    alertPush(0, 'Note has been deleted')
    audioManager()
}

options.forEach(e => document.getElementById(e).addEventListener('input', inputHandler))
noteForm.addEventListener('submit', () => validateForm(addNote, alertPush))