var bc = new BroadcastChannel('gator_channel');

(()=>{
  const title = document.getElementById('title');
  const nameField = document.getElementById('name-field');
  const setTitle = (userName) => {
    title.innerHTML = 'AVRL ' + userName;
  }

  bc.onmessage = (messageEvent) => {
    // If our broadcast message is 'update_title' then get the new title from localStorage
    if (messageEvent.data === 'update_title') {
      // localStorage is domain specific so when it changes in one window it changes in the other
      setTitle(localStorage.getItem('title'));
    }
  }

  // When the page loads check if the title is in our localStorage
  if (localStorage.getItem('title')) {
    setTitle(localStorage.getItem('title'));
  } else {
    setTitle('please tell us your name');
  }

  nameField.onchange = (e) => {
    const inputValue = e.target.value;
    // In the localStorage we set title to the user's input
    localStorage.setItem('title', inputValue);
    // Update the title on the current page
    setTitle(inputValue);
    // Tell the other pages to update the title
    bc.postMessage('update_title');
  }
})()
