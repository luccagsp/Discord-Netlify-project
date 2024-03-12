import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export interface MessageInterface {
  content: string;
  image: string;
}

export class GithubService {

  constructor(){}

  onStar(payload: GitHubStarPayload): MessageInterface {
    
    const {sender, action, repository, starred_at} = payload

    const message:MessageInterface = {
      content: `User ${sender.login} ${action} star on ${repository.full_name}`,
      image: sender.avatar_url
    }

    return message

  }

  onIssue(payload: GitHubIssuePayload) {
    const {action, issue} = payload

    if (action === 'opened') {
      return {content:`An Issue was opened with the title: ${issue.title}`, image:""} as MessageInterface
    }
    if (action === 'closed') {
      return {content: `An Issue was closed by: ${issue.user.login}`, image:""} as MessageInterface
    }
    if (action === 'reopened') {
      return {content: `An Issue was reopened by: ${issue.user.login}`, image:""} as MessageInterface
    }
    
    return {content: `Unhandled action for the issue event: ${action}`, image:""} as MessageInterface
  }

}