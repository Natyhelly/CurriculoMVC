//document.addEventListener('DOMContentLoaded', function () {
//    numeral.register('locales', 'pt-br');
//});

function alteraTextPaginaTab(text) {
    document.getElementById('textPaginaTab').innerText = text;
}

function mensagemNaFoto(mensagem) {
    alert(mensagem);
}

function calcular(operador, valor1, valor2) {
    if (operador == '/' && (valor1 == 0 || valor2 == 0)) {
        var resultado = 'Juvenil';
        return resultado;
    }
    if (operador == '+')
        var resultado = valor1 + valor2;
    else {
        if (operador == '-')
            var resultado = valor1 - valor2;
        else {
            if (operador == '*') {
                if (valor1.toString().substring(0, 2) == '0.' && valor2.toString().substring(0, 2) == '0.')
                    var resultado = (valor1 * valor2).toFixed(valor1.toString().length - 2 + valor2.toString().length - 2);
                else
                    var resultado = (valor1 * valor2);
            } else
                var resultado = (valor1 / valor2)/*.toPrecision(13)*/;
        }
    }
    return resultado.toString().replace('.', ',');
}

function montarCalculo(valor, tipo) { // Fun��o para montar o c�lculo na tab calculadora.
    var visor = document.getElementById('visor').innerText;
    var primeiroNumero = document.getElementById('primeiroNumero').innerText;
    var segundoNumero = document.getElementById('segundoNumero').innerText;
    var operador = document.getElementById('operador').innerText;
    var resultadoCalcular = '';
    var total = document.getElementById('total').innerText;

    if (valor == 'C') {  // Limpa o visor e todos os campos escondidos.
        document.getElementById('visor').innerText = '0';
        document.getElementById('primeiroNumero').innerText = '';
        document.getElementById('segundoNumero').innerText = '';
        document.getElementById('operador').innerText = '';
        document.getElementById('total').innerText = '';
        return;
    }
    if (valor == '<-') {
        if (primeiroNumero == '')
            return;
        if (visor == 'Juvenil') {
            montarCalculo('C', 'operador');
            return;
        }
        if (operador == '') {
            if (primeiroNumero != '0' && primeiroNumero.length > 1) {
                document.getElementById('visor').innerText = visor.substring(0, visor.length - 1);
                document.getElementById('primeiroNumero').innerText = visor.substring(0, visor.length - 1);
            } else {
                document.getElementById('visor').innerText = '0';
                document.getElementById('primeiroNumero').innerText = '';
                document.getElementById('total').innerText = '';
            }
        } else {
            if (segundoNumero != '0' && segundoNumero.length > 1) {
                document.getElementById('visor').innerText = visor.substring(0, visor.length - 1);
                document.getElementById('segundoNumero').innerText = segundoNumero.substring(0, segundoNumero.length - 1);
            } else if (segundoNumero == '' && operador != '') {
                document.getElementById('visor').innerText = visor.substring(0, visor.length - 1);
                document.getElementById('operador').innerText = '';
            } else {
                document.getElementById('visor').innerText = primeiroNumero + operador;
                document.getElementById('segundoNumero').innerText = '';
            }
        }
        return;
    }
    if (primeiroNumero == '') { // Adiciona o primeiro n�mero se n�o for 0.
        if (tipo == 'numero' && valor != '0' && valor != ',') {
            document.getElementById('primeiroNumero').innerText = valor;
            document.getElementById('visor').innerText = valor;
        } else if (valor == ',') {
            document.getElementById('primeiroNumero').innerText = '0' + valor;
            document.getElementById('visor').innerText = '0' + valor;
        } else if (valor != '=' && valor != '0') {
            document.getElementById('primeiroNumero').innerText = '0';
            document.getElementById('operador').innerText = valor;
            document.getElementById('visor').innerText += valor;
        }
        return;
    }
    if (operador == '') { // Acrescenta outro n�mero se o operador e o total estiver vazio.
        if (tipo == 'numero') {
            if (total == '') { // Se n�o � pra reiniciar ainda...
                if ((valor == ',' && primeiroNumero.indexOf(',') == -1) || valor != ',') { // ... e j� tiver v�rgula, n�o p�e outra.
                    if (primeiroNumero.length >= 14)
                        return;
                    document.getElementById('primeiroNumero').innerText += valor;
                    document.getElementById('visor').innerText += valor;
                }
                return;
            } else { // Se pode reiniciar, substitui pelo novo n�mero (reinicializando a conta).
                document.getElementById('total').innerText = '';
                if (valor == ',') {
                    document.getElementById('primeiroNumero').innerText = 0 + valor;
                    document.getElementById('visor').innerText = 0 + valor;
                } else {
                    document.getElementById('primeiroNumero').innerText = valor;
                    document.getElementById('visor').innerText = valor;
                }
                return;
            }
        } else { // Se for operador, acrescenta ele no visor.
            if (valor !== '=') {
                document.getElementById('operador').innerText = valor;
                document.getElementById('visor').innerText += valor;
                return;
            }
        }
    } else { // Se j� tiver operador
        if (tipo == 'numero') {
            if ((segundoNumero == '' && valor != ',') || segundoNumero != '') {
                if (!(segundoNumero == '0' && valor == '0')) { // N�o adiciona mais de 1 zero.
                    if (segundoNumero == '0' && valor != ',') { // Substitui o zero por outro n�mero na primeira casa do segundoNumero.
                        document.getElementById('segundoNumero').innerText = valor;
                        document.getElementById('visor').innerText = valor;
                    } else {
                        if ((valor == ',' && segundoNumero.indexOf(',') == -1) || valor != ',') { // se j� tiver v�rgula, n�o p�e outra ou p�e n�meros.
                            document.getElementById('segundoNumero').innerText += valor;
                            document.getElementById('visor').innerText += valor;
                        }
                    }
                }
            } else {
                // ... ou adiciona "0," na primeira casa.
                document.getElementById('segundoNumero').innerText += 0 + valor;
                document.getElementById('visor').innerText += 0 + valor;
            }
            return;
        }
        if (segundoNumero == '') { // Se j� tiver operador e vier outro operador, substitui o mesmo.
            if (valor == '=') {
                resultadoCalcular = calcular(operador, parseFloat(primeiroNumero.replace(',', '.')), parseFloat(primeiroNumero.replace(',', '.')));
                document.getElementById('primeiroNumero').innerText = resultadoCalcular;
                document.getElementById('visor').innerText = resultadoCalcular;
                document.getElementById('operador').innerText = '';
                document.getElementById('total').innerText = resultadoCalcular;
            } else {
                document.getElementById('operador').innerText = valor;
                document.getElementById('visor').innerText = visor.substring(0, visor.length - 1) + valor;
            }
        } else { // Se j� tiver o segundo n�mero, mostra o resultado e limpa o segundo n�mero.
            resultadoCalcular = calcular(operador, parseFloat(primeiroNumero.replace(',', '.')), parseFloat(segundoNumero.replace(',', '.')));
            document.getElementById('primeiroNumero').innerText = resultadoCalcular;
            document.getElementById('segundoNumero').innerText = '';
            if (valor == '=') { // Se for o sinal de = , calcula a conta e limpa o operador.
                document.getElementById('visor').innerText = resultadoCalcular;
                document.getElementById('operador').innerText = '';
                document.getElementById('total').innerText = resultadoCalcular;
            } else { // Se n�o, mostra o resultado + o novo operador.
                document.getElementById('visor').innerText = resultadoCalcular + valor;
                document.getElementById('operador').innerText = valor;
            }
        }
    }
}

