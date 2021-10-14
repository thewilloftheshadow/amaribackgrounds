require("dotenv").config()
const express = require("express")
const path = require("path")
const app = express()
const cloudinary = require("cloudinary")
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})
const {Client} = require("discord.js")
const client = new Client({intents: ["GUILD_MEMBERS"]})
client.login(process.env.TOKEN)


const config = {
  guild: "778894052799545355", staff: "816054426615152661"
}

const api = express.Router()

api.get("/", (req, res) => {
  res.sendStatus(200)
})

api.get("/folder", async (req, res) => {
  let root = await cloudinary.v2.api.root_folders()
  res.json(root)
})

api.get("/backgrounds", async (req, res) => {
  let bg = await cloudinary.v2.search.expression("public_id=amaribackgrounds*").max_results(200).execute()
  let sendData = []
  bg.resources.forEach(x => {
    sendData.push({"name": x.filename, "url": x.secure_url, "format": x.format})
  })
  res.json(sendData)
})

api.get("/staff", async (req, res) => {
  let staffIds = client.guilds.resolve(config.guild).members.cache.filter(x => x.roles.cache.has(config.staff)).map(x => x.id)
  return staffIds
})

app.use(express.static(path.join(__dirname, "client/build")))
app.use(express.static(path.join(__dirname, "public")))

app.use("/api", api)

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"))
})

app.listen(process.env.PORT)
console.log("AmariBackgrounds has been started, port " + process.env.PORT)
