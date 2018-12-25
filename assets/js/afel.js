var currentdisplay = "mix";

$( document ).ready(function() {
    showMixed();
    showGameTime();
    $("#nggobut").click(function(){
	showChartPage();
    });
    $("#closeviewgoalbut").click(function(){
	showChartPage();
    });
    $("#plusbut").click(function(){
	toggleActions();
    });
    $("#goalaction").click(function(){
	toggleActions();
	showGoalPage();
    });
    $("#goalviewaction").click(function(){
	toggleActions();
	showViewGoalPage();
    });

    $("#backbut").click(function(){
	showFrontPage();
    });
    window.onhashchange = function(){
	if (window.location.hash == ""){
	    afelLog("back", "frontpage", "went back to frontpage with the back button");
	    showFrontPage();
	}
    };
    $("#lmbut").click(function(){
	alert("not yet implemented");	
    });
    $("#lwbut").click(function(){
	alert("not yet implemented");	
    });
    $("#ldbut").click(function(){
	alert("not yet implemented");	
    });
    $("#mixbut").click(function(){
	afelLog("displaychange", "mixed", "change the display to mixed");
	showMixed();
	switchCurrentDisplay("mix");
    });
    $("#gtimebut").click(function(){
	afelLog("gamedisplaychange", "time", "change the display of games to time spent");
	showGameTime();
	switchGameDisplay("time");
    });
    $("#gtrybut").click(function(){
	afelLog("gamedisplaychange", "try", "change the display of games to number of attempts");
	showGameTry();
	switchGameDisplay("try");
    });
    $("#gscorebut").click(function(){
	afelLog("gamedisplaychange", "score", "change the display of games to score");
	showGameScore();
	switchGameDisplay("score");
    });
    $("#intbut").click(function(){
	afelLog("displaychange", "intensity", "change the display to intensity");
	// showIntensity();
	var a = getDataArray(data, 'intensity');
	showScopeCloud(a, 'scopecloud', 'Topics of learning resources by amount of work')
	switchCurrentDisplay("int");
    });
    $("#covbut").click(function(){
	afelLog("displaychange", "coverage", "change the display to coverage");
	var a = getDataArray(data, 'coverage');
	showScopeCloud(a, 'scopecloud', 'Topics of learning resources by topic coverage')
	switchCurrentDisplay("cov");
    });
    $("#divbut").click(function(){
	afelLog("displaychange", "diversity", "change the display to diversity");
	var a = getDataArray(data, 'diversity');
	showScopeCloud(a, 'scopecloud', 'Topics of learning resources by diversity')	
	switchCurrentDisplay("div");
    });
    $("#combut").click(function(){
	afelLog("displaychange", "complexity", "change the display to complexity");
	var a = getDataArray(data, 'complexity');
	showScopeCloud(a, 'scopecloud', 'Topics of learning resources by complexity')	
	switchCurrentDisplay("com");
    });
    $("#workmore").click(function(){
	$("#workmore").addClass("dselected")
	$("#inccoverage").removeClass("dselected")
	$("#inccomplexity").removeClass("dselected")
	$("#incdiversity").removeClass("dselected")
	$("#gtip").html("The Didactalia AFEL app monitors your activity on Didactalia. It can remind you to focus on the topic you have choosen and to simply read more, watch more and do more on that topic.");
    });
    $("#inccoverage").click(function(){
	$("#workmore").removeClass("dselected")
	$("#inccoverage").addClass("dselected")
	$("#inccomplexity").removeClass("dselected")
	$("#incdiversity").removeClass("dselected")
	$("#gtip").html("To increase coverage, try to focus on activities that explore different areas of the topic you have selected. A given learning scope can be wide and you can explore it more completely by choosing resources that are wide themselves, or by carrying out a number of specialised and varied activities.");	
    });
    $("#inccomplexity").click(function(){
	$("#workmore").removeClass("dselected")
	$("#inccoverage").removeClass("dselected")
	$("#inccomplexity").addClass("dselected")
	$("#incdiversity").removeClass("dselected")
	$("#gtip").html("As you become more familiar with a topic, you can expect to be able to tackle more and more complex activities. They migh seem more difficult, but they also help you go deeper and become more specialised in the topic you have choosen.");
    });
        $("#incdiversity").click(function(){
	$("#workmore").removeClass("dselected")
	$("#inccoverage").removeClass("dselected")
	$("#inccomplexity").removeClass("dselected")
	    $ ("#incdiversity").addClass("dselected")
	     $("#gtip").html("To increase diversity, try to focus on activities from different sources and different authors from the ones you usually consider. You might especially want to consider resources from authors living in a different place, of a different gender, of a different age group or with a different political view from the ones you would usually go for.");
	});
    $("#ngmonthly").click(function(){
	$("#ngmonthly").addClass("tselected")
	$("#ngweekly").removeClass("tselected")
	$("#ngdaily").removeClass("tselected")
    });
    $("#ngweekly").click(function(){
	$("#ngmonthly").removeClass("tselected")
	$("#ngweekly").addClass("tselected")
	$("#ngdaily").removeClass("tselected")
    });
    $("#ngdaily").click(function(){
	$("#ngmonthly").removeClass("tselected")
	$("#ngweekly").removeClass("tselected")
	$("#ngdaily").addClass("tselected")
    });
});

