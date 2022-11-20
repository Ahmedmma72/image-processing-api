import express from 'express'
type nextFunction = () => void
const middleware = (
  req: express.Request,
  res: express.Response,
  next: nextFunction
): void => {
  console.log(`initial middleware`)
  next()
}

export default middleware
