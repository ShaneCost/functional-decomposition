// Function to retrieve description from db
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

// Function for user to select input type
function showChoice(radio, inpout) {   
    let id = radio.id
    let len = id.length
    let num = id[len-1]

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

document.addEventListener('DOMContentLoaded', function() {
    const mainForm = document.getElementById('mainForm');
    const inputsContainer = document.getElementById('inputs');
    const outputsContainer = document.getElementById('outputs');
    let inp = 2; // Track input count
    let outp = 2; // Track output count

    // Retrieve the JSON data from the data attribute
    const signalsDataElement = document.getElementById('signals')
    const signalsJSON = signalsDataElement.innerHTML
    const signals = JSON.parse(signalsJSON)

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
        showOptions();
        saveData();
        console.log('Form submitted!');
    });

    document.getElementById('add-module').addEventListener('click', function(event) {
        location.reload()
    })

    // Function to add input fields
    function addInput() {
        // Create a variable to make static refrences to inp value
        var count = inp

        // Create new div and assign it an ID
        let newDiv = document.createElement('div')
        let newInputDivID = "input-" + inp
        newDiv.setAttribute('id', newInputDivID)

        // Add delete button
        let removeButton = document.createElement('button');
        removeButton.setAttribute("class" , "remove-button")
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', function() {
            removeInput(newDiv);
        });
        newDiv.appendChild(removeButton)

        // Create new label
        let newLabel = document.createElement('label')
        newLabel.innerHTML = '&nbsp;&nbsp;<b>Input ' + inp + ':</b>&nbsp;&nbsp;&nbsp;'
        newDiv.appendChild(newLabel)

        // Create radio inputs
        let radioSelect = document.createElement('input')
        radioSelect.setAttribute('type', 'radio')
        let radioSelectID = 'input-radio-select-' + inp
        radioSelect.setAttribute('id', radioSelectID)
        radioSelect.setAttribute('value', 'select')
        let radioSelectName ='input-entry-type-' + inp
        radioSelect.setAttribute('name', radioSelectName)
        radioSelect.addEventListener('input', function() {
            showChoice(this, 'input')
        });

        let radioSelectLabel = document.createElement('label')
        radioSelectLabel.setAttribute('for', radioSelectID)
        radioSelectLabel.innerHTML = ' Chose from existing signals '

        let radioCustom = document.createElement('input')
        radioCustom.setAttribute('type', 'radio')
        let radioCustomID = 'input-radio-custom-' + inp
        radioCustom.setAttribute('id', radioCustomID)
        radioCustom.setAttribute('value', 'custom')
        let radioCustomName ='input-entry-type-' + inp
        radioCustom.setAttribute('name', radioCustomName)
        radioCustom.addEventListener('input', function() {
            showChoice(this, 'input')
        })

        let radioCustomLabel = document.createElement('label')
        radioCustomLabel.setAttribute('for', radioCustomID)
        radioCustomLabel.innerHTML = ' Create new signal '

        newDiv.appendChild(radioSelect)
        newDiv.appendChild(radioSelectLabel)
        newDiv.appendChild(radioCustom)
        newDiv.appendChild(radioCustomLabel)

        newDiv.appendChild(document.createElement('br'))
        newDiv.appendChild(document.createElement('br'))

        // Create select input type
        const selectDiv = document.createElement('div')
        let selectDivID = 'input-select-' + inp
        selectDiv.setAttribute('id', selectDivID)
        selectDiv.style.display = 'none'

        const selectElement = document.createElement('select')
        let selectID = 'input-select-' + inp +'-value'
        selectElement.setAttribute('id', selectID)
        selectElement.addEventListener('change', function(){ 
            getDescription(this, 'input', count)
        })

        const defaultOption = document.createElement('option')
        defaultOption.setAttribute('value', '')
        defaultOption.textContent = "Choose from existing signals "
        selectElement.appendChild(defaultOption)

        signals.forEach(signal => {
            const optionElement = document.createElement('option')
            optionElement.value = signal.signal_name
            optionElement.textContent = signal.signal_name
            optionElement.setAttribute('data-description', signal.signal_description)
            selectElement.appendChild(optionElement)
        })

        selectDiv.appendChild(selectElement)
        selectDiv.appendChild(document.createElement('br'));
        selectDiv.appendChild(document.createElement('br'));
        newDiv.appendChild(selectDiv)

        // Create custom input type
        const customDiv = document.createElement('div')
        let customDivID = 'input-custom-' + inp
        customDiv.setAttribute('id', customDivID)
        customDiv.style.display = 'none'

       const customElement = document.createElement('input')
       let customElementID = 'input-custom-' + inp + '-value'
       customElement.setAttribute('id', customElementID)
       
       customElement.setAttribute('type', 'text')
       customElement.addEventListener('input', function(){
            adjustInputSize(this)
       })
       customElement.setAttribute('placeholder', 'Create new signal')

       customDiv.appendChild(customElement)
       customDiv.appendChild(document.createElement('br'))
       customDiv.appendChild(document.createElement('br'))
       newDiv.appendChild(customDiv)
       

       // Create input description
       const descriptionLabel = document.createElement('label')
       let descriptionID = 'input-description-' + inp
       descriptionLabel.setAttribute('for', descriptionID)
       descriptionLabel.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Input ' + inp + ' Description :</b>'

       const descriptionElement = document.createElement('input')
       descriptionElement.setAttribute('name', descriptionID)
       descriptionElement.setAttribute('id', descriptionID)
       descriptionElement.setAttribute('type', 'text')
       descriptionElement.addEventListener('input', function(){
            adjustInputSize(this)
       })

       newDiv.setAttribute('class', 'input-output')

       if(count % 2 == 0) {
        newDiv.style.backgroundColor = 'lightblue'
       }

       newDiv.appendChild(descriptionLabel);
       newDiv.appendChild(descriptionElement)
       newDiv.appendChild(document.createElement('br'))
       newDiv.appendChild(document.createElement('br'))

        // Append to inputs container and increment inp
        inputsContainer.appendChild(newDiv)
        inp++
    }

    // Function to add output fields
    function addOutput() {
        // Create a variable to make static references to outp value
        var count = outp;

        // Create new div and assign it an ID
        let newDiv = document.createElement('div');
        let newOutputDivID = "output-" + outp;
        newDiv.setAttribute('id', newOutputDivID);

        // Add delete button
        let removeButton = document.createElement('button');
        removeButton.setAttribute("class" , "remove-button")
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', function() {
            removeOutput(newDiv);
        });
        newDiv.appendChild(removeButton)

        // Create new label
        let newLabel = document.createElement('label');
        newLabel.innerHTML = '&nbsp;&nbsp;<b>Output ' + outp + ':</b>&nbsp;&nbsp;&nbsp;';
        newDiv.appendChild(newLabel);

        // Create radio inputs
        let radioSelect = document.createElement('input');
        radioSelect.setAttribute('type', 'radio');
        let radioSelectID = 'output-radio-select-' + outp;
        radioSelect.setAttribute('id', radioSelectID);
        radioSelect.setAttribute('value', 'select');
        let radioSelectName = 'output-entry-type-' + outp;
        radioSelect.setAttribute('name', radioSelectName);
        radioSelect.addEventListener('input', function() {
            showChoice(this, 'output');
        });

        let radioSelectLabel = document.createElement('label');
        radioSelectLabel.setAttribute('for', radioSelectID);
        radioSelectLabel.innerHTML = ' Choose from existing signals ';

        let radioCustom = document.createElement('input');
        radioCustom.setAttribute('type', 'radio');
        let radioCustomID = 'output-radio-custom-' + outp;
        radioCustom.setAttribute('id', radioCustomID);
        radioCustom.setAttribute('value', 'custom');
        let radioCustomName = 'output-entry-type-' + outp;
        radioCustom.setAttribute('name', radioCustomName);
        radioCustom.addEventListener('input', function() {
            showChoice(this, 'output');
        });

        let radioCustomLabel = document.createElement('label');
        radioCustomLabel.setAttribute('for', radioCustomID);
        radioCustomLabel.innerHTML = ' Create new signal ';

        newDiv.appendChild(radioSelect);
        newDiv.appendChild(radioSelectLabel);
        newDiv.appendChild(radioCustom);
        newDiv.appendChild(radioCustomLabel);

        newDiv.appendChild(document.createElement('br'));
        newDiv.appendChild(document.createElement('br'));

        // Create select output type
        const selectDiv = document.createElement('div');
        let selectDivID = 'output-select-' + outp;
        selectDiv.setAttribute('id', selectDivID);
        selectDiv.style.display = 'none';

        const selectElement = document.createElement('select');
        let selectID = 'output-select-' + outp + '-value';
        selectElement.setAttribute('id', selectID);
        selectElement.addEventListener('change', function() {
            getDescription(this, 'output', count);
        });

        const defaultOption = document.createElement('option');
        defaultOption.setAttribute('value', '');
        defaultOption.textContent = "Choose from existing signals ";
        selectElement.appendChild(defaultOption);

        signals.forEach(signal => {
            const optionElement = document.createElement('option');
            optionElement.value = signal.signal_name;
            optionElement.textContent = signal.signal_name;
            optionElement.setAttribute('data-description', signal.signal_description);
            selectElement.appendChild(optionElement);
        });

        selectDiv.appendChild(selectElement);
        selectDiv.appendChild(document.createElement('br'));
        selectDiv.appendChild(document.createElement('br'));
        newDiv.appendChild(selectDiv);

        // Create custom output type
        const customDiv = document.createElement('div');
        let customDivID = 'output-custom-' + outp;
        customDiv.setAttribute('id', customDivID);
        customDiv.style.display = 'none';

        const customElement = document.createElement('input');
        let customElementID = 'output-custom-' + outp + 'value';
        customElement.setAttribute('id', customElementID);

        customElement.setAttribute('type', 'text');
        customElement.addEventListener('input', function() {
            adjustInputSize(this);
        });
        customElement.setAttribute('placeholder', 'Create new signal');

        customDiv.appendChild(customElement);
        customDiv.appendChild(document.createElement('br'));
        customDiv.appendChild(document.createElement('br'));
        newDiv.appendChild(customDiv);

        // Create output description
        const descriptionLabel = document.createElement('label');
        let descriptionID = 'output-description-' + outp;
        descriptionLabel.setAttribute('for', descriptionID);
        descriptionLabel.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Output ' + outp + ' Description :</b>';

        const descriptionElement = document.createElement('input');
        descriptionElement.setAttribute('name', descriptionID);
        descriptionElement.setAttribute('id', descriptionID);
        descriptionElement.setAttribute('type', 'text');
        descriptionElement.addEventListener('input', function() {
            adjustInputSize(this);
        });

        newDiv.setAttribute('class', 'input-output');

        if (count % 2 == 0) {
            newDiv.style.backgroundColor = 'lightblue';
        }

        newDiv.appendChild(descriptionLabel);
        newDiv.appendChild(descriptionElement);
        newDiv.appendChild(document.createElement('br'));
        newDiv.appendChild(document.createElement('br'));


        // Append to outputs container and increment outp
        outputsContainer.appendChild(newDiv);
        outp++;
    }

    // Function to remove input fields
    function removeInput(div) {
        div.remove()

        // Reorder input fields
        const inputs = inputsContainer.querySelectorAll('.input-output');

        inputs.forEach(function(input, index){
            // Update label
            let label = input.querySelectorAll('label');
            
            label[0].innerHTML = '&nbsp;&nbsp;<b>Input ' + (index + 1) + ':</b>&nbsp;&nbsp;&nbsp;';
            label[3].innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Input ' + (index + 1) + ' Description:</b>'

            // Update div ID
            input.setAttribute('id', 'input-' + (index + 1));

            // Update radio buttons and their labels
            let radioSelect = input.querySelector('input[type="radio"][value="select"]');
            if (radioSelect) {
                radioSelect.setAttribute('id', 'input-radio-select-' + (index + 1));
                radioSelect.setAttribute('name', 'input-entry-type-' + (index + 1));
                label[1].setAttribute('for', 'input-radio-select-' + (index + 1));
            }

            let radioCustom = input.querySelector('input[type="radio"][value="custom"]');
            if (radioCustom) {
                radioCustom.setAttribute('id', 'input-radio-custom-' + (index + 1));
                radioCustom.setAttribute('name', 'input-entry-type-' + (index + 1));
                label[2].setAttribute('for', 'input-radio-select-' + (index + 1));
            }

            // Update select and custom input divs and IDs
            let selectDiv = input.querySelector('div[id^="input-select"]');
            if (selectDiv) selectDiv.setAttribute('id', 'input-select-' + (index + 1));
            let selectElement = selectDiv ? selectDiv.querySelector('select') : null;
            if (selectElement) selectElement.setAttribute('id', 'input-select-' + (index + 1) + '-value');

            let customDiv = input.querySelector('div[id^="input-custom"]');
            if (customDiv) customDiv.setAttribute('id', 'input-custom-' + (index + 1));
            let customElement = customDiv ? customDiv.querySelector('input') : null;
            if (customElement) customElement.setAttribute('id', 'input-custom-' + (index + 1) + '-value');

            // Update description input
            let descriptionElement = input.querySelectorAll('input[type="text"]');
            if (descriptionElement) descriptionElement[1].setAttribute('name', 'input-description-' + (index + 1));
            if (descriptionElement) descriptionElement[1].setAttribute('id', 'input-description-' + (index + 1));
            label[3].setAttribute('for', 'input-description-' + (index + 1));

            // Alternate background color
            if ((index + 1) % 2 == 0) {
                input.style.backgroundColor = 'lightblue';
            } else {
                input.style.backgroundColor = '';
            }
        })
        inp--;
    }

    // Function to remove output fields
    function removeOutput(div) {
        div.remove();

        // Reorder output fields
        const outputs = outputsContainer.querySelectorAll('.input-output');

        outputs.forEach(function(output, index) {
            // Update label
            let label = output.querySelectorAll('label');
            
            label[0].innerHTML = '&nbsp;&nbsp;<b>Output ' + (index + 1) + ':</b>&nbsp;&nbsp;&nbsp;';
            label[3].innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Output ' + (index + 1) + ' Description:</b>';

            // Update div ID
            output.setAttribute('id', 'output-' + (index + 1));

            // Update radio buttons and their labels
            let radioSelect = output.querySelector('input[type="radio"][value="select"]');
            if (radioSelect) {
                radioSelect.setAttribute('id', 'output-radio-select-' + (index + 1));
                radioSelect.setAttribute('name', 'output-entry-type-' + (index + 1));
                label[1].setAttribute('for', 'output-radio-select-' + (index + 1));
            }
            let radioCustom = output.querySelector('input[type="radio"][value="custom"]');
            if (radioCustom) {
                radioCustom.setAttribute('id', 'output-radio-custom-' + (index + 1));
                radioCustom.setAttribute('name', 'output-entry-type-' + (index + 1));
                label[2].setAttribute('for', 'output-radio-select-' + (index + 1));
            }

            // Update select and custom output divs and IDs
            let selectDiv = output.querySelector('div[id^="output-select"]');
            if (selectDiv) selectDiv.setAttribute('id', 'output-select-' + (index + 1));
            let selectElement = selectDiv ? selectDiv.querySelector('select') : null;
            if (selectElement) selectElement.setAttribute('id', 'output-select-' + (index + 1) + '-value');

            let customDiv = output.querySelector('div[id^="output-custom"]');
            if (customDiv) customDiv.setAttribute('id', 'output-custom-' + (index + 1));
            let customElement = customDiv ? customDiv.querySelector('input') : null;
            if (customElement) customElement.setAttribute('id', 'output-custom-' + (index + 1) + '-value');

            // Update description output
            let descriptionElement = output.querySelectorAll('input[type="text"]');
            if (descriptionElement) descriptionElement[1].setAttribute('name', 'output-description-' + (index + 1));
            if (descriptionElement) descriptionElement[1].setAttribute('id', 'output-description-' + (index + 1));
            label[3].setAttribute('for', 'output-description-' + (index + 1));

            // Alternate background color
            if ((index + 1) % 2 == 0) {
                output.style.backgroundColor = 'lightblue';
            } else {
                output.style.backgroundColor = '';
            }
        });
        outp--;
    }

    // Function that returns a dictionary of all inputs and their descriptions
    function getInputs() {
        var inputsNum = inputsContainer.querySelectorAll('div').length / 3; // this method returns exactly 3 values per input div hence divide by 3

        var inputs = []
        for(i = 1; i <= inputsNum; i++) {
            let radioSelectID = 'input-radio-select-' + i;
            var radioSelect = document.querySelector('#inputs input[id^="' + radioSelectID + '"]')

            if(radioSelect.checked) {
                let selectID = 'input-select-' + i + '-value'
                var name = document.getElementById(selectID).value
            } else {
                let customID = 'input-custom-' + i + '-value'
                var name = document.getElementById(customID).value
            }

            let descriptionID = 'input-description-' + i
            var description = document.getElementById(descriptionID).value
            
            const signal = {
                name: name,
                description: description
            }

            inputs.push(signal)
        }

        return inputs
    }

    // Function that returns a dictionary of all outputs and their descriptions
    function getOutputs() {
        var outputsNum = outputsContainer.querySelectorAll('div').length / 3; // this method returns exactly 3 values per output div hence divide by 3

        var outputs = [];
        for(i = 1; i <= outputsNum; i++) {
            let radioSelectID = 'output-radio-select-' + i;
            var radioSelect = document.querySelector('#outputs input[id^="' + radioSelectID + '"]');

            if(radioSelect.checked) {
                let selectID = 'output-select-' + i + '-value';
                var name = document.getElementById(selectID).value;
            } else {
                let customID = 'output-custom-' + i + '-value';
                var name = document.getElementById(customID).value;
            }

            let descriptionID = 'output-description-' + i;
            var description = document.getElementById(descriptionID).value;
            
            const signal = {
                name: name,
                description: description
            };

            outputs.push(signal);
        }

        return outputs;
    }

    const colors = [
        'color-1', 'color-2', 'color-3', 'color-4', 'color-5',
        'color-6', 'color-7', 'color-8', 'color-9', 'color-10',
        'color-11', 'color-12', 'color-13', 'color-14', 'color-15',
        'color-16', 'color-17', 'color-18', 'color-19', 'color-20',
        'color-21', 'color-22', 'color-23', 'color-24', 'color-25',
        'color-26', 'color-27', 'color-28', 'color-29', 'color-30'
    ];

    function populateDiagram(){
        // Collect the correct div, clear it, and make it visible
        const submission_container = document.getElementById('submission-container');
        submission_container.innerHTML = '';
        submission_container.style.display = 'flex';

        // Create and add header
        let header = document.createElement("h2");
        header.innerHTML = document.getElementById("project-name-value").innerHTML + ": Level 1 Design";
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
        outputSection.setAttribute('class', 'output-section');
        diagram.appendChild(outputSection);

        // Collect input and output data
        const inputs = getInputs()
        const outputs = getOutputs()
        const moduleName = document.getElementById('module-name').value;

        // Collect module name
        const moduleElement = document.querySelector('.module p');
        
        color_num = 0

        // Add inputs to diagram
        inputs.forEach((input, index) => {
            const p = document.createElement('p');
            p.innerHTML = input.name + '<span class="arrow">&rarr;</span>';
            p.classList.add(colors[color_num++]); // Assign color
            inputSection.appendChild(p);
        });

        // Add outputs to diagram
        outputs.forEach((output, index) => { 
            const p = document.createElement('p');
            p.innerHTML = '<span class="arrow">&rarr;</span>&nbsp;&nbsp;&nbsp;&nbsp;' + output.name;
            p.classList.add(colors[color_num++]); // Assign color
            outputSection.appendChild(p); 
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
    
        // Collecting inputs
        let inputs = getInputs();
        inputs.forEach(function(input, index) {
            let inputName = input.name;
            let inputDescription = input.description;
            let inputColor = colors[color_num++]; // Assign color
            cell2_2.innerHTML += `<li><span class="${inputColor}"><b>${inputName}</b></span>: ${inputDescription}</li>`;
        });
    
        row2.appendChild(cell2_1);
        row2.appendChild(cell2_2);
        table.appendChild(row2);
    
        // Third row
        let row3 = document.createElement('tr');
        let cell3_1 = document.createElement('td');
        cell3_1.innerHTML = '<b>Outputs</b>';
        let cell3_2 = document.createElement('td');
    
        // Collecting dynamically added outputs
        let outputs = getOutputs();
        outputs.forEach(function(output, index) {
            let outputName = output.name;
            let outputDescription = output.description;
            let outputColor = colors[color_num++]; // Assign color
            cell3_2.innerHTML += `<li><span class="${outputColor}"><b>${outputName}</b></span>: ${outputDescription}</li>`;
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
    }

    // Reveal the options div
    function showOptions(){
        const div = document.getElementById('options-container')
        div.style.display = 'block'
    }

    // Sends data to backend for storage
    function saveData() {
        // Collect Project Name
        var project_name = document.getElementById("project-name-value").innerHTML

        // Collect Module Name
        var module_name = document.getElementById('module-name').value

        // Collect Inputs
        var inputs = getInputs()

        // Collect Outputs
        var outputs = getOutputs()

        // Collect the Functionality
        var functionality = document.getElementById('functionality').value

        // Collect Date and Time
        var current_date = new Date().toISOString().split('T')[0];
        var current_time = new Date().toLocaleTimeString();

        // Format Data
        let data = {
            project_name: project_name,
            module_name: module_name,
            inputs: inputs,
            outputs: outputs,
            functionality: functionality,
            date: current_date,
            time: current_time,
            type: 1
        }

        // Post data to backend
        const url = '/save_data/'
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

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


})

    