function toggleActions(){
    if ($('#actions').css('display') == "none")
	$('#actions').css('display', 'block');
    else
	$('#actions').css('display', 'none');
}

function switchCurrentDisplay(nd){
    $('#'+currentdisplay+'but').removeClass("dselected");
    currentdisplay = nd;
    $('#'+nd+'but').addClass("dselected");
}

var gamedisplay = "time";

function switchGameDisplay(nd){
    $('#g'+gamedisplay+'but').removeClass("dselected");
    gamedisplay = nd;
    $('#g'+nd+'but').addClass("dselected");
}

function showMixed(){
    var a1 = getDataArray(data, 'coverage');
    var a2 = getDataArray(data, 'diversity');
    var a3 = getDataArray(data, 'complexity');
    var a4 = getDataArray(data, 'intensity');
    var a = [];
    for (var i in a1){
	var w = (a1[i].weight+a1[i].weight+a1[i].weight+a4[i].weight)/4;
	if (w < 0.2) w = 0.2;
	a.push({"name": a1[i].name, "weight": w});
    }
    console.log(a);
    showScopeCloud(a,'scopecloud', "Topics of learning resources by mix of indicators");
}

function showGameTime(){
    var td = {};
    for (var i in game_data){
	var g = game_data[i];
	console.log(g);
	if (g.resource && g.resource.title){
	    var title = extractTitle(g.resource.title, "en");
	    if (td[title]) td[title] += parseInt(g.elapsedTime);
	    else td[title] = parseInt(g.elapsedTime);
	}
    }
    var a = [];
    for (var i in td){
	a.push({"name": i, "weight": td[i]/1000/60});
    }
    console.log(a);
    showGameCloud(a, "gamecloud", "Games played by time spent playing");
}

function showGameScore(){
    var td = {};
    for (var i in game_data){
	var g = game_data[i];
	console.log(g);
	if (g.resource && g.resource.title){
	    var title = extractTitle(g.resource.title, "en");
	    if (td[title]) {
		td[title].sum += parseInt(g.score)/parseInt(g.totalElements);
		td[title].count++;
	    }
	    else td[title] = {"sum": parseInt(g.score)/parseInt(g.totalElements), "count": 1};
	}
    }
    var a = [];
    for (var i in td){
	a.push({"name": i, "weight": td[i].sum/td[i].count});
    }
    console.log(a);
    showGameCloud(a, "gamecloud", "Games played by score");
}


function showGameTry(){
    var td = {};
    for (var i in game_data){
	var g = game_data[i];
	console.log(g);
	if (g.resource && g.resource.title){
	    var title = extractTitle(g.resource.title, "en");
	    if (td[title]) td[title]++;
	    else td[title] = 1;
	}
    }
    var a = [];
    for (var i in td){
	a.push({"name": i, "weight": td[i]});
    }
    console.log(a);
    showGameCloud(a, "gamecloud", "Games played by number of times playing");
}

function extractTitle(t,l){
    var a = t.split("|||");
    for (var i in a){
	if (a[i].indexOf('@'+l)!=-1) {
	    return a[i].substring(0, a[i].length-3);
	}
    }
    return t;
}

