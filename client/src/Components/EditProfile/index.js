import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";


const  EditProfile = ()=>{

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);


    const handleEdit =()=>{
        setIsEditing (true)
    };

    const handleSave =()=>{
//Salvar os dados no servidor
        setIsEditing (false)
    };

    const handleChange =(e)=>{
        // atualizar os estados de acordo com o nome do campo
        const {name, value} = e.target;
        if (name === "email"){
            setEmail(value);
        } else if (name === "name"){
            setName(value);
        } else if (name === "description"){
            setDescription(value);
        }
    };

    return (
        <div className="conteiner">
            {isEditing ? (
                // se estiver editando, mostra um formulário com os campos
                <Form>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" name="name" value={name} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" name="description" value={description} onChange={handleChange} />
                    </Form.Group>

                    <Button onClick={handleSave}>Salvar</Button>
                </Form>
            ) : (
                // se não estiver editando, mostra um botão para editar
                <Button onClick={handleEdit}>Editar Perfil</Button>
            )}
        </div>
    )


};
export default EditProfile;