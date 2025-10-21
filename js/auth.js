// Registro y Login muy básicos usando localStorage (solo para demo educativa)
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar arreglos si no existen
  if(!Array.isArray(getUsers())) setUsers([]);

  // LOGIN
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim().toLowerCase();
    const pass = e.target.password.value.trim();
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === pass);
    if(found){
      setCurrentUser({ name: found.name, email: found.email });
      alert('¡Bienvenido/a ' + found.name + '!');
      window.location.href = 'index.html';
    }else{
      alert('Usuario o clave incorrectos.');
    }
  });

  // REGISTRO
  const regForm = document.getElementById('register-form');
  regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim().toLowerCase();
    const phone = e.target.phone.value.trim();
    const password = e.target.password.value.trim();

    if(!name || !email || !password){
      alert('Completa al menos nombre, correo y clave.');
      return;
    }
    const users = getUsers();
    if(users.some(u => u.email === email)){
      alert('Ese correo ya está registrado.');
      return;
    }
    users.push({ name, email, phone, password });
    setUsers(users);
    setCurrentUser({ name, email });
    alert('Registro exitoso. ¡Bienvenido/a, ' + name + '!');
    window.location.href = 'productos.html';
  });
});
