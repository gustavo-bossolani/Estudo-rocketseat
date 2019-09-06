function clonar(inputId) {
    var input = document.getElementById(`${inputId}`);
    input.select();
    document.execCommand('copy');
}

function monstarLista(projeto) {
    var ul = document.querySelector('ul');

    var li = document.createElement('li');

    var input = document.createElement('input');
    input.setAttribute('value', projeto.clone_url);
    input.setAttribute('type', 'text');
    input.setAttribute('id', `${projeto.id}`);
    input.setAttribute('style', 'opacity: 0; width:0px; height: 0px;');

    var a = document.createElement('a');
    a.setAttribute('onClick', `clonar(${input.id})`);
    a.textContent = 'Copiar URL';

    li.textContent = projeto.name;

    li.appendChild(input);
    li.appendChild(a);
    ul.appendChild(li);
}

function mostarErro() {
    var ul = document.querySelector('ul');
    var h4 = document.createElement('h4');
    h4.textContent = '404 - Ih deu ruim';
    ul.appendChild(h4);
}

function mostarCarregamento() {
    var ul = document.querySelector('ul');
    var h4 = document.createElement('h4');
    h4.textContent = 'Carregando...';
    ul.appendChild(h4);
}

document.querySelector('button').addEventListener('click', () => {


    document.querySelector('ul').innerHTML = "";
    document.querySelector('img').src = "";

    mostarCarregamento();

    setTimeout(() => {
        document.querySelector('ul').innerHTML = "";
        document.querySelector('img').src = "";

        // Buscando Repositórios
        axios.get(`https://api.github.com/users/${document.querySelector('#pesquisa').value}/repos`)
            .then((response) => {
                console.log(response);

                var projetos = response.data;
                projetos.forEach(projeto => {
                    monstarLista(projeto);
                });
            })
            .catch((error) => {
                mostarErro();
            });

        // Buscando Perfil
        axios.get(`https://api.github.com/users/${document.querySelector('#pesquisa').value}`)
            .then((response) => {
                var img = document.querySelector('img');
                img.src = response.data.avatar_url;
            })
            .catch((error) => {
                console.warn();

            });


    }, 2000);

});


//Promise customizada
// function checaIdade(idade) {
//     return new Promise((resolve, reject) => {
//         idade >= 18 ? resolve('É maior de idade.') : reject('É menor de idade.');
//     });
// }

// var metodo = () => {
//     checaIdade(document.querySelector('input').value)
//     .then((response) => console.log(response))
//     .catch((error) => console.warn(error));
//     document.querySelector('input').value = '';
// }

// checaIdade(18)
//     .then((response) => console.log(response))
//     .catch((error) => console.warn(error));
