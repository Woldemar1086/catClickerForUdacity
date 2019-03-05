(function() {


    var listWithCats = document.querySelectorAll('.listOfCats')[0],
        resetButton = document.querySelectorAll('.resetButton')[0];

    model = {
        cats: {
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
        }
    }

    controller = {
        init: function() {
            document.addEventListener("DOMContentLoaded", function() {
                view.init();
                view.render();
                view.setCatToMainWindow();
            });
            this.onListClick();
            this.onResetClick();
        },
        onListClick: function() {
            var me = this;
            listWithCats.addEventListener('click', function(e) {
                cat = e.target
                if (cat.dataset.number) {
                    me.incrementNumberOfClicks(cat);
                }
            });
        },
        onResetClick: function() {
            var me = this;
            resetButton.addEventListener('click', me.resetAll);
        },
        // Increment clicks amount
        // @param {DOMElement/Object} catEl Image DOM element
        incrementNumberOfClicks: function(catEl) {
            model.cats['cat' + catEl.dataset.number].numberOfclicks += 1;

            view.render(catEl);

            view.setCatToMainWindow(catEl)
        },

        // Reset number of clicks
        resetAll: function() {
            var cats = model.cats
            for (let cat in cats) {
                cats[cat].numberOfclicks = 0;
            }
            view.render();
        }
    }

    view = {
        // Update on page number of clicks
        // @param {DOMElement/Object} catEl DOMElement <img>
        render: function(catEl) {
            var cats = model.cats;

            if (catEl) {
                document.querySelectorAll(`.catListText${catEl.dataset.number}`)[0].textContent = cats[`cat${catEl.dataset.number}`].numberOfclicks;
            } else {
                for (let cat in cats) {
                    document.querySelectorAll(`.catListText${cats[cat].srcNumber}`)[0].textContent = cats[cat].numberOfclicks
                }
            }
        },

        // Create image with given `url` and `alt` text
        // @param {String} url Image source url
        // @param {String} name Text for img
        // @return {DOMElement/Object} DOM element <img>

        createImg: function(url, name) {
            var img = new Image();
            img.src = url;
            img.alt = name;
            img.className = `cat ${name}`;

            return img;
        },

        // Create DOM elements for every child in object `cats`
        // @param {Object} config with all settings
        init: function(config) {
            var img,
                counter = 0,
                cats = model.cats,
                catListContainer = document.querySelectorAll('.listOfCats')[0];

            for (let cat in cats) {
                counter += 1;

                creatImgContaner = document.createElement('div');
                creatImgContaner.className = 'catList__inner__container';

                creatCounterForImg = document.createElement('span');
                creatCounterForImg.className = `catListText catListText${counter}`;


                img = this.createImg(cats[cat].url, cats[cat].name);
                img.dataset.number = counter;

                creatImgContaner.appendChild(img);
                creatImgContaner.appendChild(creatCounterForImg);
                catListContainer.appendChild(creatImgContaner);
            }
        },
        setCatToMainWindow: function(catEl) {
            if (catEl) {
                mainViewCat = document.querySelectorAll('.cat__container .catList__inner__container')[0];
                parentNode = catEl.parentElement;
                document.querySelectorAll('.cat__container')[0].appendChild(parentNode);
                listWithCats.appendChild(mainViewCat);
            } else {
                parentNode = document.querySelectorAll('.catList__inner__container')[0];
                document.querySelectorAll('.cat__container')[0].appendChild(parentNode);
            }
        }
    }

    controller.init()
})();