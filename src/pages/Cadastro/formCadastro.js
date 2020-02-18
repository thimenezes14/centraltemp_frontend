import React, { useState, useEffect } from 'react';
import {FormularioCadastro, BotaoFormularioCadastro} from './style';
import {FaCheckCircle, FaUserAlt} from 'react-icons/fa';
import moment from 'moment';

export default function FormCadastro() {

    const [buttonDisabled, setButtonDisabled] = useState(true);
    
    const [nome, setNome] = useState('');
    const [nomeOk, setNomeOk] = useState(false);

    const [sexo, setSexo] = useState('');
    const [sexoOk, setSexoOk] = useState(false);

    const [data_nasc, setData_nasc] = useState('');
    const [data_nascOk, setData_nascOk] = useState(false);

    useEffect(() => {enableButton()});

    const handleNome = e => {
        const rgx = new RegExp(/^[a-zA-Zà-úÀ-Ú ]{0,10}$/);
        if(rgx.test(e.target.value)) {
            setNome(e.target.value);
        } else {
            return false;
        }
    }

    const validateNome = e => {
        const MIN_NOME = 2, MAX_NOME = 10;
        if(e.target.value.length >= MIN_NOME && e.target.value.length <= MAX_NOME) {
            setNomeOk(true);
        } else {
            setNomeOk(false);
        }
    }
    
    const handleSexo = e => {
        setSexo(e.target.value);
    }

    const validateSexo = e => {
        if(sexo.length > 0) {
            setSexoOk(true);
        } else {
            setSexoOk(false);
        }
    }

    const handleData_nasc = e => {
        setData_nasc(e.target.value);
    }

    const validateData_nasc = e => {
        const data_nascimento = e.target.value;
        const rgx = new RegExp(/((19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);

        if(rgx.test(data_nascimento) && moment().isSameOrAfter(Date.parse(data_nascimento))) {
            setData_nascOk(true);
        } else {
            setData_nascOk(false);
        }

    }

    const enableButton = () => {
        if(nomeOk && sexoOk && data_nascOk) {
            setButtonDisabled(false);
            return true;
        } else {
            setButtonDisabled(true);
            return false;
        }
    }

    const resetAll = () => {
        setNome('');
        setNomeOk(false);
        setSexo('');
        setSexoOk(false);
        setData_nasc('');
        setData_nascOk(false);
        setButtonDisabled(true);
    }

    const handleSubmit = e => {
        e.preventDefault();
        alert("Nome: " + nome + "\nSexo: " + sexo + "\nData Nasc.: " + data_nasc);
        resetAll();
    }

 return (
   <div>
       <FormularioCadastro onSubmit={handleSubmit}>
           <FormularioCadastro.Label><FaUserAlt/> CRIAR NOVO PERFIL</FormularioCadastro.Label>
           <FormularioCadastro.Group>
               <FormularioCadastro.Label>Nome</FormularioCadastro.Label>
               <FormularioCadastro.Control value={nome} type="text" placeholder="Ex.: João/Maria " onChange={handleNome} onBlur={validateNome} onKeyUp={validateNome}/>
               <FormularioCadastro.Text className="text-muted">
                   Forneça um nome ou apelido de 2 a 10 caracteres.
               </FormularioCadastro.Text>
           </FormularioCadastro.Group>
           <FormularioCadastro.Group>
               <FormularioCadastro.Label>Sexo</FormularioCadastro.Label>
               <FormularioCadastro.Control as="select" value={sexo} onChange={handleSexo} onBlur={validateSexo}>
                   <option disabled value="">Selecione...</option>
                   <option value="M">Masculino</option>
                   <option value="F">Feminino</option>
               </FormularioCadastro.Control>
               <FormularioCadastro.Text className="text-muted">
                   Forneça um sexo. Você NÃO poderá alterá-lo uma vez que o perfil tenha sido criado.
               </FormularioCadastro.Text>
           </FormularioCadastro.Group>
           <FormularioCadastro.Group>
               <FormularioCadastro.Label>Data de Nascimento</FormularioCadastro.Label>
               <FormularioCadastro.Control type="date" value={data_nasc} onChange={handleData_nasc} onBlur={validateData_nasc}/>
               <FormularioCadastro.Text className="text-muted">
                   Forneça uma data de nascimento válida.
               </FormularioCadastro.Text>
           </FormularioCadastro.Group>
           <BotaoFormularioCadastro type="submit" variant="success" disabled={buttonDisabled}><FaCheckCircle /> CRIAR PERFIL</BotaoFormularioCadastro>
       </FormularioCadastro>
   </div>
 );
}