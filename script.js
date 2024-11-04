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
