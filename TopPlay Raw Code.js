// HUGE THANK YOU TO CKOSMIC FOR THE ORIGINAL SCRIPT

let user_id = args.widgetParameter;

const api_url = "https://scoresaber.com"

// If user ID is not provided, grab player #1's user ID
if(user_id == null || user_id == "" || user_id == undefined) {
  const req = new Request(api_url + "/api/players")  
  const res = await req.loadJSON()
  
  user_id = "76561198261729925"
}

// change the user id to the one of your choice

// user_id = "76561198131208517"

const fullApi = api_url + "/api/player/" + user_id + "/full"
const pScores = api_url + "/api/player/" + user_id + "/scores?limit=1&sort=top&page=1&withMetadata=true"



const ySegments = 4

const req = new Request(fullApi)
const res = await req.loadJSON()
const reqScore = new Request(pScores)
const resScore = await reqScore.loadJSON()

const flag = "https://scoresaber.com/imports/images/flags/" + res.country.toLowerCase() + ".png"
const flag_i = await new Request(flag)
const flagImg = await flag_i.loadImage()

const avatar = res.profilePicture
const avatar_i = await new Request(avatar)
const avatarImg = await avatar_i.loadImage()

const songPic_a = resScore.playerScores[0].leaderboard.coverImage
const songPic_i = await new Request(songPic_a)
const songPic = await songPic_i.loadImage() 

const isf1 = "https://media.discordapp.net/attachments/730982832893198388/919799436358602823/IMG_7350.png"
const isf_i = await new Request(isf1)
const isfM = await isf_i.loadImage()

const mScore = resScore.playerScores[0].leaderboard.maxScore

let bScore = resScore.playerScores[0].score.baseScore


const perP = resScore.playerScores[0].score.pp

const denyah1 = "https://cdn.discordapp.com/attachments/730982832893198388/919806611499941958/Image_15.jpg"
const denyah_i = await new Request(denyah1)
const denyah = await denyah_i.loadImage()

let songnam = resScore.playerScores[0].leaderboard.songName
const songi = await new Request(songnam)
const songname = await songi

const graphRect = new Rect(120, 338, 540, 300)

const locales = {
  ranking_big: "Player Ranking: #",
  pp_big: "Performance Points: ",
  play_big: "Play Count: ",
  score_big: "Total Score: ",
  acc_big: "Average Accuracy: ",
  cr_big: "Country Rank:"
  ranking_small: "Rank: #",
  pp_small: "PP",
  play_small: "Play's",
  score_small: "Score",
  acc_small: "Acc",
}

let widgetSize = "big"
let context = new DrawContext()
switch(config.widgetFamily) {
  case "small":
    context.size = new Size(360, 360)
    widgetSize = "small"
    break;
  case "medium":
    context.size = new Size(720, 360)
    widgetSize = "big"
    break;
  case "large":
    context.size = new Size(720, 720)
    widgetSize = "big"
    break;
  default:
    context.size = new Size(720, 720)
    widgetSize = "big"
    break;
}
context.opaque = false
let widget = createWidget()
widget.backgroundImage = context.getImage()
const refreshMinutes = 30
let now = new Date()
let later = new Date(now.getTime() + refreshMinutes * 60000)
widget.refreshAfterDate = later

await widget.presentLarge()

Script.setWidget(widget)
Script.complete()

