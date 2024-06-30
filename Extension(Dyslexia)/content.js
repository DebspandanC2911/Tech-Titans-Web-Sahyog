console.log('Content script loaded');

let paragraphs = document.querySelectorAll('p');

paragraphs.forEach(paragraph => {
  let text = paragraph.textContent;
  let words = text.split(' ');

  paragraph.innerHTML = '';
  let subSection = document.createElement('div');
  words.forEach((word, index) => {
    let span = document.createElement('span');
    span.innerHTML = '<b>' + word.slice(0, 2) + '</b>' + word.slice(2) + ' ';
    subSection.appendChild(span);

    // Break into subsections of 10 words
    if ((index + 1) % 10 === 0) {
      paragraph.appendChild(subSection);
      subSection = document.createElement('div');
    }
  });
  // Append any remaining words
  paragraph.appendChild(subSection);

  // Create the microphone icon
  let micIcon = document.createElement('img');
  micIcon.src = chrome.runtime.getURL('mic_icon.png');
  micIcon.style.cursor = 'pointer';
  micIcon.style.marginLeft = '5px';

  console.log('Appending mic icon to paragraph');

  // Add click event for text-to-speech
  micIcon.addEventListener('click', () => {
    console.log('Mic icon clicked');
    let sentences = paragraph.textContent.match(/[^\.!\?]+[\.!\?]+/g);
    if (sentences) {
      speakSentences(sentences);
    } else {
      let utterance = new SpeechSynthesisUtterance(paragraph.textContent);
      speechSynthesis.speak(utterance);
    }
  });

  paragraph.appendChild(micIcon);
});

console.log('Content script execution finished');

function speakSentences(sentences) {
  if (sentences.length === 0) return;

  let sentence = sentences.shift();
  let utterance = new SpeechSynthesisUtterance(sentence);

  utterance.onend = () => {
    speakSentences(sentences);
  };

  speechSynthesis.speak(utterance);
}
