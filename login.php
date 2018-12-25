<?php

error_reporting(E_ALL); ini_set('display_errors', 1);

require '../vendor/autoload.php';

define( "CONSUMER_KEY", "cIT2fStn0kh5wURLki0PT5UtXtOwTBXX" );
define( "CONSUMER_KEY_STAGING", "cIT2fStn0kh5wURLki0PT5UtXtOwTBXX" );

if(isset($_GET['error'])) {
	switch($_GET['error']) {
		case 'nologin':
			redir_dida_login();
			break;
		default:
			print "Failed to negotiate login with main Didactalia platform. Didactalia reported: $_GET[error]";
	}
} elseif(isset($_GET['userID'])) {
	if(!isset($_GET['token'])) print "No token given. Cannot tell who is requesting user information";
	elseif( token_verify($_GET['token']) ) {
		$dida_user = $_GET['userID'];
		require_once 'inc/dashboard.inc';
		// print "You are $_GET[userID]!";
		// header( "Location: /?" . http_build_query(array( "dida_user" => $_GET['userID'] )) );
	} else {
		print "<p>There were issues verifying the login requests. Check above for any error messages.</p>";
		print "<p>If it is the token that has expired, the check will eventually be performed automatically, so you will then be able reload the page.</p>";
		print '<p>For now you will just need to go <a href="' .  basename(__FILE__) . '">back to login checker</a></p>';
	}
} else redir_get_user();

/*************
 * FUNCTIONS *
 *************/
 
function redir_get_user() {
	// $http_user = "preproduccion";
	// $http_pw = "123riam";
	// $path = "preloginmvc.didactalia.net/getUserID.aspx";
	$path = "servicios.didactalia.net/login/getUserID.aspx";
	$get_pars = array(
		'consumerKey' => CONSUMER_KEY,
		'token'       => token_generate()
	);
	$url = "https://";
	if( !empty($http_user) ) $url .= "$http_user:$http_pw@";
	$url .= $path;
	header( "HTTP/1.1 303 See Other" );
	header( "Location: $url?" . http_build_query($get_pars) );
	print "You are being redirected to Didactalia user verification.";
}

function encryption_get() {
        $algorithm = new Emarref\Jwt\Algorithm\Hs256('very198secret@_stocazzo');
//      $algorithm = new Emarref\Jwt\Algorithm\None();
        $encryption = Emarref\Jwt\Encryption\Factory::create($algorithm);
	return $encryption;
}

function token_generate() {
	$token = new Emarref\Jwt\Token();
	$token->addClaim(new Emarref\Jwt\Claim\Audience(['http://afel-project.eu', 'http://didactalia.net']));
	$token->addClaim(new Emarref\Jwt\Claim\Expiration(new \DateTime('2 minutes')));
	$token->addClaim(new Emarref\Jwt\Claim\IssuedAt(new \DateTime('now')));
	$token->addClaim(new Emarref\Jwt\Claim\Issuer('http://analytics.didactalia.net'));
	$token->addClaim(new Emarref\Jwt\Claim\JwtId('alexdma'));
	$token->addClaim(new Emarref\Jwt\Claim\NotBefore(new \DateTime('now')));
	//$token->addClaim(new Emarref\Jwt\Claim\Subject('your_subject'));

	$jwt = new Emarref\Jwt\Jwt();
	$serializedToken = $jwt->serialize($token, encryption_get());

	return $serializedToken;
}

function token_verify($serializedToken) {	
	$jwt = new Emarref\Jwt\Jwt();
	$context = new Emarref\Jwt\Verification\Context(encryption_get());
	$context->setAudience('http://afel-project.eu');
	$context->setIssuer('http://analytics.didactalia.net');
	try {
		$token = $jwt->deserialize($serializedToken);
		$jwt->verify($token, $context);
		return TRUE;
	} catch (Emarref\Jwt\Exception\VerificationException $e) {
		echo $e->getMessage();
		return FALSE;
	}
}

function redir_dida_login( $delay = 0 ) {
//	$url = "https://servicios.didactalia.net/login/login.aspx?redirect=http%3A%2F%2Fanalytics.didactalia.net%2Flogmein.php";
	$redir = "https://servicios.didactalia.net/login/getUserID.aspx?consumerKey=".CONSUMER_KEY."&token=".token_generate();
	$url = "https://servicios.didactalia.net/login/login.aspx?redirect=" . urlencode( $redir );
	include 'inc/login_proxy.phtml';
}