function showIntensity(){
    var a = getScopeCountsArray(data);    
    showScopeCloud(a,'scopecloud', "Topics of learning resources by intensity");
}

function getScopeCountsArray(data){
    var map = data.reduce(function(map, item) {
	var name = item.scope
	var topic = +1
	map[name] = (map[name] || 0) + topic
	return map
    }, {})
    var tmp = Object.keys(map).map(function(name) {
	return {
	    name: name,
	    score: map[name]
	}
    })
    var max=0;
    for (var i in tmp){
	if (tmp[i].score>max) max = tmp[i].score;	
    }
    var res = [];
    for (var i in tmp){
	var w = parseFloat(tmp[i].score)/parseFloat(max);
	if (w<0.2) w = 0.2;
	res.push({"name": tmp[i].name, "weight": w});
    }
    console.log("count");
    console.log(res);
    return res;
}

var scopeclouddata = {}

function extractDomain(url) {
    var hostname;
    if (url.indexOf("//") > -1) {
	hostname = url.split('/')[2];
    }
    else {
	hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
}

// TODO: Make this better
function getDataArray(data, field){
    if (scopeclouddata[field]) return scopeclouddata[field]
    data.reverse()
    var scopes = {}
    var doms = []
    var tags = []
    for (var i in data){
	const scs = data[i]["scope"].replace(/\[/g, "").replace(/\]/g, "").replace(/"/g, "").split(",")
	const url = data[i]["resource"]
	const dom = extractDomain(url)
	var diversity = 0
	if (doms.indexOf(dom)==-1){
	    doms.push(dom)
	    diversity = 1/parseFloat(doms.length)
	}
	var coverage = 0.0;
	for (var j in scs){
	    const t = scs[j].trim()
	    if (tags.indexOf(t)==-1){
		tags.push(t)
		coverage += 1.0
	    }
	}
	coverage = coverage/parseFloat(tags.length)
	for (var j in scs){
	    const t = scs[j].trim()
	    if (scopes[t]){
		scopes[t].count++
		scopes[t].smogsum += parseInt(data[i]["complexity"])
		scopes[t].divsum += diversity
		scopes[t].covsum += coverage
	    } else {
		scopes[t] = {count: 1, covsum: coverage, smogsum: parseInt(data[i]["complexity"]), divsum: diversity}
	    }
	}
    }
    console.log(scopes)
    data.reverse()
    scopeclouddata = {"coverage": [], "intensity":[], "diversity": [], "complexity": []}
    for (var s in scopes){
	const count = parseFloat(scopes[s].count)
	if (count > 2.0){
	    scopeclouddata.coverage.push({name: s, weight: scopes[s].covsum/count})
	    scopeclouddata.diversity.push({name: s, weight: scopes[s].divsum/count})
	    scopeclouddata.complexity.push({name: s, weight: (scopes[s].smogsum/count)/25.0})
	    scopeclouddata.intensity.push({name: s, weight: count/parseFloat(data.length)})
	}
    }
    console.log(scopeclouddata)
    return scopeclouddata[field]
	
/*    var map = data.reduce(function(map, item) {
	var name = item.scope
	var topic = +item[field]
	map[name] = (map[name] || 0) + topic
	return map
    }, {})
    
    var scope_topic_array = Object.keys(map).map(function(name) {
	return {
	    name: name,
	    score: map[name]
	}
    })
    
    //console.log(scope_topic_array)
    var maxtopicweight = getMax(scope_topic_array, "score");
    var mintopicweight = getMin(scope_topic_array, "score");
    //console.log(maxtopicweight.score);
    //console.log(mintopicweight.score);
    
    scope_topic_array.forEach(function(a) {
	var t= normalize(a.score,mintopicweight.score,maxtopicweight.score);
	    a.weight=t;
    });
    console.log(scope_topic_array);
    return scope_topic_array; */
}


function showScopeCloud(a,e,t){
Highcharts.chart(e, {
chart: {
        borderColor: '#ffffff',
        borderWidth: 2,
        type: 'line'
},
  credits: {
        enabled: false
  },
    tooltip: {
	enabled: false
    },
    series: [{
        type: 'wordcloud',
        data: a
    }],
    title: {
      text: t,
            style: {"fontSize": "14px"},
            verticalAlign: 'bottom'
    },
  plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
click(this);
                        
                    }
                }
            }
        }
    },
});

}


