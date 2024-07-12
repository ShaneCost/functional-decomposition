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
        populateDiagram();
        createTable();
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

    function populateDiagram() {
        // Collect the correct div, clear it, and make it visible
        const submission_container = document.getElementById('submission-container')
        submission_container.innerHTML = ''
        submission_container.style.display = 'flex'

        // Create and add header
        let header = document.createElement("h2");
        header.innerHTML = document.getElementById("project-name").value + ": Level 0 Design";
        submission_container.appendChild(header);

        // Create div for diagram
        const diagram = document.createElement('div')
        diagram.setAttribute('id', 'diagram')
        submission_container.appendChild(diagram)

        // Create input section
        const inputSection = document.createElement('div')
        inputSection.setAttribute('class', 'input-section')
        diagram.appendChild(inputSection)

        // Create box for module 
        const module = document.createElement('div')
        module.setAttribute('class', 'module')
        const module_name = document.createElement('p')
        module_name.setAttribute('id', 'module-name')
        module.appendChild(module_name)
        diagram.appendChild(module)
        
        // Create output section
        const outputSection = document.createElement('div')
        outputSection.setAttribute('class', 'input-section')
        diagram.appendChild(outputSection)

        // Collect input and output data
        const inputs = document.querySelectorAll('#inputs input[id^="input-"]');
        const outputs = document.querySelectorAll('#outputs input[id^="output-"]');
        const moduleName = document.getElementById('module-name').value;
        
        // Collect module name
        const moduleElement = document.querySelector('.module p');
        
        // Add inputs to diagram
        inputs.forEach(input => {
            if (!input.id.startsWith('input-description-')) {
                const p = document.createElement('p');
                p.innerHTML = input.value + '<span class="arrow">&rarr;</span>';
                inputSection.appendChild(p);
            }
        });

        // Add outputs to diagram
        outputs.forEach(output => {
            if (!output.id.startsWith('output-description-')) {
                const p = document.createElement('p');
                p.innerHTML = '<span class="arrow">&rarr;</span>&nbsp;&nbsp;&nbsp;&nbsp;' + output.value;
                outputSection.appendChild(p);
            }
        });
        
        // Add module name
        moduleElement.textContent = moduleName;      

    }

    function createTable(){
        // Get the correct div
        let div = document.getElementById("submission-container");

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
        div.appendChild(document.createElement('br'));

        const pdfButton = document.createElement('button')
        pdfButton.textContent = 'Print PDF'

        pdfButton.addEventListener('click', function() {
            generatePDF();
        });

        div.appendChild(pdfButton)
    }

    function generatePDF() {
        // window.jsPDF = window.jspdf.jsPDF();
        var doc = new jsPDF();
    
        // Get the HTML content of div
        const content = document.getElementById('submission-container');
    
        // Options for jsPDF
        const options = {
            margin: 1,
            filename: 'generated.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
    
        // Generate PDF from HTML
        doc.fromHTML(content.innerHTML, options, function () {
            doc.save('design.pdf');
        });
    }    
 
});

// Function to adjust input size dynamically
function adjustInputSize(input) {
    input.setAttribute('size', input.value.length);
}
