import pt from "@/messages/pt.json"

type Messages = typeof pt

declare global {
  type IntlMessages = Messages
}
