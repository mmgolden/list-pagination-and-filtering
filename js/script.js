// DOM variables
const page = document.querySelector('.page');
const studentList = Array.from(document.querySelectorAll('li'));

// Hides all students except for the set of ten that should be shown
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

// When a pagination link is clicked
page.addEventListener('click', function(event) {
    event.preventDefault();
    const target = event.target;

    // If the event target is a link
    if (target.tagName === 'A') {

        // Remove the active class from all links
        const ul = target.parentNode.parentNode;
        const li = Array.from(ul.childNodes);
        li.forEach(item => item.firstElementChild.className = '');

        // Add the active class to the selected link
        target.className = 'active';

        // Show the set of students that should be shown based on the page that was clicked
        const pageNum = target.textContent;
        showPage(studentList, pageNum, 10);

    }
});


function init() {
    // Only show the first 10 students on page load
    showPage(studentList, 1, 10);

    // Create pagination
    appendPageLinks(studentList, 10);
}

// Initialize
init();