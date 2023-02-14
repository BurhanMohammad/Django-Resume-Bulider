const getState = () => {
  const $ = (element) => {
    return document.getElementById(element).value
  }

  const state = {
    name: $('name'),
    address: $('address'),
    phone: $('phone'),
    email: $('email'),
    about: $('about'),
    career: $('career'),
    education: $('education'),
    job1: {
      date: {
        start: $('job-1__start'),
        end: $('job-1__end')
      },
      details: $('job-1__details')
    },
    job2: {
      date: {
        start: $('job-2__start'),
        end: $('job-2__end')
      },
      details: $('job-2__details')
    },
    job3: {
      date: {
        start: $('job-3__start'),
        end: $('job-3__end')
      },
      details: $('job-3__details')
    },
    references: $('references')
  }
  return state
}

const buildResume = (state) => {
  const $ = (value) => {
    document.write(value)
  }

  const styleText = `
@import url('https://fonts.googleapis.com/css?family=Poppins:400,600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  background: #fafafa;
  color: rgba(0,0,0,0.75);
}

h1 {
  color: rgba(0,0,0,0.9);
}

h1, p {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px 24px;
}

.line-break {
  width: 100%;
  height: 1px;
  margin: 16px auto;
  border-bottom: 1px solid #eee;
}

.resume {
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 48px auto;
  padding: 16px 0px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.14);
}

.resume-group {
  box-sizing: border-box;
  padding: 8px 0px;
  width: 100%;
  display: flex;
  border-left: 3px solid transparent;
  transition: 0.2s;
}

.resume-group:hover {
  border-left: 3px solid #64FFDA;
}

.left-col {
  width: 35%;
}

.right-col {
  width: 65%;
}

.instructions {
  opacity: 0.5;
  text-align: center;
  font-size: 0.8rem;
  margin: 16px auto;
}
`


  const createGroup = (left, right) => {
    $('<div class="resume-group">')
    $('<div class="left-col">')
    $('<p>' + left + '</p>')
    $('</div>')
    $('<div class="right-col">')
    $('<p>' + right + '</p>')
    $('</div>')
    $('</div>')
  }

  document.open()
  $('<html><head>')
  $('<title>' + state.name + "'s Resume </title>")
  $('<style>' + styleText + '</style>')
  $('</head><body><div class="resume">')
  $('<h1>' + state.name + '</h1>')
  $('<p>' + state.email + '</p>')
  $('<p>' + state.phone + '</p>')
  $('<p>' + state.address + '</p>')
  $('<div class="line-break"></div>')
  createGroup('ABOUT ME', state.about)
  createGroup("CAREER OBJECTIVES", state.career)
  createGroup('EDUCATION', state.education)
  createGroup('EMPLOYMENT EXPERIENCE', '')
  createGroup(state.job1.date.start + ' to ' + state.job1.date.end, state.job1.details)
  createGroup(state.job2.date.start + ' to ' + state.job2.date.end, state.job2.details)
  createGroup(state.job3.date.start + ' to ' + state.job3.date.end, state.job3.details)
  createGroup('REFERENCES', state.references)
  $('</div>')
  $('<div class="instructions">Right click the page and "Save As..." to make a copy of this resume</div>')
  $('</body></html>')
  document.close()
}



const checkName = () => {
  const name = document.getElementById('name')
  const name_error = document.getElementById('name__error')
  const isValid = !!name.value
  if (!isValid) {
    name.classList.add("error__input")
    name_error.style.display = "block"
    name_error.innerHTML = "The name field is required"
    console.log("error")
  } else {
    name.classList.remove("error__input")
    name_error.style.display = "none"
  }
  return isValid
}

const checkEmail = () => {
  const email = document.getElementById('email')
  const email_error = document.getElementById('email__error')
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const isValid = emailRegex.test(String(email.value).toLowerCase())
  if (!email.value) {
    email.classList.add("error__input")
    email_error.style.display = "block"
    email_error.innerHTML = "The email field is required"
  } else {
    if (!isValid) {
      email.classList.add("error__input")
      email_error.style.display = "block"
      email_error.innerHTML = "The email entered is invalid"
    } else {
      email.classList.remove("error__input")
      email_error.style.display = "none"
    }
  }
  return isValid
}

const checkValidity = () => {
  const nameIsValid = checkName()
  const emailIsValid = checkEmail()
  if (!nameIsValid) {
    location.hash = "#name"
  } else if (!emailIsValid) {
    location.hash = "#email"
  }
  return nameIsValid && emailIsValid
}

document.getElementById('create-resume').addEventListener("click", (e) => {
  e.preventDefault()
  const isValid = checkValidity()
  if (isValid) buildResume(getState())
})

document.getElementById('name').addEventListener('blur', checkName)

document.getElementById('email').addEventListener('blur', checkEmail)
