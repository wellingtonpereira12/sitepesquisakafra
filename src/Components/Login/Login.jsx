import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      console.log('Tentando fazer login com:', username, password); // Adicione esta linha para verificar os dados sendo enviados
  
      const response = await fetch("https://teste-api-5421.onrender.com/loginkafra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      console.log('Resposta da API:', data); // Adicione esta linha para verificar a resposta da API
  
      if (data) {
        setLoginSuccess(true);
        window.location.href = "/nextPage";
      } else {
        setError("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login. Por favor, tente novamente mais tarde.");
    }
  };
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Faça o login</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="Nome"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
