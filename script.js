document.addEventListener("DOMContentLoaded", () => {
  // FORMULÁRIOS GERAIS
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    if (form.id === "formLogin") return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const protocolo = "CON-" + Math.floor(100000 + Math.random() * 900000);
      const mensagem = form.querySelector(".mensagem-sucesso");

      if (mensagem) {
        mensagem.innerHTML = `Formulário enviado com sucesso!<br>Seu número de protocolo é <strong>${protocolo}</strong>.`;
        mensagem.style.display = "block";
      } else {
        alert(`Formulário enviado com sucesso! Seu número de protocolo é ${protocolo}.`);
      }

      form.reset();
    });
  });

  // LOGIN (ONG / DENTISTA)
  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const tipoSelect = document.getElementById("tipoLogin");
      const emailInput = document.getElementById("emailLogin");
      const senhaInput = document.getElementById("senhaLogin");
      const msg = document.getElementById("msgLogin");

      const tipo = tipoSelect ? tipoSelect.value : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const senha = senhaInput ? senhaInput.value.trim() : "";

      if (!tipo || !email || !senha) {
        if (msg) {
          msg.textContent = "Por favor, selecione o tipo de login e preencha todos os campos.";
          msg.style.display = "block";
          msg.style.backgroundColor = "#fff0f0";
          msg.style.borderLeft = "4px solid #d32f2f";
          msg.style.color = "#d32f2f";
        }
        return;
      }

      const nomeExibicao = email.split("@")[0];
      localStorage.setItem("nomeUsuario", nomeExibicao);
      localStorage.setItem("tipoUsuario", tipo);

      if (tipo === "ong") {
        window.location.href = "painelong.html";
      } else if (tipo === "dentista") {
        window.location.href = "painel-dentista.html";
      }
    });
  }

  // PAINEL ONG - menu lateral
  const spanNome = document.getElementById("nomeOng");
  if (spanNome) {
    const nome = localStorage.getItem("nomeUsuario");
    spanNome.textContent = nome && nome !== "" ? nome : "ONG Conecta";
  }

  const btnMenu = document.getElementById("btnMenu");
  const menuLateral = document.getElementById("menuLateral");

  if (btnMenu && menuLateral) {
    btnMenu.addEventListener("click", () => {
      const aberto = menuLateral.style.display === "block";
      menuLateral.style.display = aberto ? "none" : "block";
    });
  }

  const linksMenu = document.querySelectorAll(".link-menu");
  if (linksMenu && menuLateral) {
    linksMenu.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const alvo = document.querySelector(link.getAttribute("href"));
        if (alvo) {
          menuLateral.style.display = "none";
          alvo.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  const btnSair = document.getElementById("btnSair");
  if (btnSair) {
    btnSair.addEventListener("click", () => {
      localStorage.removeItem("nomeUsuario");
      localStorage.removeItem("tipoUsuario");
      window.location.href = "login.html";
    });
  }

  const formMatch = document.getElementById("formMatch");
  if (formMatch) {
    formMatch.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Filtros aplicados! (Simulação) Em uma versão real, o sistema exibiria os profissionais compatíveis.");
    });
  }

  // FAQ - Abrir/Fechar Respostas
  const perguntas = document.querySelectorAll(".faq-pergunta");
  if (perguntas.length > 0) {
    perguntas.forEach((btn) => {
      btn.addEventListener("click", () => {
        const resposta = btn.nextElementSibling;
        const seta = btn.querySelector(".seta");

        if (resposta.style.display === "block") {
          resposta.style.display = "none";
          seta.textContent = "+";
        } else {
          resposta.style.display = "block";
          seta.textContent = "–";
        }
      });
    });
  }

  // ===== MENU PRINCIPAL - HAMBÚRGUER MOBILE =====
  const hamburgerMain = document.getElementById("hamburgerMain");
  const navMainList = document.querySelector("header nav ul");

  if (hamburgerMain && navMainList) {
    hamburgerMain.addEventListener("click", () => {
      navMainList.classList.toggle("aberto");
    });

    navMainList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMainList.classList.remove("aberto");
      });
    });
  }
});
