// DOM variables
const page = document.querySelector('.page');
const studentList = Array.from(document.querySelectorAll('li'));
const pageHeader = document.querySelector('.page-header');

// Hides all students except for the set that should be shown
function showPage(list, page, pageLength) {

    // If the index is >= the index of the first item that should be shown
    // And the index is <= the index of the last item that should be shown then show those items
    // Otherwise, hide the items
    list.forEach((item, index) => {
        if (index >= ((page - 1) * pageLength) && index <= (page * pageLength - 1)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Create and append the pagination links to the page
function appendPageLinks(listItems, pageLength) {

    // If pagination exists, remove it
    remove();

    // Calculate the number of pages needed
    const numOfPages = Math.ceil(listItems.length / pageLength);
    
    // Create the pagination div
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination';
    page.appendChild(paginationDiv);

    // Create the ul element
    const ul = document.createElement('ul');
    paginationDiv.appendChild(ul);

    // Create a list item with a link for each page needed
    for (let i = 0; i < numOfPages; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.setAttribute('href', '#');
        a.textContent = i + 1;
        ul.appendChild(li);
        li.appendChild(a);
    }

    // Add the class of active to the first list item link
    const firstPageLink = document.querySelector('ul li a');
    firstPageLink.className = 'active';
}

// Create pagination
function pagination(list, target, pageLength) {

    // Remove the active class from all links
    const ul = target.parentNode.parentNode;
    const li = Array.from(ul.childNodes);
    li.forEach(item => item.firstElementChild.className = '');

    // Add the active class to the selected link
    target.className = 'active';

    // Show the set of students that should be shown based on the page that was clicked
    const pageNum = target.textContent;
    showPage(list, pageNum, pageLength);
}

// Create search and append to the page
function appendSearch() {

    // Create the search div
    const searchDiv = document.createElement('div');
    searchDiv.className = 'student-search';
    pageHeader.appendChild(searchDiv);

    // Create the input
    const input = document.createElement('input');
    input.setAttribute('placeholder', 'Search for students...');
    searchDiv.appendChild(input);

    // Create the button
    const button = document.createElement('button');
    button.textContent = 'Search';
    searchDiv.appendChild(button);
}

// Search the list of students
function search() {

    // Get the input value
    const input = document.querySelector('input');
    const value = input.value.toLowerCase();

    // Empty array to hold filtered items
    const filtered = [];

    // Loop over each item in the list
    studentList.forEach(item => {
        // Get the name and email
        const name = item.firstElementChild.firstElementChild.nextElementSibling.textContent;
        const email = item.firstElementChild.lastElementChild.textContent;

        // If the name includes the value or the email includes the value, push the item to the filtered array
        if (name.includes(value) || email.includes(value)) {
            filtered.push(item);
        } 
    });

    if (filtered.length > 0) {

        // Clear all items from the page
        clear();

        // Add pagination links
        appendPageLinks(filtered, 10);
        
        // Only display the filtered items
        showPage(filtered, 1, 10);

    } else {

        // Clear items from page
        clear();
        remove();

        // Create and display message
        const message = document.createElement('p');
        message.className = 'message';
        message.textContent = 'Sorry, no students were found.';
        page.appendChild(message);

    }
}

// Removes pagination links and message from the page
function remove() {
    if (page.lastElementChild.className === 'pagination' || page.lastElementChild.className === 'message') {
        page.removeChild(page.lastElementChild);
    }
};

// Clear all items from page
function clear() {
    studentList.forEach(item => item.style.display = 'none');
}

// When a pagination link is clicked
page.addEventListener('click', function(event) {

    event.preventDefault();
    const target = event.target;

    // If the event target is a link, create pagination
    if (target.tagName === 'A') {
        pagination(studentList, target, 10);
    // If the event target is a button, perform search
    } else if (target.tagName === 'BUTTON') {
        search();
    }
});

// When the enter key is pressed
document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        search();
    }
});

// When the user is typing, display results
document.addEventListener('keyup', function(event) {
    search();
});

function init() {

    // Only show the first 10 students on page load
    showPage(studentList, 1, 10);

    // Create pagination
    appendPageLinks(studentList, 10);

    // Create search
    appendSearch();
}

// Initialize
init();