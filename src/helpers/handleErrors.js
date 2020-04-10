export default function carregarErroDaRequisicao(error) {
    let msg = '';

    if (error.response) {
        msg = `HTTP Status ${error.response.status}: ${error.response.data}`;
    } else if (error.request) {
        msg = `Não houve resposta à solicitação.`;
    } else {
        msg = `Ocorreu um problema durante a requisição dos dados.`;
    }

    return msg;
}