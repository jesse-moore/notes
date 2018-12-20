aqua	#00FFFF	
black	#000000	
blue	#0000FF	
fuchsia	#FF00FF	
gray	#808080	
green	#008000	
lime	#00FF00	
maroon	#800000	
navy	#000080	
olive	#808000	
orange	#FF7F00	
purple	#800080	
red		#FF0000	
silver	#C0C0C0	
teal	#008080	
white	#FFFFFF	
yellow

//LS1 = RSI240[1]<=41 and RSI240>41 // 4 Hour RSI-41 pr-2000 ls-500
//LS2 = RSI60[1]<=41 and RSI60>41 // 1 Hour RSI-41 pr-1000 ls-600
//LS3 = RSI15[1]<=33 and RSI15>33 // 15min RSI-33 pr-400 ls-800

//Rules for Bar Colors
//isLongEntry() => close > ma200 and close < ma5 and rsi < rsi_LOW
//isLongExit() => close > ma200 and close[1] < ma5[1] and high > ma5 and ((close[1] > ma200[1] and close[1] < ma5[1] and rsi[1] < 10) or (close[2] > ma200[2] and close[2] < ma5[2] and rsi[2] < 10) or (close[3] > ma200[3] and close[3] < ma5[3] and rsi[3] < 10) or (close[4] > ma200[4] and close[4] < ma5[4] and rsi[4] < 10) )
//isShortEntry() => close < ma200 and close > ma5 and rsi > 90
//isShortExit() => close < ma200 and close[1] > ma5[1] and low < ma5 and ((close[1] < ma200[1] and close[1] > ma5[1] and rsi[1] > 90) or (close[2] < ma200[2] and close[2] > ma5[2] and rsi[2] > 90) or (close[3] < ma200[3] and close[3] > ma5[3] and rsi[3] > 90) or (close[4] < ma200[4] and close[4] > ma5[4] and rsi[4] > 90) )
//Rules For MA Colors
col = ma5 >= ma200 ? true : ma5 < ma200 ? false : na

t_STOP=na
ts_ACT=isLONG==true and entry_PRICE+tsa_VAL<high?true:false
//t_STOP := isLONG==true and ts_OP==true and high[1]-ta_VAL<high-ta_VAL?high-ta_VAL:t_STOP[1]
if isLONG==true and ts_OP==true and ts_ACT[1]==false and ts_ACT==true and timeFrm
    t_STOP:=high-ta_VAL
if na(t_STOP[1])==false and t_STOP[1]<high-ta_VAL
    t_STOP:=high-ta_VAL
if na(t_STOP[1])==false and t_STOP[1]>high-ta_VAL
    t_STOP:=t_STOP[1]
if ts_OP==true and ts_ACT==true and low<t_STOP
    isLONG:=0
if isLONG==0
    t_STOP:=na
if ts_ACT==true
    exit_PRICE:=na
    stop_LOSS:=na



 default_qty_type=strategy.cash, 

longStg1 = rsi60[0]+2<rsi5[0] and rsi60[1]>rsi5[1] //5m RSI crosses over 60m RSI
longStg2 = (close5-open5)/open5>=.01 //Price increases 1% in 5m
longStg3 = rsiDiff[1]>=16 and rsiDiff[0]<16 and rsi5>40 and rsi5[1]>rsi5[2] //5m RSI is 15 or more points above 60m RSI
longStg4 = open240<close240 and open60<close60
longStg5 = close-XBTclose5>=17
longStg6 = XBTcloseDiff[1]>0 and XBTcloseDiff[1]<10 and XBTcloseDiff>=15 and open<close
longStg7 = XBTcloseDiff[3]<-12 or XBTcloseDiff[2]<-12 or XBTcloseDiff[1]<-12 //and XBTcloseDiff>=10

shortStg1 = XBTcloseDiff>=27
shortStg2 = rsi5[1]-rsi5>=14 and open[1]-close[1]>-10 and rsi5[1]>47
shortStg3 = (open-close)/open>.015 and open[3]-close[1]<0 and (close-low)/close<.01
shortStg4 = (open-close)/open>.01 and (open[3]-close[1])/open[3]<.01
shortStg5 = (open[1]-close[1])/close>-.02 and open[4]-close[2]<0

//@version=3

