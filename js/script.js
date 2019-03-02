(function() {

    var numberOfclicks = 0;
    catContainer = document.querySelectorAll('.cat__container')[0];
    numberOfclicksView = document.querySelectorAll('.numberOfClicks')[0];
    resetButton = document.querySelectorAll('.resetButton')[0];

    // Update on page number of clicks
    function changeView() {
        numberOfclicksView.textContent = numberOfclicks;
    }

    // Increment clicks amount
    function incrementNumberOfClicks() {
        numberOfclicks += 1;
        changeView();
    }

    // Reset number of clicks
    function resetAll() {
        numberOfclicks = 0;
        changeView();
    }


    document.addEventListener("DOMContentLoaded", changeView);
    catContainer.addEventListener('click', incrementNumberOfClicks);
    resetButton.addEventListener('click', resetAll);
})();