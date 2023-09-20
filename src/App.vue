<script>
    export default {
        data() {
            return {
                city: '',
                error: '',
                info: null
            }
        },
        computed: {
            cityName() {
                return `"${this.city}"`
            }
        },
        methods: {
            getWeather() {
                if (this.city.length < 2) {
                    this.error = 'Короткое название города!'
                    return false
                }

                this.error = ''

                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&lang=ru&appid=${import.meta.env.VITE_API_TOKEN}`)
                    .then(res => res.json())
                    .then(data => this.info = data)
            }
        },
         
    }
</script>

<template>
    <div class="card">
        <h1>Погода</h1>
        <p>{{ city === '' ? '' : cityName}}</p>
        <div>
            <input 
                type="text" 
                placeholder="Введите город"
                v-model="city"
            >
            <button @click="getWeather()" role="button">Найти</button>
        </div>
        <div v-show="info != null">
            <table>
                <tr>
                    <td>Прогноз</td>
                    <td>{{ info?.weather[0].description }}</td>
                </tr>
                <tr>
                    <td>Температура</td>
                    <td>{{ Math.round(info?.main.temp) }}&#8451;</td>
                </tr>
                <tr>
                    <td>Макс. температура</td>
                    <td>{{ Math.round(info?.main.temp_max) }}&#8451;</td>
                </tr>
                <tr>
                    <td>Мин. температура</td>
                    <td>{{ Math.round(info?.main.temp_min) }}&#8451;</td>
                </tr>
                <tr>
                    <td>Влажность</td>
                    <td>{{ info?.main.humidity }}%</td>
                </tr>
            </table>
        </div>
        <p class="error">{{ error }}</p>
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
