export default function carregarErroDaRequisicao(error) {
    let msg = '';

    if (error.response) {
        msg = `Status HTTP recebido: ${error.response.status}`;
    } else if (error.request) {
        msg = `Não houve resposta à solicitação.`;
    } else {
        msg = `Ocorreu um problema durante a requisição dos dados.`;
    }

    return msg;
}