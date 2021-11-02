/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

const hideLoadingSpinner = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
};

const showNewQuote = () => {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const apiQuotesIndex = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[apiQuotesIndex];
    // Check if Author field is blank and replace it with 'Unknown'
    !quote.author
        ? (authorText.textContent = 'Unknown')
        : (authorText.textContent = quote.author);
    // Check quote length to determine the styling
    quote.text.length > 120
        ? quoteText.classList.add('long-quote')
        : quoteText.classList.remove('long-quote');
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
};

const getQuotesFromApi = async () => {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showNewQuote();
    } catch (error) {
        alert(
            `An error occured, please try later or contact the owner of this site and report this error: '${error}'`,
        );
    }
};

const shareQuoteOnTwitterHandler = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
};

// Event Listener
newQuoteBtn.addEventListener('click', showNewQuote);
twitterBtn.addEventListener('click', shareQuoteOnTwitterHandler);

// On Load
getQuotesFromApi();
