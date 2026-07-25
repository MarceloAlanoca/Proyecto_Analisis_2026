document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const clave = document.getElementById('clave').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  if(usuario.length === 0 || clave.length === 0){
    errorMsg.textContent = 'Completá usuario y contraseña';
    errorMsg.classList.remove('hidden');
    return;
  }

  errorMsg.classList.add('hidden');

  window.location.href = 'POS.php';
});
