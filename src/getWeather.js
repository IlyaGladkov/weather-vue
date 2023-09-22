const getWeather = (ref) => {
    if (ref.city.length < 2) {
        ref.error = 'Короткое название города!'
        return false
    }

    ref.error = ''

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ref.city}&units=metric&lang=ru&appid=${import.meta.env.VITE_API_TOKEN}`)
        .then(res => res.json())
        .then(data => ref.info = data)
}

export default getWeather