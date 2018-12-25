<?php
set_time_limit ( 300 );
session_start();
if(!isset($_SESSION['afeluserid']))
       {
           header("Location:http://analytics.didactalia.net/logmein.php");
           exit;
       }
include("custom/custom.php");

// $useragent=$_SERVER['HTTP_USER_AGENT'];

// if(!preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4)))
// header('Location: ../dashboard/?user='.$_GET['user']);

?>
<!DOCTYPE HTML>
<html>
	<head>
<link rel="shortcut icon" href="custom/logo.ico"/>
    <title><?php echo $app_custom_conf["title"]; ?></title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/afel.css" />
    <link rel="stylesheet" href="custom/custom.css" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Scripts -->
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.scrollzer.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/skel.min.js"></script>
			<script src="assets/js/util.js"></script>
			<!--[if lte IE 8]><script src="assets/js/ie/respond.min.js"></script><![endif]-->
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/wordcloud.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.jssocials/1.4.0/jssocials.min.js"></script>

<link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.jssocials/1.4.0/jssocials.css" />


<link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.jssocials/1.4.0/jssocials-theme-classic.css" />

    <script src="assets/js/afel.js"></script>
    <script src="custom/custom.js"></script>
				<style>
				.jssocials-share-link { border-radius: 50%; }
				</style>
</head>
	<body>

<?php
			// If session is not set and token has no value then redirect to Login Page
//      if(!isset($_SESSION['username']) && !isset($_GET['token']) )
//       {
//           // TODO custom login page
//           header("Location:login.php");
//       }
?>

<div id='header'>
    <img id='logo' src="custom/top_banner.png" alt="" />
</div>

<div id='main'>
<div id="front-page">
    <h2>Topics learned</h2>
    <div class='displaycontrol'>
      <span class='dbutton dselected' id='mixbut'>mixed</span>
      <span class='dbutton' id='intbut'>intensity</span>
      <span class='dbutton' id='covbut'>coverage</span>
      <span class='dbutton' id='divbut'>diversity</span>
      <span class='dbutton' id='combut'>complexity</span>
    </div>
    <div class="clear">&nbsp;</div>
    <div id="scopecloud"> </div>
    <div class='gamedisplaycontrol'>
    <h2>Games played</h2>
    <span class='dbutton dselected' id='gtimebut'>Sort by: time spent</span>
      <span class='dbutton' id='gtrybut'>number of tries</span>
      <span class='dbutton' id='gscorebut'>score</span>
    </div>
    <div id="gamecloud"> </div>
</div> <!-- front page -->

<div id="chart-page">
    <div id="polarchart"> </div>
    <div id="timearea">
    <div id="timechart"> </div>
    <div id="besttimespanel"> </div>
    </div>
    <div id="actarea">
    </div>
    <div id="recarea">
    <h3>Recommendations</h3>
    <div id="recresults">
       Loading...
    </div>
    </div>   
    <div id="footer">
      <a href="http://afel-project.eu">Developed by the AFEL project</a>
    </div>
<?php if ($app_custom_conf["show_actions"]===true){ ?>
    <div id="plusbut" class="roundbut">+</div>
    <div id="actions">
                                                          <div class="dbutton dselected" id="goalviewaction">View goals</div>                                                          
                                                          <div class="dbutton dselected" id="goalaction">Set new goal</div>

</div>
<?php } ?>
</div>

<div id="game-page">
    <div id="game-chart"></div>
    <div id="playagain"></div>
</div>

    
    
<div id="goalpage">
<h3>New Goal in learning scope <span id="goalscopetitle"></span></h3>
<div id="newgoalcontrol">
    <div class="dbutton dselected" id="workmore">work more</div>
    <div class="dbutton" id="inccoverage">increase coverage</div>
    <div class="dbutton" id="inccomplexity">increase complexity</div>
    <div class="dbutton" id="incdiversity">increase diversity</div>
</div>
    <div id="gtip">
    The Didactalia AFEL app monitors your activity on Didactalia. It can remind you to focus on the topic you have choosen and to simply read more, watch more and do more on that topic.
    </div>
    <h4>Timing:</h4>
    <div id="ngtiming">
      <div class="tbutton" id="ngmonthly">monthly</div>
      <div class="tbutton tselected" id="ngweekly">weekly</div>
      <div class="tbutton " id="ngdaily">daily</div>
    </div>
    <div class="gobutton" id="nggobut">go</div>
    </div> <!-- goal-page -->


<div id="viewgoalpage">
    <div id="viewgoalheader">
       <h3 id="viewgoaltitle">Goals for scope <span id="viewgoalscope"></span></h3>
       <div class="dbutton dslected" id="closeviewgoalbut">close</div>
    </div>
    <div id="goallist"></div>
</div>
    
</div> <!-- main -->

 <script src="assets/js/d3.js"></script>
    <script src="assets/js/d3.layout.cloud.js"></script>

    <script>
    window.location.hash = ""
    <?php 
     $ch = curl_init();
     curl_setopt($ch, CURLOPT_URL,"http://127.0.0.1:8202/?user=".$_SESSION['afeluserid']);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
     $data = curl_exec ($ch);
     curl_close ($ch);

if (!empty($data)){
	 $lines = explode("\n", $data);
	 $head = str_getcsv(array_shift($lines));
	 $csv = array();
	 foreach ($lines as $line) {
		 $csv[] = array_combine($head, str_getcsv($line));
	 }
	 $_SESSION['csv']=$csv;
     $fcsv = array();
     foreach($csv as $line){
         if (strcmp($line["scope"], "_scope_of_routine_activities_")!==0){
             $fcsv[] = $line;
         }
     }
	 echo "var data = ".json_encode($fcsv).";\n";
     echo 'var auser = "'.$_SESSION['afeluserid'].'";'."\n";
}

     $ch = curl_init();
     curl_setopt($ch, CURLOPT_URL,"http://127.0.0.1:8073/?user=".$_SESSION['afeluserid']);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
     $data = curl_exec ($ch);
     curl_close ($ch);
if (!empty($data)){
     echo 'var game_data = '.$data.';'."\n";
}
	 ?>


function click(e)
{
    afelLog("view scope", e.name, "clicked on scope "+e.name);
    window.location.hash = e.name;
    currentlyshowing = e.name;
    showChartPage();
}

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}

</script>

	</body>
</html>

