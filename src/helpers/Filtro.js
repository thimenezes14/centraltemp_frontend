import moment from 'moment';

export default class Filtro {
    dados = [];
    filtro = [];
    constructor(dados) {
        this.dados = dados;
    }
}

Filtro.prototype.getDados = function() {
    return this.dados;
}

Filtro.prototype.setDados = function(dados) {
    this.dados = dados;
}

Filtro.prototype.limparFiltros = function() {
    this.filtro = [];
    return this.dados;
}

Filtro.prototype.aplicarFiltros = function(datas, classificacao, duracao) {
    if(datas && Array.isArray(datas)) {
        this.filtrarPorData(datas[0], datas[1]);
    }
    if(!isNaN(classificacao)) {
        this.filtrarPorClassificacao(classificacao);
    }
    if(!isNaN(duracao)) {
        this.filtrarPorDuracao(duracao);
    }

    return this.filtro;
}

Filtro.prototype.filtrarPorData = function(inicio, fim) {
    let data_inicial, data_final;
    
    if(!Date.parse(inicio)) {
        inicio = moment().startOf('year').format('YYYY-MM-DD');
    }
    if(!Date.parse(fim)) {
        fim = moment().endOf('year').format('YYYY-MM-DD');
    }

    data_inicial = moment(inicio, 'YYYY-MM-DD');
    data_final = moment(fim, 'YYYY-MM-DD');

    if(data_final.isBefore(data_inicial)) {
        let aux = data_inicial;
        data_inicial = data_final;
        data_final = aux;
    }

    if(data_final.diff(data_inicial, 'years', true) > 1) {
        data_final = moment(data_inicial).add(1, 'years');
    }

    const registros = this.dados.filter(f => {
        let data_registro = moment(f.dia, 'DD/MM/YYYY');
        return data_registro.isBetween(data_inicial, data_final, null, '[]')
    });
    
    this.filtro = registros;
}

Filtro.prototype.filtrarPorClassificacao = function(classificacao) {
    switch (classificacao) {
        case 0:
            break;
        case 1:
        case 2:
        case 3:
        case 4:
            this.filtro = this.filtro.filter(f => f.classificacao_temperatura === classificacao);
            break;
        case 5:
            this.filtro = this.filtro.filter(f => f.classificacao_temperatura === 1 || f.classificacao_temperatura === 2);
            break;
        case 6:
            this.filtro = this.filtro.filter(f => f.classificacao_temperatura === 3 || f.classificacao_temperatura === 4);
            break;
        default:
            break;
    }
}

Filtro.prototype.filtrarPorDuracao = function(duracao) {
    switch (duracao) {
        case 0:
            break;
        case 1:
        case 2:
        case 3:
            this.filtro = this.filtro.filter(f => f.classificacao_duracao === duracao);
            break;
        case 4:
            this.filtro = this.filtro.filter(f => f.classificacao_duracao === 1 || f.classificacao_duracao === 2);
            break;
        default:
            break;
    }
}
