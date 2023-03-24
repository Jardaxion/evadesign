<?php
    
    $name = $_REQUEST['name'];
    $phone = $_REQUEST['phone'];

    $message = 'Имя: '.$name.' Телефон: '.$phone;

    mail("bainthecreator21@gmail.com", 'Был оставлен отклик', $message);