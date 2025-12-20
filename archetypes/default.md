---
{{- /* Current time in Central US */ -}}
{{- $central := now | time.In "America/Chicago" -}}

{{- /* Convert to UTC */ -}}
{{- $utc := $central }}
title: "{{ replace .File.ContentBaseName `-` ` ` | title }}"
date: {{ $utc | time.Format "2006-01-02T15:04:05-07:00" }}
draft: true
type: page
---