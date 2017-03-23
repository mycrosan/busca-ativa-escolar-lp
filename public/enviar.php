<?php
header('Content-Type: application/json');
if (empty($_POST)) {die(json_encode(["status" => false, "mensagem" => "requisição inválida."]));}

require '../vendor/autoload.php';
use Mailgun\Mailgun;

$post = [
    "Nome" => $_POST["name"],
    "E-mail" => $_POST["mail"],
    "Telefone" => $_POST["tel"],
    "Municipio" => $_POST["mun"],
    "Mensagem" => $_POST["text"]
];

$body = "Segue dados do contato: <br /><br />";
foreach($post as $label => $value) {
    $body .= "<b>$label</b>: <i>".($value ? $value : "N/D")."</i><br />";
}

# Instantiate the client.
$key = getenv("MAILGUN_KEY");
$domain = getenv("MAILGUN_DOMAIN");
$from = getenv("CONTACT_FROM");
$to = getenv("CONTACT_TO");
$mgClient = new Mailgun($key);
try {
$result = $mgClient->sendMessage("$domain",
    array('from'    => $from,
        'to'      => $to,
        'subject' => 'Novo envio de contato.',
        'html'    => $body));
} catch (Exception $e) {
    die(json_encode(["status" => false, "mensagem" => "Ops! Estamos sem sistema no momento."]));
}

die(json_encode(["status" => true, "mensagem" => "Seu contato foi para análise, entraremos em contato assim que possível."]));