---
layout: post
title: 'GitHub Actionsメモ'
author: [Fujiya]
tags: ['','']
category: Firebase
image: 'img/taxonomy/github.png'
date: '2023-01-18T18:03:19'
draft: false
excerpt: GitHub Article
---

## ワークフローの発火について

コメントによる発火などは、デフォルトのブランチに反映されていないと実行されない

## PRへコメントしたい
```yml
      - name: Notify PR when Create AWS Resources fails
        if: failure()
        env:
          GH_TOKEN: ${{ github.token }}
          MESSAGE: |
            @${{ github.event.inputs.author }}
            :exclamation: AWSリソースの作成に失敗しました。
            ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
        run: |
          gh pr comment ${{ github.event.issue.number }} -b "${{ env.MESSAGE }}"
```

## Slackへコメントしたい
```yml
      - name: Notify to Slack
        uses: slackapi/slack-github-action@v1.16.0
        with:
          payload: |
            {
              "url": "${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WORKFLOW_WEBHOOK_URL }}
```

## ワークフロー全体の失敗検知

### 独立したJob
```yml
name: Sample workflow
on:
  push

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: hogehoge
        run: echo hogehoge

  job2:
    runs-on: ubuntu-latest
    steps:
      - name: hogehoge
        run: echo hogehoge

      - name: Exit code
        run: exit 1

  notify:
    runs-on: ubuntu-latest
    needs: [job1, job2]
    if: failure()
    steps:
      - name: Notify to Slack
        uses: slackapi/slack-github-action@v1.16.0
        with:
          payload: |
            {
              "url": "${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WORKFLOW_WEBHOOK_URL }}
```

### 依存のあるJob
```yml
name: Sample workflow
on:
  push

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: hogehoge
        run: echo hogehoge

  job2:
    runs-on: ubuntu-latest
    needs:
      - job1
    steps:
      - name: hogehoge
        run: echo hogehoge

      - name: Exit code
        run: exit 1

  notify:
    runs-on: ubuntu-latest
    needs: 
      - job2
    if: failure()
    steps:
      - name: Notify to Slack
        uses: slackapi/slack-github-action@v1.16.0
        with:
          payload: |
            {
              "url": "${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WORKFLOW_WEBHOOK_URL }}
```

## トークン周りのお話
```
secrets.GITHUB_TOKEN == github.token
```

> トークンは github.token コンテキストでも使用できます。 詳細については、「コンテキスト」を参照してください。

参考：[自動トークン認証](https://docs.github.com/ja/actions/security-guides/automatic-token-authentication)

## トークンでできる範囲
https://zenn.dev/tsuruo/scraps/a4c223cd2a704f


## actionsの権限

ジョブ：https://docs.github.com/ja/actions/using-jobs/assigning-permissions-to-jobs
ワークフロー：https://docs.github.com/ja/actions/using-workflows/workflow-syntax-for-github-actions#permissions
他もあるかも
調べて整理してちょ

```
permissions:
  actions: read|write|none
  checks: read|write|none
  contents: read|write|none
  deployments: read|write|none
  id-token: read|write|none
  issues: read|write|none
  discussions: read|write|none
  packages: read|write|none
  pages: read|write|none
  pull-requests: read|write|none
  repository-projects: read|write|none
  security-events: read|write|none
  statuses: read|write|none
```