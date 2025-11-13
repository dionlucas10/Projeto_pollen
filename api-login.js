  // Seleciona especificamente o formulário de login
  const form = document.querySelector('form[data-view="login"]');

  if (form) {
    // Cria ou obtém o elemento de mensagem
    let mensagemDiv = form.querySelector('.login-mensagem');
    if (!mensagemDiv) {
      mensagemDiv = document.createElement('div');
      mensagemDiv.className = 'login-mensagem';
      form.insertBefore(mensagemDiv, form.querySelector('.auth-form__submit'));
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation(); // Previne propagação do evento

      const email = form.querySelector('[name="login-email"]').value;
      const senha = form.querySelector('[name="login-password"]').value;

      console.log("Tentando enviar login:", email, senha);

      // Limpa mensagem anterior
      mensagemDiv.textContent = '';
      mensagemDiv.className = 'login-mensagem';

      try {
        const resposta = await fetch('https://c95afd857ff2.ngrok-free.app/usuario/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha })
        });

        console.log("Status HTTP:", resposta.status);

        const resultado = await resposta.json();
        console.log("Resposta do servidor:", resultado);

        // Exibe a resposta na tela de login sem fechar o modal
        if (resposta.ok) {
          mensagemDiv.textContent = 'Login realizado com sucesso!';
          mensagemDiv.className = 'login-mensagem login-mensagem-sucesso';
        } else {
          mensagemDiv.textContent = 'Erro no login: ' + (resultado.mensagem || 'Verifique os dados.');
          mensagemDiv.className = 'login-mensagem login-mensagem-erro';
        }
      } catch (erro) {
        console.error('Erro de conexão:', erro);
        mensagemDiv.textContent = 'Erro ao conectar com o servidor.';
        mensagemDiv.className = 'login-mensagem login-mensagem-erro';
      }
    });
  }

