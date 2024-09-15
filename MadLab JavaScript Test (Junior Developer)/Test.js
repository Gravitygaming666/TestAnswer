// Start fetching from page 1
fetchBooks();

// Function to fetch books and find Dostoyevsky's book
async function fetchBooks(url = 'https://gutendex.com/books/') {
    const loadingElement = document.getElementById('loading');
    const bookListElement = document.getElementById('book-list');
  
    try {
      while (url) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('HTTP error!');
        }
  
        const data = await response.json();
        const books = data.results;
  
        // Check if any book by Dostoyevsky, Fyodor exists on this page
        const dostoyevskyBook = books.find((book) =>
          book.authors.some(author => author.name === 'Dostoyevsky, Fyodor')
        );
  
        // If the book is found, display it and break the loop
        if (dostoyevskyBook) {
          loadingElement.textContent = ''; // Clear the loading text
  
          const bookItem = document.createElement('div');
          bookItem.innerHTML = `
            <h2>${dostoyevskyBook.title}</h2>
            <p><strong>Author:</strong> ${dostoyevskyBook.authors.map(author => author.name).join(', ')}</p> 
            <p><strong>Book Count:</strong> ${dostoyevskyBook.download_count}</p>
            <p><strong>Subjects:</strong> ${dostoyevskyBook.subjects.join(', ')}</p>
            <p><strong>Read Online:</strong> <a href="${dostoyevskyBook.formats["text/html"]}" target="_blank">Click here</a></p>
          `;
  
          bookListElement.appendChild(bookItem);
          return; // Stops the loop once the book is found.
        }
  
        // If not found, move to the next page.
        url = data.next;
      }
  
      // If no Dostoyevsky book was found after searching all pages.
      loadingElement.textContent = 'No book by Dostoyevsky, Fyodor was found.';
    } catch (error) {
      console.error('Error fetching data:', error);
      loadingElement.textContent = 'Failed to load books.';
    }
  }
  
  // Call the function to search for Dostoyevsky's book.
  fetchBooks();
  