function createWidget() {
  let w = new ListWidget()
  w.backgroundColor = new Color("#333333", 0.4)

  
  let headerStack = w.addStack()
  headerStack.centerAlignContent()
  headerStack.url = "https://scoresaber.com/u/" + user_id
  if(widgetSize == "small")
    headerStack.addSpacer(null)
  
  
  if(widgetSize == "small") {
    let image = headerStack.addImage(avatarImg)
    image.imageSize = new Size(100, 100)
    image.cornerRadius = 25
    headerStack.addSpacer(null)
  } else {
    let image = headerStack.addImage(avatarImg)
    image.imageSize = new Size(40, 40)
    image.cornerRadius = 10
    headerStack.addSpacer(10)
    }
    
  let titleElement = null
  if(widgetSize == "big"){ 
    if(res.name.length > 13){
      let playerName = res.name.substring(0, 13)
  titleElement = headerStack.addText(playerName + "...")
} else {
  titleElement = headerStack.addText(res.name)
 }
  titleElement.textColor = new Color("#ffffff", 1)
  titleElement.textOpacity = 1
  titleElement.font = Font.mediumRoundedSystemFont(18)
  titleElement.lineLimit = 1
  
  if(user_id == "76561198064659288"){
    
    let pointYah = new Point(50, 50)
    context.drawImageAtPoint(denyah, pointYah)
    let pntYah = new Rect(200, 680, 500, 50)
    drawTextR("DM Raz0rBeam with instructions on how to get rid of this", pntYah, Color.white(), Font.lightRoundedSystemFont(20))
}

  if(user_id == "76561198017040275"){
    let isfmoment = headerStack.addImage(isfM)
  isfmoment.imageSize = new Size(300, 300)
let pntYah = new Rect(100, 530, 500, 50)
drawTextR("DM Raz0rBeam with instructions on how to get rid of this", pntYah, Color.white(), Font.lightRoundedSystemFont(20))
}

}
// Song Cover 
  if(widgetSize == "big"){
  const r = new Rect(475, 65, 150, 150)
  let cImage = context.drawImageInRect(songPic, r)
  
  if(config.widgetFamily == "medium"){
    let l1 = new Point(416, 0)
    let l2 = new Point(416, 500)
}
//Song Name
    let songnRect = new Rect(440, 235, 400, 400)

  if(songnam.length > 25){
    let namesong = songnam.substring(0, 25)
    let song = drawTextR((namesong + "..."), songnRect, Color.white(), Font.mediumRoundedSystemFont(20))
} else {
  let song = drawTextR(songnam, songnRect, Color.white(), Font.mediumRoundedSystemFont(20))
}
// acc
  let accRect = new Rect(455, 270, 200, 150)
  let accCalc = bScore / mScore
  let stringAcc = accCalc.toString()
  let rAcc1 = stringAcc.substring(2, 4)
  let rAcc2 = stringAcc.substring(5, 6)
  
  let acc = drawTextR((rAcc1 + "." + rAcc2 + "% - " + perP + "pp"), accRect, Color.white(), Font.mediumRoundedSystemFont(20))

  let ltRect = new Rect(505, 30, 200, 200)
  let lateText = drawTextR("Top Play", ltRect, Color.white(), Font.mediumRoundedSystemFont(25))
}


  

  


  w.addSpacer(10)
  
  let rankStack = w.addStack()
  if(widgetSize == "small"){
  rankStack.addSpacer(null)
}
  let rankElement = rankStack.addText(locales["ranking_"+widgetSize] + formatNumber(res.rank))
  rankElement.centerAlignText()
  rankElement.textColor = Color.white()
  rankElement.font = Font.mediumMonospacedSystemFont(12)


if(widgetSize == "big"){
  let newstack = w.addStack()
  let countryRankElement = newstack.addText(locales["cr_"+widgetSize] + " #" + formatNumber(res.countryRank) + " ")

image = newstack.addImage(flagImg)
image.imageSize = new Size(14, 9)
image.centerAlignImage()

countryRankElement.centerAlignText()
countryRankElement.font = Font.lightRoundedSystemFont(12)
  countryRankElement.textColor = Color.white()
rankStack.centerAlignContent()
}


if(widgetSize == "small"){
  rankStack.addSpacer(null)}

if(widgetSize == "big"){
  let ppElement = w.addText(locales["pp_"+widgetSize] + formatNumber(res.pp) + "pp")
  if (widgetSize == "big"){
  ppElement.textColor = Color.white()
  ppElement.font = Font.lightRoundedSystemFont(12)
}
}
  if(widgetSize == "big"){
    let plyElement = w.addText(locales["play_"+widgetSize] + formatNumber(res.scoreStats.totalPlayCount))

    plyElement.textColor = Color.white()
    plyElement.font = Font.lightRoundedSystemFont(12)
  
    let scoreElement = w.addText(locales["score_"+widgetSize] + formatNumber(res.scoreStats.totalScore))
    scoreElement.textColor = Color.white()
    scoreElement.font = Font.lightRoundedSystemFont(12)
   
  
  let accElement = w.addText(locales["acc_"+widgetSize] + Math.ceil(res.scoreStats.averageRankedAccuracy * 100) / 100 + "%")
  accElement.textColor = Color.white()
  accElement.font = Font.lightRoundedSystemFont(12)
  if(widgetSize == "small") 
    accElement.centerAlignText()
 }


  // Badges: all of this is basically worthless, but it breaks if i get rid of it and its not causing any harm so(some of this is actually important so dont delete it)
  let badgeX = 480
  let badgeY = 100

  
  if(context.drawImageAtPoint = 0){
    badges.addImage(avatarImg)
    badges.imageSize = (100, 100)
    badges.cornerRadius = 10
    badges.addText(resScore)
    badges.font = Font.blackMonospacedSystemFont(12)
  }
  
  
  
  if(config.widgetFamily == "large" || config.widgetFamily == null) {
  
    w.addSpacer(null)
  
    let history = res.histories.split(",")  
    history.push(res.rank)
    let min = Infinity
    let max = 0
  
    for(let i = 0; i < history.length; i++) {
      let tmp = parseInt(history[i])
      min = (tmp < min ? tmp : min)
      max = (tmp > max ? tmp : max)
    }
  
    let base = 100000
    let cmp = max - min
    if(cmp >= 0 && cmp <= 10) base = 4
    else if(cmp > 10 && cmp <= 100) base = 10
    else if(cmp > 100 && cmp <= 1000) base = 100
    else if(cmp > 1000 && cmp <= 10000) base = 1000
    else if(cmp > 10000 && cmp <= 100000) base = 10000
  
    min = Math.floor(min / base) * base
    max = Math.ceil(max / base) * base
    if(min == 1) min = 0
    if(max == 1) max = 2
  
    // Axis lines
    let p1 = new Point(graphRect.minX, graphRect.minY);    
    let p2 = new Point(graphRect.minX, graphRect.maxY); 
    drawLine(p1, p2, 1, Color.gray())
    p1 = new Point(graphRect.minX, graphRect.maxY);    
    p2 = new Point(graphRect.maxX, graphRect.maxY); 
    drawLine(p1, p2, 1, Color.gray())
  
    let steps = base * Math.ceil((max - min) / base) / ySegments
  
    // Y axis lines (rank range)
    let index = 0
    let y = 0
    while(y  < max) {
      y = min + index * steps
    
      if(y % 1 == 0) {
        let lineY = lerp(graphRect.minY, graphRect.maxY, percent(y, min, max))
        p1 = new Point(graphRect.minX, lineY)
        p2 = new Point(graphRect.maxX, lineY)
  
        drawLine(p1, p2, 1, Color.gray())
    
        context.setTextAlignedRight()
        const rankRect = new Rect(0, lineY-11, 100, 23);
        drawTextR(y + "", rankRect, Color.gray(), Font.boldRoundedSystemFont(19));  
      }
  
      index++
    }
  
    // X axis lines (days ago)
    for(let i = 0; i < 5; i++) {
      let x = lerp(0, history.length, i/4)
    
      let lineX = lerp(graphRect.minX, graphRect.maxX, i/4)  
      p1 = new Point(lineX, graphRect.minY)
      p2 = new Point(lineX, graphRect.maxY)
    
      drawLine(p1, p2, 1, Color.gray())
    
      context.setTextAlignedCenter()
      const rankRect = new Rect(lineX-50, graphRect.y+320, 100, 23);  
      let text = (history.length - Math.floor(x)) + ""  
      if(text == 0) text = "now"
	  drawTextR(text, rankRect, Color.gray(), Font.boldRoundedSystemFont(19));
    }
  
    const rankRect = new Rect(graphRect.x, graphRect.y - 40, graphRect.width, 30);
    drawTextR("Rank Over the Past " + history.length + " Days", rankRect, Color.white(), Font.boldRoundedSystemFont(24));
  
  
  
    // Graph
    for(let i = 0; i < history.length; i++) {
      if (i < history.length - 1) {
        p1 = new Point(lerp(graphRect.minX, graphRect.maxX, i / (history.length-1)), lerp(graphRect.minY, graphRect.maxY, percent(parseInt(history[i]), min, max)))  
        p2 = new Point(lerp(graphRect.minX, graphRect.maxX, (i+1) / (history.length-1)), lerp(graphRect.minY, graphRect.maxY, percent(parseInt(history[i+1]), min, max)))
  
        drawLine(p1, p2, 3, Color.cyan())
      }
    }
  }
  
  return w
}

function kFormatter(num){
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

function drawTextR(text, rect, color, font){
	context.setFont(font);
	context.setTextColor(color);
	context.drawTextInRect(new String(text).toString(), rect);
}

function drawLine(a, b, width, color) {
  const path = new Path()
  path.move(a)
  path.addLine(b)
  context.addPath(path)
  context.setStrokeColor(color)
  context.setLineWidth(width)
  context.strokePath()
}

function lerp(a, b, t) {
  return a * (1 - t) + b * t
}

function percent(x, a, b) {
  return (x - a) / (b - a)
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
