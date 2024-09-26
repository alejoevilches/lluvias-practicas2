const rainyDays = [];

const day = new Date();

let prom = 0;

const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const date = new Date(data.get("date")).toLocaleDateString("en-GB");
    if (new Date(date) > day) {
        Toastify({
            text: "No se pueden agregar fechas futuras",
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
}

const calculateWorstDay = () => {
    if (rainyDays.length === 0) return "";
    let worstDay = rainyDays[0];
    rainyDays.forEach((day) => {
        if (parseInt(day.mm) > parseInt(worstDay.mm)) {
            worstDay = day;
        }
    });
    return `El peor dia de lluvia fue el ${worstDay.date} con ${worstDay.mm} mm de lluvia`;
}

document.addEventListener("DOMContentLoaded", showData);