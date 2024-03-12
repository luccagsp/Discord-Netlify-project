import { Request, Response } from "express";
import { GithubService, MessageInterface } from "../services/github.service";
import { DiscordService } from "../services/discord.service";


export class GithubController {

  //DI
  constructor(
    private readonly githubService = new GithubService(),
    private readonly discordService = new DiscordService()
  ){}

  webhookHandler = (req: Request, res:Response) => {

    const payload = req.body
    const githubEvent = req.header('x-github-event') ?? 'unknown'
    let message: MessageInterface


    switch(githubEvent) {
      
      case 'star': 
        message = this.githubService.onStar(payload) as MessageInterface;
        console.log(message.content, message.image)
        break;
        
      case 'issues':
        message = this.githubService.onIssue(payload) as MessageInterface ;
      break;

      default:
        message = {
          content: "string",
          image: "string",
        } as MessageInterface
    }
    console.log(message)
    const send = {content:message.content, image:message.image} as MessageInterface
    this.discordService.notify( send )
      .then(() => res.status(202).send('accepted'))
      .catch(() => res.status(500).json({error: 'internal server error'}))

  }

}