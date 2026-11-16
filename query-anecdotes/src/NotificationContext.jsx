import { createContext, useContext, useState } from "react";

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState(null)

    const notify = (msg) => {
        setNotification(msg)
        setTimeout(() => { setNotification(null) }, 5000)
    }

    return (
        <NotificationContext.Provider value={{ notify,notification }}>
            {props.children}
        </NotificationContext.Provider>
    )
}

// Custom notify hook
export const useNotify = () => {
    const { notify } = useContext(NotificationContext)
    return notify
}

// custom Notification hook 
export const useNotificationValue = () => {
    const { notification } = useContext(NotificationContext)
    return notification
}

export default NotificationContext