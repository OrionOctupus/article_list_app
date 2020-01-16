class Developer {
    constructor(name, lastname){
        this.name = name;
        this.lastname = lastname;
    }

    getName() {
        return this.name + ' ' + this.lastname;
    }
}

const dev = new Developer('Ron', 'Uizlu');