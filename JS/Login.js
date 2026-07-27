document.getElementById('loginForm').addEventListener('submit', async function(e){
  e.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const clave = document.getElementById('clave').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  if(usuario.length === 0 || clave.length === 0){
    errorMsg.textContent = 'Completá usuario y contraseña';
    errorMsg.classList.remove('hidden');
    return;
  }

  const formData = new FormData();
  formData.append('usuario', usuario);
  formData.append('clave', clave);

  try {
    const res = await fetch('../FuncionesPHP/login.php', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if(data.success){
      errorMsg.classList.add('hidden');
      window.location.href = 'POS.php';
    } else {
      errorMsg.textContent = data.message;
      errorMsg.classList.remove('hidden');
    }
  } catch (error) {
    errorMsg.textContent = 'No se pudo conectar con el servidor';
    errorMsg.classList.remove('hidden');
  }
});