import { useDispatch } from "react-redux"

export const showtheme = async () => {
    const dipatch = useDispatch()
    const ChatTheme = localStorage.getItem('chat-Theme') || 'coffee'
    console.log(ChatTheme)
    dipatch(ChatTheme)

}