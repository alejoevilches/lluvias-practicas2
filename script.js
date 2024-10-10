const rainyDays = [];

const day = new Date();

let prom = 0;

// Array con los nombres de los meses
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const date = data.get("date");
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];
    const currentYear = today.getFullYear();
    if (date.split("-")[0] < currentYear) {
        Toastify({
            text: "No se pueden ingresar fechas fuera del año actual",
            duration: 3000,
            gravity: "top",
            position: 'right',
            backgroundColor: "red",
        }).showToast();
        return;
    }
    if (date >= todayDate) {
        Toastify({
            text: "No se pueden agregar fechas futuras o presentes",
            duration: 3000,
            gravity: "top",
            position: 'right',
            backgroundColor: "red",
        }).showToast();
        return;
    }
    if (rainyDays.some(day => day.date === date)) {
        Toastify({
            text: "Ya existe un registro de lluvia para esta fecha",
            duration: 3000,
            gravity: "top",
            position: 'right',
            backgroundColor: "red",
        }).showToast();
        return;
    }
    const mm = data.get("mm");
    if (mm < 0) {
        Toastify({
            text: "No se pueden registrar numeros negativos",
            duration: 3000,
            gravity: "top",
            position: 'right',
            backgroundColor: "red",
        }).showToast();
        return;
    }
    rainyDays.push({ date, mm });
    Toastify({
        text: "Registro de lluvia agregado exitosamente!",
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "#4caf50",
    }).showToast();
    updateProm();
    showData();
}

const updateProm = () => {
    const length = rainyDays.length;
    let total = 0;
    rainyDays.forEach((day) => {
        total += parseInt(day.mm);
    });
    prom = total / length;
}

const showData = () => {
    const container = document.querySelector("#prom_number");
    const worst = document.querySelector("#worst_day");
    worst.innerHTML = calculateWorstDay();
    if (rainyDays.length === 0) {
        container.innerHTML = "Ingresa un registro para conocer el promedio de lluvias";
    } else {
        container.innerHTML = `El promedio de lluvia en los días cargados es de ${(prom * 100).toFixed(0) / 100} mm`;
    }
    showMonthlyRainStats();
    showMonthsWithNoRain();
}

const calculateWorstDay = () => {
    if (rainyDays.length === 0) return "";
    let worstDay = rainyDays[0];
    rainyDays.forEach((day) => {
        if (parseInt(day.mm) > parseInt(worstDay.mm)) {
            worstDay = day;
        }
    });
    return `El peor día de lluvia fue el ${worstDay.date} con ${worstDay.mm} mm de lluvia`;
}

const showMonthlyRainStats = () => {
    if (rainyDays.length === 0) return "";

    const monthlyRain = {};

    rainyDays.forEach(day => {
        const month = day.date.split("-")[1];
        if (!monthlyRain[month]) {
            monthlyRain[month] = 0;
        }
        monthlyRain[month] += parseInt(day.mm);
    });

    let maxRainMonth = "";
    let minRainMonth = "";
    let maxRain = -Infinity;
    let minRain = Infinity;

    for (const month in monthlyRain) {
        if (monthlyRain[month] > maxRain) {
            maxRain = monthlyRain[month];
            maxRainMonth = month;
        }
        if (monthlyRain[month] < minRain) {
            minRain = monthlyRain[month];
            minRainMonth = month;
        }
    }

    const container = document.querySelector("#prom_number");
    container.innerHTML += `<br>El mes con más lluvia fue ${monthNames[parseInt(maxRainMonth) - 1]} con ${maxRain} mm<br>El mes con menos lluvia fue ${monthNames[parseInt(minRainMonth) - 1]} con ${minRain} mm`;
}

const showMonthsWithNoRain = () => {
    if (rainyDays.length === 0) return "";

    const monthsWithRain = new Set(rainyDays.map(day => day.date.split("-")[1]));

    const allMonths = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
    const monthsWithoutRain = allMonths.filter(month => !monthsWithRain.has(month));

    const container = document.querySelector("#prom_number");
    if (monthsWithoutRain.length > 0) {
        const monthsWithoutRainNames = monthsWithoutRain.map(month => monthNames[parseInt(month) - 1]);
        container.innerHTML += `<br>Los meses sin lluvia hasta ahora son: ${monthsWithoutRainNames.join(", ")}`;
    } else {
        container.innerHTML += `<br>No hubo meses sin lluvia hasta ahora.`;
    }
}

document.addEventListener("DOMContentLoaded", showData);