---
layout: post
title: '片方が値なし、または両方が値ありの2つのカラムを1つのカラムに統一するSQL-Programming'
author: [Fujiya]
tags: ['SQL','COALESCE','NULL','NULLIF','Programming']
category: SQL
image: 'img/taxonomy/programming.png'
date: '2023-01-30T23:45:58'
draft: false
excerpt: SQL Article
---

片方が値なし、または両方が値ありの2つのカラムを1つのカラムに統一するSQLは以下のようになります。

```sql:title=SQL
SELECT
  COALESCE(col1, col2) as unified_col
FROM
  table_name;
```

- COALESCE関数は、最初にNULL以外の値があるカラムの値を返す。
- 両方のカラムがNULLの場合は、NULLを返す。
- 統一されたカラムは、unified_colという名前で出力される。

## 他の言い回し

1. 2つのカラムのうち、NULL以外の値があるものを1つのカラムにまとめるSQL
1. 2つのカラムを結合し、NULL以外の値があるものを優先するSQL
1. 2つのカラムからNULL以外の値を選び、1つのカラムに統一するSQL
1. NULL以外の値がある2つのカラムを1つにまとめるSQL
1. 2つのカラムを統合し、NULL以外の値を優先するSQL

## 英語版

2. SQL to combine the columns with non-NULL value into one
3. SQL to join the columns and prioritize the non-NULL value
4. SQL to select non-NULL value from two columns and unify into one
5. SQL to merge the two columns with non-NULL value into one
6. SQL to combine and prioritize non-NULL value from two columns.