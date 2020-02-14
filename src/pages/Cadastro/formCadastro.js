import React, { useState, useEffect } from 'react';
import {FormularioCadastro} from './style';

export default function FormCadastro() {

    const [nome, setNome] = useState('');
    const [select, setSelect] = useState('');

    const handleNome = e => {
        const rgx = new RegExp(/^[a-zA-Zà-úÀ-Ú ]{0,10}$/);
        if(rgx.test(e.target.value)) {
            setNome(e.target.value);
        } else {
            return false;
        }
    }
    
    const handleSexo = e => {
        setSelect(e.target.value);
    }

 return (
   <div>
       <FormularioCadastro>
           <FormularioCadastro.Group>
               <FormularioCadastro.Label>Nome</FormularioCadastro.Label>
               <FormularioCadastro.Control value={nome} type="text" placeholder="Ex.: João/Maria " onChange={handleNome}/>
               <FormularioCadastro.Text className="text-muted">
                   Forneça um nome ou apelido de 2 a 10 caracteres.
               </FormularioCadastro.Text>
           </FormularioCadastro.Group>
           <FormularioCadastro.Group>
               <FormularioCadastro.Label>Sexo</FormularioCadastro.Label>
               <FormularioCadastro.Control as="select" value={select} onChange={handleSexo}>
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
               <FormularioCadastro.Control type="date" />
               <FormularioCadastro.Text className="text-muted">
                   Forneça uma data de nascimento válida.
               </FormularioCadastro.Text>
           </FormularioCadastro.Group>
       </FormularioCadastro>
   </div>
 );
}