function showGameCloud(a,e,t){
Highcharts.chart(e, {
chart: {
        borderColor: '#ffffff',
        borderWidth: 2,
        type: 'line'
},
  credits: {
        enabled: false
  },
    tooltip: {
	enabled: false
    },
    series: [{
        type: 'wordcloud',
        data: a
    }],
    title: {
      text: t,
            style: {"fontSize": "14px"},
            verticalAlign: 'bottom'
    },
  plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
			afelLog("view game", this.name, "clicked on game "+this.name);
			window.location.hash = this.name;
			currentlyshowing = this.name;
			showGamePage();                        
                    }
                }
            }
        }
    },
});
    var st='<div id="gamelist">'
    a.sort(function (a,b){return b.weight-a.weight})
    for(var g in a){
	st+='<div class="recresult"> <a href="javascript:clickedOnGame(\''+a[g].name+'\');">'+a[g].name+'</a></div>'
    }
    st+='</div>'
    $('#'+e).html(st);
}

function clickedOnGame(name){
    afelLog("view game", name, "clicked on game "+name);
    window.location.hash = name;
    currentlyshowing = name;
    showGamePage();                        
}

// ------------- chart page  ----------------

function showChartPage(){
    // include change the url so that we can go back...
    if (config.show_rec) showRecommendations();
    showPolar();
    if (config.show_time) showTimes();
    if (config.show_act) showActivities();
    $('#front-page').css('display','none');
    $('#goalpage').css('display','none');
    $('#game-page').css('display','none');
    $('#chart-page').css('display','block');
}

function showGamePage(){
    // include change the url so that we can go back...
    $('#front-page').css('display','none');
    $('#goalpage').css('display','none');
    $('#chart-page').css('display','none');
    $('#game-page').css('display','block');
    var categories = [];
    var tsd = [];
    var sd = [];
    var link = "";
    for (var i in game_data){
	var g = game_data[i];	
	if (g.resource && g.resource.title && extractTitle(g.resource.title, "en")==currentlyshowing){
	    categories.push(g.date);
	    tsd.push(parseInt(g.elapsedTime)/1000/60)
	    sd.push(parseInt(g.score))
	    console.log(g.resource)
	    if (g.resource.resource_url) link = g.resource.resource_url;
	}
    }

    if (link!=""){
	st = '<a id="playgamebut" target="_blank" class="dbutton dselected" href="'+link+'">Play again!</a>';
	$('#playagain').html(st);
    }
    
    Highcharts.chart('game-chart', {
	chart: {
	    type: 'column'
	},
	title: {
	    text: 'Game '+currentlyshowing
	},
	subtitle: {
	    text: 'Time Spent and Score'
	},
	xAxis: {
	    categories: categories,
	    crosshair: true
	},
	yAxis: [{
	    min: 0,
	    title: {
		text: 'Time spent playing'
	    }
	},
		{
	    min: 0,
	    title: {
		text: 'Score'
	    }, opposite: true
		}],
	series: [{
	    name: 'Time spent',
	    data: tsd

	}, {
	    yAxis: 1,
	    name: 'Score',
	    data: sd
	}]
    });
}