document.addEventListener("keydown", function pressionarTecla(tecla) {
    if (event.defaultPrevented)
        return; // Do nothing if the event was already processed

    switch (tecla.key) {
        case 'Enter':
            document.querySelector("#botao-igual").click();
            document.querySelector("#botao-igual").style.backgroundColor = 'gray';
            break;
        case 'Escape':
            document.querySelector("#botao-reset").click();
            document.querySelector("#botao-reset").style.backgroundColor = 'gray';
            break;
        case 'Backspace':
            document.querySelector("#botao-backspace").click();
            document.querySelector("#botao-backspace").style.backgroundColor = 'gray';
            break;
        case '/':
            document.querySelector("#botao-dividir").click();
            document.querySelector("#botao-dividir").style.backgroundColor = 'gray';
            break;
        case '*':
            document.querySelector("#botao-vezes").click();
            document.querySelector("#botao-vezes").style.backgroundColor = 'gray';
            break;
        case '-':
            document.querySelector("#botao-menos").click();
            document.querySelector("#botao-menos").style.backgroundColor = 'gray';
            break;
        case '+':
            document.querySelector("#botao-mais").click();
            document.querySelector("#botao-mais").style.backgroundColor = 'gray';
            break;
        case ',':
            document.querySelector("#botao-decimal").click();
            document.querySelector("#botao-decimal").style.backgroundColor = 'gray';
            break;
        case '0':
            document.querySelector("#botao-0").click();
            document.querySelector("#botao-0").style.backgroundColor = 'gray';
            break;
        case '1':
            document.querySelector("#botao-1").click();
            document.querySelector("#botao-1").style.backgroundColor = 'gray';
            break;
        case '2':
            document.querySelector("#botao-2").click();
            document.querySelector("#botao-2").style.backgroundColor = 'gray';
            break;
        case '3':
            document.querySelector("#botao-3").click();
            document.querySelector("#botao-3").style.backgroundColor = 'gray';
            break;
        case '4':
            document.querySelector("#botao-4").click();
            document.querySelector("#botao-4").style.backgroundColor = 'gray';
            break;
        case '5':
            document.querySelector("#botao-5").click();
            document.querySelector("#botao-5").style.backgroundColor = 'gray';
            break;
        case '6':
            document.querySelector("#botao-6").click();
            document.querySelector("#botao-6").style.backgroundColor = 'gray';
            break;
        case '7':
            document.querySelector("#botao-7").click();
            document.querySelector("#botao-7").style.backgroundColor = 'gray';
            break;
        case '8':
            document.querySelector("#botao-8").click();
            document.querySelector("#botao-8").style.backgroundColor = 'gray';
            break;
        case '9':
            document.querySelector("#botao-9").click();
            document.querySelector("#botao-9").style.backgroundColor = 'gray';
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
});
document.addEventListener("keyup", function pressionarTecla(tecla) {
    if (event.defaultPrevented)
        return; // Do nothing if the event was already processed

    switch (tecla.key) {
        case 'Enter':
            document.querySelector("#botao-igual").style.backgroundColor = 'white';
            break;
        case 'Escape':
            document.querySelector("#botao-reset").style.backgroundColor = 'white';
            break;
        case 'Backspace':
            document.querySelector("#botao-backspace").style.backgroundColor = 'white';
            break;
        case '/':
            document.querySelector("#botao-dividir").style.backgroundColor = 'white';
            break;
        case '*':
            document.querySelector("#botao-vezes").style.backgroundColor = 'white';
            break;
        case '-':
            document.querySelector("#botao-menos").style.backgroundColor = 'white';
            break;
        case '+':
            document.querySelector("#botao-mais").style.backgroundColor = 'white';
            break;
        case ',':
            document.querySelector("#botao-decimal").style.backgroundColor = 'white';
            break;
        case '0':
            document.querySelector("#botao-0").style.backgroundColor = 'white';
            break;
        case '1':
            document.querySelector("#botao-1").style.backgroundColor = 'white';
            break;
        case '2':
            document.querySelector("#botao-2").style.backgroundColor = 'white';
            break;
        case '3':
            document.querySelector("#botao-3").style.backgroundColor = 'white';
            break;
        case '4':
            document.querySelector("#botao-4").style.backgroundColor = 'white';
            break;
        case '5':
            document.querySelector("#botao-5").style.backgroundColor = 'white';
            break;
        case '6':
            document.querySelector("#botao-6").style.backgroundColor = 'white';
            break;
        case '7':
            document.querySelector("#botao-7").style.backgroundColor = 'white';
            break;
        case '8':
            document.querySelector("#botao-8").style.backgroundColor = 'white';
            break;
        case '9':
            document.querySelector("#botao-9").style.backgroundColor = 'white';
            break;
        default:
            return;
    }
});

function jogoDaVelha(casa) {
    var proximoValor = document.querySelector('#proximoValor').value;

    //busca conte�do da casa
    var conteudoCasa = document.getElementById(casa).innerText;
    var casaBloqueada = document.getElementById(casa).getAttribute('disabled') == 'disabled';

    //valida conteudo da casa 
    if (conteudoCasa == '' && !casaBloqueada) {
        document.querySelector('#casasPreenchidas').value += 1;
        document.getElementById(casa).innerText = proximoValor;

        if (proximoValor == 'X')
            document.querySelector('#proximoValor').value = 'O';
        else
            document.querySelector('#proximoValor').value = 'X';

        document.querySelector('#' + casa).setAttribute('disabled', 'disabled');

    }

    var casa1 = document.getElementById('casa-1').innerText;
    var casa2 = document.getElementById('casa-2').innerText;
    var casa3 = document.getElementById('casa-3').innerText;
    var casa4 = document.getElementById('casa-4').innerText;
    var casa5 = document.getElementById('casa-5').innerText;
    var casa6 = document.getElementById('casa-6').innerText;
    var casa7 = document.getElementById('casa-7').innerText;
    var casa8 = document.getElementById('casa-8').innerText; 
    var casa9 = document.getElementById('casa-9').innerText;

    if (casa1 == 'X' && casa2 == 'X' && casa3 == 'X')
        vencedor('X', '1', '2', '3');
    else if (casa4 == 'X' && casa5 == 'X' && casa6 == 'X')
        vencedor('X', '4', '5', '6');
    else if (casa7 == 'X' && casa8 == 'X' && casa9 == 'X')
        vencedor('X', '7', '8', '9');
    else if (casa1 == 'X' && casa4 == 'X' && casa7 == 'X')
        vencedor('X', '1', '4', '7');
    else if (casa2 == 'X' && casa5 == 'X' && casa8 == 'X')
        vencedor('X', '2', '5', '8');
    else if (casa3 == 'X' && casa6 == 'X' && casa9 == 'X')
        vencedor('X', '3', '6', '9');
    else if (casa1 == 'X' && casa5 == 'X' && casa9 == 'X')
        vencedor('X', '1', '5', '9');
    else if (casa3 == 'X' && casa5 == 'X' && casa7 == 'X')
        vencedor('X', '3', '5', '7');
    else if (casa1 == 'O' && casa2 == 'O' && casa3 == 'O')
        vencedor('O', '1', '2', '3');
    else if (casa4 == 'O' && casa5 == 'O' && casa6 == 'O')
        vencedor('O', '4', '5', '6');
    else if (casa7 == 'O' && casa8 == 'O' && casa9 == 'O')
        vencedor('O', '7', '8', '9');
    else if (casa1 == 'O' && casa4 == 'O' && casa7 == 'O')
        vencedor('O', '1', '4', '7');
    else if (casa2 == 'O' && casa5 == 'O' && casa8 == 'O')
        vencedor('O', '2', '5', '8');
    else if (casa3 == 'O' && casa6 == 'O' && casa9 == 'O')
        vencedor('O', '3', '6', '9');
    else if (casa1 == 'O' && casa5 == 'O' && casa9 == 'O')
        vencedor('O', '1', '5', '9');
    else if (casa3 == 'O' && casa5 == 'O' && casa7 == 'O')
        vencedor('O', '3', '5', '7');
    else if (document.querySelector('#casasPreenchidas').value.length == 9)
        vencedor('');
    return;
}

function reiniciarJogo() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById('casa-' + i.toString()).innerText = '';
        document.querySelector('#casa-' + i.toString()).removeAttribute('disabled');
        document.getElementById('casa-' + i).style.backgroundColor = '';
    }
    document.querySelector('#proximoValor').value = 'X';
    document.querySelector('#casasPreenchidas').value = '';
    document.getElementById('msg-vencedor').innerText = '';
}