study(title="BTC/USD IND", shorttitle="BTCUSD_IND", overlay=true)
//RSI Indicators
src = close
len = input(14, minval=1, title="Length"), len2 = input(14, minval=1, title="2nd RSI Length")
up = rma(max(change(src), 0), len), down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down)), outRSI = security(tickerid, "60", rsi)
up2 = rma(max(change(src), 0), len2), down2 = rma(-min(change(src), 0), len2)
rsi2 = down2 == 0 ? 100 : up2 == 0 ? 0 : 100 - (100 / (1 + up2 / down2)), outRSI2 = security(tickerid, "5", rsi2)
rsi5 = outRSI2
rsi60 = outRSI
open60 = security(tickerid, "60", open)
close60 = security(tickerid, "60", close)
high60 = security(tickerid, "60", high)
low60 = security(tickerid, "60", low)
open5 = security(tickerid, "5", open)
close5 = security(tickerid, "5", close)
high5 = security(tickerid, "5", high)
low5 = security(tickerid, "5", low)


//Signals
int_hour = interval == 60

rsichange = outRSI[1]-rsi[0]
daychg = open60[0]<close60[0] ? (high60[0]-low60[0])/low60[0] : 0
rsitrd = outRSI[0]>=70 and outRSI[1]<70 and outRSI[2]<70 and outRSI[3]<70 and outRSI[4]<70 and outRSI[5]<70
test1 = daychg>=.02 and open60[0]<close60[0] and daychg[1]<.02 and daychg[2]<.02
test2 = true
rev = volume >= 1500 and volume < 2000 and open > close and int_hour
short = volume >= 2000 and open > close and int_hour and rsichange >= 5 and rsichange <=10  and rsi[0]>32
uprsi = input(title="UP POINTS", type=integer, defval=10)
downrsi = input(title="DOWN POINTS", type=integer, defval=10)
rsiup = outRSI[0]-outRSI[1] > uprsi
rsidown = outRSI[1]-outRSI[0] > downrsi
up1 = (close5-open5)/open5>=.01
down1 = (high5-low5)/high5>=.005
rsiDiff = rsi60-rsi5
rsiStr1 = rsiDiff>=15

//Signal Plot
//plotchar(short, char='S', color=red, size=size.tiny, editable=false)
//plotchar(rsiStr1, char='X', color=lime, size=size.tiny, editable=false)
//plotchar(up1, title="Long", char='L', color=(lime), size=size.small, editable=false)//5m interval
//plotchar(down1, title="DOWN", char='↓', color=(red), size=size.small, editable=false)//5m interval
//plotchar(rev, char='R', color=yellow, size=size.small, editable=false)
//plotchar(rsiup and test1, title="UP", char='↑', color=(green), size=size.small, editable=false)//60m interval
//plotchar(rsidown, char='↓', size=size.normal, color=red, editable=false)

//@version=3

study(title="XBT vs BTC", overlay=false)
XBTclose = security('BITMEX:XBTUSD', "5", close)
BTCclose = security('COINBASE:BTCUSD', "5", close)

diff = (XBTclose-BTCclose)/XBTclose >= .005




//Signal Plot
//plotchar(short, char='S', color=red, size=size.tiny, editable=false)
//plotchar(rsitrd, char='2', color=lime, size=size.tiny, editable=false)
//plotchar(test1, char='L', color=lime, size=size.tiny, editable=false)
//plotchar(rev, char='R', color=yellow, size=size.small, editable=false)
//plotchar(rsiup and test1, char='↑', color=green, size=size.normal, editable=false)

plotchar(diff, char='X', size=size.normal, color=red, editable=false)

//Chart
plot(XBTclose, title="RSI 60", style=linebr, linewidth=1, color=fuchsia)
plot(BTCclose, title="RSI 5", style=linebr, linewidth=1, color=orange)

