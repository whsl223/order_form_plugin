const  venue = document.querySelector('#venue')
venue.addEventListener('change', showOtherVenue);

function showOtherVenue() {
    const otherVenueInput = document.getElementById('otherVenue');
    if (venue.value === 'other') {
        otherVenueInput.style.display = 'block';
    } else {
        otherVenueInput.style.display = 'none';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
  }
  
  
  document.querySelector('#eventForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
  
    if (formObject.venue === 'other' && formObject.otherVenue) {
        formObject.venue = formObject.otherVenue;
    }
  
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: (classInput, periodInput, dateInput, venueInput) => {
          const textarea = document.querySelector("#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(9) > div > div > div.AgroKb > div > div.RpC4Ne.oJeWuf > div.Pc9Gce.Wic03c > textarea");
          const formattedText = `\n<copy>\nclass: ${classInput}\nperiod: ${periodInput}\ndate: ${dateInput}\nvenue: ${venueInput}\n</copy>`;
          textarea.value += formattedText;
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
          const event = new Event('input', {
            bubbles: true,
            cancelable: true,
          })
          textarea.dispatchEvent(event);
          
        },
        args: [formObject.class, formObject.period, formatDate(formObject.date), formObject.venue]
      }, (injectionResults) => {
        if (chrome.runtime.lastError) {
          console.error('Error injecting script:', chrome.runtime.lastError);
        } else {
          console.log('Script injected successfully.');
        }
      });
    });
  
  });
  
  