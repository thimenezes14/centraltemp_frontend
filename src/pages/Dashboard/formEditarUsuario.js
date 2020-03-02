import React, { useState, useEffect } from 'react';
import avatar_path from '../../services/avatar_path';

export default function FormEditarUsuario(props) {
    const [perfilEdicao, setPerfilEdicao] = useState({});
    useEffect(()=> {
        setPerfilEdicao(props.usuario);
    }, [props.usuario]);

    return (
        <div>
            <h3>Nome: {perfilEdicao.nome}</h3>
            <h3>Data Nasc.: {perfilEdicao.data_nasc}</h3>
            <h3>Sexo: {perfilEdicao.sexo === 'M' ? 'Masculino' : 'Feminino'}</h3>
            <img src={`${avatar_path}${perfilEdicao.avatar}`} alt={`Imagem de ${perfilEdicao.nome}`} width="200"/>
        </div>
    );
}