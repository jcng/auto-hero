// GLOBALLY AVAILABLE UTILITY FUNCTION
function battle_log(htmlString) {
    // Create a temporary div element
    const tempDiv = document.createElement('div');

    // Set the innerHTML of the temp div with the provided HTML string
    tempDiv.innerHTML = htmlString;

    // Append the contents of the temp div to the 'battle_log' div
    document.getElementById('battle-log').appendChild(tempDiv.firstChild);
}