function showTimes(){
    var times = {};
    var maxi = 0;
    for (var i in data){
	if (data[i]["scope"] == currentlyshowing){
	    if (data[i]["Day of Week"] && data[i]["Hour"]){
		var key = sDay(parseInt(data[i]["Day of Week"]))+" "+parseInt(data[i]["Hour"]);
		if (!times[key]) times[key] = {};
		if (!times[key].intensity) times[key].intensity=0;
		times[key].intensity++;
		if (times[key].intensity > maxi)
		    maxi = times[key].intensity;	
		if (data[i]["complexity"]){
		    if (!times[key].complexity) times[key].complexity = 0;
		    times[key].complexity += parseFloat(data[i]["complexity"]);
		}
		if (data[i]["coverage"]){
		    if (!times[key].coverage) times[key].coverage = 0;
		    times[key].coverage += parseFloat(data[i]["coverage"]);
		}
		if (data[i]["diversity"]){
		    if (!times[key].diversity) times[key].diversity = 0;
		    times[key].diversity += parseFloat(data[i]["diversity"]);
		}
		
	    }
	}
    }
    var maxc = 0.;
    var mck = "";
    var maxco = 0.;
    var mcok = "";
    var maxd = 0.;
    var mdk = "";
    for (var time in times){
	// average...
	if (times[time].intensity && times[time].intensity!=0){
	    times[time].complexity = parseFloat(times[time].complexity)/parseFloat(times[time].intensity);
	    times[time].coverage = parseFloat(times[time].coverage)/parseFloat(times[time].intensity);
	    times[time].diversity = parseFloat(times[time].diversity)/parseFloat(times[time].intensity);
	}
	if (times[time].complexity > maxc) {
	    maxc = times[time].complexity;
	    mck = time;
	}
	if (times[time].coverage > maxco) {
	    maxco = times[time].coverage;
	    mcok = time;
	}
	if (times[time].diversity > maxd) {
	    maxd = times[time].diversity;
	    mdk = time;
	}
    }
    var keys = [];
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for (var d in days){
	for (var h = 0; h <=23; h++){
	    keys.push(days[d]+" "+h);
	}
    }
    var cdata = [];
    var maxmix = 0;
    var mmixk = "";
    for (var k in keys){
	var key = keys[k];
	if (times[key]){
	    if (times[key].intensity) times[key].intensity = times[key].intensity/maxi;
	    else times[key].intensity = 0;
	    if (times[key].complexity) times[key].complexity = times[key].complexity/maxc;
	    else times[key].complexity = 0;
	    if (times[key].coverage) times[key].coverage = times[key].coverage/maxco;
	    else times[key].coverage = 0;
	    if (times[key].diversity) times[key].diversity = times[key].diversity/maxd;
	    else times[key].diversity = 0;
	    var mix = (times[key].intensity+times[key].complexity+times[key].coverage+times[key].diversity)/4;
	    cdata.push(mix);
	    if (mix > maxmix) {
		maxmix = mix;
		mmixk  = key;
	    }	    
	} else {
	    cdata.push(0);
	}
    }
    console.log(times);
    console.log(cdata);    
    Highcharts.chart('timechart', {
	chart: {
	    type: 'column'
	},
	spacingBottom: 0,
	spacingTop: 0,
	title: {
	    text: 'Your Learning Week'
	},
	xAxis: {
	    categories: keys,
	    crosshair: true
	},
	yAxis: {
	    min: 0, max: 1.0,
	    title: ''
	},
	tooltip: {
	    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
	    footerFormat: '</table>',
	    shared: true,
	    useHTML: true
	},
	plotOptions: {
	    column: {
		pointPadding: 0.2,
		borderWidth: 0
	    }
	},
	series: [{
	    name: 'mixed indicators',
	    data: cdata,

	}]
    });

    var st='<div class="besttime">'+
        '<div class="besttimel">Best time Learning about '+currentlyshowing+" overall:</div>"+
	'<div class="besttimev">'+mmixk+" o'clock</div>"+
        '<div class="besttimel">Best time for coverage:</div>'+
	'<div class="besttimev">'+mcok+" o'clock</div>"+
	'<div class="besttimel">Best time for complexity:</div>'+
	'<div class="besttimev">'+mck+" o'clock</div>"+	
        '<div class="besttimel">Best time for diversity:</div>'+
	'<div class="besttimev">'+mdk+" o'clock</div>"+	
	'</div>';
    $('#besttimespanel').html(st);
}


