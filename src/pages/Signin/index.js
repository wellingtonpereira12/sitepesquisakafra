import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState(""); // Alterado de 'email' para 'username'
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    try {

      const response = await fetch("https://teste-api-5421.onrender.com/loginkafra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password: senha}), // Alterado de 'email' para 'username'
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login. Tente novamente.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);

      // Login bem-sucedido, redirecione para a página inicial ou faça outras ações necessárias
      if (data === true) {
        // Armazena o token de autenticação no localStorage
        localStorage.setItem("token", "seu_token_aqui");
      
        // Redireciona para a página inicial ou faça outras ações necessárias
        navigate("/home");
      } else {
        throw new Error("Credenciais inválidas. Verifique seu nome de usuário e senha.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login. Tente novamente mais tarde.");
    }
  };

  return (
    <C.Container>
      <C.Label>Faça o login</C.Label>
      <C.Content>
        <Input
          type="text" // Alterado de 'email' para 'text'
          placeholder="Digite seu nome de usuário" // Alterado de 'email' para 'nome de usuário'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setError("");
          }}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
      </C.Content>
    </C.Container>
  );
};

export default Signin;
