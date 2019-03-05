(function() {
    let model, view, controller;

    model = {
        cats: {
            cat1: {
                url: './img/cat1.jpg',
                name: 'cat1',
                numberOfClicks: 0,
                srcNumber: 1,
                adminStatus: false
            },
            cat2: {
                url: './img/cat2.jpg',
                name: 'cat2',
                numberOfClicks: 0,
                srcNumber: 2,
                adminStatus: false
            },
            cat3: {
                url: './img/cat3.jpg',
                name: 'cat3',
                numberOfClicks: 0,
                srcNumber: 3,
                adminStatus: false
            },
            cat4: {
                url: './img/cat4.jpg',
                name: 'cat4',
                numberOfClicks: 0,
                srcNumber: 4,
                adminStatus: false
            },
            cat5: {
                url: './img/cat5.jpg',
                name: 'cat5',
                numberOfClicks: 0,
                srcNumber: 5,
                adminStatus: false
            }
        },
        incrementClickForCat: function(catEl) {
            this.cats['cat' + catEl.dataset.number].numberOfClicks += 1;
        },

        toggleAdminStatus: function(cat) {
            cat.adminStatus = !cat.adminStatus;
        }
    };

    controller = {
        init: function() {
            document.addEventListener("DOMContentLoaded", function() {
                view.init();
                view.render();
                view.setCatToMainWindow();
            });
            this.onListClick();
            this.onResetClick();
            this.onAdminClick();
        },
        onListClick: function() {
            let me = this,
                listWithCats = view.getDomElement('.listOfCats')[0];

            listWithCats.addEventListener('click', function(e) {
                let cat = e.target;

                if (cat.dataset.number) {
                    me.incrementNumberOfClicks(cat);
                }
            });
        },

        onResetClick: function() {
            let me = this,
                resetButton = view.getDomElement('.resetButton')[0];

            resetButton.addEventListener('click', me.resetAll);
        },
        onAdminClick: function() {
            let me = this,
                adminButton = view.getDomElement('.adminButton')[0];

            adminButton.addEventListener('click', function(){
                me.changeAdminStatus(me.getCats(view.getCurrentCat()));
                view.setCatToMainWindow();
            });
        },

        getCats: function(cat) {
            if (cat) {
                return model.cats[cat];
            }
            return model.cats;
        },
        // Increment clicks amount
        // @param {DOMElement/Object} catEl Image DOM element
        incrementNumberOfClicks: function(catEl) {
            model.incrementClickForCat(catEl);

            view.render(catEl);

            view.setCatToMainWindow(catEl)
        },

        // Reset number of clicks
        resetAll: function() {
            let cats = model.cats;
            for (let cat in cats) {
                if(cats.hasOwnProperty(cat)) {
                    cats[cat].numberOfClicks = 0;
                }
            }
            view.render();
        },

        changeAdminStatus: function(cat) {
            model.toggleAdminStatus(cat);
        }
    };

    view = {
        getCurrentCat: function(){
            return 'cat' + this.getDomElement('.cat__container .catList__inner__container img')[0].dataset.number;
        },
        toggleClass: function(element, className) {
            if (!element || !className) {
                return;
            }

            let classString = element.className,
                nameIndex = classString.indexOf(className);
            if (nameIndex === -1) {
                classString += ' ' + className;
            } else {
                classString = classString.substr(0, (nameIndex - 1)) + classString.substr(nameIndex + className.length);
            }
            element.className = classString;
        },

        getDomElement: function(querySlector) {
            return document.querySelectorAll(querySlector);
        },

        // Update on page number of clicks
        // @param {DOMElement/Object} catEl DOMElement <img>
        render: function(catEl) {
            let cats = controller.getCats();

            if (catEl) {
                let catNumber = `cat${catEl.dataset.number}`;
                this.getDomElement(`.catListText${catEl.dataset.number}`)[0].textContent = cats[catNumber].numberOfClicks;
            } else {
                for (let cat in cats) {
                    if (cats.hasOwnProperty(cat)) {
                        this.getDomElement(`.catListText${cats[cat].srcNumber}`)[0].textContent = cats[cat].numberOfClicks
                    }

                }
            }
        },

        changeAdminInfoVisibility: function() {
            let cat = controller.getCats(this.getCurrentCat()),
                container = this.getDomElement('.adminContainer')[0];

            if (cat.adminStatus) {
                this.toggleClass(container, 'active');
            }
        },

        createDOMElement: function(tag, newClassName, content) {
            let newElement;
            
            if (tag && newClassName) {
                newElement = document.createElement(tag);
                newElement.className = newClassName;
                if (content) {
                    newElement.textContent = content;
                }
                return newElement;
            }
        },

        createAdminInfo: function(catInfo) {
            let adminContainer = this.createDOMElement('div', 'adminContainer'),
                rowName = this.createDOMElement('span', 'adminNameRow', 'Name: '),
                rowUrl = this.createDOMElement('span', 'adminUrlRow', 'Image URL: '),
                rowClicks = this.createDOMElement('span', 'adminClicksRow', '#Clicks: ');

            [rowName, rowUrl, rowClicks].forEach(function(element) {
                adminContainer.appendChild(element)
            });
            this.getDomElement('.cat__container')[0].appendChild(adminContainer);
            this.updateAdminInfo(catInfo);
            this.changeAdminInfoVisibility();
        },

        updateAdminInfo: function(catInfo) {
            let me = this;

            me.getDomElement('.adminContainer .adminNameRow')[0].appendChild(me.createDOMElement('span', 'value', catInfo.name));
            me.getDomElement('.adminContainer .adminUrlRow')[0].appendChild(me.createDOMElement('span', 'value', catInfo.url));
            me.getDomElement('.adminContainer .adminClicksRow')[0].appendChild(me.createDOMElement('span', 'value', catInfo.numberOfClicks));
        },

        cleanMainCatContainer: function() {
            this.getDomElement('.cat__container')[0].innerHTML = '';
        },



        // Create image with given `url` and `alt` text
        // @param {String} url Image source url
        // @param {String} name Text for img
        // @return {DOMElement/Object} DOM element <img>

        createImg: function(url, name) {
            let img = new Image();
            img.src = url;
            img.alt = name;
            img.className = `cat ${name}`;

            return img;
        },

        // Create DOM elements for every child in object `cats`
        // @param {Object} config with all settings
        init: function() {
            let img,
                counter = 0,
                cats = controller.getCats(),
                catListContainer = this.getDomElement('.listOfCats')[0],
                createImgContainer, createCounterForImg;

            for (let cat in cats) {
                if(cats.hasOwnProperty(cat)) {
                    counter += 1;

                    createImgContainer = this.createDOMElement('div', 'catList__inner__container');

                    createCounterForImg = this.createDOMElement('span', `catListText catListText${counter}`);


                    img = this.createImg(cats[cat].url, cats[cat].name);
                    img.dataset.number = counter.toString();

                    createImgContainer.appendChild(img);
                    createImgContainer.appendChild(createCounterForImg);
                    catListContainer.appendChild(createImgContainer);
                }
            }
        },
        setCatToMainWindow: function(catEl) {
            if (catEl) {
                let parentNode = catEl.parentElement.cloneNode(true);
                this.cleanMainCatContainer();
                this.getDomElement('.cat__container')[0].appendChild(parentNode);
                this.createAdminInfo(controller.getCats(`cat${catEl.dataset.number}`));

            } else {
                let parentNode = this.getDomElement('.catList__inner__container')[0].cloneNode(true);
                this.cleanMainCatContainer();
                this.getDomElement('.cat__container')[0].appendChild(parentNode);
                this.createAdminInfo(controller.getCats('cat1'))
            }
        }
    };

    controller.init()
})();