function showDays(){
    var days = {
	"Monday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0},
	"Tuesday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0},
	"Wednesday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0},
	"Thursday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0},
	"Friday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0},
	"Saturday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0},
	"Sunday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0}
    }
    var maxi = 0;
    for (var i in data){
	if (data[i]["scope"] == currentlyshowing){
	    if (data[i]["Day of Week"]){
		days[data[i]["Day of Week"]].intensity++;
		if (days[data[i]["Day of Week"]].intensity > maxi)
		    maxi = days[data[i]["Day of Week"]].intensity;
	    }	
	    if (data[i]["complexity"]){
		days[data[i]["Day of Week"]].complexity += parseFloat(data[i]["complexity"]);
	    }
	    if (data[i]["topic_coverage"]){
		days[data[i]["Day of Week"]].coverage += parseFloat(data[i]["topic_coverage"]);
	    }
	    if (data[i]["view_coverage"]){
		days[data[i]["Day of Week"]].diversity += parseFloat(data[i]["view_coverage"]);
	    }
	}
    }
    var maxc = 0.;
    var maxco = 0.;
    var maxd = 0.;
    for (var day in days){
	// average...
	if (days[day].intensity!=0){
	    days[day].complexity = parseFloat(days[day].complexity)/parseFloat(days[day].intensity);
	    days[day].coverage = parseFloat(days[day].coverage)/parseFloat(days[day].intensity);
	    days[day].diversity = parseFloat(days[day].diversity)/parseFloat(days[day].intensity);
	}
	if (days[day].complexity > maxc) maxc = days[day].complexity;
	if (days[day].coverage > maxco) maxco = days[day].coverage;
	if (days[day].diversity > maxd) maxd = days[day].diversity;
    }
    for (var day in days){
	days[day].intensity = parseFloat(days[day].intensity)/parseFloat(maxi);
	days[day].complexity = parseFloat(days[day].complexity)/parseFloat(maxc);
	days[day].coverage = parseFloat(days[day].coverage)/parseFloat(maxco);
	days[day].diversity = parseFloat(days[day].diversity)/parseFloat(maxd);
    }
    var datai = [
	days["Monday"].intensity,
	days["Tuesday"].intensity,
	days["Wednesday"].intensity,
	days["Thursday"].intensity,
	days["Friday"].intensity,
	days["Saturday"].intensity,
	days["Sunday"].intensity	
    ];
    var datac = [
	days["Monday"].complexity,
	days["Tuesday"].complexity,
	days["Wednesday"].complexity,
	days["Thursday"].complexity,
	days["Friday"].complexity,
	days["Saturday"].complexity,
	days["Sunday"].complexity	
    ];
    var dataco = [
	days["Monday"].coverage,
	days["Tuesday"].coverage,
	days["Wednesday"].coverage,
	days["Thursday"].coverage,
	days["Friday"].coverage,
	days["Saturday"].coverage,
	days["Sunday"].complexity	
    ];
    var datad = [
	days["Monday"].diversity,
	days["Tuesday"].diversity,
	days["Wednesday"].diversity,
	days["Thursday"].diversity,
	days["Friday"].diversity,
	days["Saturday"].diversity,
	days["Sunday"].diversity	
    ];
    console.log(days);
    Highcharts.chart('timechart', {
	chart: {
	    type: 'column'
	},
	spacingBottom: 0,
	spacingTop: 0,
	title: {
	    text: ''
	},
	xAxis: {
	    categories: [
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat',
		'Sun'
	    ],
	    crosshair: true
	},
	yAxis: {
	    min: 0, max: 1.0,
	    title: ''
	},
	tooltip: {
	    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
	    footerFormat: '</table>',
	    shared: true,
	    useHTML: true
	},
	plotOptions: {
	    column: {
		pointPadding: 0.2,
		borderWidth: 0
	    }
	},
	series: [{
	    name: 'intensity',
	    data: datai,

	}, {
	    name: 'coverage',
	    data: dataco,

	}, {
	    name: 'complexity',
	    data: datac,

	}, {
	    name: 'diversity',
	    data: datad

	}]
    });
}


function showHours(){
    var maxi = 0;
    var hours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    console.log(data);
    for (var i in data){
	if (data[i]["scope"] == currentlyshowing){
	    if (data[i]["Hour"]){
		hours[parseInt(data[i]["Hour"])]++;
	    }
	}
    }
    console.log(hours);
    Highcharts.chart('hourchart', {
	chart: {
	    type: 'column'
	},
	spacingBottom: 0,
	spacingTop: 0,
	title: {
	    text: ''
	},
	xAxis: {
	    categories: [
		'00h',
		'01h',
		'02h',
		'03h',
		'04h',
		'05h',		
		'06h',
		'07h',
		'08h',
		'09h',
		'10h',
		'11h',
		'12h',
		'13h',
		'14h',
		'15h',
		'16h',
		'17h',
		'18h',
		'19h',
		'20h',
		'21h',
		'22h',
		'23h'		
	    ],
	    crosshair: true
	},
	yAxis: {
	    min: 0,
	    title: ''
	},
	tooltip: {
	    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
	    footerFormat: '</table>',
	    shared: true,
	    useHTML: true
	},
	plotOptions: {
	    column: {
		pointPadding: 0.2,
		borderWidth: 0
	    }
	},
	series: [{
	    name: 'intensity',
	    data: hours,

	}]
    });
}