//@version=3
study(title="RSI Color", shorttitle="RSI", overlay=true)
src = close, len = input(14, minval=1, title="Length")
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
//end premade RSI
int_hour = interval == 60
oversold = rsi < 30
overbought = rsi > 70
rsichange = rsi[1]-rsi[0]
daychg = open[0]<close[0] ? (high[0]-low[0])/low[0] : 0
rsitrd = rsi[0]>=70 and rsi[1]<70 and rsi[2]<70 and rsi[3]<70 and rsi[4]<70 and rsi[5]<70
test1 = daychg>=.02 and open[0]<close[0] and daychg[1]<.02 and daychg[2]<.02
test2 = true
rev = volume >= 1500 and volume < 2000 and open > close and int_hour
short = volume >= 2000 and open > close and int_hour and rsichange >= 5 and rsichange <=10  and rsi[0]>32
barcolor(oversold? #0000FF : overbought? #ff00ff : na )
uprsi = input(title="UP POINTS", type=integer, defval=10)
downrsi = input(title="DOWN POINTS", type=integer, defval=10)
rsiup = rsi[0]-rsi[1] > uprsi
rsidown = rsi[1]-rsi[0] > downrsi
plotchar(short, char='S', color=red, size=size.tiny, editable=false)
plotchar(rsitrd, char='2', color=lime, size=size.tiny, editable=false)
//plotchar(test1, char='L', color=lime, size=size.tiny, editable=false)
//plotchar(rev, char='R', color=yellow, size=size.small, editable=false)
plotchar(rsiup and test1, char='↑', color=green, size=size.normal, editable=false)
//plotchar(rsidown, char='↓', size=size.normal, color=red, editable=false)

//@version=3
study(title="RSI Color", shorttitle="RSI", overlay=false)
src = close, len = input(14, minval=1, title="Length")
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
//end premade RSI
rsi60 = (rsi[0]+ rsi[1]+ rsi[2]+ rsi[3]+ rsi[4]+ rsi[5]+ rsi[6]+ rsi[7]+ rsi[8]+ rsi[9]+ rsi[10]+ rsi[11])/12
int_hour = interval == 60
oversold = rsi < 30
overbought = rsi > 70
rsichange = rsi[1]-rsi[0]
daychg = open[0]<close[0] ? (high[0]-low[0])/low[0] : 0
rsitrd = rsi[0]>=70 and rsi[1]<70 and rsi[2]<70 and rsi[3]<70 and rsi[4]<70 and rsi[5]<70
test1 = daychg>=.02 and open[0]<close[0] and daychg[1]<.02 and daychg[2]<.02
test2 = true
rev = volume >= 1500 and volume < 2000 and open > close and int_hour
short = volume >= 2000 and open > close and int_hour and rsichange >= 5 and rsichange <=10  and rsi[0]>32
barcolor(oversold? #0000FF : overbought? #ff00ff : na )
uprsi = input(title="UP POINTS", type=integer, defval=10)
downrsi = input(title="DOWN POINTS", type=integer, defval=10)
rsiup = rsi[0]-rsi[1] > uprsi
rsidown = rsi[1]-rsi[0] > downrsi
plot(up, title='Title', color=#00ffaa, linewidth=2, style=line)
band1 = hline(70)
band0 = hline(30)
band2 = hline(50)
fill(band1, band0, color=purple, transp=100)

//@version=3
strategy("RSI Strategy", overlay=true, default_qty_value=2)
//RSI Indicators
src = close
len = input(14, minval=1, title="Length"), len2 = input(14, minval=1, title="2nd RSI Length")
up = rma(max(change(src), 0), len), down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down)), rsi60 = security(tickerid, "60", rsi)
up2 = rma(max(change(src), 0), len2), down2 = rma(-min(change(src), 0), len2)
rsi2 = down2 == 0 ? 100 : up2 == 0 ? 0 : 100 - (100 / (1 + up2 / down2)), rsi5 = security(tickerid, "5", rsi2)
open60 = security(tickerid, "60", open)
close60 = security(tickerid, "60", close)
high60 = security(tickerid, "60", high)
low60 = security(tickerid, "60", low)
open5 = security(tickerid, "5", open)
close5 = security(tickerid, "5", close)
high5 = security(tickerid, "5", high)
low5 = security(tickerid, "5", low)


//Signals
int_hour = interval == 60

rsichange = rsi60[1]-rsi[0]
daychg = open60[0]<close60[0] ? (high60[0]-low60[0])/low60[0] : 0
rsitrd = rsi60[0]>=70 and rsi60[1]<70 and rsi60[2]<70 and rsi60[3]<70 and rsi60[4]<70 and rsi60[5]<70
test1 = daychg>=.02 and open60[0]<close60[0] and daychg[1]<.02 and daychg[2]<.02
test2 = true
rev = volume >= 1500 and volume < 2000 and open > close and int_hour
short = volume >= 2000 and open > close and int_hour and rsichange >= 5 and rsichange <=10  and rsi[0]>32
uprsi = input(title="UP POINTS", type=integer, defval=10)
downrsi = input(title="DOWN POINTS", type=integer, defval=10)
rsiup = rsi60[0]-rsi60[1] > uprsi
rsidown = rsi60[1]-rsi60[0] > downrsi
down1 = (open5-close5)/open5>=.01

longStr2 = 
longStg1 = (close5-open5)/open5>=.01


length = input( 14 )
overSold = input( 30 )
overBought = input( 70 )
price = close

// === BACKTEST RANGE ===
FromMonth = input(defval = 02, title = "From Month", minval = 1)
FromDay   = input(defval = 01, title = "From Day", minval = 1)
FromYear  = input(defval = 2018, title = "From Year", minval = 2014)
timeFrm = time > timestamp(FromYear, FromMonth, FromDay, 00, 00)

// === SERIES SETUP ===
buy  = crossover(sma(close, 14), sma(close, 28))
sell = crossunder(sma(close, 14), sma(close, 28))

// === ALERTS ===
strategy.entry("L", strategy.long, when=(longStg1 and timeFrm))
strategy.exit("exit", "L", profit = 5000, loss = 10000)
//strategy.close("L", when=(sell))

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)

