const rainyDays = [];

const day=new Date()

let prom = 0;

const onSubmit = (event) => {
    event.preventDefault();
    const data=new FormData(event.target);
    const date = data.get("date");
    const mm = data.get("mm");
    rainyDays.push({date, mm});
    alert("Registro exitoso");
    updateProm();
    showProm()
}

const updateProm = () => {
    const length = rainyDays.length;
    let total = 0;
    rainyDays.forEach((day) => {
        total += parseInt(day.mm);
    })
    prom = total / length;
}

const showProm = () => {
    const container = document.querySelector("#prom_number");
    console.log(container);
    if (rainyDays.length === 0) {
        container.innerHTML = "Ingresa un registro para conocer el promedio de lluvias";
    } else {
        container.innerHTML = `El promedio de lluvia en los dias cargados es de ${(prom * 100).toFixed(0) / 100}`;
    }
}

document.addEventListener("DOMContentLoaded", showProm);