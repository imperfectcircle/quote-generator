const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

// Hide Loading
const completeLoading = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
};

// Show New Quote
const newQuote = () => {
    loading();
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
    completeLoading();
};

// Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
};

// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert(
            `An error occured, please try later or contact the owner of this site and report this error: '${error}'`,
        );
    }
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