//Created By ChrisMoody on 8/15/2014
///RSI with ability to change first RSI to a different Timeframe.
//option to Plot 2nd RSI to show different Timeframes on same chart

study(title="CM_Ultimate RSI MTF", shorttitle="CM_Ult_RSI_MTF", precision=0)
src = close
len = input(14, minval=1, title="Length")
upLine = input(70, minval=50, maxval=90, title="Upper Line Value?")
lowLine = input(30, minval=10, maxval=50, title="Lower Line Value?")
sml = input(true, title="Show Mid Line?")
sbh = input(true, title="Show Back Ground Highlights When RSI is Above/Below High/Low Lines?")
sch = input(true, title="Show Back Ground Highlights When RSI Cross?")
sl = input(true, title="Show 'B' and 'S' Letters When RSI Crosses High/Low Line?")
useCurrentRes = input(true, title="Use Current Chart Resolution?")
resCustom = input(title="Use Different Timeframe? Uncheck Box Above", type=resolution, defval="60")
ssRSI = input(false, title="Show 2nd RSI?")
resCustom2 = input(title="Use 2nd RSI? Check Box Above", type=resolution, defval="D")
useCurrentRes2 = input(false, title="Use 2nd RSI Plot On Samet Timeframe?")
len2 = input(14, minval=1, title="2nd RSI Length")

res = useCurrentRes ? period : resCustom
res2 = useCurrentRes2 ? period : resCustom2

up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
outRSI = security(tickerid, res, rsi)

up2 = rma(max(change(src), 0), len2)
down2 = rma(-min(change(src), 0), len2)
rsi2 = down2 == 0 ? 100 : up2 == 0 ? 0 : 100 - (100 / (1 + up2 / down2))
outRSI2 = security(tickerid, res2, rsi2)

aboveLine = outRSI > upLine ? 1 : 0
belowLine = outRSI < lowLine ? 1 : 0
crossUp = outRSI[1] <  lowLine and outRSI > lowLine ? 1 : 0
crossDn = outRSI[1] >  upLine and outRSI < upLine ? 1 : 0

bgcolor(sbh and aboveLine ? red : na, transp=70)
bgcolor(sbh and belowLine ? green : na, transp=70)
bgcolor(sch and crossUp ? lime : na, transp=40)
bgcolor(sch and crossDn ? red : na, transp=40)

plot(outRSI, title="RSI", style=line, linewidth=3, color=aqua)
plot(ssRSI and outRSI2 ? outRSI2 : na, title="2nd RSI - Different Time Frame?", style=linebr, linewidth=4, color=orange)
p1 = plot(upLine, title= "Upper Line", style=solid, linewidth=3, color=red)
p2 = plot(lowLine, title= "Lower Line", style=solid, linewidth=3, color=lime)
plot(sml and 50 ? 50 : na, title="Mid Line", style=linebr, linewidth=2, color=gray)
plotchar(sl and crossUp ? crossUp : na, title="Buy Signal", char='B', location=location.bottom, color=lime, transp=0, offset=0)
plotchar(sl and crossDn ? crossDn : na, title="Sell Signal", char='S', location=location.top, color=red, transp=0, offset=0)
fill(p1, p2, color=silver, transp=70)

