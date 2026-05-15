const SUPABASE_URL = "https://qfgwjbbuyvhfybcgjaob.supabase.co";

const SUPABASE_KEY = "sb_publishable_-7_71TIuTrEfatOjdFBQSw_quupslQE";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let numeroPedido = "";

document.getElementById("numeroPedido").innerText =
numeroPedido;

function calcularTotal(){

const qtd1 =
parseFloat(document.getElementById("qtd1").value) || 0;

const valor1 =
parseFloat(document.getElementById("valor1").value) || 0;

const subtotal1 =
qtd1 * valor1;

document.getElementById("total1").value =
subtotal1.toFixed(2);

const qtd2 =
parseFloat(document.getElementById("qtd2").value) || 0;

const valor2 =
parseFloat(document.getElementById("valor2").value) || 0;

const subtotal2 =
qtd2 * valor2;

document.getElementById("total2").value =
subtotal2.toFixed(2);

const qtd3 =
parseFloat(document.getElementById("qtd3").value) || 0;

const valor3 =
parseFloat(document.getElementById("valor3").value) || 0;

const subtotal3 =
qtd3 * valor3;

document.getElementById("total3").value =
subtotal3.toFixed(2);

const qtd4 =
parseFloat(document.getElementById("qtd4").value) || 0;

const valor4 =
parseFloat(document.getElementById("valor4").value) || 0;

const subtotal4 =
qtd4 * valor4;

document.getElementById("total4").value =
subtotal4.toFixed(2);

const totalGeral =
subtotal1 +
subtotal2 +
subtotal3 +
subtotal4;

document.getElementById("valorTotal").innerText =
"R$ " + totalGeral.toFixed(2);

}

document.getElementById("qtd1")
.addEventListener("input", calcularTotal);

document.getElementById("valor1")
.addEventListener("input", calcularTotal);

document.getElementById("qtd2")
.addEventListener("input", calcularTotal);

document.getElementById("valor2")
.addEventListener("input", calcularTotal);

document.getElementById("qtd3")
.addEventListener("input", calcularTotal);

document.getElementById("valor3")
.addEventListener("input", calcularTotal);

document.getElementById("qtd4")
.addEventListener("input", calcularTotal);

document.getElementById("valor4")
.addEventListener("input", calcularTotal);

async function salvarPedido() {

const { data: ultimoPedido } = await supabaseClient
.from("pedidos")
.select("id")
.order("id", { ascending: false })
.limit(1);

let proximoNumero = 1;

if (ultimoPedido.length > 0) {

proximoNumero = ultimoPedido[0].id + 1;

}

numeroPedido =
"PED-" + String(proximoNumero).padStart(4, '0');

document.getElementById("numeroPedido").innerText =
numeroPedido;

const cliente =
document.getElementById("cliente").value;

const telefone =
document.getElementById("telefone").value;

const cidade =
document.getElementById("cidade").value;

const endereco =
document.getElementById("endereco").value;

const bairro =
document.getElementById("bairro").value;

const cnpj =
document.getElementById("cnpj").value;

const contato =
document.getElementById("contato").value;

const qtd1 =
document.getElementById("qtd1").value;

const item1 =
document.getElementById("item1").value;

const valor1 =
parseFloat(document.getElementById("valor1").value) || 0;

const qtd2 =
document.getElementById("qtd2").value;

const item2 =
document.getElementById("item2").value;

const valor2 =
parseFloat(document.getElementById("valor2").value) || 0;

const qtd3 =
document.getElementById("qtd3").value;

const item3 =
document.getElementById("item3").value;

const valor3 =
parseFloat(document.getElementById("valor3").value) || 0;

const qtd4 =
document.getElementById("qtd4").value;

const item4 =
document.getElementById("item4").value;

const valor4 =
parseFloat(document.getElementById("valor4").value) || 0;

const total =
(valor1 * qtd1) +
(valor2 * qtd2) +
(valor3 * qtd3) +
(valor4 * qtd4);

const { data, error } = await supabaseClient
.from("pedidos")
.insert([
{

numero: numeroPedido,

cliente,
telefone,
cidade,
endereco,
bairro,
cnpj,
contato,

item1,
qtd1,
valor1,

item2,
qtd2,
valor2,

item3,
qtd3,
valor3,

item4,
qtd4,
valor4,

total

}
]);

if(error){

alert("Erro ao salvar pedido");

console.log(error);

return;

}

alert("Pedido salvo com sucesso!");

}

