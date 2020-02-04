import React from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Chuveiro() {
 return (
   <div>
       Chuveiro Ligado. Aguarde a conclusão do banho antes de utilizá-lo novamente.
       <Link to="/"><Button variant="primary">Tentar novamente</Button></Link>
   </div>
 );
}