// BTC INDICATORS
//@version=3

study(title="BTC/USD IND", shorttitle="BTCUSD_IND", overlay=true)
s = input(title="Session", defval=240, options=[240, 60, 15, 5])
//RSI Indicators
src = close
len = input(14, minval=1, title="Length"), up = rma(max(change(src), 0), len), down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
RSI5 = security(tickerid, "5", rsi)
RSI15 = security(tickerid, "15", rsi)
RSI60 = security(tickerid, "60", rsi)
RSI240 = security(tickerid, "240", rsi)

// Price Indicators
open60 = security(tickerid, "60", open)
close60 = security(tickerid, "60", close)
high60 = security(tickerid, "60", high)
low60 = security(tickerid, "60", low)
open15 = security(tickerid, "15", open)
close15 = security(tickerid, "15", close)
high15 = security(tickerid, "15", high)
low15 = security(tickerid, "15", low)
open5 = security(tickerid, "5", open)
close5 = security(tickerid, "5", close)
high5 = security(tickerid, "5", high)
low5 = security(tickerid, "5", low)

// Volume Indicators
vol1 = security(tickerid, "1", volume)
BTC_LONGS_CHNG = security("BITFINEX:BTCUSDLONGS", "1", close)[1] - security("BITFINEX:BTCUSDLONGS", "1", close)
BTC_SHORTS_CHNG = security("BITFINEX:BTCUSDSHORTS", "1", close)[1] - security("BITFINEX:BTCUSDSHORTS", "1", close)

// LONG Signals
RSI_IND_LONG = RSI15[1]<=33 and RSI15>33 //RSI out of oversold

// SHORT Signals
RSI_IND_SHORT = RSI15[1]-RSI15>=15 and RSI15[1]<60
price_UP = (high5-low5)/low5>=.01
RSI_DOWN = RSI5<=30
VOL_VAR = period=="1" ? 100 : period=="60" ? 900 : 10000
VOL_VAR_2 = period=="1" ? 100 : period=="60" ? 900 : 10000
SHORTS = BTC_SHORTS_CHNG>=VOL_VAR and BTC_LONGS_CHNG<VOL_VAR_2
SHORTS_2 = BTC_LONGS_CHNG<=-VOL_VAR_2 and BTC_SHORTS_CHNG>-VOL_VAR
LONGS = BTC_LONGS_CHNG>=VOL_VAR_2 and BTC_SHORTS_CHNG<VOL_VAR
LONGS_2 = BTC_LONGS_CHNG>=-VOL_VAR_2 and BTC_SHORTS_CHNG<-VOL_VAR
LONGS_SHORTS = BTC_LONGS_CHNG<=-VOL_VAR_2 and BTC_SHORTS_CHNG<=-VOL_VAR
LONGS_SHORTS_2 = BTC_LONGS_CHNG>VOL_VAR_2 and BTC_SHORTS_CHNG>VOL_VAR
//PRICE_DOWN = (open5-close5)/open5>=.007 and (open5[1]-close5[1])/open5<=.007 and (high15[2]-low15[1])/high15[2]<=.007 and close5-low5<=25
PRICE_DOWN = RSI5[1]>=38 and RSI5<33 and RSI15>=33
VOL = vol1>=7000000


//Signal Plots
plot(security('BITMEX:XBT', period, close), color=(white))
//plot(security('BITMEX:XBT', period, low), color=(maroon))
plot(ema(security(ticker, period, open), 4), color=(fuchsia))
//plotshape(RSI_IND_LONG, title="Long", style=shape.triangleup, color=(lime), size=size.small, editable=false)
//plotshape(PRICE_DOWN, title="Long", style=shape.triangledown, color=(red), size=size.small, editable=false)
plotshape(SHORTS, title="SHORT", style=shape.triangledown, color=(red), size=size.small)
plotshape(SHORTS_2, title="SHORT_2", style=shape.triangledown, color=(orange), size=size.small)
plotshape(LONGS, title="LONG", style=shape.triangleup, color=(lime), size=size.small)
plotshape(LONGS_2, title="LONG_2", style=shape.triangleup, color=(yellow), size=size.small)
plotshape(LONGS_SHORTS, title="LONG_SHORTS", style=shape.square, color=(silver), size=size.small)
plotshape(LONGS_SHORTS_2, title="LONG_SHORTS_2", style=shape.square, color=(white), size=size.small)
//plotchar(RSI_DOWN, title="Long", char='X', color=(orange), size=size.small, editable=false)//5m interval

