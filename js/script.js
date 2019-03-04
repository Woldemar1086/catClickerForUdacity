(function() {

    var numberOfclicks = 0,
        cats = {
            cat1: {
                url: './img/cat1.jpg',
                name: 'cat1',
                numberOfclicks: 0,
                srcNumber: 1
            },
            cat2: {
                url: './img/cat2.jpg',
                name: 'cat2',
                numberOfclicks: 0,
                srcNumber: 2
            },
            cat3: {
                url: './img/cat3.jpg',
                name: 'cat3',
                numberOfclicks: 0,
                srcNumber: 3
            },
            cat4: {
                url: './img/cat4.jpg',
                name: 'cat4',
                numberOfclicks: 0,
                srcNumber: 4
            },
            cat5: {
                url: './img/cat5.jpg',
                name: 'cat5',
                numberOfclicks: 0,
                srcNumber: 5
            }
        },
        catContainer = document.querySelectorAll('.cat__container')[0],
        catListContainer = document.querySelectorAll('.listOfCats')[0],
        numberOfclicksView = document.querySelectorAll('.numberOfClicks')[0],
        listWithCats = document.querySelectorAll('.listOfCats')[0],
        resetButton = document.querySelectorAll('.resetButton')[0];

    // Update on page number of clicks
    // @param {DOMElement/Object} catEl DOMElement <img>
    function changeView(config) {
        var catEl = config.catEl || undefined,
            textClassName = config.textClassName || undefined;

        if (catEl) {
            document.querySelectorAll(`.${textClassName}${catEl.dataset.number}`)[0].textContent = cats[`cat${catEl.dataset.number}`].numberOfclicks;
        } else {
            for (let cat in cats) {
                document.querySelectorAll(`.${textClassName}${cats[cat].srcNumber}`)[0].textContent = cats[cat].numberOfclicks
            }
        }
    }

    // Create list of cats
    // function createListWithCats(){
    // 	addCats({
    // 		textClass: 'catListText catListText',
    //     	containerClass: 'catList__inner__container',
    //     	mainContainer: catListContainer
    // 	})
    // }

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
    // @param {Object} config with all settings
    function addCats(config) {
        var img,
            counter = 0,
            textClass = config.textClass,
            containerClass = config.containerClass,
            mainContainer = config.mainContainer;

        for (let cat in cats) {
            counter += 1;

            creatImgContaner = document.createElement('div');
            creatImgContaner.className = containerClass;

            creatCounterForImg = document.createElement('span');
            creatCounterForImg.className = `${textClass}${counter}`;


            img = createImg(cats[cat].url, cats[cat].name);
            img.dataset.number = counter;

            creatImgContaner.appendChild(img);
            creatImgContaner.appendChild(creatCounterForImg);
            mainContainer.appendChild(creatImgContaner);
        }
    }

    'cat__container'

    function setCatToMainWindow(config) {
        var el = config.el,
            viewContainer = config.viewContainer,
            listElements = config.listElements;

        if (el) {
        	mainViewCat = document.querySelectorAll('.cat__container .catList__inner__container')[0];
            parentNode = el.parentElement;
            document.querySelectorAll(viewContainer)[0].appendChild(parentNode);
            listWithCats.appendChild(mainViewCat);
        } else {
            parentNode = document.querySelectorAll(listElements)[0];
            document.querySelectorAll(viewContainer)[0].appendChild(parentNode);
        }
    }

    // Increment clicks amount
    // @param {DOMElement/Object} catEl Image DOM element
    function incrementNumberOfClicks(catEl) {
        cats['cat' + catEl.dataset.number].numberOfclicks += 1;

        changeView({
            catEl: catEl,
            textClassName: 'catListText'
        });

        setCatToMainWindow({
        	el: catEl,
            viewContainer: '.cat__container'
        })
    }

    // Reset number of clicks
    function resetAll() {
        for (let cat in cats) {
            cats[cat].numberOfclicks = 0;
        }
        changeView({
            textClassName: 'catListText'
        });
    }


    document.addEventListener("DOMContentLoaded", function() {
        addCats({
            textClass: 'catListText catListText',
            containerClass: 'catList__inner__container',
            mainContainer: catListContainer
        });
        changeView({
            textClassName: 'catListText'
        });

        setCatToMainWindow({
            viewContainer: '.cat__container',
            listElements: '.catList__inner__container'
        })

    });
    listWithCats.addEventListener('click', function(e) {
        cat = e.target
        incrementNumberOfClicks(cat)
    });
    resetButton.addEventListener('click', resetAll);
})();