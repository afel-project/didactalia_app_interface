<?php

// print_r($_POST['acts']);

$user = $_POST['user'];

$c = substr($user,0,1);
$cn = hexdec($c);

$profile = "afel_cf";
if ($cn % 2 == 1) $profile = "afel_mp";

$data = array("maxRecommResults" => 10, "recommProfileName" => $profile, "userId" => $user);
$data_string = json_encode($data);

$ch = curl_init('http://afel-rec.know-center.tugraz.at/afel/recomm');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, "reco1::eN9@L+Bl4l~29#?5");
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data_string))
);
$result = curl_exec($ch);

$dres = json_decode($result);

// print_r($dres->recomms);

$toreturn = array();

foreach ($dres->recomms as $rec){
    $url = 'http://localhost:9200/didactalia-activity-base/resource/'.$rec;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $res = curl_exec($curl);
    curl_close($curl);
    $item = json_decode($res);
    $rurl = "";
    if (isset($item->{_source}->resource_url)){
        $rurl = $item->{_source}->resource_url;
    }
    else if (isset($item->{_source}->link)){
        $rurl = $item->{_source}->link;
    } 
    $ditem = array("title" => $item->{_source}->title, "url"=> $rurl, "id"=>$rec, "rid"=>$dres->recommId);
    $toreturn[] = $ditem;
}

echo json_encode($toreturn);
