---
layout: post
title: 'Railsの開発環境で404ページを確認する-Rails'
author: [Fujiya]
tags: ['Rails', 'RoutingError', '404']
category: Ruby
image: 'img/taxonomy/ruby.png'
date: '2021-06-10T19:50:48'
draft: false
excerpt: Ruby Article
---



Railsアプリケーションで404ページを自作することがあると思います。しかし開発環境では、RoutingErrorページが表示され、目的の404ページが表示されません。

このようなときには、`config/environments/development.rb`の設定を`false`にすることで、RoutingErrorページが表示されなくなり404ページを表示することができます。

```ruby:title=config/environments/development.rb
config.consider_all_requests_local = false
```

## 注意点

- 設定後は、Railsアプリケーションを再起動しましょう。先ほど変更した設定が反映されます。
- 確認後は、設定を戻すのを忘れないようにしましょう。

これで、開発環境でも404ページが確認できます。

<div class="ads"></div>

## 補足

[ExceptionHandler](https://github.com/richpeck/exception_handler)というカスタムRailsエラーページ用のgemがあります。
こちらを採用している場合は、このgemの設定を変更する必要があります。

`config/application.rb`にある`config.exception_handler`の`dev`を`false`にすることで表示が可能です。

```ruby:title=config/application.rb
    config.exception_handler = {
      dev:        true, # allows you to turn ExceptionHandler "on" in development
                  ↑
                  ここ
      ・
      ・
      ・
    }
```
