---
layout: post
title: 'tfstateの操作方法-Terraform'
author: [Fujiya]
tags: ['Terraform', 'tfstate', '管理', 'manage']
category: Terraform
image: 'img/taxonomy/terraform.png'
date: '2022-01-06T00:08:15'
draft: false
excerpt: Terraform Article
---

> Usage: terraform [global options] state <subcommand> [options] [args]
> 
>   This command has subcommands for advanced state management.
> 
>   These subcommands can be used to slice and dice the Terraform state.
>   This is sometimes necessary in advanced cases. For your safety, all
>   state management commands that modify the state create a timestamped
>   backup of the state prior to making modifications.
> 
>   The structure and output of the commands is specifically tailored to work
>   well with the common Unix utilities such as grep, awk, etc. We recommend
>   using those tools to perform more advanced state tasks.
> 
> Subcommands:
>     list                List resources in the state
>     mv                  Move an item in the state
>     pull                Pull current state and output to stdout
>     push                Update remote state from a local state file
>     replace-provider    Replace provider in the state
>     rm                  Remove instances from the state
>     show                Show a resource in the state

| stateのサブコマンド | 内容                                                     |
| ------------------- | -------------------------------------------------------- |
| list                | 状態のリソースをリストアップ                             |
| mv                  | ステート内のアイテムを移動する。リソース名の変更が可能。 |
| pull                | 現在の状態を引き出し、stdout に出力する。                |
| push                | ローカルの状態ファイルからリモートの状態を更新する       |
| replace-provider    | 状態のプロバイダを置き換える。                         |
| rm                  | 状態からインスタンスを削除する。                           |
| show                | 状態にあるリソースを表示する。                             |

plan
apply
refresh

## 確認

## 取り込み

## 反映

## 変更

## 削除