function recoClicked(r, rid){
    afelLog('recocheck', r, 'clicked on resource '+r)
    $.post("recofb.php", {rid: rid, r: r, u: auser}, function( d ) {
	console.log(d)
    });
}


function showRecommendations(){    
    var acts = [];
    for (var i in data){
	// if (data[i]["scope"] == currentlyshowing){
	if (data[i]["scope"].indexOf(currentlyshowing)!=-1){	    
	    acts.push(data[i]["resource"]);
	}
    }
    $.post("reco.php", {user: auser, acts: acts}, function( d ) {
	const data = JSON.parse(d);
	console.log(data)
	var st = "";
	for (var i in data){
	    st += '<div class="recresult">'+
		'<a target="_blank" href="'+data[i].url+'" '+
		'onclick="recoClicked(\''+data[i].id+'\', \''+data[i].rid+'\')"'+ 
		'>'+
		extractTitle(data[i].title, "en")+
		'</a></div>';
	}
	$('#recresults').html(st);
    });
    return ;
}

function showActivities(){
    var st = '<h3>Latest activities</h3>';
//	+'<div id="actsbuttons">'
//	+'<div class="dbutton dselected" id="actmixedbut">by mixed indicators</div>'
//    	+'<div class="dbutton" id="actintbut">by intensity</div>'
//        +'<div class="dbutton" id="actcovbut">by coverage</div>'
//        +'<div class="dbutton" id="actdivbut">by diversity</div>'
//        +'<div class="dbutton" id="actcombut">by complexity</div>'
//	+'</div>';
    var acts = []
    for (var i in data){
	if (data[i].scope.indexOf(currentlyshowing)!=-1){
	    acts.push(data[i])
	}
    }
    st += '<div id="actsbycovs">';
    var count = 0;
    for (var i in acts){
	const a = acts[i]
	if (a.title && a.title!= "")		
	    st += '<div class="recresult"><a onclick="afelLog(\'activitycheck\', \''+a.resource+'\', \'clicked on resource '+a.resource+' :: '+a.title+'\')" target="_blank" href="'+a.resource+'">'+extractTitle(a.title, "en")+'</a></div>';
	else
	    st += '<div class="recresult"><a onclick="afelLog(\'activitycheck\', \''+a.resource+'\', \'clicked on resource '+a.resource+'\')" target="_blank" href="'+a.resource+'">no title</a></div>';
	count ++;
    }
    st += '</div>';
    $("#actarea").html(st);
}

// TODO: show data shared with you.
function showPolar(){
    var a1 = getDataArray(data, 'coverage');
    var a2 = getDataArray(data, 'diversity');
    var a3 = getDataArray(data, 'complexity');    
    var a4 = getDataArray(data, 'intensity');    
    console.log(currentlyshowing);
    var polardata = [
	getWeight(a1, currentlyshowing),
	getWeight(a4, currentlyshowing),
	getWeight(a3, currentlyshowing),
	getWeight(a2, currentlyshowing),
    ];
    console.log(polardata);
    Highcharts.chart('polarchart', {
	chart: {
	    polar: true,
	    type: 'line'
	},
	spacingBottom: 0,
	title: {
	    text: 'Scope: '+currentlyshowing,
	    margin: 0,
	    verticalAlign: "top"
	},
	pane: {
	    size: '70%'
	},
	legend:{
	    width: 0,
	},
	xAxis: {
	    categories: ['coverage', 'intensity', 'complexity', 'diversity'],
	    tickmarkPlacement: 'on',
	    lineWidth: 0,
	    labels: {
		style: {
		    fontSize: "14px"
		}
	    }
	},
	yAxis: {
	    gridLineInterpolation: 'polygon',
	    lineWidth: 0,
	    min: 0,
	    max: 1
	},
	tooltip: {
	    shared: true,
	    formatter: function(){
		if (this.x == "coverage"){
		    return "the average amount of new concepts each activity has introduced in the scope: <strong>"+parseInt(this.y*100)+"%";
		}
		if (this.x == "intensity"){
		    return "the number of activities of in this scope compared to others: <strong>"+parseInt(this.y*100)+"%";
		}
		if (this.x == "complexity"){
		    return "the average complexity of activities of in this scope: <strong>"+parseInt(this.y*100)+"%";
		}
		if (this.x == "diversity"){
		    return "how activities in this scope cover a wide range of views (currently based on estimated age and gender of author): <strong>"+parseInt(this.y*100)+"%";
		}
	    }
	},
	series: [{
	    name: 'indicators',
	    data: polardata,
	    pointPlacement: 'on'
	}]

    });
}

