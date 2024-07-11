document.addEventListener('DOMContentLoaded', function() {
    const mainForm = document.getElementById('mainForm');
    const inputsContainer = document.getElementById('inputs');
    const outputsContainer = document.getElementById('outputs');
    let inp = 2; // Track input count
    let outp = 2; // Track output count

    // Add input button event
    document.getElementById('add-input').addEventListener('click', function(event) {
        event.preventDefault();
        addInput();
    });

    // Add output button event
    document.getElementById('add-output').addEventListener('click', function(event) {
        event.preventDefault();
        addOutput();
    });

    // Form submission event listener
    document.getElementById('complete-button').addEventListener('click', function(event) {
        event.preventDefault();
        // Handle form submission (e.g., save data, process inputs)
        createTable();
        populateDiagram();
        captureDiagram();
        console.log('Form submitted!');
    });

    // Function to add input fields
    function addInput() {
        let newDiv = document.createElement("div")

        let newInputId = 'input-' + inp;
        let newInputDescriptionId = 'input-description-' + inp;

        let newInputLabel = document.createElement('label');
        newInputLabel.setAttribute('for', newInputId);
        newInputLabel.innerHTML = '<b>&nbsp;Input ' + inp + ':<b>';

        let newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('name', newInputId);
        newInput.setAttribute('id', newInputId);
        newInput.addEventListener('input', function() {
            adjustInputSize(this);
        });

        let newInputDescriptionLabel = document.createElement('label');
        newInputDescriptionLabel.setAttribute('for', newInputDescriptionId);
        newInputDescriptionLabel.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Input ' + inp + ' Description:</b>';

        let newInputDescription = document.createElement('input');
        newInputDescription.setAttribute('type', 'text');
        newInputDescription.setAttribute('name', newInputDescriptionId);
        newInputDescription.setAttribute('id', newInputDescriptionId);

        let removeButton = document.createElement('button');
        removeButton.setAttribute("class" , "remove-button")
        removeButton.textContent = 'X';

        newDiv.appendChild(document.createElement('br'));
        newDiv.appendChild(removeButton);
        newDiv.appendChild(newInputLabel);
        newDiv.appendChild(newInput);
        newDiv.appendChild(document.createElement('br'));
        newDiv.appendChild(newInputDescriptionLabel);
        newDiv.appendChild(newInputDescription);
        
        removeButton.addEventListener('click', function() {
            removeInput(newDiv);
        });

        inputsContainer.appendChild(newDiv)

        inp++; // Increment input counter
    }

    // Function to remove input fields
    function removeInput(newDiv) {
        // Remove the div from DOM
        newDiv.remove()

        // Update numbering for remaining inputs
        let inputDivs = inputsContainer.querySelectorAll('div');
        inputDivs.forEach(function(div, index) {
            let labels = div.querySelectorAll('label');
            let inputs = div.querySelectorAll('input[type="text"]');
            labels[0].innerHTML = '<b>&nbsp;Input ' + (index + 2) + ':</b>';
            labels[1].innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Input ' + (index + 2) + ' Description:</b>';
            inputs[0].setAttribute('name', 'input-' + (index + 2));
            inputs[0].setAttribute('id', 'input-' + (index + 2));
            inputs[1].setAttribute('name', 'input-description-' + (index + 2));
            inputs[1].setAttribute('id', 'input-description-' + (index + 2));
        });

        // Decrement input counter
        inp--;
    }

    // Function to add output fields
    function addOutput() {
        let newDiv = document.createElement("div")

        let newOutputId = 'output-' + outp;
        let newOutputDescriptionId = 'output-description-' + outp;

        let newOutputLabel = document.createElement('label');
        newOutputLabel.setAttribute('for', newOutputId);
        newOutputLabel.innerHTML = '<b>&nbsp;Output ' + outp + ':</b>';

        let newOutput = document.createElement('input');
        newOutput.setAttribute('type', 'text');
        newOutput.setAttribute('name', newOutputId);
        newOutput.setAttribute('id', newOutputId);

        let newOutputDescriptionLabel = document.createElement('label');
        newOutputDescriptionLabel.setAttribute('for', newOutputDescriptionId);
        newOutputDescriptionLabel.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Output ' + outp + ' Description:</b>';

        let newOutputDescription = document.createElement('input');
        newOutputDescription.setAttribute('type', 'text');
        newOutputDescription.setAttribute('name', newOutputDescriptionId);
        newOutputDescription.setAttribute('id', newOutputDescriptionId);

        let removeButton = document.createElement('button');
        removeButton.setAttribute("class" , "remove-button")
        removeButton.textContent = 'X';

        newDiv.appendChild(document.createElement('br'));
        newDiv.appendChild(removeButton);
        newDiv.appendChild(newOutputLabel);
        newDiv.appendChild(newOutput);
        newDiv.appendChild(document.createElement('br'));
        newDiv.appendChild(newOutputDescriptionLabel);
        newDiv.appendChild(newOutputDescription);
        

        removeButton.addEventListener('click', function() {
            removeOutput(newDiv);
        });

        outputsContainer.appendChild(newDiv)

        outp++; // Increment output counter
    }

    // Function to remove output fields
    function removeOutput(newDiv) {
        // Remove the div from DOM
        newDiv.remove();

        // Update numbering for remaining outputs
        let outputDivs = outputsContainer.querySelectorAll('div');
        outputDivs.forEach(function(div, index) {
            let labels = div.querySelectorAll('label');
            let inputs = div.querySelectorAll('input[type="text"]');
            labels[0].innerHTML = '<b>&nbsp;Output ' + (index + 2) + ':</b>';
            labels[1].innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Output ' + (index + 2) + ' Description:</b>';
            inputs[0].setAttribute('name', 'output-' + (index + 2));
            inputs[0].setAttribute('id', 'output-' + (index + 2));
            inputs[1].setAttribute('name', 'output-description-' + (index + 2));
            inputs[1].setAttribute('id', 'output-description-' + (index + 2));
        });

        // Decrement output counter
        outp--;
    }

    function createTable(){
        let div = document.getElementById("submission-container");
        div.style.display = 'flex';

        div.innerHTML = "";

        let header = document.createElement("h2");
        header.innerHTML = document.getElementById("project-name").value + ": Level 0 Design";

        div.appendChild(header);

        // Create table element
        let table = document.createElement('table');

        // First row
        let row1 = document.createElement('tr');
        let cell1 = document.createElement('td');
        cell1.colSpan = 2;
        cell1.innerHTML = '<b>Module Name: </b>' + document.getElementById('module-name').value;
        row1.appendChild(cell1);
        table.appendChild(row1);

        // Second row
        let row2 = document.createElement('tr');
        let cell2_1 = document.createElement('td');
        cell2_1.innerHTML = '<b>Inputs</b>';
        let cell2_2 = document.createElement('td');

        // Collecting initial inputs
        let input1 = document.getElementById('input-1');
        let input1Description = document.getElementById('input-description-1');
        cell2_2.innerHTML += '<li><b>' + input1.value + '</b>: ' + input1Description.value + '</li>';

        // Collecting dynamically added inputs
        let inputs = inputsContainer.querySelectorAll('div');
        inputs.forEach(function(div) {
            let input = div.querySelector('input[id^="input-"]');
            let inputDescription = div.querySelector('input[id^="input-description-"]');
            cell2_2.innerHTML += '<li><b>' + input.value + '</b>: ' + inputDescription.value + '</li>';
        });

        row2.appendChild(cell2_1);
        row2.appendChild(cell2_2);
        table.appendChild(row2);

        // Third row
        let row3 = document.createElement('tr');
        let cell3_1 = document.createElement('td');
        cell3_1.innerHTML = '<b>Outputs</b>';
        let cell3_2 = document.createElement('td');

        // Collecting initial outputs
        let output1 = document.getElementById('output-1');
        let output1Description = document.getElementById('output-description-1');
        cell3_2.innerHTML += '<li><b>' + output1.value + '</b>: ' + output1Description.value + '</li>';

        // Collecting dynamically added outputs
        let outputs = outputsContainer.querySelectorAll('div');
        outputs.forEach(function(div) {
            let output = div.querySelector('input[id^="output-"]');
            let outputDescription = div.querySelector('input[id^="output-description-"]');
            cell3_2.innerHTML += '<li><b>' + output.value + '</b>: ' + outputDescription.value + '</li>';
        });

        row3.appendChild(cell3_1);
        row3.appendChild(cell3_2);
        table.appendChild(row3);


        // Fourth row
        let row4 = document.createElement('tr');
        let cell4 = document.createElement('td');
        cell4.colSpan = 2;
        cell4.innerHTML = '<b>Functionality: </b>' + document.getElementById('functionality').value;
        row4.appendChild(cell4);
        table.appendChild(row4);

        // Append table to container
        div.appendChild(table);
    }







    function populateDiagram() {
        const inputs = document.querySelectorAll('#inputs input[type="text"]');
        const outputs = document.querySelectorAll('#outputs input[type="text"]');
        const moduleName = document.getElementById('module-name').value;

        const inputSection = document.querySelector('.input-section');
        const outputSection = document.querySelector('.output-section');
        const moduleElement = document.querySelector('.module p');

        inputSection.innerHTML = '';
        outputSection.innerHTML = '';

        inputs.forEach(input => {
            const p = document.createElement('p');
            p.textContent = input.value + ' ----->';
            inputSection.appendChild(p);
        });

        outputs.forEach(output => {
            const p = document.createElement('p');
            p.textContent = '-----> '+ output.value;
            outputSection.appendChild(p);
        });

        moduleElement.textContent = moduleName;
    }

    function captureDiagram() {
        const diagramContainer = document.getElementById('diagram-container');
        diagramContainer.style.display = 'block';

        html2canvas(document.querySelector("#diagram")).then(canvas => {
            const img = document.getElementById('generated-image');
            img.src = canvas.toDataURL("image/png");
            img.style.display = 'block';
            diagramContainer.style.display = 'none';
        });
    }
});

// Function to adjust input size dynamically
function adjustInputSize(input) {
    input.setAttribute('size', input.value.length);
}
