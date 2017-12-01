class dom {
    static create(tag, classes, attributes, content) {
        let elem = document.createElement(tag);
        elem.className = classes;
        for (let attribute in attributes) {
            elem.setAttribute(attribute, attributes[attribute]);
        }
        if (content) {
            if (content instanceof HTMLElement) {
                elem.appendChild(content);
            } else {
                elem.innerHTML = content;
            }
        }
        return elem;
    }

    static queryAll(selector, context) {
        context = context instanceof HTMLElement ? context : document;
        return Array.prototype.slice.call((context || document).querySelectorAll(selector))
    }

    static query(selector, context) {
        let ret = dom.queryAll(selector, context);
        return ret.length > 0 ? ret[0] : null;
    }

    static matches(context) {
        let matches = context.matches || context.matchesSelector || context.mozMatchesSelector || context.msMatchesSelector || context.oMatchesSelector || context.webkitMatchesSelector || null
        return matches ? matches.bind(context) : matches;
    }

    static findAncestor(context, selector, includeSelf = false) {
        if (includeSelf && dom.matches(context)(selector)) {
            console.log('returning self');
            return context;
        } else {
            context = context.parentNode;
        }
        let traverse = true;

        console.log('traversing');
        while (traverse && !(dom.matches(context)(selector)) && context !== document) {
            console.log('...traversing');
            context = context.parentNode;
            traverse = !!dom.matches(context);
        }
        return traverse ? context : null;
    }


    static getClassList(elem) {
        return elem.className.split(' ');
    }

    static setClassList(elem, classList) {
        if (!Array.isArray(classList)) throw new Error('setClassList requires classList to be an Array');
        elem.className = classList.join(' ');
    }

    static removeClass(elem, classNames) {
        classNames = classNames.split(' ');
        dom.setClassList(elem, dom.getClassList(elem).filter(cls => !~classNames.indexOf(cls)));
    }

    static addClass(elem, classNames) {
        classNames = classNames.split(' ');
        dom.setClassList(elem, dom.getClassList(elem).filter(cls => !~classNames.indexOf(cls)).concat(classNames));
    }

    static hasClass(elem, className) {
        if (!elem) {
            return false;
        }

        return dom.getClassList(elem).indexOf(className) >=0;
    }

    static toggleClass(elem, classNames) {
        classNames = classNames.split(' ');
        classNames.forEach(cls => {
            this[dom.hasClass(elem, cls) ? 'removeClass' : 'addClass'](elem, cls);
        });
    }
};

dom.$$ = dom.queryAll;
dom.$ = dom.query;


// module.exports = dom;
