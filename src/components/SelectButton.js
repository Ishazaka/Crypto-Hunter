import React from 'react'

const SelectButton = ({ children, selected, onClick }) => {

    const selectbtn = {

        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
            backgroundColor: "gold",
            color: "black",
        },
        width: "22%",
        //   margin: 5,

    }

    return (
        <span onClick={onClick} style={selectbtn}>
            {children}
        </span>
    );
}

export default SelectButton