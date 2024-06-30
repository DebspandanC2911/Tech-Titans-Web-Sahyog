document.getElementById('click_to_record').addEventListener('click', function() {
    // Check if the browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Your browser does not support speech recognition.');
        return;
    }

    // Use webkitSpeechRecognition for browsers that support it, otherwise use SpeechRecognition
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Set the language (optional)

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        document.getElementById("convert_text").value = transcript; // Use value for input field
        console.log(transcript);
    });

    recognition.addEventListener('error', (e) => {
        console.error('Speech recognition error', e);
        if (e.error === 'not-allowed') {
            alert('Microphone access was denied. Please allow access to the microphone.');
        }
    });

    recognition.start();
});

document.getElementById('copy_to_clipboard').addEventListener('click', function() {
    const inputField = document.getElementById("convert_text");
    inputField.select();
    inputField.setSelectionRange(0, 99999); // For mobile devices

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.error('Oops, unable to copy', err);
    }

    // Deselect the text after copying
    window.getSelection().removeAllRanges();
});

document.getElementById('search').addEventListener('click', function() {
    const query = document.getElementById("convert_text").value;
    if (query) {
        const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
        window.open(searchUrl, '_blank');
    } else {
        alert('Please record some text before searching.');
    }
});
document.getElementById('clear_all').addEventListener('click',function() {
    document.getElementById('convert_text').value='';  //Clears the text field incase unwanted words appear
});