function gerarPDF(){

const cliente =
document.getElementById("cliente").value;

const telefone =
document.getElementById("telefone").value;

const cidade =
document.getElementById("cidade").value;

const endereco =
document.getElementById("endereco").value;

const bairro =
document.getElementById("bairro").value;

const cnpj =
document.getElementById("cnpj").value;

const contato =
document.getElementById("contato").value;

const dinheiro =
document.getElementById("dinheiro").checked;

const pix =
document.getElementById("pix").checked;

const cartao =
document.getElementById("cartao").checked;

const boleto =
document.getElementById("boleto").checked;

const cheque =
document.getElementById("cheque").checked;

const qtd1 =
document.getElementById("qtd1").value;

const item1 =
document.getElementById("item1").value;

const valor1 =
document.getElementById("valor1").value;

const total1 =
document.getElementById("total1").value;

const qtd2 =
document.getElementById("qtd2").value;

const item2 =
document.getElementById("item2").value;

const valor2 =
document.getElementById("valor2").value;

const total2 =
document.getElementById("total2").value;

const qtd3 =
document.getElementById("qtd3").value;

const item3 =
document.getElementById("item3").value;

const valor3 =
document.getElementById("valor3").value;

const total3 =
document.getElementById("total3").value;

const qtd4 =
document.getElementById("qtd4").value;

const item4 =
document.getElementById("item4").value;

const valor4 =
document.getElementById("valor4").value;

const total4 =
document.getElementById("total4").value;

const valorTotal =
document.getElementById("valorTotal").innerText;

const janela = window.open('', '', 'width=900,height=1200');

janela.document.write(`

<html>

<head>

<title>Pedido</title>

<style>

body{

font-family:Arial;
padding:30px;
color:black;

}

.topo{

display:flex;
justify-content:space-between;
align-items:center;
border:2px solid black;
padding:20px;

}

.logo-area{

display:flex;
align-items:center;
gap:20px;

}

.logo{

width:100px;

}

.empresa-info h2{

margin:0;
font-size:16pt;
font-weight:bold;
line-height:1;
padding:0;

}

.empresa-info p{

margin:2px 0;
font-size:10pt;
line-height:1.2;

}

.pedido-box{

border-left:3px solid black;
padding-left:30px;

}

.pedido-box h1{

font-size:30pt;
margin:0;
line-height:1;

}

.numero{

font-size:14pt;
margin-top:6px;

}
.pagamento-print{

display:flex;
gap:18px;
margin-top:14px;
margin-bottom:14px;
font-size:10pt;
flex-wrap:wrap;

}

.check-print{

display:flex;
align-items:center;
gap:8px;

}

.box-print{

width:22px;
height:22px;
border:2px solid black;
display:flex;
align-items:center;
justify-content:center;
font-weight:bold;
font-size:16px;

}

.grid{

display:grid;
grid-template-columns:1fr 1fr;
gap:12px;
margin-top:20px;

}

.campo{

border:1px solid #999;
padding:8px;
font-size:10pt;
min-height:18px;

}

table{

width:100%;
border-collapse:collapse;
margin-top:25px;

}

th{

background:#dbe7ef;
padding:8px;
border:1px solid black;
font-size:10pt;

}

td{

border:1px solid black;
padding:6px;
font-size:10pt;
height:24px;
vertical-align:top;

}

.total{

display:flex;
justify-content:flex-end;
align-items:center;
gap:20px;
margin-top:30px;

}

.total-label{

font-size:16pt;
font-weight:bold;

}

.total-box{

border:2px solid black;
padding:12px 24px;
font-size:14pt;
font-weight:bold;
background:#dbe7ef;

}

</style>

</head>

<body>

<div class="topo">

<div class="logo-area">

<img src="logo.png" class="logo">

<div class="empresa-info">

<h2>COM-GRAF</h2>

<p>67 3386-6108 / 99287-2064</p>

<p>Rua Brilhante, 3102</p>

<p>Campo Grande - MS</p>

<p>CNPJ 00.758.020/0001-26</p>

</div>

</div>

<div class="pedido-box">

<h1>PEDIDO</h1>

<div class="numero">
${numeroPedido}
</div>

</div>

</div>

<div class="grid">

<div class="campo">${cliente}</div>
<div class="campo">${telefone}</div>

<div class="campo">${cidade}</div>
<div class="campo">${endereco}</div>

<div class="campo">${bairro}</div>
<div class="campo">${cnpj}</div>

<div class="campo">${contato}</div>

</div>

<div class="pagamento-print">

<div class="check-print">
<div class="box-print">${dinheiro ? 'X' : ''}</div>
Dinheiro
</div>

<div class="check-print">
<div class="box-print">${pix ? 'X' : ''}</div>
Pix
</div>

<div class="check-print">
<div class="box-print">${cartao ? 'X' : ''}</div>
Cartão
</div>

<div class="check-print">
<div class="box-print">${boleto ? 'X' : ''}</div>
Boleto
</div>

<div class="check-print">
<div class="box-print">${cheque ? 'X' : ''}</div>
Cheque
</div>

</div>

<table>

<tr>

<th>QUANT.</th>
<th>DESCRIÇÃO</th>
<th>UNIT.</th>
<th>TOTAL</th>

</tr>

<tr>
<td>${qtd1}</td>
<td>${item1}</td>
<td>${valor1}</td>
<td>${total1}</td>
</tr>

<tr>
<td>${qtd2}</td>
<td>${item2}</td>
<td>${valor2}</td>
<td>${total2}</td>
</tr>

<tr>
<td>${qtd3}</td>
<td>${item3}</td>
<td>${valor3}</td>
<td>${total3}</td>
</tr>

<tr>
<td>${qtd4}</td>
<td>${item4}</td>
<td>${valor4}</td>
<td>${total4}</td>
</tr>

</table>

<div class="total">

<div class="total-label">
VALOR TOTAL
</div>

<div class="total-box">
${valorTotal}
</div>

</div>

</body>

</html>

`);

janela.document.close();

janela.focus();

setTimeout(() => {

janela.print();

}, 500);

}