// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB0sE6U0Cpn-vA5No-j7JdZREf6oS4ScPs",
    authDomain: "farmacia-solidaria-f14e1.firebaseapp.com",
    projectId: "farmacia-solidaria-f14e1",
    storageBucket: "farmacia-solidaria-f14e1.appspot.com",
    messagingSenderId: "130504573623",
    appId: "1:130504573623:web:c366b863fde27a1e404332"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
// Configuração do Firebase Storage
const storage = firebase.storage();
const storageRef = storage.ref();


// Função para login
function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, senha)
        .then(response => {
            window.location.href = "principal.html";
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Verifique suas credenciais.');
        });
}

// Função para registro
function register(event) {
    event.preventDefault();

    const nome = document.querySelector('[name="name"]').value;
    const cpf = document.querySelector('[name="cpf"]').value;
    const email = document.querySelector('[name="email"]').value;
    const senha = document.querySelector('[name="password"]').value;
    const confirmarSenha = document.querySelector('[name="confirmPassword"]').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    auth.createUserWithEmailAndPassword(email, senha)
        .then(userCredential => {
            const user = userCredential.user;
            console.log('Usuário registrado:', user);

            return firestore.collection('usuarios').doc(user.uid).set({
                nome: nome,
                cpf: cpf,
                email: email
            });
        })
        .then(() => {
            alert('Usuário registrado com sucesso!');
            window.location.href = "login.html";
        })
        .catch(error => {
            console.error('Erro ao registrar usuário:', error);
            alert('Erro ao registrar usuário. Verifique suas informações.');
        });
}

// Função para obter mensagens de erro amigáveis
function getErrorMessage(error) {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'O endereço de e-mail não é válido.';
        case 'auth/user-not-found':
            return 'Nenhum usuário encontrado com este e-mail.';
        case 'auth/wrong-password':
            return 'Senha incorreta.';
        case 'auth/email-already-in-use':
            return 'O endereço de e-mail já está em uso por outra conta.';
        default:
            return 'Ocorreu um erro ao tentar realizar a ação.';
    }
}


