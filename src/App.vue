<script setup>
import { computed, ref } from 'vue';
import getWeather from './getWeather'

let weatherRef = ref({
    city: '',
    error: '',
    info: null
})

let cityName = computed(() => {
    return `'${weatherRef.value.city}'`
})
</script>

<template>
    <div class="card">
        <h1>Погода</h1>
        <p>{{ weatherRef.city === '' ? '' : cityName}}</p>
        <div>
            <input 
                type="text" 
                placeholder="Введите город"
                v-model="weatherRef.city"
                @keyup.enter="getWeather(weatherRef)"
            >
            <button @click="getWeather(weatherRef)" role="button">Найти</button>
        </div>
        <div v-show="weatherRef.info != null">
            <table>
                <tr>
                    <td>Прогноз</td>
                    <td>{{ weatherRef.info?.weather[0].description }}</td>
                </tr>
                <tr>
                    <td>Температура</td>
                    <td>{{ Math.round(weatherRef.info?.main.temp) }}&#8451;</td>
                </tr>
                <tr>
                    <td>Макс. температура</td>
                    <td>{{ Math.round(weatherRef.info?.main.temp_max) }}&#8451;</td>
                </tr>
                <tr>
                    <td>Мин. температура</td>
                    <td>{{ Math.round(weatherRef.info?.main.temp_min) }}&#8451;</td>
                </tr>
                <tr>
                    <td>Влажность</td>
                    <td>{{ weatherRef.info?.main.humidity }}%</td>
                </tr>
            </table>
        </div>
        <p class="error">{{ weatherRef.error }}</p>
    </div>
</template>

<style scoped>
    .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        width: 800px;
        height: 500px;
        padding: 0 20%;
        border-radius: 30px;
        text-align: center;
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
    }

    button {
        background-color: #fff000;
        border-radius: 12px;
        color: #000;
        cursor: pointer;
        font-weight: bold;
        padding: 10px 15px;
        margin-left: 20px;
        text-align: center;
        transition: 200ms;
        box-sizing: border-box;
        border: 0;
        font-size: 16px;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    button:not(:disabled):hover,
    button:not(:disabled):focus {
        outline: 0;
        background: #f4e603;
        box-shadow: 0 0 0 2px rgba(0,0,0,.2), 0 3px 8px 0 rgba(0,0,0,.15);
    }

    button:disabled {
        filter: saturate(0.2) opacity(0.5);
        -webkit-filter: saturate(0.2) opacity(0.5);
        cursor: not-allowed;
    }

    input {
        padding: 10px 15px;
    }

    table {
        width: 100%;
        margin-bottom: 20px;
        border: 1px solid #dddddd;
        border-collapse: collapse;
    }

    table th {
        font-weight: bold;
        padding: 5px;
        background: #efefef;
        border: 1px solid #dddddd; 
    }

    table td {
        border: 1px solid #dddddd;
        padding: 5px;
    }

    .error {
        color: red;
        font-size: 24px;
    }
</style>
