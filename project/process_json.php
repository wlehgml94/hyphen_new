<?php

// 파일 경로 설정
$inputPath = dirname(__DIR__). '/assets_workspace/data/customer_data.json';

// JSON 읽기
$json = file_get_contents($inputPath);
$data = json_decode($json, true);

// 키 이름 변경
$converted = [
  '프로젝트' => $data['프로젝트별'] ?? [],
  '공간' => $data['공간별'] ?? []
];

file_put_contents($inputPath, json_encode($converted, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo "✅ JSON 후처리 완료: {$inputPath}\n";