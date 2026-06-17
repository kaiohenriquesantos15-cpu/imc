
// ======================================
// FITHEALTH PRO - SCRIPT.JS
// ======================================

let historico = JSON.parse(localStorage.getItem("fithealthHistorico")) || [];

// ======================================
// INICIALIZAÇÃO
// ======================================

window.onload = function () {
    carregarHistorico();
    desenharGrafico(0, 0, 0);
};

// ======================================
// FUNÇÃO PRINCIPAL
// ======================================

function calcularTudo() {

    const nome = document.getElementById("nome").value || "Usuário";

    const idade = parseInt(document.getElementById("idade").value);

    const sexo = document.getElementById("sexo").value;

    const peso = parseFloat(document.getElementById("peso").value);

    const altura = parseFloat(document.getElementById("altura").value);

    const cintura = parseFloat(document.getElementById("cintura").value);

    const atividade = parseInt(
        document.getElementById("atividade").value
    );

    if (
        !idade ||
        !sexo ||
        !peso ||
        !altura ||
        !cintura ||
        !atividade
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    // ==========================
    // IMC
    // ==========================

    const imc = peso / (altura * altura);

    let classificacao = "";
    let ponteiro = 0;

    if (imc < 18.5) {
        classificacao = "Abaixo do Peso";
        ponteiro = 10;
    } else if (imc < 25) {
        classificacao = "Peso Ideal";
        ponteiro = 35;
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        ponteiro = 55;
    } else if (imc < 35) {
        classificacao = "Obesidade Grau I";
        ponteiro = 75;
    } else if (imc < 40) {
        classificacao = "Obesidade Grau II";
        ponteiro = 88;
    } else {
        classificacao = "Obesidade Grau III";
        ponteiro = 98;
    }

    // ==========================
    // PESO IDEAL
    // ==========================

    const pesoMin = 18.5 * (altura * altura);
    const pesoMax = 24.9 * (altura * altura);

    // ==========================
    // META
    // ==========================

    let metaPeso = "";

    if (peso < pesoMin) {
        metaPeso =
            "Ganhar " +
            (pesoMin - peso).toFixed(1) +
            " kg";
    }
    else if (peso > pesoMax) {
        metaPeso =
            "Perder " +
            (peso - pesoMax).toFixed(1) +
            " kg";
    }
    else {
        metaPeso = "Manter peso atual";
    }

    // ==========================
    // ÁGUA
    // ==========================

    const agua = (peso * 35) / 1000;

    // ==========================
    // TMB
    // ==========================

    let tmb = 0;

    if (sexo === "masculino") {

        tmb =
            88.36 +
            (13.4 * peso) +
            (4.8 * (altura * 100)) -
            (5.7 * idade);

    } else {

        tmb =
            447.6 +
            (9.2 * peso) +
            (3.1 * (altura * 100)) -
            (4.3 * idade);
    }

    // ==========================
    // CINTURA
    // ==========================

    let riscoCintura = "";

    if (sexo === "masculino") {

        if (cintura <= 94)
            riscoCintura = "Baixo";

        else if (cintura <= 102)
            riscoCintura = "Moderado";

        else
            riscoCintura = "Alto";

    } else {

        if (cintura <= 80)
            riscoCintura = "Baixo";

        else if (cintura <= 88)
            riscoCintura = "Moderado";

        else
            riscoCintura = "Alto";
    }

    // ==========================
    // SCORE SAÚDE
    // ==========================

    let score = 100;

    if (imc < 18.5 || imc > 30)
        score -= 20;

    if (riscoCintura === "Moderado")
        score -= 10;

    if (riscoCintura === "Alto")
        score -= 20;

    if (atividade === 1)
        score -= 20;

    if (atividade === 2)
        score -= 10;

    if (idade > 50)
        score -= 10;

    if (score < 0)
        score = 0;

    // ==========================
    // DASHBOARD
    // ==========================

    document.getElementById("imcValor").innerHTML =
        imc.toFixed(1);

    document.getElementById("classificacao").innerHTML =
        classificacao;

    document.getElementById("pesoIdeal").innerHTML =
        `${pesoMin.toFixed(1)}kg - ${pesoMax.toFixed(1)}kg`;

    document.getElementById("metaPeso").innerHTML =
        metaPeso;

    document.getElementById("aguaDia").innerHTML =
        agua.toFixed(1) + " L";

    document.getElementById("tmb").innerHTML =
        Math.round(tmb) + " kcal";

    document.getElementById("riscoCintura").innerHTML =
        riscoCintura;

    document.getElementById("scoreSaude").innerHTML =
        score + "/100";

    // ==========================
    // PONTEIRO IMC
    // ==========================

    document.getElementById(
        "ponteiro"
    ).style.left =
        `calc(${ponteiro}% - 17px)`;

    document.getElementById(
        "faixaDescricao"
    ).innerHTML =
        classificacao;

    // ==========================
    // DICAS NUTRICIONAIS
    // ==========================

    const dicasNutri =
        document.getElementById(
            "dicasNutricionais"
        );

    dicasNutri.innerHTML = "";

    let listaNutri = [];

    if (imc < 18.5) {

        listaNutri = [
            "Aumente o consumo de proteínas.",
            "Faça refeições mais frequentes.",
            "Inclua carboidratos complexos."
        ];

    } else if (imc < 25) {

        listaNutri = [
            "Mantenha uma alimentação equilibrada.",
            "Consuma frutas diariamente.",
            "Continue com hábitos saudáveis."
        ];

    } else {

        listaNutri = [
            "Reduza alimentos ultraprocessados.",
            "Aumente vegetais e legumes.",
            "Controle o consumo de açúcar."
        ];
    }

    listaNutri.forEach(item => {

        dicasNutri.innerHTML +=
            `<li>${item}</li>`;
    });

    // ==========================
    // EXERCÍCIOS
    // ==========================

    const dicasEx =
        document.getElementById(
            "dicasExercicios"
        );

    dicasEx.innerHTML = "";

    let listaEx = [];

    if (imc < 18.5) {

        listaEx = [
            "Musculação 4x por semana.",
            "Treinos de força.",
            "Acompanhamento profissional."
        ];

    } else if (imc < 25) {

        listaEx = [
            "Musculação.",
            "Corrida ou caminhada.",
            "Alongamentos."
        ];

    } else {

        listaEx = [
            "Caminhada diária.",
            "Bicicleta.",
            "Treino aeróbico."
        ];
    }

    listaEx.forEach(item => {

        dicasEx.innerHTML +=
            `<li>${item}</li>`;
    });

    // ==========================
    // RELATÓRIO
    // ==========================

    document.getElementById(
        "relatorioCompleto"
    ).innerHTML =

        `${nome}, sua avaliação corporal foi concluída.
        Seu IMC é ${imc.toFixed(1)}, classificado como
        <strong>${classificacao}</strong>.
        Seu peso saudável estimado está entre
        ${pesoMin.toFixed(1)}kg e
        ${pesoMax.toFixed(1)}kg.
        Sua necessidade diária de água é de
        ${agua.toFixed(1)} litros.
        Sua Taxa Metabólica Basal é de
        ${Math.round(tmb)} kcal por dia.
        Seu score geral de saúde foi
        ${score}/100.`;

    // ==========================
    // HISTÓRICO
    // ==========================

    const registro = {
        data: new Date().toLocaleDateString(),
        nome,
        imc: imc.toFixed(1),
        score
    };

    historico.unshift(registro);

    if (historico.length > 10)
        historico.pop();

    localStorage.setItem(
        "fithealthHistorico",
        JSON.stringify(historico)
    );

    carregarHistorico();

    // ==========================
    // GRÁFICO
    // ==========================

    desenharGrafico(
        peso,
        pesoMin,
        pesoMax
    );

    // ==========================
    // AVATAR HUMANO INTERATIVO
    // ==========================

    const avatar =
        document.getElementById(
            "avatarHumano"
        );

    const avatarImc =
        document.getElementById(
            "avatarImc"
        );

    const statusCorpo =
        document.getElementById(
            "statusCorpo"
        );

    const avatarClassificacao =
        document.getElementById(
            "avatarClassificacao"
        );

    const avatarScore =
        document.getElementById(
            "avatarScore"
        );

    if (avatar) {

        avatar.className = "avatar";

        if (imc < 18.5) {

            avatar.classList.add(
                "avatar-magro"
            );

            statusCorpo.innerHTML =
                "⚠️ Abaixo do Peso";

        }
        else if (imc < 25) {

            avatar.classList.add(
                "avatar-normal"
            );

            statusCorpo.innerHTML =
                "✅ Peso Saudável";

        }
        else if (imc < 30) {

            avatar.classList.add(
                "avatar-sobrepeso"
            );

            statusCorpo.innerHTML =
                "⚠️ Sobrepeso";

        }
        else {

            avatar.classList.add(
                "avatar-obeso"
            );

            statusCorpo.innerHTML =
                "🚨 Obesidade";
        }
    }

    if (avatarImc) {

        avatarImc.innerHTML =
            imc.toFixed(1);
    }

    if (avatarClassificacao) {

        avatarClassificacao.innerHTML =
            classificacao;
    }

    if (avatarScore) {

        avatarScore.innerHTML =
            score + "/100";
    }
}

// ======================================
// HISTÓRICO
// ======================================

function carregarHistorico() {

    const lista =
        document.getElementById(
            "historicoLista"
        );

    if (!lista)
        return;

    lista.innerHTML = "";

    historico.forEach(item => {

        lista.innerHTML += `
            <div class="historico-item">
                <strong>${item.nome}</strong><br>
                Data: ${item.data}<br>
                IMC: ${item.imc}<br>
                Score: ${item.score}/100
            </div>
        `;
    });
}

// ======================================
// GRÁFICO CANVAS
// ======================================

function desenharGrafico(
    peso,
    minimo,
    maximo
) {

    const canvas =
        document.getElementById(
            "graficoPeso"
        );

    if (!canvas)
        return;

    const ctx =
        canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 300;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const valores = [
        peso,
        minimo,
        maximo
    ];

    const maior =
        Math.max(...valores, 100);

    const largura = 120;

    const espacamento = 200;

    const base = 250;

    valores.forEach((valor, i) => {

        const altura =
            (valor / maior) * 180;

        const x =
            120 +
            (i * espacamento);

        ctx.fillStyle =
            i === 0
                ? "#2563eb"
                : "#22c55e";

        ctx.fillRect(
            x,
            base - altura,
            largura,
            altura
        );

        ctx.fillStyle =
            "#111827";

        ctx.font =
            "16px Arial";

        ctx.fillText(
            valor.toFixed(1) + "kg",
            x + 15,
            base - altura - 10
        );
    });

    ctx.fillText(
        "Peso Atual",
        130,
        280
    );

    ctx.fillText(
        "Peso Mín.",
        325,
        280
    );

    ctx.fillText(
        "Peso Máx.",
        520,
        280
    );
}
