export class HandstandSelector extends HandstandConfigurableElement {
    get template() {
        return `<select></select>`;
    }
    get selectedChoice() {
        if (this.choices)
        return this.choices.find((choice) => {
            if (choice.selected)
                return choice;
        });
    }
    constructor(attributes, options) {
        super(attributes);
        if (options) {
            if (options.events) {
                if (typeof options.events.onChoiceAdded === 'function')
                    this.onChoiceAdded = options.events.onChoiceAdded;
                if (typeof options.events.onChoiceRemoved === 'function')
                    this.onChoiceRemoved = options.events.onChoiceRemoved;
                if (typeof options.events.onChoiceSelected === 'function')
                    this.onChoiceSelected = options.events.onChoiceSelected;
                if (typeof options.events.onChoiceCleared === 'function')
                    this.onChoiceCleared = options.events.onChoiceCleared;
            }
            if (options.choices) {
                this._choices = options.choices;
            }
        }
    }
    configureMonitoring() {
        return null;
    }
    configureTwoway() {
        return null;
    }
    onRender() {
        let selector = this, select = this.childNodes[0];
        selector.choices = [];
        for(let choice in selector._choices) {
            selector.addChoice(selector._choices[choice]);
        }
        delete selector._choices;
        if (selector && select) {
            if (!selector.listening) {
                select.addEventListener('change', () => {
                    selector.selectChoice(
                        select.selectedOptions[0].innerText);
                });
                selector.listening = true;
            }
            if (selector.getAttribute('placeholder') !== null)
                select.setAttribute('placeholder',
                    selector.getAttribute('placeholder'));
        }
    }
    addChoice(term) {
        let choice;
        if (typeof term === 'string') {
            choice = {
                template: term
            };
        } else if (typeof term === 'object' && term.template !== undefined) {
            choice = term;
        }
        if (choice && choice.template !== undefined && this.choices) {
            let optionEl = document.createElement('option');
            optionEl.innerHTML = choice.template;
            if (choice.value) optionEl.setAttribute('value', choice.value);
            if (choice.selected === true && 
                this.selectedChoice === undefined) optionEl.setAttribute('selected', '');
            if (this.childNodes[0]) this.childNodes[0].append(optionEl);
            this.choices.push(choice);
            if (this.onChoiceAdded) this.onChoiceAdded.call(this);
        }
        return this;
    }
    removeChoice(term) {
        if (typeof term === 'string' && this.choices) {
            this.choices.filter((choice) => {
                if (choice.template === term) {
                    this.children.item(0)
                        .children.item(this.choices.indexOf(choice))
                        .remove();
                    this.choices.splice(this.choices.indexOf(choice), 1);
                }
            });
        } else if (typeof term === 'object') {
            this.children.item(0)
                .children.item(this.choices.indexOf(term))
                .remove();
            this.choices.splice(this.choices.indexOf(term), 1);
        }
        if (this.onChoiceRemoved) this.onChoiceRemoved.call(this);
        return this;
    }
    selectChoice(term) {
        if (term === null) {
            for (let index in this.choices) {
                delete this.choices[index].selected;
            }
            if (this.onChoiceCleared) this.onChoiceCleared.call(this);
        } else if (term) {
            for(let index in this.choices) {
                let choice = this.choices[index];
                if (choice === term || 
                    choice.value === term || 
                    choice.template === term) {
                    this.childNodes[0].childNodes[index].setAttribute('selected', '');
                    choice.selected = true;
                    if (this.onChoiceSelected) this.onChoiceSelected.call(this, choice);
                } else {
                    delete choice.selected;
                    this.childNodes[0].childNodes[index].removeAttribute('selected');
                }
            }
        }
        return this;
    }
}
HandstandConfigurableElement.tag('handstand-selector', HandstandSelector);
module.exports = HandstandSelector;