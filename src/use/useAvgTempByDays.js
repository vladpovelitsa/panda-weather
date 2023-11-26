export function useAvgTempByDays(data) {
    const dataByDays = []
    data.map((item) => {
        let existedDateIndex = dataByDays.findIndex(day => day?.date === item.dt_txt.split(' ')[0])

        if (existedDateIndex >= 0) {
            dataByDays[existedDateIndex].temps.push(item.main.temp)
        } else {
            dataByDays.push(
                {
                    date: item.dt_txt.split(' ')[0],
                    temps: [item.main.temp]
                }
            )
        }
    })

    return dataByDays.map(day => ({
        date: day.date,
        avg_temp: Math.round(day.temps.reduce((acc, item) => acc + item) / day.temps.length)
    }))
}
