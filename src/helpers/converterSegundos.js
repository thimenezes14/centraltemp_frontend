function pad(num) {
    return ("0" + num).slice(-2);
}

export default function converteParaHoraMinutoSegundo(segundos) {
    let minutos = Math.floor(segundos / 60);
    segundos = segundos % 60;
    let horas = Math.floor(minutos / 60);
    minutos = minutos % 60;

    if(horas === 0) {
        horas = ''
    } else {
        horas += 'h'
    }

    return `${horas}${pad(minutos)}m${pad(segundos)}s`;
}