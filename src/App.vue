<template>
  <div id="app">
    <h1>Garden</h1>
    <button v-if="!garden" @click="initGarden" class="buttonGarden">Посадить сад</button>
    <div v-else>
      <p>Вашему саду {{garden.gardenAge}} дней. В саду {{garden.garden.length}} деревьев</p>

      <button @click="nextDay" class="buttonGarden">Следующий день</button>

      <p v-for="tree in garden.garden" :key="tree.id">
        У {{tree.id}} дерева {{tree.apples.length}} количество яблок:
        <ul>
          <ol v-for="apple in tree.apples" :key="apple.id">
            Возраст: {{apple.age}} дня /
            Цвет: {{apple.color}} /
            Размер: {{apple.size}} /
            {{apple.isFallen ? 'Упало' : 'Цветет на дереве'}} /
            {{apple.isSpoiled ? 'Сгнило': 'Свежее'}}
          </ol>
        </ul>
      </p>
    </div>
  </div>
</template>

<script>
import Garden from './garden'

export default {
  name: 'App',
  data() {
    return {
      garden: null
    }
  },
  methods: {
    initGarden() {
      this.garden = new Garden()
      this.garden.initGarden()
    },
    nextDay() {
      this.garden.nextDay()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.buttonGarden {
  padding: 5px 10px;
  color: #000;
  background-color: aquamarine;

}
</style>
