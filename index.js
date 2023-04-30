
const destinatario= "Todos";
let myname
const tipoMensagem = "message";
let contador = 0

// ENVIAR CONEXAO
function entrarNaSala(){
    myname = document.querySelector("#nick-name").value
    const nomeObj = {name:myname}
    const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", nomeObj);
    promessa.then(aprovado, rejeitado);
}

function aprovado(){
    document.querySelector(".pop-up").classList.add("none")
    document.querySelector(".login").classList.add("none")
    run()
    setInterval(run, 6000)
    setInterval(manterConexao, 8000)
}

function run() {
    axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages').then(renderizar)
}

//MANTER CONECTADO
function manterConexao(){
    participante()
    const nomeObj = {name:myname}
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", nomeObj);
}  

function participante(){
    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants")
    promessa.then(renderizarParticipantes)
    const participantes = document.querySelector(".Mycontatcs")
    participantes.innerHTML = ""
    function renderizarParticipantes(dados){
        dados.data.forEach(element => { 
            participantes.innerHTML += `
            
            <div class="name-people">
                <div class="imagemPerfil">
                    
                </div>
                <span>${element.name}</span>
            </div>
            `
        });
    }
    }



function renderizar(dados){
    let renderMensage = document.querySelector(".lista")    
    dados.data.forEach(element => {
        renderMensage.innerHTML += RenderMensage(element.from, element.text, element.type)
    });

    contador++
    function RenderMensage(nameUser, text, type){
        if(type === "status"){
            return ""
        }

        if (nameUser != myname) {
            return `
            <li class="mensagens-global">
                ${imgUser(nameUser)}
                <div class="you-mensage mensage">
                    <h5>~ ${nameUser}</h5>
                    ${text}    
                </div>
            </li>
        `
        }else{
            return`
                <li class="mensagens-global in">
                    <div class="my-mensage mensage">
                        ${text}
                    </div>
                </li>`
        }
        
    }

    function imgUser(nameUser){
        if (nameUser != myname ) {
            // console.log("essa msg n e minha")
            return `
            <div class="image-people e alho ">
                <img src="" alt="" />
            </div>
            `
        }
    }

    if(contador === 2){
        renderMensage.innerHTML = ""
        contador=0
        run()
    }
    
    rolarchataofinal()
    
}

// ENVIAR MENSAGEM 
function enviarMensagem(){
    let texto = document.getElementById("digitado");
    if(texto.value === ""){
        return
    }
    const novaMsg = 
    {
        from: myname,
        to: destinatario,
        text: texto.value,
        type: tipoMensagem
    }
    const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", novaMsg);
    texto.value = ""
    
    promessa.catch(reloading);
    renderizar()

}



function reloading(){
    alert("nao foi possivel enviar sua mensagem devido à um erro de nosso servidor")
    window.location.reload()
}

//enviar com enter
document.addEventListener("keypress", (e) => {
    
    if (e.key == 'Enter') {
        enviarMensagem()
    }
    
});

function rolarchataofinal(){
    const ultimamsg = document.querySelector(".lista li:last-child")
    ultimamsg.scrollIntoView()
}

function rejeitado(){
    alert("este nome ja está em uso")
}

//trocar imagem de pergil pelo modal
let img = document.getElementById("imgUser");
let input = document.getElementById("arquivo");

input.onchange = (e) => {
    if (input.files[0]) img.src = URL.createObjectURL(input.files[0]);
};