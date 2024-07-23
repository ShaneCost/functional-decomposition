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
        saveData();
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

    const colors = [
        'color-1', 'color-2', 'color-3', 'color-4', 'color-5',
        'color-6', 'color-7', 'color-8', 'color-9', 'color-10',
        'color-11', 'color-12', 'color-13', 'color-14', 'color-15',
        'color-16', 'color-17', 'color-18', 'color-19', 'color-20',
        'color-21', 'color-22', 'color-23', 'color-24', 'color-25',
        'color-26', 'color-27', 'color-28', 'color-29', 'color-30'
    ];

    function populateDiagram() {
        // Collect the correct div, clear it, and make it visible
        const submission_container = document.getElementById('submission-container');
        submission_container.innerHTML = '';
        submission_container.style.display = 'flex';
    
        // Create and add header
        let header = document.createElement("h2");
        header.innerHTML = document.getElementById("project-name").value + ": Level 0 Design";
        submission_container.appendChild(header);
    
        // Create div for diagram
        const diagram = document.createElement('div');
        diagram.setAttribute('id', 'diagram');
        submission_container.appendChild(diagram);
    
        // Create input section
        const inputSection = document.createElement('div');
        inputSection.setAttribute('class', 'input-section');
        diagram.appendChild(inputSection);
    
        // Create box for module 
        const module = document.createElement('div');
        module.setAttribute('class', 'module');
        const module_name = document.createElement('p');
        module_name.setAttribute('id', 'module-name');
        module.appendChild(module_name);
        diagram.appendChild(module);
    
        // Create output section
        const outputSection = document.createElement('div');
        outputSection.setAttribute('class', 'input-section');
        diagram.appendChild(outputSection);
    
        // Collect input and output data
        const inputs = document.querySelectorAll('#inputs input[id^="input-"]');
        const outputs = document.querySelectorAll('#outputs input[id^="output-"]');
        const moduleName = document.getElementById('module-name').value;
    
        // Collect module name
        const moduleElement = document.querySelector('.module p');
        
        color_num = 0

        // Add inputs to diagram
        inputs.forEach((input, index) => {
            if (!input.id.startsWith('input-description-')) {
                const p = document.createElement('p');
                p.innerHTML = input.value + '<span class="arrow">&rarr;</span>';
                p.classList.add(colors[color_num++]); // Assign color
                inputSection.appendChild(p);
            }
        });
    
        // Add outputs to diagram
        outputs.forEach((output, index) => {
            if (!output.id.startsWith('output-description-')) {
                const p = document.createElement('p');
                p.innerHTML = '<span class="arrow">&rarr;</span>&nbsp;&nbsp;&nbsp;&nbsp;' + output.value;
                p.classList.add(colors[color_num++]); // Assign color
                outputSection.appendChild(p);
            }
        });
    
        // Add module name
        moduleElement.textContent = moduleName;      
    }
    
    function createTable() {
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
        
        color_num = 0;

        // Collecting initial inputs
        let input1 = document.getElementById('input-1');
        let input1Description = document.getElementById('input-description-1');
        let input1Color = colors[color_num++]; // Assign color
        cell2_2.innerHTML += `<li><span class="${input1Color}"><b>${input1.value}</b></span>: ${input1Description.value}</li>`;
    
        // Collecting dynamically added inputs
        let inputs = inputsContainer.querySelectorAll('div');
        inputs.forEach(function(div, index) {
            let input = div.querySelector('input[id^="input-"]');
            let inputDescription = div.querySelector('input[id^="input-description-"]');
            let inputColor = colors[color_num++]; // Assign color
            cell2_2.innerHTML += `<li><span class="${inputColor}"><b>${input.value}</b></span>: ${inputDescription.value}</li>`;
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
        let output1Color = colors[color_num++]; // Assign color
        cell3_2.innerHTML += `<li><span class="${output1Color}"><b>${output1.value}</b></span>: ${output1Description.value}</li>`;
    
        // Collecting dynamically added outputs
        let outputs = outputsContainer.querySelectorAll('div');
        outputs.forEach(function(div, index) {
            let output = div.querySelector('input[id^="output-"]');
            let outputDescription = div.querySelector('input[id^="output-description-"]');
            let outputColor = colors[color_num++]; // Assign color
            cell3_2.innerHTML += `<li><span class="${outputColor}"><b>${output.value}</b></span>: ${outputDescription.value}</li>`;
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
    
        document.getElementById('feedback-container').style.display = 'block';
    }

    function saveData() {
        var project_name = document.getElementById('project-name').value
        var module_name = document.getElementById('module-name').value

        let inputs = []

        // Collecting initial inputs
        let input1 = document.getElementById('input-1').value;
        let input1Description = document.getElementById('input-description-1').value;
        
        input1 = {
            name: input1,
            description: input1Description
        }

        inputs.push(input1)
    
        // Collecting dynamically added inputs
        let inputs_2 = inputsContainer.querySelectorAll('div');
        inputs_2.forEach(function(div, index) {
            let inputName = div.querySelector('input[id^="input-"]').value;
            let inputDescription = div.querySelector('input[id^="input-description-"]').value;
            
            input = {
                name: inputName,
                description: inputDescription
            }

            inputs.push(input)
            
        });

        let outputs = []

        //Collecting initial outputs
        let output1 = document.getElementById('output-1').value
        let output1Description = document.getElementById('output-description-1').value

        output1 = {
            name: output1,
            description: output1Description
        }

        outputs.push(output1)

        //Collecting dynamically added outputs
        let outputs_2 = outputsContainer.querySelectorAll('div')
        outputs_2.forEach(function(div, index){ 
            let outputName = div.querySelector('input[id^="output-"]').value;
            let outputDescription = div.querySelector('input[id^="output-description-"]').value;

            output = {
                name: outputName,
                description: outputDescription
            }

            outputs.push(output)
        });


        var functionality = document.getElementById('functionality').value

        var current_date = new Date().toISOString().split('T')[0];
        var current_time = new Date().toLocaleTimeString();

        let data = {
            project_name: project_name,
            module_name: module_name,
            inputs: inputs,
            outputs: outputs,
            functionality: functionality,
            date: current_date,
            time: current_time
        }

        // const url = "{% url 'save_data' %}" // URL for django backend

        const url = '/save_data/'
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        // Post data to backend
        const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(data)
            };
        
            fetch(url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Get return values from backend if request successful 
                })
                .then(data => {
                    console.log('Response from server:', data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });

    }
 
});

// Function to adjust input size dynamically
function adjustInputSize(input) {
    input.setAttribute('size', input.value.length);
}

function generatePDF(){
    let mywindow = window.open('print', 'PRINT', 'height=650,width=650,top=100,left=100');

    mywindow.document.write(`<html><head><title>Functional Decomposition</title>`);
    mywindow.document.write('<link rel="stylesheet" href="http://127.0.0.1:8000/static/css/design.css">')
    mywindow.document.write('</head><body><br>');
    mywindow.document.write(document.getElementById('submission-container').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); 

    mywindow.onload = function() {
        mywindow.print();
        mywindow.close();
    };

    return true;
}
