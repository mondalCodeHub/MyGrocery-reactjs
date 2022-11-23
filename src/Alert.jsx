import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert ,list }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        }, 3000)
        return () => clearTimeout(timeout);
    }, [list])
    return (
        <p className={`alertnotification alert-${type}`}>{msg}</p>
    )
}
export default Alert;

// created by : Arup Mondal (@mondalcodehub)
// REACT SERIES - PROJECT 06 (2022)