const rainyDays = [];

const day=new Date()

const onSubmit = (event) => {
    event.preventDefault();
    const data=new FormData(event.target);
    const date = data.get("date");
    const mm = data.get("mm");
    console.log(day.getDate())
    rainyDays.push({date, mm});
    alert("Registro exitoso");
}