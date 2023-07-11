import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

const  EditProfile = ()=>{

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);


    const handleEdit =()=>{
        setIsEditing (true)
    };

    return (


        <Button onClick={handleEdit}> Editar Perfil</Button>

    )


};

export default EditProfile;