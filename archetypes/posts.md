---
{{- /* Base filename like: 12-17-test-post */ -}}
{{- $base := path.BaseName .Name -}}

{{- /* Month/day from filename */ -}}
{{- $month := replaceRE `^([0-9]{2})-.*` `$1` $base -}}
{{- $day   := replaceRE `^[0-9]{2}-([0-9]{2}).*` `$1` $base -}}

{{- /* Year from /YYYY/ in path, fallback to current year */ -}}
{{- $year := "" -}}
{{- with (findRE `(^|/)([0-9]{4})(/|$)` .Name 1) -}}
  {{- $year = replaceRE `(^|/)([0-9]{4})(/|$)` `$2` (index . 0) -}}
{{- else -}}
  {{- $year = now | time.Format "2006" -}}
{{- end -}}

{{- /* Current time in Central US */ -}}
{{- $nowCentral := now | time.In "America/Chicago" -}}
{{- $timePart := $nowCentral | time.Format "15:04:05" -}}
{{- $offsetPart := $nowCentral | time.Format "-07:00" -}}

{{- /* Build a Central timestamp for the FILE date using today's Central clock time */ -}}
{{- $centralStamp := printf "%s-%s-%sT%s%s" $year $month $day $timePart $offsetPart | time.AsTime }}
title: '{{ replaceRE "^[0-9]{2}-[0-9]{2}-" "" $base | humanize | title }}'
date: {{ $centralStamp | time.In "America/Chicago" | time.Format "2006-01-02T15:04:05-07:00" }}
description: ''
draft: true
images:
  - 
categories:
  -
tags:
  -
---
