function getDescription(selectElement, inpout, num) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const description = selectedOption.getAttribute('data-description');
    let desc_id = inpout + "-description-" + num
    const descriptionElement = document.getElementById(desc_id);
    descriptionElement.value = description ? `${description}` : '';
}

// Function to adjust input size dynamically
function adjustInputSize(input) {
    input.setAttribute('size', input.value.length);
}

function showChoice(radio, inpout, num) {
    var select = document.getElementById(inpout + "-select-" + num)
    var custom = document.getElementById(inpout + "-custom-" + num)

    let value = radio.value

    if(value == 'custom') {
        custom.style.display = 'block';
        select.style.display = 'none';
    } else {
        custom.style.display = 'none';
        select.style.display = 'block';
    }
}