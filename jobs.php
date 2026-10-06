<?php

header('Content-Type: application/json; charset=utf-8');

$url = 'https://www.freejobalert.com/wb-government-jobs/';

/*
|--------------------------------------------------------------------------
| Simple Cache
|--------------------------------------------------------------------------
| প্রতি request-এ FreeJobAlert-এ request না পাঠিয়ে 10 মিনিট cache রাখা হচ্ছে।
|--------------------------------------------------------------------------
*/

$cacheFile = __DIR__ . '/jobs-cache.json';
$cacheTime = 10 * 60; // 10 minutes

if (
    file_exists($cacheFile) &&
    (time() - filemtime($cacheFile)) < $cacheTime
) {
    echo file_get_contents($cacheFile);
    exit;
}


/*
|--------------------------------------------------------------------------
| CURL Request
|--------------------------------------------------------------------------
*/

$ch = curl_init();

curl_setopt_array($ch, [

    CURLOPT_URL => $url,

    CURLOPT_RETURNTRANSFER => true,

    CURLOPT_FOLLOWLOCATION => true,

    CURLOPT_MAXREDIRS => 5,

    CURLOPT_CONNECTTIMEOUT => 10,

    CURLOPT_TIMEOUT => 20,

    CURLOPT_USERAGENT =>
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36',

    CURLOPT_HTTPHEADER => [
        'Accept: text/html,application/xhtml+xml',
        'Accept-Language: en-US,en;q=0.9'
    ]

]);

$html = curl_exec($ch);

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

$curlError = curl_error($ch);

curl_close($ch);


if ($html === false || $httpCode >= 400) {

    /*
    |--------------------------------------------------------------------------
    | If cache exists, use old data
    |--------------------------------------------------------------------------
    */

    if (file_exists($cacheFile)) {
        echo file_get_contents($cacheFile);
        exit;
    }

    echo json_encode([
        'success' => false,
        'message' => 'চাকরির তথ্য সংগ্রহ করা যাচ্ছে না।',
        'error' => $curlError
    ], JSON_UNESCAPED_UNICODE);

    exit;
}


/*
|--------------------------------------------------------------------------
| Parse HTML
|--------------------------------------------------------------------------
*/

libxml_use_internal_errors(true);

$dom = new DOMDocument();

@$dom->loadHTML(
    mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8')
);

$xpath = new DOMXPath($dom);


/*
|--------------------------------------------------------------------------
| Find Latest Government Jobs Table
|--------------------------------------------------------------------------
*/

$tables = $xpath->query(
    "//h2[contains(normalize-space(), 'Latest Government Jobs in West Bengal')]/following::table[1]"
);

if ($tables->length === 0) {

    echo json_encode([
        'success' => false,
        'message' => 'Latest Government Jobs table পাওয়া যায়নি।'
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

$table = $tables->item(0);


/*
|--------------------------------------------------------------------------
| Extract Rows
|--------------------------------------------------------------------------
*/

$rows = $xpath->query(".//tr", $table);

$jobs = [];

foreach ($rows as $index => $row) {

    /*
    | Skip header
    */

    if ($index === 0) {
        continue;
    }

    $cells = $xpath->query("./th|./td", $row);

    if ($cells->length < 6) {
        continue;
    }


    /*
    |--------------------------------------------------------------------------
    | Basic Data
    |--------------------------------------------------------------------------
    */

    $postDate = cleanText(
        $cells->item(0)->textContent
    );

    $jobTitle = cleanText(
        $cells->item(1)->textContent
    );

    $postName = cleanText(
        $cells->item(2)->textContent
    );

    $vacancy = cleanText(
        $cells->item(3)->textContent
    );

    $qualification = cleanText(
        $cells->item(4)->textContent
    );

    $lastDate = cleanText(
        $cells->item(5)->textContent
    );


    /*
    |--------------------------------------------------------------------------
    | Original Job Link
    |--------------------------------------------------------------------------
    */

    $jobUrl = '';

    $links = $xpath->query(
        ".//a[@href]",
        $cells->item(1)
    );

    if ($links->length > 0) {

        $jobUrl = trim(
            $links->item(0)->getAttribute('href')
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Make Absolute URL
    |--------------------------------------------------------------------------
    */

    if (
        $jobUrl !== '' &&
        strpos($jobUrl, 'http') !== 0
    ) {

        $jobUrl = 'https://www.freejobalert.com' .
            '/' .
            ltrim($jobUrl, '/');
    }


    /*
    |--------------------------------------------------------------------------
    | Add Job
    |--------------------------------------------------------------------------
    */

    $jobs[] = [

        'post_date' => $postDate,

        'job_title' => $jobTitle,

        'post_name' => $postName,

        'vacancy' => $vacancy,

        'qualification' => $qualification,

        'last_date' => $lastDate,

        'url' => $jobUrl

    ];
}


/*
|--------------------------------------------------------------------------
| Final JSON
|--------------------------------------------------------------------------
*/

$result = [

    'success' => true,

    'source' => 'FreeJobAlert',

    'source_url' =>
        'https://www.freejobalert.com/wb-government-jobs/',

    'updated' =>
        date('d-m-Y H:i:s'),

    'total_jobs' =>
        count($jobs),

    'jobs' => $jobs

];


$json = json_encode(
    $result,
    JSON_UNESCAPED_UNICODE |
    JSON_PRETTY_PRINT |
    JSON_UNESCAPED_SLASHES
);


/*
|--------------------------------------------------------------------------
| Save Cache
|--------------------------------------------------------------------------
*/

@file_put_contents(
    $cacheFile,
    $json,
    LOCK_EX
);


/*
|--------------------------------------------------------------------------
| Output
|--------------------------------------------------------------------------
*/

echo $json;


/*
|--------------------------------------------------------------------------
| Clean Text Function
|--------------------------------------------------------------------------
*/

function cleanText($text)
{
    $text = html_entity_decode(
        $text,
        ENT_QUOTES | ENT_HTML5,
        'UTF-8'
    );

    $text = preg_replace(
        '/\s+/',
        ' ',
        $text
    );

    return trim($text);
}

?>
