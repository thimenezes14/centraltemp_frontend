export default function carregarErroDaRequisicao(error) {
    console.log(error.response);
    let msg = '';

    if (error.response) {
        msg = `Status HTTP recebido: ${error.response.status}`;
    } else if (error.request) {
        msg = `O servidor do chuveiro não respondeu.`;
        console.log(error.request);
    } else {
        msg = `Ocorreu um problema durante a requisição dos dados.`;
        console.log('Error', error.message);
    }

    return msg;
}