function getWeight(a, s){
    for (var i in a){
	if (a[i].name == s) return a[i].weight;
    }
}


function showFrontPage(){
    currentlyShowing = null;
    $('#chart-page').css('display','none');
    $('#goalpage').css('display','none');
    $('#game-page').css('display','none');
    $('#viewgoalpage').css('display','none');
    $('#front-page').css('display','block');
}

function showGoalPage(){
    $("#goalscopetitle").text(currentlyshowing);
    $('#chart-page').css('display','none');
    $('#front-page').css('display','none');
    $('#viewgoalpage').css('display','none');
    $('#goalpage').css('display','block');
}

function showGoalPage(){
    $("#goalscopetitle").text(currentlyshowing);
    $('#chart-page').css('display','none');
    $('#front-page').css('display','none');
    $('#viewgoalpage').css('display','none');
    $('#goalpage').css('display','block');
}

function showViewGoalPage(){
    $("#viewgoalscope").text(currentlyshowing);
    $('#chart-page').css('display','none');
    $('#front-page').css('display','none');
    $('#goalpage').css('display','none');
    $('#viewgoalpage').css('display','block');   
    var st="";
    for(var i in goals){
	if (goals[i].scope==currentlyshowing){
	    st += '<div class="goalview">'+
		'<div class="goallabel">Increase '+
		goals[i].toincrease+" "+goals[i].timing+
		' <a href="">(remove)</a>'+
		'</div>'+
		'<div class="goalchart" id="goalchart_'+i+'"></div></div>';
	}
    }
    $("#goallist").html(st);
    for(var i in goals){
	if (goals[i].scope==currentlyshowing){
	    showGoalChart(i);
	}
    }
}

function showGoalChart(gi){
    var series = [];
    var categories = [];
    var nb = 3;
    if (goals[gi].timing == "daily") nb=10;
    if (goals[gi].timing == "weekly") nb=5;    
    for (var i = 0; i < nb; i++){
	series.push(Math.random()*2.0);
	categories.push(i);
    }
    Highcharts.chart('goalchart_'+gi, {
	chart: {
	    type: 'column',
	    margin: [0, 0, 0, 0]	    
	},
	title: {
	    text: ''
	},
	xAxis: {
	    categories: categories,
	    visible: false
	},
	yAxis: {
	    min: 0,
	    visible: false,
	    title: {
		text: ''
	    }
	},
	series: [{
	    name: goals[gi].toincrease,
	    data: series

	}]
    });
}

function getMax(arr, prop) {
     var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || arr[i][prop] > max[prop])
            max = arr[i];
    }
    return max;
}

function getMin(arr, prop) {
  
var min ;
    for (var i=0 ; i<arr.length ; i++) {
        if (!min|| arr[i][prop] < min[prop])
            min = arr[i];
    }
    return min;
}

function normalize(val,min, max) {
    var delta = max - min;
    var t=(val - min) / delta;
    var threshold=0.1;
    if(t<threshold)
    {
    return 0.1;
    }
    else{
       return t;
       }
}

function sDay(i){
    if (i==0) return "Monday";
    if (i==1) return "Tuesday";
    if (i==2) return "Wednesday";
    if (i==3) return "Thursday";
    if (i==4) return "Friday";    
    if (i==5) return "Saturday";
    if (i==6) return "Sunday";
    return "what?";
}

function afelLog(type, label, message){
    $.post( "log.php", {user: auser, type: type, label: label, message: message}, function( d ) {
	console.log("Logged");
	console.log(d);
    });
}