// Old Signals
//int_hour = interval == 60
//rsichange = outRSI[1]-rsi[0]
//daychg = open60[0]<close60[0] ? (high60[0]-low60[0])/low60[0] : 0
//rsitrd = outRSI[0]>=70 and outRSI[1]<70 and outRSI[2]<70 and outRSI[3]<70 and outRSI[4]<70 and outRSI[5]<70
//test1 = daychg>=.02 and open60[0]<close60[0] and daychg[1]<.02 and daychg[2]<.02
//test2 = true
//rev = volume >= 1500 and volume < 2000 and open > close and int_hour
//short = volume >= 2000 and open > close and int_hour and rsichange >= 5 and rsichange <=10  and rsi[0]>32
//uprsi = input(title="UP POINTS", type=integer, defval=10)
//downrsi = input(title="DOWN POINTS", type=integer, defval=10)
//rsiup = outRSI[0]-outRSI[1] > uprsi
//rsidown = outRSI[1]-outRSI[0] > downrsi
//up1 = (close5-open5)/open5>=.01
//down1 = (high5-low5)/high5>=.005
//rsiDiff = rsi60-rsi5
//rsiStr1 = rsiDiff>=15

//Old Signal Plots
//plotchar(short, char='S', color=red, size=size.tiny, editable=false)
//plotchar(rsiStr1, char='X', color=lime, size=size.tiny, editable=false)
//plotchar(up1, title="Long", char='L', color=(lime), size=size.small, editable=false)//5m interval
//plotchar(down1, title="DOWN", char='↓', color=(red), size=size.small, editable=false)//5m interval
//plotchar(rev, char='R', color=yellow, size=size.small, editable=false)
//plotchar(rsiup and test1, title="UP", char='↑', color=(green), size=size.small, editable=false)//60m interval
//plotchar(rsidown, char='↓', size=size.normal, color=red, editable=false)

// STRATEGY 2
strategy("RSI Strategy 2", overlay=true, default_qty_value=1)
// === BACKTEST INPUTS ===
FromMonth = input(defval = 03, title = "From Month", minval = 1)
FromDay   = input(defval = 20, title = "From Day", minval = 1)
FromYear  = input(defval = 2018, title = "From Year", minval = 2014)
ord_type = input(defval = true, title = "Long", type=bool)
side = ord_type?"long":"short"
cross_type = input(defval = true, title = "Crossing Up or Down", type=bool)
rsi_type = input(defval = false, title = "RSI High or Low", type=bool)
ts_OP = input(title = "Use Trailing Stop",defval = false, type=bool)
len = input(title = "RSI Lenth", defval = 14, type = integer)
pr_VAL =input(defval = 300, title = "Profit", step = 25, minval = 1)
pr = ts_OP ? na : pr_VAL
ls_VAL =input(defval = 625, title = "Loss", step = 25, minval = 1)
tp_VAL =input(defval = 100, title = "Trail Activation Price", step = 25, minval = 1)
tp = ts_OP ? tp_VAL : na
os_VAL =input(defval = 100, title = "Trail Amount", step = 25, minval = 1)
os = ts_OP ? os_VAL : na
rsi_HIGH = input(defval = 60, title="RSI HIGH")
rsi_LOW = input(defval = 47, title="RSI LOW")
RSI_PERIOD = input(defval = "15",type=string, title="RSI PERIOD") 
maFast_VAL = input(defval = 5, title="MA Fast", step = 5)
maSlow_VAL = input(defval = 200, title="MA Slow", step = 5)

entry_PRICE = strategy.position_avg_price
index_CLOSE = security('BITMEX:XBT', "5", close)
index_STOP = entry_PRICE-index_CLOSE>=ls_VAL/10
ls = index_STOP ? ls_VAL : ls_VAL

