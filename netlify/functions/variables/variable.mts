import type { Context } from "@netlify/functions"

export default async (req: Request, context: Context) => {
  
  const port = process.env.SECRET_TOKEN

  if(!port) {
    throw "missing SECRET_TOKEN"
  }
  
  return new Response(JSON.stringify(`Hello! this app is running on port: ${port}!`),{
    status:200,
    headers: {
      'Content-Type':'application/json'
    }
  })
}