---
layout: post
title: 'karabinerメモ'
author: [Fujiya]
tags: ['','']
category: Firebase
image: 'img/taxonomy/github.png'
date: '2023-01-18T18:03:19'
draft: false
excerpt: GitHub Article
---

## buildkit準備

BuildKit は Dockerコンテナ内で buildkitd デーモンを実行し、それにリモートでアクセスすることによっても使用できます。moby/buildkitでDockerイメージが配布されています。下記のコマンドを実行すれば準備は完了です。

```
docker run -d --name buildkitd --privileged moby/buildkit:latest
export BUILDKIT_HOST=docker-container://buildkitd
buildctl build --help
```

https://hub.docker.com/r/moby/buildkit