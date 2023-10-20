export default class Garden {
    constructor() {
        this.gardenAge = 1
        this.garden = []
    }

    initGarden() {
        // Случайный выбор количества деревьев
        let quantityTree = Math.floor(Math.random() * 10)
        let arrayOfTree = []
        
        for(let i = 0; i <= quantityTree; i++) {
            arrayOfTree.push(new Tree({id: i+1}))
        }

        this.garden = arrayOfTree
    }

    nextDay() {
        this.gardenAge++

        for(let i = 0; i < this.garden.length; i++) {

            // Когда сад достигает возраст кратности 30, то создаем новое яблоко
            if(this.gardenAge % 30 === 0) this.garden[i].newApple()
            this.garden[i].nextDay()

        }
    }

    getGarden() {
        return this.gardenAge
    }
}

class Tree {
    constructor({id}) {
        this.apples = this.initTree()
        this.id = id
    }

    initTree() {
        // Случайный выбор количества яблок на дереве
        let quantityApple = Math.floor(Math.random() * 10)
        let arrayOfApple = []
        
        for(let i = 0; i <= quantityApple; i++) {
            arrayOfApple.push(new Apple())
        }

        return arrayOfApple
    }

    nextDay() {
        for(let i = 0; i < this.apples.length; i++) {
            this.apples[i].nextDay()
            // Удаляем яблоко, когда оно сгнивает
            if(this.apples[i].isRotten) this.apples.splice(i, 1)
        }
    }

    newApple() {
        this.apples.push(new Apple({isNewApple: true}))
    }

}

class Apple {
    constructor(isNewApple) {
        this.age = isNewApple ? 0 : this.setAgeApple()
        this.color = 'Green'
        this.size = 'Big'
        this.isSpoiled = false
        this.isFallen = false
        this.isRotten = false
        this.fallenDay = 0
        this.dayRotten = 5
    }

    setAgeApple() {
        return Math.floor(Math.random() * 30) + 1
    }

    nextDay() {
        // На N дне яблоко сгнивает и мы его удаляем в классе Tree

        if(this.fallenDay === this.dayRotten) this.rottenApple()

        this.age++

        // Яблоко гниет на следующий день после падения

        if(this.isFallen && !this.isSpoiled) this.spoileApple()

        // Ведем подсчет сколько дней назад яблоко упало

        if(this.isSpoiled) this.fallenDay++

        

        // Каждое яблоко может упасть с дерева начиная с 28 дня
        // Шанс на падение яблока 50%
        // На 32 дне яблоко упадет 100%, если оно до сих пор осталось висеть на дереве

        if(
            (this.age >= 28 && !!Math.floor(Math.random() * 2)) || 
            (this.age === 32 && !this.isFallen)
        ) 
        this.fallFromTree()

    }

    spoileApple() {
        this.isSpoiled = true
    }

    fallFromTree() {
        this.isFallen = true 
    }

    rottenApple() {
        this.isRotten = true
    }
}