function vencedor(jogador, casa1, casa2, casa3) {
    if (jogador == 'X' || jogador == 'O') {
        document.querySelector('#msg-vencedor').innerText = jogador + ' ganhou!!';

        for (let i = 1; i <= 9; i++) {
            document.querySelector('#casa-' + i).setAttribute('disabled', 'disabled');
            if (i == casa1 || i == casa2 || i == casa3)
                document.getElementById('casa-' + i).style.backgroundColor = '#E793F4';
        }
    } else
        document.getElementById('msg-vencedor').innerText = 'Game over :(';
}

function validaCamposFormulario(nome, genero, spotify, cadastro) {
    if (nome == '' || genero == '' || spotify == '' || cadastro == '') {
        alert('Preencha todos os campos para salvar');
        return false;
    }
    var padraoData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    if (!padraoData.test(cadastro)) {
        alert("Digite a data no formato dd/mm/aaaa");
        return false;
    }
    return true;
}

function proximoRegistro() {
    var proximoId = 0;
    var registrosId = document.getElementsByClassName('registros');

    for (let i = 0; i < registrosId.length; i++) {
        if (proximoId < parseInt(registrosId[i].id))
            proximoId = parseInt(registrosId[i].id);
    }
    return (proximoId + 1).toString();
}

function gravarDados() {
    var proximoId = proximoRegistro();

    var generoSelecionado = document.getElementById('generoMusica');
    var radioSelecionado = document.querySelector('input[name="spotify"]:checked');

    var idMusica = document.getElementById('idMusica').value;
    var nomeMusica = document.getElementById('nomeMusica').value;
    var generoMusica = generoSelecionado.options[generoSelecionado.selectedIndex].value;
    var spotifySelecionado = radioSelecionado != null ? radioSelecionado.value : '';
    var dataCadastro = document.getElementById('dataCadastro').value;

    if (!validaCamposFormulario(nomeMusica, generoMusica, spotifySelecionado, dataCadastro)) {
        return;
    }
    var idTr = idMusica != '' ? idMusica : proximoId;
    var novaTr = '<tr id="' + idTr + '" class="registros"> \
                            <td>' + nomeMusica + '</td> \
                            <td>' + generoMusica + '</td> \
                            <td>' + spotifySelecionado + '</td> \
                            <td>' + dataCadastro + '</td> \
                            <td style="display: flex; justify-content: space-around; height: 41px; align-items:center"> \
                                <img onclick="editarLinha('+ idTr + ')" src="lib/bootstrap/dist/icons/pen.svg" alt="Bootstrap" width="16" height="16" style="cursor: pointer"> \
                                <img onclick="deletarLinha('+ idTr + ')" src="lib/bootstrap/dist/icons/trash3.svg" alt="Bootstrap" width="16" height="16" style="cursor: pointer"> \
                            </td> \
                        </tr>';

    if (document.getElementById('idMusica').value == '')
        document.getElementById('bodyTabela').innerHTML += novaTr;
    else
        document.getElementById(idTr).innerHTML = novaTr;

    apagarDados();
}

function deletarLinha(id) {
    document.getElementById(id).remove();
}

function editarLinha(id) {
    document.getElementById('idMusica').value = id;
    var tr = document.getElementById(id);

    document.getElementById('nomeMusica').value = tr.children[0].innerHTML;

    const dropDown = document.getElementById('generoMusica');
    document.getElementById('generoMusica').selectedIndex = [...dropDown.options].findIndex(option => option.text === tr.children[1].innerHTML);

    document.getElementById('spoti-' + tr.children[2].innerHTML).checked = true;

    document.getElementById('dataCadastro').value = tr.children[3].innerHTML;
}

function apagarDados() {
    var radioSelecionado = document.querySelector('input[name="spotify"]:checked');
    document.getElementById('idMusica').value = '';

    document.getElementById('nomeMusica').value = '';
    document.getElementById('generoMusica').selectedIndex = 0;
    if (radioSelecionado != null) radioSelecionado.checked = false;
    document.getElementById('dataCadastro').value = '';
}