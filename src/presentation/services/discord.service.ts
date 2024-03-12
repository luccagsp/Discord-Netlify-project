import { envs } from "../../config";
import { MessageInterface } from "./github.service";



export class DiscordService {

  private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;
  constructor(){}

  async notify(message:MessageInterface) {

    const body = {
      content: message.content,
      embeds: [
        {
          image: { url:message.image }
        }
      ]
    }
    const res = await fetch( this.discordWebhookUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    } )

    if(!res.ok) {
      console.log("Error sending message")
      return false
    }
    
    return true
  }

}