
function Notification({ text, color }) {

    const notStyles = {
        color: `${color}`,
        border: `5px solid ${color}`,
        borderRadius: '5px',
        textAlign: 'center',
        backgroundColor: 'gray'
    }

    return (
        <h3 style={notStyles}>{text}</h3>
    )
}

export default Notification;