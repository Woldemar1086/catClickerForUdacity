(function() {

    var numberOfclicks = 0,
        cats = {
            cat1: {
                url: './img/cat.jpg',
                name: 'cat1',
                numberOfclicks: 0,
                srcNumber: 1
            },
            cat2: {
                url: './img/cat1.jpg',
                name: 'cat2',
                numberOfclicks: 0,
                srcNumber: 2
            }
        },
        catContainer = document.querySelectorAll('.cat__container')[0],
        numberOfclicksView = document.querySelectorAll('.numberOfClicks')[0],
        resetButton = document.querySelectorAll('.resetButton')[0];

    // Update on page number of clicks
    // @param {DOMElement/Object} catEl DOMElement <img>
    function changeView(catEl) {
        if (catEl) {
            document.querySelectorAll(`.catText${catEl.dataset.number}`)[0].textContent = cats[`cat${catEl.dataset.number}`].numberOfclicks;
        } else {
            var catElements = document.querySelectorAll('.cat');

            catElements.forEach(function(element) {
                document.querySelectorAll(`.catText${element.dataset.number}`)[0].textContent = cats[`cat${element.dataset.number}`].numberOfclicks
            });
        }
    }

    // Create image with given `url` and `alt` text
    // @param {String} url Image source url
    // @param {String} name Text for img
    // @return {DOMElement/Object} DOM element <img>
    function createImg(url, name) {
        var img = new Image();
        img.src = url;
        img.alt = name;
        img.className = `cat ${name}`;

        return img;
    }

    // Create DOM elements for every child in object `cats`
    function addCats() {
        var img,
            counter = 0;

        for (let cat in cats) {
            counter += 1;

            creatImgContaner = document.createElement('div');
            creatImgContaner.className = 'cat__inner__container';

            creatCounterForImg = document.createElement('span');
            creatCounterForImg.className = `catText catText${counter}`;


            img = createImg(cats[cat].url, cats[cat].name);
            img.dataset.number = counter;

            creatImgContaner.appendChild(img);
            creatImgContaner.appendChild(creatCounterForImg);
            catContainer.appendChild(creatImgContaner);
        }
    }

    // Increment clicks amount
    // @param {DOMElement/Object} catEl Image DOM element
    function incrementNumberOfClicks(catEl) {
        cats['cat' + catEl.dataset.number].numberOfclicks += 1;

        changeView(catEl);
    }

    // Reset number of clicks
    function resetAll() {
    	for(let cat in cats){
    		cats[cat].numberOfclicks = 0;
    	}
        changeView();
    }


    document.addEventListener("DOMContentLoaded", function() {
        addCats();
        changeView();
    });
    catContainer.addEventListener('click', function(e) {
        cat = e.target
        incrementNumberOfClicks(cat)
    });
    resetButton.addEventListener('click', resetAll);
})();