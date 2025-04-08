document.addEventListener('DOMContentLoaded', function() {

    const tweetInput = document.getElementById('tweetInput');

    const tweetButton = document.getElementById('tweetButton');

    const tweetsContainer = document.getElementById('tweetsContainer');


    // Create a BroadcastChannel

    const channel = new BroadcastChannel('tweets_channel');


    // Load existing tweets from localStorage when the page loads

    loadTweets();


    tweetButton.addEventListener('click', function() {

        const tweetText = tweetInput.value.trim();


        if (tweetText) {

            // Save tweet to localStorage

            saveTweet(tweetText);

            tweetInput.value = ''; // Clear the input

            loadTweets(); // Reload tweets to display the new tweet


            // Send the tweet to other tabs

            channel.postMessage(tweetText);

        } else {

            alert('Please enter a tweet!');

        }

    });


    // Listen for messages from other tabs

    channel.onmessage = function(event) {

        const newTweet = event.data;

        if (newTweet) {

            loadTweets(); // Reload tweets to display the new tweet

        }

    };


    function saveTweet(tweet) {

        // Get existing tweets from localStorage

        const tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        // Add new tweet

        tweets.push(tweet);

        // Save back to localStorage

        localStorage.setItem('tweets', JSON.stringify(tweets));

    }


    function loadTweets() {

        // Clear the current tweets displayed

        tweetsContainer.innerHTML = '';

        // Get tweets from localStorage

        const tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        // Display each tweet

        tweets.forEach(tweet => {

            const tweetDiv = document.createElement('div');

            tweetDiv.classList.add('tweet');

            const tweetContent = document.createElement('p');

            tweetContent.textContent = tweet;

            tweetDiv.appendChild(tweetContent);

            tweetsContainer.prepend(tweetDiv); // Add new tweet at the top

        });

    }

});