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
}

const updateProm = () => {
    const length = rainyDays.length;
    let total = 0;
    rainyDays.forEach((day) => {
        total += parseInt(day.mm);
    })
    prom = total / length;
    document.getElementById("prom_number").innerText = prom;
}