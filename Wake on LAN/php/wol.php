<?php
	/*
		ex. alexa ask computer to wake up
	*/
	if($_POST["password"] != "!8besX^SpAx.=9f2") return;
	
	wol($_POST["ipaddress"], "08-00-27-0E-25-B8");

	function wol($broadcast, $mac){
		$mac_array = split(':', $mac);

		$hwaddr = '';

		foreach($mac_array AS $octet){
			$hwaddr .= chr(hexdec($octet));
		}

		// Create Magic Packet

		$packet = '';
		for ($i = 1; $i <= 6; $i++){
			$packet .= chr(255);
		}

		for ($i = 1; $i <= 16; $i++){
			$packet .= $hwaddr;
		}

		$sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
		if ($sock){
			$options = socket_set_option($sock, 1, 6, true);

			if ($options >=0){    
				$e = socket_sendto($sock, $packet, strlen($packet), 0, $broadcast, 7);
				socket_close($sock);
			}
		}
	}
?>