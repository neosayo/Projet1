const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/advertisements', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Rififi',
        advertisements: 'I find your lack of faith disturbing.'
      })
    })
  })