timeFrm = time > timestamp(FromYear, FromMonth, FromDay, 00, 00)
wrkhr = hour >= 0 and hour <= 24
// === Indicators ===
//RSI Indicators
src = close
up = rma(max(change(src), 0), len), down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
RSI0 = security(tickerid, RSI_PERIOD, rsi)
RSI5 = security(tickerid, "5", rsi)
RSI15 = security(tickerid, "15", rsi)
RSI60 = security(tickerid, "60", rsi)
RSI240 = security(tickerid, "240", rsi)
// PRICE Indicators
open240 = security(tickerid, "240", open)
close240 = security(tickerid, "240", close)
high240 = security(tickerid, "240", high)
low240 = security(tickerid, "240", low)
open60 = security(tickerid, "60", open)
close60 = security(tickerid, "60", close)
high60 = security(tickerid, "60", high)
low60 = security(tickerid, "60", low)
open5 = security(tickerid, "5", open)
close5 = security(tickerid, "5", close)
high5 = security(tickerid, "5", high)
low5 = security(tickerid, "5", low)
XBTclose60 = security('BITMEX:XBT', "60", close)
XBTopen60 = security('BITMEX:XBT', "60", open)
XBThigh60 = security('BITMEX:XBT', "60", high)
XBTlow60 = security('BITMEX:XBT', "60", low)
XBThigh5 = security('BITMEX:XBT', "5", high)
XBTlow5 = security('BITMEX:XBT', "5", low)
XBTopen5 = security('BITMEX:XBT', "5", open)
XBTclose5 = security('BITMEX:XBT', "5", close)
// EMA Indicators
EMA21 = ema(close, 21)
EMA50 = ema(close, 50)
EMA100 = ema(close, 100)
EMA200 = ema(close, 200)
// === CALCULATIONS ===
XBTbelow = open-XBTopen60>20
XBTabove = XBTclose60-close>10
XBThighDiff = high-XBThigh60
XBTlowDiff = low-XBTlow60
XBTopenDiff = open-XBTopen60
XBTcloseDiff = close-XBTclose5

//MovAvg's Code
maFast = sma(close,maFast_VAL)
maSlow= sma(close, maSlow_VAL)

// Cent Strategy
maUP = maFast>maSlow
CS1a = (close[1]-close[1]%100)>(close-close%100)
CS1 = CS1a and maUP and rsi<rsi_LOW
CS0 = maUP and close[1]%100>0 and close%100==0

// === LONG Strategies ===
LS0 = RSI0[1]<=rsi_LOW and RSI0>rsi_LOW // 4 Hour RSI-41 pr-2000 ls-500
LS00 = ord_type ? LS0 : false

// === SHORT Strategies ===
SS0 = RSI0[1]>=rsi_HIGH and RSI0<rsi_HIGH
SS00 = ord_type ? false : SS0

CULow = RSI0[1]<=rsi_LOW and RSI0>rsi_LOW
CDLow = RSI0[1]>=rsi_LOW and RSI0<rsi_LOW
CUHigh = RSI0[1]<=rsi_HIGH and RSI0>rsi_HIGH
CDHigh = RSI0[1]>=rsi_HIGH and RSI0<rsi_HIGH
VS0 = cross_type and rsi_type?CUHigh:cross_type==false and rsi_type?CDHigh:cross_type and rsi_type==false?CULow:CDLow 
VS1 = maFast[1]<maSlow[1] and maFast>maSlow and RSI0<rsi_LOW
VS2 = rsi[1]<=rsi_LOW and rsi>rsi_LOW and maFast<maSlow
// === Signals ===
//plotchar(longStg7, char='X', color=fuchsia, size=size.tiny, editable=false)
//plotchar(shortStg2, char='X', color=fuchsia, size=size.tiny, editable=false)

// === LONG ===
strategy.entry("L", strategy.long, when=(CS1 and timeFrm and side=="long"))
strategy.exit("exit", "L", trail_points = tp, trail_offset = os, loss = ls, profit = pr)

// === SHORT ===
strategy.entry("S", strategy.short, when=(VS0 and timeFrm and side=="short"))
strategy.exit("exit", "S", trail_points = tp, trail_offset = os, loss = ls, profit = pr)

col = maFast >= maSlow ? lime : maFast < maSlow ? red : na
plot(maFast, color=col, title="5 SMA", style=line, linewidth=3)
plot(maSlow, color=col, title="200 SMA", style=circles, linewidth=2)
XBT_Low = security("BITMEX:XBT", period, low)
plot(XBT_Low, color=aqua, title="XBT Index", style=line, linewidth=2)
plotshape(CS1a, style=shape.xcross, size=size.small, color=lime, editable=false)
