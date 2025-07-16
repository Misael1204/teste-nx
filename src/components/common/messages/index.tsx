import React from "react";

interface MessageProps {
    tipo: string;
    field?: string;
    texto: string;
}

export interface Alert {
    tipo: string;
    field?: string;
    texto: string;
}

export const Message: React.FC<MessageProps> = ({
    texto,
    field,
    tipo
}) => {

    return(
        <div className={`alert alert-${tipo}`} role="alert">
            {field &&`${field} :`}{texto}
        </div>
    )
}