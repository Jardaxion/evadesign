<?php
    
    $name = $_REQUEST['name'];
    $phone = $_REQUEST['phone'];

    $message = 'Имя: '.$name.'\r\nТелефон: '.$phone;

    mail("bainthecreator21@gmail.com", 'Был оставлен отклик', $message);